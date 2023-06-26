
describe('home', () => {
    beforeEach(() => {
        cy.visit('')
    })
    it('should response in 200', () => {
    })
    it('should show principal presentation and redirect to register', () => {
        cy.get('.banner-content__top-area > div > a.cmn-btn').click()
        cy.url().should('match', /register/)
    })
    it('should render how it works', () => {
        cy.get('section#how-works-section')
        cy.get('div.single-item').should('have.length', 3)
        cy.get('section#how-works-section').find('a.cmn-btn').click()
        cy.url().should('match', /register/)
    })
})