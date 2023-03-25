import React from 'react'
import Home from '../../pages'

describe('<Home />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Home />)
    cy.get('[href="/animal/register"]').should('be.visible');
    cy.get('[href="/animal/list"]').should('be.visible');
  })
})