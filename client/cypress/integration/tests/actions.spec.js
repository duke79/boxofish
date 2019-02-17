/* eslint-disable no-undef */
describe("My first test", function () {
    it("Find an element", function () {
        cy.visit("https://vilokanlabs-e8847.firebaseapp.com");

        cy.contains("Issues").click();
        cy.contains("List").click();

        cy.url().should("include", "/issues");
        cy.get("input")
            .type("my issue")
            .should("have.value", "my issue");

        cy.contains("New Issue").click();
        cy.url().should("include", "/newissue");
    });
});