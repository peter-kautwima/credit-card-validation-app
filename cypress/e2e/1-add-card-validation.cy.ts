const savedCards = [
  {
    name: 'Test Card 1',
    cardNumber: '0000000000000000',
    expirationDateMM: '12',
    expirationDateYY: '23',
    country: 'United States',
    cvv: '123',
  },
];

describe('validates new card inputs', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('validates all required fields', () => {
    cy.findByText('Add New Card').click();
    cy.findByText('Save Card').click();
    cy.findByText('Name is required').should('exist');
    cy.findByText('Must be 16 characters').should('exist');
    cy.findByText('Must be a number between 1 and 12').should('exist');
    cy.findByText('Must be a number between 23 and 99').should('exist');
    cy.findByText('Must be 3 characters').should('exist');
    cy.findByText('Country is required').should('exist');
  });

  it('validates banned countries', () => {
    const bannedCountries = [
      { label: 'Afghanistan', value: 'AF' },
      { label: 'Åland Islands', value: 'AX' },
    ];
    sessionStorage.setItem('bannedCountries', JSON.stringify(bannedCountries));
    expect(sessionStorage.getItem('bannedCountries')).to.eq(
      JSON.stringify(bannedCountries),
    );

    cy.findByText('Add New Card').click();
    cy.get('#country').select('Afghanistan');
    cy.findByText('Country is banned').should('exist');
  });

  it('validates error when trying to add the same card', () => {
    sessionStorage.setItem('newCard', JSON.stringify(savedCards));
    expect(sessionStorage.getItem('newCard')).to.eq(JSON.stringify(savedCards));

    const cardData = {
      name: 'Test Card 1',
      cardNumber: '0000000000000000',
    };
    cy.findByText('Add New Card').click();

    cy.get('#name').type(cardData.name);
    cy.get('#cardNumber').type(cardData.cardNumber);
    cy.findByText('Card already added').click();
  });

  it('validates banned countries', () => {
    const bannedCountries = [
      { label: 'Afghanistan', value: 'AF' },
      { label: 'Åland Islands', value: 'AX' },
    ];
    sessionStorage.setItem('bannedCountries', JSON.stringify(bannedCountries));
    expect(sessionStorage.getItem('bannedCountries')).to.eq(
      JSON.stringify(bannedCountries),
    );

    cy.findByText('Banned Countries').click();

    cy.get('ul').findByText('Afghanistan').should('exist');

    cy.get('#country').select('Afghanistan');
    cy.findByText('Ban Country').click();
    cy.get('ul').findAllByText('Afghanistan').should('have.length', 1);
  });
});
