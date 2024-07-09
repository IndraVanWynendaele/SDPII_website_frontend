describe('Admin Businesses', () => {
    
        beforeEach(() => {
            cy.login('admin@delaware.com', 'Password')
        });

        it('should show a table with the businesses on the platform', () => {
            cy.visit('http://localhost:5173/admin/accounts');
            cy.intercept(
                "GET", 
                "http://localhost:3333/api/admin/accounts?page=1", 
                { fixture: 'adminBusinesses.json' },
            );

            cy.get('[data-cy=adminBusinessesTable]').should('exist');
            cy.get('[data-cy=adminBusinessesTableHead]').within(() => {
                cy.get('th').should('have.length', 3);
                cy.get('th').eq(0).should('contain.text', 'Business');
                cy.get('th').eq(1).should('contain.text', 'Sector');
                cy.get('th').eq(2).should('contain.text', 'Country');
            });

            cy.get('[data-cy=adminBusinessesRow]').should('have.length', 5);
        });

        it('should show a loading indicator when the businesses are loading', () => {
            cy.visit('http://localhost:5173/admin/accounts');
            cy.intercept(
                "GET", 
                "http://localhost:3333/api/admin/accounts", 
                { fixture: 'adminBusinesses.json', delay: 1000 },
            );
            cy.get('[data-cy=adminBusinessesTable]').should('not.exist');
            cy.get('[data-cy=loader]').should('exist');
        });

        it('should show the detail page of the business when clicking on a business', () => {
            cy.visit('http://localhost:5173/admin/accounts');
            cy.intercept(
                "GET", 
                "http://localhost:3333/api/admin/accounts", 
                { fixture: 'adminBusinesses.json' },
            );

            cy.get('[data-cy=adminBusinessesRow]').eq(0).click();
            cy.get('[data-cy=adminBusinessDetail]').should('exist');
        });

        it('should go back to all businesses when clicking on the back button', () => {
            cy.visit('http://localhost:5173/admin/accounts');
            cy.intercept(
                "GET", 
                "http://localhost:3333/api/admin/accounts", 
                { fixture: 'adminBusinesses.json' },
            );

            cy.get('[data-cy=adminBusinessesRow]').eq(0).click();
            cy.get('[data-cy=adminBusinessDetail]').should('exist');
            cy.get('[data-cy=backButton]').click();
            cy.get('[data-cy=adminBusinessesTable]').should('exist');
        });
});