describe('login should indicate error', () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    it('should indicate email is missing', () => {
        cy.get('input#login-password').type('password')
        cy.get('form.login-form > :nth-child(4) > .cmn-btn').click()
        cy.get('.error').should('have.text', 'Email requis.')
    })

    it('should indicate wrong format for email', () => {
        cy.get('#login-email').type('test')
        cy.get('#login-password').type('password')
        cy.get('form.login-form > :nth-child(4) > .cmn-btn').click()
        cy.get('.error').should('have.text', 'Invalid email format (ex: john.dev@gmail.com)')
    })

    it('should indicate password is missing', () => {
        cy.get('#login-email').type('test@test.com')
        cy.get('form.login-form > :nth-child(4) > .cmn-btn').click()
        cy.get('.error').should('have.text', 'Mot de passe requis.')
    })

    it('should indicate login or password are invalid', () => {
        cy.intercept(
            '*users/login',
            {
                statusCode: 400,
            }
        ).as('postLogin')
        cy.get('#login-email').type('test@test.com')
        cy.get('#login-password').type('test')
        cy.get('.submit-btn').click()
        cy.get('.text-danger').should('have.text', 'Login / Mot de passe incorrect')
    })
})