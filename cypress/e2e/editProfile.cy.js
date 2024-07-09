describe("edit account", () => {
    it("should edit a client account + admin should have notification" , () => {
        cy.login("account@client.com","Password");  
        cy.visit("http://localhost:5173/profile");
        cy.get("[data-cy=editProfile]").click();
        cy.url().should("include", "/edit");
        cy.get("[data-cy=registerCLastname]").type('{selectall}{backspace}testtest');
        cy.get("[data-cy=registerCFirstname]").type("{selectall}{backspace}test");
        cy.get("[data-cy=registerName]").type("{selectall}{backspace}ODNALAZ");

        cy.get("[data-cy=submitEdit]").click();
        cy.url().should("include", "/confirmation");

        cy.visit("http://localhost:5173/profile");
        cy.login("admin@delaware.com","Password");
        cy.get("[data-cy=adminNotifsRowText]").eq(0).should("contain.text", "Account edit requested");

    });
      
    it("should edit a supplier account + admin should have notification" , () => {
        cy.login("account@supplier.com","Password");  
        cy.visit("http://localhost:5173/profile");
        cy.get("[data-cy=editProfile]").click();
        cy.url().should("include", "/edit");
        cy.get("[data-cy=registerSLastname]").type('{selectall}{backspace}testtest');
        cy.get("[data-cy=registerSFirstname]").type("{selectall}{backspace}test");
        cy.get("[data-cy=registerName]").type("{selectall}{backspace}ODNALAZ");

        cy.get("[data-cy=submitEdit]").click();
        cy.url().should("include", "/confirmation");

        cy.visit("http://localhost:5173/profile");
        cy.login("admin@delaware.com","Password");
        cy.get("[data-cy=adminNotifsRowText]").eq(0).should("contain.text", "Account edit requested");

    });

    
});