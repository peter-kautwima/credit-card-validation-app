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

    sessionStorage.setItem("newCard", JSON.stringify(cardData));
    expect(sessionStorage.getItem("newCard")).to.eq(JSON.stringify(cardData));

    cy.findByText("Add New Card").click();
    cy.get("#name").type(cardData.name);
    cy.get("#cardNumber").type(cardData.cardNumber);
    cy.get("#expirationDateMM").type(cardData.expirationDateMM);
    cy.get("#expirationDateYY").type(cardData.expirationDateYY);
    cy.get("#country").select(cardData.country);
    cy.get("#cvv").type(cardData.cvv);
    cy.findByText("Save Card").click();

    // if text "save card" exists, click (for insert credit card details pop up)
    cy.findByText("Save Card").then(($el) => {
      if ($el.text() === "Save Card") {
        cy.findByText("Save Card").click();
      }
    });

    cy.findByText("Test Card 1").should("exist");
  });

  // validation error when trying to add the same card
  it("validation error when trying to add the same card", () => {
    const cardData = {
      name: "Test Card 1",
      cardNumber: "0000000000000000",
    };
    cy.findByText("Add New Card").click();

    cy.get("#name").type(cardData.name);
    cy.get("#cardNumber").type(cardData.cardNumber);
    cy.findByText("Card already added").click();
  });
});
