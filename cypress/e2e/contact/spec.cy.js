describe('contact', () => {
    beforeEach(() => {
        cy.visit('/contact')
    })

    it('should render contact form', () => {
        cy.get('form.contact-form')
        cy.get('.contact-form > h5').should('have.text', 'Laissez votre message')
        cy.get('.contact-form > div.form-group').should('have.length', 3)
        cy.get('.contact-form').find('input#contact-pseudo')
        cy.get('.contact-form').find('input#contact-email')
        cy.get('.contact-form').find('textarea#contact-text')
        cy.get('.contact-form').find('button.submit-btn')
    })

    it('should indicate more contact way', () => {
        cy.get('div.right-sidebar')
        cy.get('div.right-sidebar > h6').should('have.text', 'Plus d\'information')
        cy.get('div.right-sidebar > .single-area').eq(0).then(($el) => {
            cy.get($el).find('img').should('have.attr', 'src', 'images/email-icon.png')
            cy.get($el).find('h6').should('have.text', 'Email')
            cy.get($el).find('p.text-sm').should('have.text', 'oublie-pas-de-creer-une-adresse@gmail.com')
        })
    })

    it('should send email', () => {
        cy.get('input#contact-pseudo').type('mon super pseudo')
        cy.get('input#contact-email').type('test@test.com')
        cy.get('textarea#contact-text').type('Integer hendrerit urna dolor, quis pretium risus interdum vitae. Etiam.')
        cy.get('.contact-form').find('button.submit-btn').click()
        cy.get('.notifications > div.notification.success').should('have.length', 1)
        cy.get('.notifications > div.notification.success')
            .find('span')
            .should('have.text', 'Votre demande à bien été envoyé')
    })
})