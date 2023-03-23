// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy
    .get('#firstName').type('Everton')
    .get('#lastName').type('Schneider')
    .get('#email').type('contato@evertones.org')
    .get('#open-text-area').type('This is a random text...', {delay: 0})
    .get('button.button').contains('Enviar').click()
    .get('.success').should('be.visible')
    .contains('Mensagem enviada com sucesso')
})