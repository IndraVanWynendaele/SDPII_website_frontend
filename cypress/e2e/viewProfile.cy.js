describe('View Profile', () => {
    
    it('should show the profile of the client', () => {
        cy.login('account@client.com', 'Password');
        cy.visit('http://localhost:5173/profile');
        cy.get('[data-cy=clientProfileHeading]').should('be.visible');
        cy.get('[data-cy=clientProfileBName]').should('contain.text', 'AuroraTech');
        cy.get('[data-cy=clientProfileBVN]').should('contain.text', 'BE1234567');
        cy.get('[data-cy=clientProfileBstreet]').should('contain.text', 'Arbeidstraat 13');
        cy.get('[data-cy=clientProfileBplace]').should('contain.text', '9300 BE');
        cy.get('[data-cy=clientProfileBsector]').should('contain.text', 'IT');
        cy.get('[data-cy=clientProfileBsince]').should('contain.text', '27-3-2024');
        cy.get('[data-cy=clientProfilefn]').should('contain.text', 'Anke');
        cy.get('[data-cy=clientProfileln]').should('contain.text', 'Hazen');
        cy.get('[data-cy=clientProfileemail]').should('contain.text', 'account@client.com');
        cy.get('[data-cy=clientProfilepnumber]').should('contain.text', '0495/12.34.56');
    });

    it('should show the profile of the supplier', () => {
        cy.login('account@supplier.com', 'Password');
        cy.visit('http://localhost:5173/profile');
        cy.get('[data-cy=supplierProfileHeading]').should('be.visible');
        cy.get('[data-cy=supplierProfileBName]').should('contain.text', 'AuroraTech');
        cy.get('[data-cy=supplierProfileBVN]').should('contain.text', 'BE1234567');
        cy.get('[data-cy=supplierProfileBstreet]').should('contain.text', 'Arbeidstraat 13');
        cy.get('[data-cy=supplierProfileBplace]').should('contain.text', '9300 BE');
        cy.get('[data-cy=supplierProfileBsector]').should('contain.text', 'IT');
        cy.get('[data-cy=supplierProfilefn]').should('contain.text', 'Anke');
        cy.get('[data-cy=supplierProfileln]').should('contain.text', 'Hazen');
        cy.get('[data-cy=supplierProfileemail]').should('contain.text', 'account@supplier.com');
        cy.get('[data-cy=supplierProfilepnumber]').should('contain.text', '0495/12.34.56');
    });
});