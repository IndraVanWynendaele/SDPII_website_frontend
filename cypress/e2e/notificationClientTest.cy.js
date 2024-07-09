describe("Notification Client Test", () => {

  it("should show the notifications", () => {
    cy.login("account@client.com", "Password");
    cy.wait(2000);

    cy.visit("http://localhost:5173/me/notifications");

    cy.intercept("GET", "http://localhost:3333/api/me/notifications?*", {
      fixture: "clientNotification.json",
    });

    cy.wait(2000);
    cy.get("h1").should("contain", "Notifications");
    cy.get("[data-cy=notifications]").should("have.length", 5);
  });

  it("should apply the filters", () => {

    cy.intercept("GET", "http://localhost:3333/api/orders?page=1*", {
      fixture: "ordersSupplier.json",
    });

    cy.login("account@supplier.com", "Password");
    cy.wait(2000);

    cy.visit("http://localhost:5173/orders?page=1");
    cy.get("[data-cy=payOrderReminder]").first().click();
    cy.get("[data-cy=reminderPopover]");

    cy.logout();

    cy.login("account@client.com", "Password");
    cy.wait(2000);

    cy.visit("http://localhost:5173/me/notifications");
    cy.wait(2000);
    cy.get(".filterknop").click();
    cy.get("[data-cy=seenSelect]").click();
    cy.get("li").contains("Not seen").click();
    cy.get("[data-cy=applyButton]").click();
    cy.get("[data-cy=seenNotification]").contains( "Unread");
  });

  it("should reset the filters", () => {

    cy.intercept("GET", "http://localhost:3333/api/orders?page=1*", {
      fixture: "ordersSupplier.json",
    });

    cy.login("account@supplier.com", "Password");
    cy.wait(2000);

    cy.visit("http://localhost:5173/orders?page=1");
    cy.get("[data-cy=payOrderReminder]").first().click();
    cy.get("[data-cy=reminderPopover]");

    cy.logout();

    cy.login("account@client.com", "Password");
    cy.wait(2000);

    cy.visit("http://localhost:5173/me/notifications");
    cy.wait(2000);
    cy.get(".filterknop").click();
    cy.get("[data-cy=seenSelect]").click();
    cy.get("li").contains("Not seen").click();
    cy.get("[data-cy=applyButton]").click();
    cy.url().should("include", "?seen=0");
    cy.get("[data-cy=seenNotification]").contains( "Unread");
    cy.get(".filterknop").click();
    cy.get("[data-cy=resetButton]").click();
    cy.url().should("not.include", "?seen=0");
  
  });

   it("should click on notification and see the detail", () => {
    cy.login("account@client.com", "Password");
    cy.wait(2000);
    cy.intercept("GET", "http://localhost:3333/api/me/notifications?*", {
      fixture: "clientNotification.json",
    });

    cy.visit("http://localhost:5173/me/notifications");
    cy.wait(2000);
    cy.get("[data-cy=notificationButton]").first().click();
    cy.get("[data-cy=notificationPopup]");
  });

  it("opens and closes filter drawer", () => {
    
    cy.intercept("GET", "http://localhost:3333/api/orders?page=1*", {
      fixture: "ordersSupplier.json",
    });

    cy.login("account@supplier.com", "Password");
    cy.wait(2000);

    cy.visit("http://localhost:5173/orders?page=1");
    cy.get("[data-cy=payOrderReminder]").first().click();
    cy.get("[data-cy=reminderPopover]");

    cy.logout();

    cy.login("account@client.com", "Password");
    cy.wait(2000);

    cy.get(".filterknop").contains("filters").click();
    cy.get(".MuiDrawer-root").should("be.visible");
    cy.get(".MuiDrawer-root").contains("Apply").click();
    cy.get(".MuiDrawer-root").should("not.be.visible");
  });
});
