Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
        firstName: 'Simone',
        lastName: 'Nascimento',
        email: 'teste@teste.com.br',
        text: 'TesteS'
    }) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()
})