describe('menu', () => {
    it('should contain all containers', () => {
        cy.visit('/')
        cy.get('.nav-menu')
        cy.get('.nav-menu').children(':visible').should('have.length', 3)
        cy.get('.nav-menu > .nav-menu__logo')
        cy.get('.nav-menu > .nav-menu__navigation')
        cy.get('.nav-menu > .nav-menu__actions')
    })
    it('should render menu items', () => {
        cy.visit('/')
        cy.get('.main-menu').children().should('have.length', 3)
        cy.get('.main-menu').children().each((item) => {
            expect(['Home', 'Tournois', 'Contact']).include(item.text())
        })
    })
    it('should render login and register when user is not logged', () => {
        cy.visit('/')
        cy.get('.nav-menu__actions').children().should('have.length', 2)
        cy.get('.nav-menu__actions > .login-btn').should('have.text', 'Login')
        cy.get('.nav-menu__actions > .cmn-btn').should('have.text', 'Inscription')
    })
    it('should render user information when user is logged', () => {
        cy.login('test@test.com', 'test')
        cy.visit('/')
        cy.get('.nav-menu__actions > .search-icon')
        cy.get('.user-link__heading > span').should('have.text', 'kmeleoonn')
        cy.get('.user-link__heading > img.user-link__picture')
    })
})