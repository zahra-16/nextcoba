describe ("Halaman Home", () => {
    it("Kunjungi Home", () => {
        cy.visit("/home");
        cy.get("#portal").click();
        cy.get('#section2').scrollIntoView();
        cy.wait(2000);
        cy.get("#error").click();
    })
})