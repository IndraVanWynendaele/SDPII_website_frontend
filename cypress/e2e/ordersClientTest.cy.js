describe("Orders Client Test", () => {
  beforeEach(() => {
    cy.login("account@client.com", "Password");
  });

  it("should show the orders", () => {
    cy.intercept("GET", "http://localhost:3333/api/orders/*", {
      fixture: "ordersClient.json",
    });
    cy.visit("http://localhost:5173/orders");
    cy.wait(1000);
    cy.get("h1").should("contain", "Orders");
    cy.get("[data-cy=orderClient]").should("have.length", 4);
  });

  it("should apply the filters", () => {
    cy.intercept("GET", "http://localhost:3333/api/orders/*", {
      fixture: "ordersClient.json",
    });

    cy.visit("http://localhost:5173/orders");
    cy.get("[data-cy=filterButton]").click();
    cy.get("[data-cy=paymentSelect]").click();
    cy.get("li").contains("Paid").click();
    cy.get("[data-cy=applyButton]").click();
    cy.get("[data-cy=orderClient]").should("have.length", 2);
  });

  it("should reset the filters", () => {
    cy.intercept("GET", "http://localhost:3333/api/orders/*", {
      fixture: "ordersClient.json",
    });

    cy.visit("http://localhost:5173/orders");
    cy.get("[data-cy=filterButton]").click();
    cy.get("[data-cy=paymentSelect]").click();
    cy.get("li").contains("Paid").click();
    cy.get("[data-cy=applyButton]").click();
    cy.get("[data-cy=filterButton]").click();
    cy.get("[data-cy=resetButton]").click();
    cy.get("[data-cy=orderClient]").should("have.length", 4);
  });

  it("should click on order and go to client order detail page", () => {
    cy.visit("http://localhost:5173/orders");
    cy.get("[data-cy=orderLink]").first().click();
    cy.get("[data-cy=orderProduct]").first().click();
    cy.url().should("include", "/products");
  });

  it("should print the invoice", () => {
    cy.intercept("GET", "http://localhost:3333/api/orders", {
      fixture: "ordersClient.json",
    });

    cy.visit("http://localhost:5173/orders");
    cy.get("[data-cy=orderLink]").first().click();
    cy.get("[data-cy=printInvoice]").click();
  });

  it("should click on payment button and go to payment page", () => {
    cy.intercept("GET", "http://localhost:3333/api/orders/*", {
      fixture: "ordersClient.json",
    });

    cy.visit("http://localhost:5173/orders");
    cy.get("[data-cy=payOrderButton]").first().click();
    cy.url().should("include", "/payment");
  });
});
