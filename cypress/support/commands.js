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

Cypress.Commands.add('login', (username, password) => {
    cy.intercept(
        '*users/login',
        {
            statusCode: 200,
            response: {"token":{"type":"bearer","token":"MzU.Pshzpmzclc-dtFI9wu9KrtwYt1qHoBT7FXEtNupNtCi1pFbsAYYE9wWYE4eO"},"id":1,"registered_at":"2023-02-28T13:22:48.000+00:00","last_visit":"2023-05-15T17:24:07.756+00:00","avatar":"https://imgur.com/oxJYBVT.jpg","email":"test@test.com","username":"test@test.com","password":"$argon2id$v=19$t=3,m=4096,p=1$I/B3IopX+BpBBirwKun2/g$2UFBPgOfnjvSxzk7w9/cdIELic4LmJNaleaHBJhmGeU","pseudo":"kmeleoonn","username_lower":"test@test.com","verified":1}
        }
    ).as('postLogin')

    cy.visit('/login')
    cy.get('input[name=email]').type(username)
    cy.get('input[name=password]').type(password)
    cy.get('.submit-btn').click()
})