
describe("logout/ login", () => {
  it("should log in a client", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("[data-cy=emailInput]").type("account@client.com");
    cy.get("[data-cy=passwordInput]").type("Password");
    cy.get("[data-cy=submitBtn]").click();
    cy.get("h1").should("contain.text", "Products");
    cy.get('[data-cy=hello-user]').contains('HELLO ANKE H.');

  });
  it("should log in a supplier", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("[data-cy=emailInput]").type("account@supplier.com");
    cy.get("[data-cy=passwordInput]").type("Password");
    cy.get("[data-cy=submitBtn]").click();
    cy.get("h1").should("contain.text", "Products");
    cy.get('[data-cy=hello-user]').contains('HELLO ANKE H.');
  });
  it("should log in an admin", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("[data-cy=emailInput]").type("admin@delaware.com");
    cy.get("[data-cy=passwordInput]").type("Password");
    cy.get("[data-cy=submitBtn]").click();
    cy.get("h1").should("contain.text", "Notifications");
  });
  it("should throw an error when the wrong password is used" , () => {
    cy.visit("http://localhost:5173/login");
    cy.get("[data-cy=emailInput]").type("account@client.com");
    cy.get("[data-cy=passwordInput]").type("abc");
    cy.get("[data-cy=submitBtn]").click();
    cy.get("h1").should("contain.text", "Login");
    cy.get("[data-cy=errorMessage]").should("contain.text", "Credentials did not match!");
  });

  it("should throw an error when the wrong email is used" , () => {
    cy.visit("http://localhost:5173/login");
    cy.get("[data-cy=emailInput]").type("abc@dfg.com");
    cy.get("[data-cy=passwordInput]").type("Password");
    cy.get("[data-cy=submitBtn]").click();
    cy.get("h1").should("contain.text", "Login");
    cy.get("[data-cy=errorMessage]").should("contain.text", "Credentials did not match!");
  });

  it("should log out a client", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("[data-cy=emailInput]").type("account@client.com");
    cy.get("[data-cy=passwordInput]").type("Password");
    cy.get("[data-cy=submitBtn]").click();
    cy.get("[data-cy=nav]").click();
    cy.visit("http://localhost:5173/logout");
  });

  it("should log out a client", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("[data-cy=emailInput]").type("account@supplier.com");
    cy.get("[data-cy=passwordInput]").type("Password");
    cy.get("[data-cy=submitBtn]").click();
    cy.get("[data-cy=nav]").click();
    cy.visit("http://localhost:5173/logout");
  });
});