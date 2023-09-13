beforeEach(() => {
  // run these tests as if in a desktop
  // browser with a 720p monitor
  cy.viewport(1280, 720)
})

describe('Young Living checkout validation scenario ', () => {
  it('add product to cart and proceeds with checkout workflow', () => {
 
  // Logs in to the application 
    cy.login()
  //Adds item to the shopping cart 

    cy.get('[data-testid=qa-search-input]').type('Basil Essential Oil')
    cy.get('[data-testid=qa-search-input]').type('{enter}')
    cy.get('[data-testid=qa-product-name]').should('contain', 'Basil Essential Oil').first().click({force: true})
    cy.get('[data-testid=qa-addcart]').click()
    cy.get('[data-testid=qa-cartcheckout]').click()
    cy.wait(2000) 

    //close shipping modal - NOTE: Cypress reporting possible cross origin error on application code, test is flaky because it cannot always avoid this 
    cy.get('#gtm__modal-close').click({force: true})
    cy.wait(3000)
    // Assets the product was added to the shopping cart
    cy.get('[data-testid=qa-product-name]').should("contain", 'Basil Essential Oil')

    // Compare prices between the cart and the total using cypress command

    var element1 = cy.get('[data-testid=qa-product-sale-price]')
    var element2 = cy.get('[data-testid=qa-estimated-total-value]')

    cy.compareTwoElements(element1, element2)
    // Click on continue without referral button to continue checkout process 
    cy.contains('CONTINUE WITHOUT REFERRAL').click()

    //Adds address information 

    cy.get('[data-testid=qa-first-name]').type('Sebastian')
    cy.get('[data-testid=qa-last-name]').type('Salazar')
    cy.get('[data-testid=qa-address1]').type('1 Aeropost Way')
    cy.get('[data-testid=qa-city]').type('Miami')
    cy.get('[data-testid=qa-state]').select('Florida')
    cy.get('[data-testid=qa-code]').type('33206-0001')

    cy.get('[data-testid=qa-ship-continue]').click()

    // Verify that Address was added 
    cy.get('[data-testid=qa-ship-title]').should('be.visible').and().should('contain', '1 Aeropost Way')

    //Select second shipping method 

    cy.get('[data-testid=qa-user-sub-shipping-method-option]').first().next().click()
    cy.get('[data-testid=qa-ship-methods-continue]').click()

    // Enter payment method information 

    cy.get('[data-testid=qa-card-first-name]').type('Test First')
    cy.get('[data-testid=qa-card-last-name]').type('Test Last Name') 
    cy.get('[data-testid=qa-pay-card]').type('4444444444444444')
    cy.get('[data-testid=qa-pay-month]').type('02')
    cy.get('[data-testid=qa-pay-year]').type('2024')
    cy.get('[data-testid=qa-pay-code]').type('123')

    cy.get('[data-testid=qa-pay-continue]').click()

    // cannot continue past this point since the system is not accepting the test credit card as a valid one 

  })
})