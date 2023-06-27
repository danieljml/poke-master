describe('Application test', () => {
  it('Should login successfully', () => {
    cy.visit('/')
		cy.get('input[name="email"]').type('tbollam0@samsung.com');
    cy.get('input[name="password"]').type('yH8@wIb+F<_');
    cy.get('button[type="submit"]').click();
		cy.get('p[data-testid="header-title"]').should('contain.text', 'DASHBOARD');
  })

  it('Select Bulbasaur and get to the details', () => {
    cy.visit('/')
		cy.get('input[name="email"]').type('tbollam0@samsung.com');
    cy.get('input[name="password"]').type('yH8@wIb+F<_');
    cy.get('button[type="submit"]').click();
		cy.wait(5000);
		cy.get('[data-testid="pokemon-card-bulbasaur"]').click();
    cy.url().should('include', '/details/bulbasaur');
  })

  it('Shows user details', () => {
    cy.visit('/')
		cy.get('input[name="email"]').type('tbollam0@samsung.com');
    cy.get('input[name="password"]').type('yH8@wIb+F<_');
    cy.get('button[type="submit"]').click();
		cy.get('img[data-testid="avatar-button"]').click();
		cy.get('[data-testid="view-profile-text"]').click();
    cy.url().should('include', '/profile');
		cy.get('[data-testid="profile-title"]').should('contain.text', 'Profile Page');
		cy.get('[data-testid="user-email"]').should('contain.text', 'tbollam0@samsung.com');
		cy.get('[data-testid="user-password"]').should('contain.text', 'yH8@wIb+F<_');
  })

  it('Log out', () => {
    cy.visit('/')
		cy.get('input[name="email"]').type('tbollam0@samsung.com');
    cy.get('input[name="password"]').type('yH8@wIb+F<_');
    cy.get('button[type="submit"]').click();
		cy.get('img[data-testid="avatar-button"]').click();
		cy.get('[data-testid="logout-button"]').click();
    cy.url().should('include', '/login');
  })
})
