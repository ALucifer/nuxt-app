describe('test all spec in search result', () => {
    it('should all tournament on scroll', () => {
        // cy
        //     .intercept('GET', 'http://localhost:3333/tournaments*', { fixture: 'tournament-page-1.json', log: true, statusCode: 404})
        //     .intercept('*/tournaments*', { log: true, statusCode: 404})
        //     .as('pagination')
        cy.intercept({ method: 'GET', url: '/tournaments*'}, []).as('pagination')

        cy.visit('/tournois')


        // cy.wait(2000)
        // cy.get('.inersection-observer').scrollIntoView({ easing: 'linear' })
        // cy.get('@pagination').should((spy) => {
        //     expect(spy).to.be.called
        // });

        // cy.wait(200)
        // cy.get('.inersection-observer').scrollIntoView({ easing: 'linear' })
        // cy.wait(200)
    })
})