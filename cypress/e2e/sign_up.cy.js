
describe("register", () => {

  it("should display a register form", () => {
    cy.visit("http://localhost:5173/register");
    cy.get("h1").should("contain", "Request your customer and supplier accounts here:");
  });

  it("should be able to register + admin should have notification", () => {
    cy.visit("http://localhost:5173/register");

    cy.get("[data-cy=registerName]").type("Zalando");
    cy.get("[data-cy=registerSector]").type("Clothing");
    cy.get("[data-cy=registerStreet]").type("Arbeidstraat");
    cy.get("[data-cy=registerStreetNr]").type("11");
    cy.get("[data-cy=registerCity]").type("Aalst");
    cy.get("[data-cy=registerZipcode]").type("9300");
    cy.get("[data-cy=registerCountry]").type("Belgium");
    cy.get("[data-cy=registerImageUrl]").type("https://www.example.com/image.png");
    cy.get("[data-cy=registerVatNumber]").type("BE123456789");

    cy.get("[data-cy=registerCFirstname]").type("Han");
    cy.get("[data-cy=registerCLastname]").type("Hanssens");
    cy.get("[data-cy=registerCEmail]").type("blabla@test.com");
    cy.get("[data-cy=registerCPhone]").type("1234/12.12.12");
    cy.get("[data-cy=registerCPassword]").type("blabla23232323");

    cy.get("[data-cy=registerSLastname").type("Janssens");
    cy.get("[data-cy=registerSFirstname").type("Jan");
    cy.get("[data-cy=registerSEmail").type("blabla2@test.com");
    cy.get("[data-cy=registerSPhone").type("1234/12.12.13");
    cy.get("[data-cy=registerSPassword").type("blabla21121221");

    cy.get("[data-cy=submitRegister]").click();
    cy.url().should("include", "/thanks");

    cy.visit("http://localhost:5173/logout");
    cy.login("admin@delaware.com","Password");
    cy.get("[data-cy=adminNotifsRowText]").eq(0).should("contain.text", "Zalando wishes to sign up!");

  });


it("should not be able to register with wrong email", () => {
    cy.visit("http://localhost:5173/register");

    cy.get("[data-cy=registerName]").type("Zalando");
    cy.get("[data-cy=registerSector]").type("Clothing");
    cy.get("[data-cy=registerStreet]").type("Arbeidstraat");
    cy.get("[data-cy=registerStreetNr]").type("11");
    cy.get("[data-cy=registerCity]").type("Aalst");
    cy.get("[data-cy=registerZipcode]").type("9300");
    cy.get("[data-cy=registerCountry]").type("Belgium");
    cy.get("[data-cy=registerImageUrl]").type("https://www.example.com/image.png");
    cy.get("[data-cy=registerVatNumber]").type("BE123456789");

    cy.get("[data-cy=registerCFirstname]").type("Han");
    cy.get("[data-cy=registerCLastname]").type("Hanssens");
    cy.get("[data-cy=registerCEmail]").type("foutfout@");
    cy.get("[data-cy=registerCPhone]").type("1234/12.12.12");
    cy.get("[data-cy=registerCPassword]").type("blabla23232323");

    cy.get("[data-cy=registerSLastname").type("Janssens");
    cy.get("[data-cy=registerSFirstname").type("Jan");
    cy.get("[data-cy=registerSEmail").type("blabla2@test.com");
    cy.get("[data-cy=registerSPhone").type("1234/12.12.13");
    cy.get("[data-cy=registerSPassword").type("blabla21121221");

    cy.get("[data-cy=submitRegister]").click();
    cy.url().should("include", "/register");

  });


});