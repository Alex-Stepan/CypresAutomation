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

        //find element by class attribute, create a list, select 3rd element
        //by class attribute: need a dot in front[btn btn-primary]-->[.btn.btn-primary]
        cy.get('.btn.btn-primary').then(($buttons) => {
            cy.wrap($buttons).eq(2).click();    //eq(2) - means 0,1,2...element in the list
            //  List in JS    get() 
            //assert the text
            cy.contains('Clicked on button three!').should('be.visible');
        })

    });

});