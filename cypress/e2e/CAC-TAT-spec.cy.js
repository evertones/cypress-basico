beforeEach(() => {
    cy.visit('src/index.html')
})

describe('Central de Atendimento ao Cliente TAT', function () {
    it('verifica o título da aplicação', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy
            .get('#firstName').type('Everton')
            .get('#lastName').type('Schneider')
            .get('#email').type('contato@evertones.org')
            .get('#open-text-area').type('This is a random text...', { delay: 0 })
            .get('button.button').contains('Enviar').click()
            .get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy
            .contains('button.button', 'Enviar').click()
            .get('.error').should('be.visible')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy
            .get('#phone-checkbox').click()
            .get('#phone').should('have.value', '')
            .get('button.button').contains('Enviar').click()
            .get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy
            .get('#firstName').type('Everton').should('have.value', 'Everton')
            .get('#firstName').clear().should('have.value', '')
            .get('#lastName').type('Schneider').should('have.value', 'Schneider')
            .get('#lastName').clear().should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy
            .get('button.button').contains('Enviar').click()
            .get('.error').should('have.length.gt', 0)
    })
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
    })
    it("seleciona um produto (YouTube) por seu texto", () => {
        cy
            .get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it("seleciona um produto (Mentoria) por seu valor (value)", () => {
        cy
            .get('#product').select('Mentoria').should('have.value', 'mentoria')
    })
    it("seleciona um produto (Blog) por seu índice", () => {
        cy
            .get('#product').select(2).should('have.value', 'cursos')
    })
})