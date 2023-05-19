/// <reference types="cypress" />

describe('Cypress File Upload Test', () => {

    /**
     * Step 1.
     * In order for Uploading Files in Cypress, plugin installation is needed
     * run folowing command:
     * npm install -dev cypress-file-upload
     * 
     * Step 2.
     * need to import necessary command to the project
     * file ../support/commands.js is a good place to have utility methods
     * add a folowing line to ../support/commands.js:
     * import 'cypress-file-upload';
     * 
     * Step 3.
     * The file that you want to upload should be in your ../fixture folder
     */
    
    beforeEach('Navigate to upload page', () => {
      cy.clearCookies();
      cy.visit('/upload');  //added page
    });
    
    it('Check Upload Action', () => {
        //locator for choose file button
        cy.get('input#file-upload').attachFile('pic.png');

        //click on upload button
        cy.get('input#file-submit').click();

        //assert that path message is displayed
        cy.get('div#uploaded-files').then(() => {
            cy.contains('pic.png').should('be.visible');
        })
    });
  
  });
  