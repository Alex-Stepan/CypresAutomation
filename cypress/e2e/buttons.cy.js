/// <reference types="cypress" />

describe('Context: test structure', () => {
    
    beforeEach(() => {
        cy.clearCookies();
        cy.visit('/multiple_buttons');
        //runs before each test
    });
    
    it('Check Different Button Actions', () => {
        //select a button with text
        cy.contains('Button 2').should('be.visible').click();
        cy.contains('Clicked on button two!').should('be.visible');
    });

});