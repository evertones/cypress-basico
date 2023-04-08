beforeEach(() => {
    cy.visit('src/index.html')
})

describe('Central de Atendimento ao Cliente TAT', function () {
    it('verifica o título da aplicação', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy
            .clock()
            .get('#firstName').type('Everton')
            .get('#lastName').type('Schneider')
            .get('#email').type('contato@evertones.org')
            .get('#open-text-area').type('This is a random text...', { delay: 0 })
            .get('button.button').contains('Enviar').click()
            .get('.success').should('be.visible')
            .tick(3000)
            .get('.success').should('not.be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.clock()
        cy
            .contains('button.button', 'Enviar').click()
            .get('.error').should('be.visible')
            .tick(3000)
            .get('.error').should('not.be.visible')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy
            .clock()
            .get('#phone-checkbox').check()
            .get('#phone').should('have.value', '')
            .get('button.button').contains('Enviar').click()
            .get('.error').should('be.visible')
            .tick(3000)
            .get('.error').should('not.be.visible')
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
            .clock()
            .get('button.button').contains('Enviar').click()
            .get('.error').should('have.length.gt', 0)
            .tick(3000)
            .get('.error').should('not.be.visible')
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
            .get('#product')
            .select('Mentoria')
            .should('have.value', 'mentoria')
    })
    it("seleciona um produto (Blog) por seu índice", () => {
        cy
            .get('#product')
            .select(2)
            .should('have.value', 'cursos')
    })
    it("marca o tipo de atendimento 'Feedback'", () => {
        cy
            .get('input[name="atendimento-tat"][value="feedback"]').check().should('be.checked')
    })
    it("marca cada tipo de atendimento", () => {
        cy
            .get('input[name="atendimento-tat"]').each(($elem) => {
                cy.wrap($elem)
                .check()
                .should('be.checked')
            })
    })
    it("marca ambos checkboxes, depois desmarca o último", () => {
        cy
            .get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    it("seleciona um arquivo da pasta fixtures", () => {
        cy
            .get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it("seleciona um arquivo simulando um drag-and-drop", () => {
        cy
            .get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
        cy.fixture('example.json').as('sampleFile')
        cy
            .get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@sampleFile')

    })
    it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
        cy
            .get("#privacy a")
            .should('have.attr', 'target', '_blank')
    })
    it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
        cy
            .get("#privacy a")
            .invoke('removeAttr', 'target')
            .click()
            .get("#title")
            .contains("CAC TAT - Política de privacidade")
    })
    it("exibe e esconde as mensagens de sucesso e erro usando o .invoke()", () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })
    it("preenche a area de texto usando o comando invoke", () => {
        const longText = Cypress._.repeat('0123456789 ', 10)
        cy
            .get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })
    it("faz uma requisicao HTTP", () => {
        cy
            .request("https://cac-tat.s3.eu-central-1.amazonaws.com/index.html")
            .should((response) => {
                console.log(response)

                const {status, statusText, body } = response

                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT') 
            })
    })
    it("encontra o gato escondido", () => {
        cy
            .get('#cat')
            .invoke('show')
            .should('be.visible')
    })
})