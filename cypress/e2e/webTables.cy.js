/// <reference types="cypress" />

describe('Cypress WebTable Test', { baseUrl: 'https://demoqa.com' }, () => {
  /**
   * if you need to navigate to another URL, you can defined it in describe block of the test case
   */
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('/webtables'); // added here
  });

  //------------------------------------------------------------------ Start it block 1

  it('Check finding and editing a record', () => {
    /**
     * 1. get me teble body
     * 2. get me the row that contains 'Alden'
     * 3. store it info a juery element
     */
    // locate table body
    cy.get('.rt-tbody') // 1.
      .contains('.rt-tr-group', 'Alden') // 2.
      .then((row) => {
        // 3. juery element '.rt-tbody'

        // 4. click on edit button
        cy.wrap(row).find('[title="Edit"]').click();

        // 5. fill out the table with new person data
        cy.get('#firstName').clear().type('James');
        cy.get('#lastName').clear().type('Bond');
        cy.get('#age').clear().type('42');
        cy.get('#userEmail').clear().type('james.bond@gmail.com');
        cy.get('#salary').clear().type('180000');
        cy.get('#department').clear().type('Security');

        // 6. click on submit button
        cy.get('#submit').click();

        // 7. assert the result
        cy.wrap(row).find('.rt-td').eq(0).should('contain', 'James'); // eq(0) - column 1
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Bond'); // eq(1) - column 2...
      }); // end of juery element '.rt-tbody'
  });
  //--------------------------- End it block 1

  //------------------------------------------------------------------ Start it block 2

  it('Check finding and delete a record', () => {
    /**
     * 1. get me teble body
     * 2. get me the row that contains 'Alden'
     * 3. store it info a juery element
     */
    // locate table body
    cy.get('.rt-tbody') // 1.
      .contains('.rt-tr-group', 'Alden') // 2.
      .then((row) => {
        // 3. juery element

        // 4. click on delete button
        cy.wrap(row).find('[title="Delete"]').click();

        // 5. assert the result: table BODY does not contain Alden after deleting it
        cy.get('.rt-tbody').should('not.contain', 'Alden');
        cy.get('.rt-tbody').should('not.contain', 'Cantrell');

        // 6. search for Alden in the searchBox
        cy.get('#searchBox').clear().type('Alden');
        cy.get('#basic-addon2').click();

        // 7. asert that there is no record
        cy.get('.rt-tbody').should('not.contain', 'Alden');
        cy.get('.rt-tbody').should('not.contain', 'Cantrell');

        // 8. assert noData element for confirmation
        cy.get('.rt-noData').should('be.visible').should('contain', 'No rows found');
      }); // end of juery element '.rt-tbody'
  }); // end of it()

  //--------------------------- End it block 2

  //------------------------------------------------------------------ Start it block 3

  it('Check search for different age records', () => {
    // 1. define age groups
    const ageGroup = [29, 39, 45, 77]; //positive -29.39.45, negative -77

    // 2. for each age perform the same test scenario
    cy.wrap(ageGroup).each((age) => {

      // 3. type each age into searchBox
      cy.get('#searchBox').clear().type(age);

      // 4. POSITIVE / NEGATIVE Scenarios:
      if (age === 77) {
        // NEGATIVE
        cy.get('.rt-tbody') // get table body
          .find('.rt-tr-group') // find table row
          .first() // git first search result
          .should('not.contain', age); // assert does not contain age

        cy.get('.rt-noData').should('be.visible').should('contain', 'No rows found');
      } else {
        // POSITIVE
        cy.get('.rt-tbody') // get table body
          .find('.rt-tr-group') // find table row
          .first() // git first search result
          .should('contain', age); // assert contain age

        cy.get('.rt-tbody') // get table body
          .contains('.rt-tr-group', age) // assert the row to contain the age element
          .should('have.length', 1); // assert how many elements been found - results
      }

    }); // end of wrap().each()
  }); // end of it()

  //--------------------------- End it block 3


  //------------------------------------------------------------------ Start it block 4
  
  it('Check search for different age records', () => {
      
    //1. click on Add button
    cy.get('#addNewRecordButton').click();

    //2. Fill out the Registration Form with new data
    cy.get('#firstName').clear().type('Santa');
    cy.get('#lastName').clear().type('Klaus');
    cy.get('#age').clear().type('77');
    cy.get('#userEmail').clear().type('santa.klaus@gmail.com');
    cy.get('#salary').clear().type('1000000');
    cy.get('#department').clear().type('Winter');

    //3. click on Submit button
    cy.get('#submit').click();

    //4. assert using wrap()
    cy.get('.rt-tbody').contains('.rt-tr-group', 'Santa').then((row) => {

      cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Santa'); // eq(0) - column 1
      cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Klaus'); // eq(1) - column 2...
      cy.wrap(row).find('.rt-td').eq(2).should('contain', '77');
      cy.wrap(row).find('.rt-td').eq(3).should('contain', 'santa.klaus@gmail.com');
      cy.wrap(row).find('.rt-td').eq(4).should('contain', '1000000');
      cy.wrap(row).find('.rt-td').eq(5).should('contain', 'Winter');
    }); //end of wrap()
  }); // end of it()  

  //--------------------------- End it block 4
  
  //------------------------------------------------------------------ Start it block 5

  it('Check search for different age records', () => {
      
    //1. click on Add button
    cy.get('#addNewRecordButton').click();

    //2. goes to ../fixture folder and reads the users.json
    cy.fixture('users').then((users) => {
      
      //3. create objects with arrays
      const columnNames = Object.keys(users.user1); // goes to fixture folder, gets user1 object keys and store into columnNames Array
      const userData = Object.values(users.user1);  //gets the values for the object

      //4. table wrap & Each Loop
      cy.wrap(columnNames).each((columnName, index) => {
        //print out:
        //  cy.log(columnName);
        //  cy.log(userData[index]);

        //5. Fill out the Registration Form with data from fixtures/users.json using Each Loop
        cy.get(`#${columnName}`).clear().type(`${userData[index]}`);
      }); //end of table wrap()


      //6. click on Submit button
      cy.get('#submit').click();

      //7. row wrap() for Assertion
      cy.get('.rt-tbody')
        .contains('.rt-tr-group', userData[0])
        .then((row) => {

          cy.wrap(userData).each((value, index) => {
            cy.wrap(row).find('.rt-td').eq(index).should('contain', value); 
          });
          
      }); //end of row wrap()

      
    }); //end of reads the users.json
    
    

  }); // end of it()  
  
  //--------------------------- End it block 5

    
  
}); // end of describe

//run the HeadLess mode Test by runnig command in Terminal: npx cypress run --spec .\cypress\e2e\webTables.cy.js
