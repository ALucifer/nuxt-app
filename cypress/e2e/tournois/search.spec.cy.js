describe('test all spec in search result', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/tournaments?page=1', { fixture: 'tournament-page-1.json'}).as('pagination')
        cy.visit('/tournois')
    })

    it('should all tournament on scroll', () => {
        cy.wait(2000)
        // cy.get('.inersection-observer').scrollIntoView({ easing: 'linear' })
        cy.get('@pagination').should((spy) => {
            expect(spy).to.be.called
        });

        // cy.wait(200)
        // cy.get('.inersection-observer').scrollIntoView({ easing: 'linear' })
        // cy.wait(200)
    })
})