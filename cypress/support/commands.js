Cypress.Commands.add('setAlias', (selector, alias) => {
    cy.get(selector).as(alias);
});