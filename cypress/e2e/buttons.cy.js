/// <reference types="cypress" />

describe('Context: test structure', () => {
    
    beforeEach(() => {
        cy.clearCookies();
        cy.visit('/multiple_buttons');
        //runs before each test
    });
    
    it('Check Different Button Actions', () => {
        //1. select a button with text
        cy.contains('Button 2').should('be.visible').click();
        cy.contains('Clicked on button two!').should('be.visible');

        //2. find element by class attribute, create a list, select 3rd element
        //by class attribute: need a dot in front[btn btn-primary]-->[.btn.btn-primary]
        cy.get('.btn.btn-primary').then(($buttons) => {
            cy.wrap($buttons).eq(2).click();    //eq(2) - means 0,1,2...element in the list
            //  List in JS    get() 
            //assert the text
            cy.contains('Clicked on button three!').should('be.visible');
        })

        // 3. get all buttons with tagname[button], each method is creating a loop,
        cy.get('button').each((item, index, list) => {
            //assert length of the list, verify number of buttons
            expect(list).to.have.length(6);         //to have length 6
            expect(item).to.have.attr("onclick");   //to have each item attribute [onclick]
        })

        //4. get all buttons, get only the item and check for text of each item, if it will equal 4, then click on it
        cy.get('button').each((item) => {
            if(item.text() == "Button 4"){
                cy.log(item.text());    //this command write the text at the test console
                //item.click(); - this click() would not work on jQuery element
                cy.wrap(item).click();
                cy.contains('Clicked on button four!').should('be.visible');

            }
        })
            // npx sypress run --headless -b chrome
            // this is the command to run all test headlees in chrome

    });

});