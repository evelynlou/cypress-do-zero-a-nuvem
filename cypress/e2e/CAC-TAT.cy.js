describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verificar o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preencher os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Testando', 10) 

    cy.get('#firstName').type('Evelyn')
    cy.get('#lastName').type('Louise')
    cy.get('#email').type('teste@santos.com.br')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de error ao submeter o formulário com um email com formatação inválida', () => {
    const longText = Cypress._.repeat('Testando', 10) 

    cy.get('#firstName').type('Evelyn')
    cy.get('#lastName').type('Louise')
    cy.get('#email').type('testesantos.com.br')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Campo de telefone inválido', () => {
    cy.get('#phone')
     .type('abc&')
    cy.get('#phone')
     .should('have.value', '')
  })

  it('Exibe mensagem de erro quando o telefone se torna campo obrigatorio, mas não é preenchido', () => {
    cy.get('#firstName').type('Evelyn')
    cy.get('#lastName').type('Louise')
    cy.get('#email').type('teste@santos.com.br')
    cy.get('#open-text-area').type('Teste')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Preenche e limpa o campo nome', () => {
   cy.get('#firstName')
    .type('Evelyn')
   cy.get('#firstName')
    .should('have.value', 'Evelyn')
    .clear()
    .should('have.value', '')
  })
 
  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigátorios' , () => {
   cy.get('button[type="submit"]').click()

   cy.get('.error').should('be.visible')
  })

  it('Envia o formulário com sucesso, usando um comando customizado', () => {
    const data = {
      firstName: 'Evelyn',
      lastName: 'Louise',
      email: 'teste@santos.com.br',
      text: 'Teste'
    }

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('Seleciona um produto (YouTube) por seu texto', () => {
   cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
  })

  it('Seleciona um produto (Mentoria) por seu valor', () => {
   cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  })

  it('Seleciona um produto (Blog) por seu indice', () => {
   cy.get('#product')
    .select([1])
    .should('have.value', 'blog')
  })

  it('Marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeofservice => {
       cy.wrap(typeofservice)
        .check()
        .should('be.checked')
      })
  })

  it('Marca ambos checkboxes e depois desmarca o ultimo', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Selecionar um arquivo da pasta fixture', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Selecionar um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

    it('Selecionar um arquivo do tipo fixture e passar um alias', () => {
    cy.fixture('example.json').as('file')
    cy.get('#file-upload')
      .selectFile('@file', {action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Verifica se a politica de privacidade abre em outra página sem precisar clicar', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessar a pagina de politica de porivacidade removendo o target', () => {
    cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()
    
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })
})