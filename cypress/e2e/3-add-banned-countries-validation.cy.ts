describe("validate banned countries", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("validates banned countries", () => {
    const bannedCountries = [
      { label: "Afghanistan", value: "AF" },
      { label: "Åland Islands", value: "AX" },
    ];
    sessionStorage.setItem("bannedCountries", JSON.stringify(bannedCountries));
    expect(sessionStorage.getItem("bannedCountries")).to.eq(
      JSON.stringify(bannedCountries)
    );

    cy.findByText("Banned Countries").click();

    cy.get("#country").select("Afghanistan");
    cy.findByText("Ban Country").click();
  });
});
