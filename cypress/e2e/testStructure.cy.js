/// <reference types="cypress" />

describe('Context: test structure', () => {
  before(() => {
    // runs before all tests
  });
  beforeEach(() => {
    // runs before each test
    cy.clearCookies();
  });
  after(() => {
    // runs after test
  });
  afterEach(() => {
    // runs after each method
  });

  it('', () => {});

  it('Opening a web application', () => {
    cy.visit('/registration_form');
  });

  it('Test 2', () => {
    expect(false).to.equal(false);
  });

  it('Test 3', () => {
    expect(false).not.to.equal(true);
  });

  it('Test 4', () => {
    expect(5).to.equal(5);
  });

  it('Test 5', () => {
    expect(true).to.equal('5' == 5);
  });
});
