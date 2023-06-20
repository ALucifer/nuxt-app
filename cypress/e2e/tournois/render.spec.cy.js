describe('all render possible for tournaments page', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/tournaments/highlights', { fixture: 'four-tournament.json'})
        cy.visit('/tournois')
    })
    it('should render slideshow with 4 element', () => {
        cy.get('li.carousel__slide').should('have.length', 4)
    })
    it('should render search container', () => {
        cy.get('.search__container > div.col-lg-3').should('have.length', 3)
        cy.get('.search__container > div.col-lg-6').should('have.length', 1)
    })
    it('should render search result', () => {
        cy.get('.search__result').should('be.visible')
    })
})