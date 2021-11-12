describe ('Order Form App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    })

    it('just checking if everything\'s working', () => {
        expect(1 + 2).to.equal(3);
    })

    const nameInput = () => cy.get('input[name=name]')
    const specialInput = () => cy.get('input[name=special]')
    const sizeDropdown = () => cy.get('select[name=size]')
    const skittlesBox = () => cy.get('input[name=skittles]')
    const pepBox = () => cy.get('input[name=pepperoni]')
    const cheetosBox = () => cy.get('input[name=cheetos]')
    const mayoBox = () => cy.get('input[name=mayonnaise]')
    const submitBtn = () => cy.get('button[id="order-button"]');

    it('the proper elements are showing', () => {
        nameInput().should('exist');
        specialInput().should('exist');
        sizeDropdown().should('exist');
        skittlesBox().should('exist')
        pepBox().should('exist');
        cheetosBox().should('exist');
        mayoBox().should('exist');
        submitBtn().should('exist');
    })


    it('text inputs correctly update', () => {
        nameInput()
            .should('have.value', '')
            .type('firstname lastname')
            .should('have.value', 'firstname lastname')
        specialInput()
            .should('have.value', '')
            .type('instructions')
            .should('have.value', 'instructions')
    })

    it('can select a pizza size from the size dropdown menu', () => {
        sizeDropdown()
            .should('have.value', '')
            .select('Small')
            .should('have.value', 'small');
    })

    it('can select multiple toppings', () => {
        skittlesBox()
            .should('not.be.checked')
            .click()
            .should('be.checked');
        pepBox()
            .should('not.be.checked')
            .click()
            .should('be.checked');
        cheetosBox()
            .should('not.be.checked')
            .click()
            .should('be.checked');
        mayoBox()
            .should('not.be.checked')
            .click()
            .should('be.checked');
    })

    it('can submit the form', () => {
        nameInput().type('firstname lastname');
        sizeDropdown().select('Small');
        pepBox().click();
        mayoBox().click();
        submitBtn().click();
    })
})