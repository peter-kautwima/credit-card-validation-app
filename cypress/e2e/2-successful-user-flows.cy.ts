describe("Succesful user flows", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("adds card to cards table", () => {
    const cardData = {
      name: "Test Card 1",
      cardNumber: "0000000000000000",
      expirationDateMM: "12",
      expirationDateYY: "23",
      country: "United States",
      cvv: "123",
    };

    // add card

    // check that the same card is in the table
  });
});
