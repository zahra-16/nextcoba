describe ("Halaman Kategori", () => {
    it("Kunjungi Kategori", () => {
        cy.visit("/user");
        cy.get('#section2').scrollIntoView();
        cy.get("#alat").click();
    })
})