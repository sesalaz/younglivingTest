// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ()=> {
    
    cy.visit('https://www.youngliving.com/us/en')
    cy.get('[data-testid=qa-myaccount]').click()
    cy.get('[id=loginUsername]').type('norochj@gmail.com')
    cy.get('[id=continue-btn]').click()
    cy.get('[id=loginPassword]').type('Norochj1234')
    cy.get('[id=login-btn]').click()
    cy.wait(2000)

    //Asserts tnat user is logged in 
    cy.get('[data-testid=qa-myaccount]').should("contain", "my Account")
});

Cypress.Commands.add('compareTwoElements' , (element1, element2) => {

    let elementText1, elementText2 ;
    cy.get(element1) 
    .invoke('text')
    .then((text1) =>{
        elementText1 = text1;
    });
    cy.get(element2)
    .invoke('text')
    .then((text2) => {
        expect(elementText1).to.contain(elementText2);
    });
}); 