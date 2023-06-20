describe('login', () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    it('should have good meta data', () => {
        cy.title().should('eq', 'Connexion')
    })

    it('should render correctly login form', () => {
        cy.get('.authentication-main > h4').should('have.text', 'Bienvenue')
        cy.get('form.login-form').find('input#login-email')
        cy.get('form.login-form').find('input#login-password')
        cy.get('form.login-form').find('.cmn-btn').should('have.text', 'Connexion')
        cy.get('form.login-form').find('.recover').should('have.text', 'Mot de passe oublié? Retrouvez le')
        cy.get('.account').should('have.text', 'Vous n\'avez pas de compte? Inscription ici')
    })

    it('should redirect to register page', () => {
        cy.get('.account > p > a').click()
        cy.url().should('match', /register/)
    })

    /*it('should redirect to forgot password', () => {
        cy.get('.recover > p > a').click()
        cy.url().should('match', /forgot-password/)
    })*/

    it('should redirect after user logged', () => {
        cy.intercept(
            '*users/login',
            {
                statusCode: 200,
                response: {"token":{"type":"bearer","token":"MzU.Pshzpmzclc-dtFI9wu9KrtwYt1qHoBT7FXEtNupNtCi1pFbsAYYE9wWYE4eO"},"id":1,"registered_at":"2023-02-28T13:22:48.000+00:00","last_visit":"2023-05-15T17:24:07.756+00:00","avatar":"https://imgur.com/oxJYBVT.jpg","email":"test@test.com","username":"test@test.com","password":"$argon2id$v=19$t=3,m=4096,p=1$I/B3IopX+BpBBirwKun2/g$2UFBPgOfnjvSxzk7w9/cdIELic4LmJNaleaHBJhmGeU","pseudo":"kmeleoonn","username_lower":"test@test.com","verified":1}
            }
        ).as('postLogin')

        cy.get('#login-email').type('test@test.com')
        cy.get('#login-password').type('test')
        cy.get('.submit-btn').click()

        cy.url().should('match', /profile/)
    })
})