it('Visitar a p´sgina de politica de privacidade', () => {
  cy.visit('./src/privacy.html')

  cy.contains('h1', 'CAC TAT - Política de Privacidade')
    .should('be.visible')
})