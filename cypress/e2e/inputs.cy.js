/// <reference types="cypress" />

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

  })



});
