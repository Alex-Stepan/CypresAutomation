
/// <reference types="cypress" />

describe('Cypress WebTable Test',{baseUrl: 'https://demoqa.com'}, () => {

    /**
     * if you need to navigate to another URL, you can defined it in describe block of the test case
     */
    beforeEach(() => {
      cy.clearCookies();
      cy.visit('');     //added here
    });
  
    it('Check finding and editing a record', () => {});
  
  });
  