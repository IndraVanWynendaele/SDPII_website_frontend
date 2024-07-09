describe('Admin Notifications', () => {

    beforeEach(() => {
        cy.login('admin@delaware.com', 'Password')
        cy.wait(1000);
    });

    it('should show a table with the notifications for the admin', () => {
        cy.intercept(
            "GET", 
            "http://localhost:3333/api/me/notifications?page=1*", 
            { fixture: 'adminNotifs.json' },
        );
        cy.visit('http://localhost:5173/admin/notifications');

        cy.get('[data-cy=adminNotifsTable]').should('exist');
        cy.get('[data-cy=adminNotifsTableHead]').within(() => {
            cy.get('th').should('have.length', 3);
            cy.get('th').eq(0).should('contain.text', 'Description');
            cy.get('th').eq(1).should('contain.text', 'Date');
            cy.get('th').eq(2).should('contain.text', 'Status');
        });

        cy.get('[data-cy=adminNotifsRow]').should('have.length', 2);
    });

    it('should show a loading indicator when the notifications are loading', () => {
        cy.intercept(
            "GET", 
            "http://localhost:3333/api/me/notifications?page=1*", 
            { fixture: 'adminNotifs.json', delay: 1000 },
        );
        
        cy.visit('http://localhost:5173/admin/notifications');
        
        cy.get('[data-cy=adminNotifsTable]').should('not.exist');
        cy.get('[data-cy=loader]').should('exist');
    });

    it('should show the detail page of the notification when clicking on a notification', () => {
        cy.visit('http://localhost:5173/admin/notifications');
        cy.intercept(
            "GET", 
            "http://localhost:3333/api/me/notifications?page=1*", 
            { fixture: 'adminNotifs.json' },
        );

        cy.get('[data-cy=adminNotifsRowText]').eq(0).click();
        cy.get('[data-cy=adminNotifDetail]').should('exist');
    });	

    it("should apply the filters", () => {
        
        cy.login("account@supplier.com","Password");  
        cy.visit("http://localhost:5173/profile");
        cy.get("[data-cy=editProfile]").click();
        cy.url().should("include", "/edit");
        cy.get("[data-cy=registerSLastname]").type('{selectall}{backspace}testtest');
        cy.get("[data-cy=registerSFirstname]").type("{selectall}{backspace}test");
        cy.get("[data-cy=registerName]").type("{selectall}{backspace}ODNALAZ");

        cy.get("[data-cy=submitEdit]").click();
        cy.logout();

        cy.login('admin@delaware.com', 'Password')
        cy.wait(1000);
    
        cy.visit("http://localhost:5173/admin/notifications");
        cy.get("[data-cy=filterButtonAdmin").click();
        cy.get("[data-cy=seenSelectAdmin]").click();
        cy.get("li").contains("Not seen").click();
        cy.get("[data-cy=applyButton]").click();
        cy.get("[data-cy=adminNotifsRowStatus]").contains( "Unread");
        
    });
    
    it("should reset the filters", () => {
        cy.login("account@supplier.com","Password");  
        cy.visit("http://localhost:5173/profile");
        cy.get("[data-cy=editProfile]").click();
        cy.url().should("include", "/edit");
        cy.get("[data-cy=registerSLastname]").type('{selectall}{backspace}testtest');
        cy.get("[data-cy=registerSFirstname]").type("{selectall}{backspace}test");
        cy.get("[data-cy=registerName]").type("{selectall}{backspace}ODNALAZ");

        cy.get("[data-cy=submitEdit]").click();
        cy.logout();

        cy.login('admin@delaware.com', 'Password')
        cy.wait(1000);
    
        cy.visit("http://localhost:5173/admin/notifications");
        cy.get("[data-cy=filterButtonAdmin").click();
        cy.get("[data-cy=seenSelectAdmin]").click();
        cy.get("li").contains("Not seen").click();
        cy.get("[data-cy=applyButton]").click();
        cy.url().should("include", "?seen=0");
        cy.get("[data-cy=filterButtonAdmin").click();
        cy.get("[data-cy=resetButton]").click();
        cy.url().should("not.include", "?seen=0");
    });

    it("opens and closes filter drawer", () => {
        
        cy.login("account@supplier.com","Password");  
        cy.visit("http://localhost:5173/profile");
        cy.get("[data-cy=editProfile]").click();
        cy.url().should("include", "/edit");
        cy.get("[data-cy=registerSLastname]").type('{selectall}{backspace}testtest');
        cy.get("[data-cy=registerSFirstname]").type("{selectall}{backspace}test");
        cy.get("[data-cy=registerName]").type("{selectall}{backspace}ODNALAZ");

        cy.get("[data-cy=submitEdit]").click();
        cy.logout();

        cy.login('admin@delaware.com', 'Password')
        cy.wait(1000);

        cy.get(".filterknop").contains("filters").click();
        cy.get(".MuiDrawer-root").should("be.visible");
        cy.get(".MuiDrawer-root").contains("Apply").click();
        cy.get(".MuiDrawer-root").should("not.be.visible");
    });
});