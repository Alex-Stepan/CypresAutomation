/// <reference types="cypress" />

const { check } = require('prettier');

describe('Inpunt Form Tset', () => {
  beforeEach('Navigate to registration page', () => {
    cy.clearCookies();
    cy.visit('/registration_form');
  });

  it('Check different input box fields and verify', () => {
    // 1. firstName
    cy.get("input[name='firstname']").type('Mike');

    // 2. lastName
    cy.get("input[name='lastname']").type('Brown');

    // 3. username
    cy.get("input[name='username']").type('CrazyMan');

    // 4.email
    const email = `memoo${Math.floor(100000 + Math.random() * 900000)}@cydeo.com`;
    // Math.random(): creates a random number between 0 to 1 ~ 0.005678
    // Math.floor: makes it a whole number
    cy.get("input[name='email']").type(email);

    // 5. password
    const password = `test${Math.floor(1000000 + Math.random() * 900000)}`;
    cy.get("input[name='password']").type(password);

    // 6. phone
    const phoneNumber = `555-000-${Math.floor(1000 + Math.random() * 9000)}`;
    cy.get("input[name='phone']").type(phoneNumber);

    // 8. birthday
    cy.get("input[name='birthday']").type('01/01/1980');

    // 9. department
    cy.get("input[name='username']").type('CrazyMan');
  });

  it('Check different Radio Buttons actions', () => {
    cy.get('.radio')
      .find('[type=radio]')
      .then((radio) => {
        // 1. GET all radio buttons, then select FIRST and verify if it checked
        // needed wrap to convert jQuery HTML into HTML
        cy.wrap(radio).first().check().should('be.checked');
        /*
        cypress works in a chainable function structure
        radio: is jQuery element, cy.wrap: turns it into cypress object so we can use cypress functions to it
        check(): check it out
        chould(): verification based on parameters
        */

        // 2. GET all radio buttons, then select SECOND and verify if confirmtion checkmark is visible
        cy.wrap(radio).eq(1).check().should('be.checked');
        cy.get('[data-bv-icon-for="gender"]').should('be.visible'); // common function used in test

        // Check to have THIRD radio button to nu Unchecked
        cy.wrap(radio).eq(2).should('not.be.checked');
      });
  });

  it('Check different CheckBox actions', () => {
    // get all checkboxes, then select JAVA, then verify if JAVA selected
    cy.get('[type="checkbox"]').then((checkbox) => {
      cy.wrap(checkbox).eq(1).check().should('be.checked');

      // uncheck JAVA
      cy.wrap(checkbox).eq(1).uncheck().should('not.be.checked');

      // verify third checkbox to have a value "JavaScript", then check it and verify
      cy.wrap(checkbox).eq(2).should('have.value', 'javascript').check().should('be.checked');
    });
  });

  it('Check selection of a single choice from dropdown', () => {
    // select one element "Developer" from dropdown "Job title"
    cy.get('select[name="job_title"]').select('Developer'); // select by value

    // assert that dropdown has selected the correct text after selecting
    cy.get('select[name="job_title"]').contains('Developer');
  });

  it('Check selection of all choices from dropdown', () => {
    //we will provide our test data through [/fixtures folder and as departments.json object], then use that data to verify select values
    cy.fixture('departments').then((departments) => {

      //get all options in the menu, iterate through options one by one
      cy.get('select[name="department"] > option').each((option, index) =>{
      
        //get each option text
        const optionText = option.text(); //to get text from each option and print it out

        //to print each data:
        //cy.log(optionText + ' from option Text');
        //cy.log(index);
        //cy.log(departments[index] + ' from index option value');


        cy.get('select[name="department"] > option')    //locate total menu
        .select(optionText)                             //select each
        .should('have.value',option.val)                //check if it have a option value
        .contains(departments[index]);                  //check if it contains the value from ../fixtures/departments.json

      });

    });
  });
});
