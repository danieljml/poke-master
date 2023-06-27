import { loadEnv } from 'vite'

process.env = { ...process.env, ...loadEnv('local', process.cwd()) };

const port = process.env.VITE_APPLICATION_PORT

describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
  })
})
