
describe('it should enter app', () => {

    beforeEach(() => {
        cy.intercept("GET", "/api/ingredients", { fixture: "ingredients.json" });
        cy.intercept("GET", "/api/auth/user", {fixture: "user.json"})
        cy.intercept("POST", "/api/auth/token", {fixture: "token.json"})

        window.localStorage.setItem(
            "accessToken", require('../fixtures/token.json').accessToken,
        );
        cy.visit('/')
    })
    afterEach(() => {
        cy.clearAllLocalStorage();
        cy.clearAllCookies()
    })
        it('should test routing to profile', () => {
            cy.get('[cy-data="profile"]').click()
            cy.get('[class*=profilePage_frame]').should('exist')
        })
        describe('modal opening and closing tests', () => {
            beforeEach(() => {
                cy.get('[class*=IngredientCard_link]').first().click()
            })
            it('should test closing on overlay click', () => {
                cy.get('[class*=Modal_overlay]').click(15, 40);
            })
            it('should test closing on esc icon click', () => {
                cy.get('[class*=Modal_close]').click();
            })
            it('should test closing on esc button click', () => {
                cy.get('body').type('{esc}');
            })
        })
    describe('order forming processing tests', () => {
        beforeEach(() => {
            cy.setAlias('[class*=BurgerConstructor_chosen_items]', 'ingredientTargetContainer')
            cy.setAlias('[class*=BurgerConstructor_item]:first', 'bunTargetContainer')
            cy.setAlias('ul[class*=IngredientSection_list] a', 'menu')
        })
        describe('drag and drop test', () => {
            it("should test bun drop and it exists", () => {
                const dataTransfer = new DataTransfer();
                cy.get('@menu').first().contains("булка").trigger('dragstart', { dataTransfer, force: true }) //если тестить без интернета, то ругается на отсутствии загруженной картинки
                cy.get('@bunTargetContainer').trigger('drop')
                cy.get('@bunTargetContainer').find('[class*=BurgerConstructor_top_bun]').should('exist')
            })
            it("should test that bun cant be dropped to container for ingredient", () => {
                const dataTransfer = new DataTransfer();
                cy.get('@menu').first().contains("булка").trigger('dragstart', { dataTransfer, force: true }) //если тестить без интернета, то ругается на отсутствии загруженной картинки
                cy.get('@ingredientTargetContainer').trigger('drop')
                cy.contains('[class*=BurgerConstructor_chosen_items]', 'булка').should('not.exist')
            })
            it("should test ingredient drop and existing", () => {
                cy.get('ul[class*=IngredientSection_list]').eq(1).find('a').first().trigger('dragstart')
                cy.get('@ingredientTargetContainer').trigger('drop')
                cy.get('@ingredientTargetContainer').find('[class*=EmptyCard_wrapper]').should('not.exist')
            })
        })
        describe('order sending test', () => {
            it('should test order sending', () => {
                cy.intercept('POST', "api/orders", {fixture: "order.json"})
                cy.get('@menu').first().contains("булка").trigger('dragstart')
                cy.get('@bunTargetContainer').trigger('drop')
                cy.get('@menu').eq(2).trigger('dragstart')
                cy.get('@ingredientTargetContainer').trigger('drop')
                cy.get('button').contains("Оформить заказ").click()
                cy.get('[class*=OrderModal_header]').should('exist')
            })
        })
    })
})
