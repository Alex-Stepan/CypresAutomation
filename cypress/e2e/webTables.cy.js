/// <reference types="cypress" />

describe('Cypress WebTable Test', { baseUrl: 'https://demoqa.com' }, () => {
  /**
   * if you need to navigate to another URL, you can defined it in describe block of the test case
   */
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('/webtables'); // added here
  });

  it('Check finding and editing a record', () => {
    /**
     * 1. get me teble body
     * 2. get me the row that contains 'Alden'
     * 3. store it info a juery element
     */
    // locate table body
    cy.get('.rt-tbody') // 1.
      .contains('.rt-tr-group', 'Alden') // 2.
      .then((row) => {  // 3. juery element '.rt-tbody'

        // 4. click on edit button
        cy.wrap(row).find('[title="Edit"]').click();

        // 5. fill out the table with new person data
        cy.get('#firstName').clear().type('James');
        cy.get('#lastName').clear().type('Bond');
        cy.get('#userEmail').clear().type('james.bond@gmail.com');
        cy.get('#age').clear().type('42');
        cy.get('#salary').clear().type('180000');
        cy.get('#department').clear().type('Security');

        // 6. click on submit button
        cy.get('#submit').click();

        // 7. assert the result
        cy.wrap(row).find('.rt-td').eq(0).should('contain', 'James'); // eq(0) - column 1
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Bond'); // eq(1) - column 2...
      }); //end of juery element '.rt-tbody'
  });

  it('Check finding and delete a record', () => {
    /**
     * 1. get me teble body
     * 2. get me the row that contains 'Alden'
     * 3. store it info a juery element
     */
    // locate table body
    cy.get('.rt-tbody') // 1.
      .contains('.rt-tr-group', 'Alden') // 2.
      .then((row) => {  // 3. juery element

        // 4. click on delete button
        cy.wrap(row).find('[title="Delete"]').click();

        // 5. assert the result: table BODY does not contain Alden after deleting it
        cy.get('.rt-tbody').should('not.contain', 'Alden');
        cy.get('.rt-tbody').should('not.contain', 'Cantrell');

        // 6. search for Alden in the searchBox
        cy.get('#searchBox').type('Alden');
        cy.get('#basic-addon2').click();

        // 7. asert that there is no record
        cy.get('.rt-tbody').should('not.contain', 'Alden');
        cy.get('.rt-tbody').should('not.contain', 'Cantrell');

        // 8. assert noData element for confirmation
        cy.get('.rt-noData').should('be.visible').should('contain', 'No rows found');
      }); // end of juery element '.rt-tbody'
  }); // end of it()
});  //end of describe
