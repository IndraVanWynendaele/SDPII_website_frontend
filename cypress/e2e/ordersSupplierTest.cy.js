describe("Orders Supplier Test", () => {
  beforeEach(() => {
    cy.login("account@supplier.com", "Password");
  });

  it("should show the orders", () => {
    cy.intercept("GET", "http://localhost:3333/api/orders/*", {
      fixture: "ordersSupplier.json",
    });

    cy.visit("http://localhost:5173/orders");
    cy.wait(1000);
    cy.get("h1").should("contain", "Orders");
    cy.get("[data-cy=orderSupplier]").should("have.length", 3);
  });

  it("should apply the filters", () => {
    cy.intercept("GET", "http://localhost:3333/api/orders/*", {
      fixture: "ordersSupplier.json",
    });

    cy.visit("http://localhost:5173/orders");
    cy.get("[data-cy=filterButton]").click();
    cy.get("[data-cy=paymentSelect]").click();
    cy.get("li").contains("Paid").click();
    cy.get("[data-cy=applyButton]").click();
    cy.get("[data-cy=orderSupplier]").should("have.length", 1);
  });

  it("should reset the filters", () => {
    cy.intercept("GET", "http://localhost:3333/api/orders/*", {
      fixture: "ordersSupplier.json",
    });

    cy.visit("http://localhost:5173/orders");
    cy.wait(1000);
    cy.get("[data-cy=filterButton]").click();
    cy.get("[data-cy=paymentSelect]").click();
    cy.get("li").contains("Paid").click();
    cy.get("[data-cy=applyButton]").click();
    cy.get("[data-cy=filterButton]").click();
    cy.get("[data-cy=resetButton]").click();
    cy.get("[data-cy=orderSupplier]").should("have.length", 3);
  });

  it("should click on order and go to supplier order detail page", () => {
    cy.intercept("GET", "http://localhost:3333/api/orders", {
      fixture: "ordersSupplier.json",
    });

    cy.visit("http://localhost:5173/orders");
    cy.get("[data-cy=orderLink]").first().click();
    cy.wait(1000);
    cy.get("[data-cy=orderProduct]").first().click();
    cy.url().should("include", "/products");
  });

  it("should click on payment button and open popover", () => {
    cy.visit("http://localhost:5173/orders");
    cy.get("[data-cy=payOrderReminder]").first().click();
    cy.get("[data-cy=reminderPopover]");
  });
});
