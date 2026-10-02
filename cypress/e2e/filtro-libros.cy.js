describe('Filtro de libros', () => {
  it('permite al usuario iniciar sesión, filtrar libros y ver el resultado', () => {

    cy.visit('http://localhost:8080')

    // Iniciar sesión
    cy.get('#usuario').type('admin')
    cy.get('#password').type('123456')
    cy.contains('button', 'Entrar al sistema').click()

    // Acceder al catálogo de libros
    cy.contains('a', 'Libros').click()

    // Esperar que los libros sean cargados desde la API
    cy.contains('Fundación').should('be.visible')

    // Filtrar por autor
    cy.get('input[placeholder="Buscar por autor..."]')
      .should('be.visible')
      .type('Asimov')

    // Verificar el libro filtrado
    cy.contains('Fundación').should('be.visible')
    cy.contains('Isaac Asimov').should('be.visible')

    // Verificar que un libro de otro autor ya no aparezca
    cy.contains('Dom Casmurro').should('not.exist')

  })
})