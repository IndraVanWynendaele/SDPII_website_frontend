
describe("products", () => {
    it("should display a list of products", () => {
        cy.visit("http://localhost:5173/products");
        cy.get("h1").should("contain", "Products");
        
    });
    it("should display a product", () => {
        cy.visit("http://localhost:5173/products/detail/1");
        cy.get("h1").should("contain", "ProductDetail");
    });
    it("should display a product not found message", () => {
        cy.visit("http://localhost:5173/products/detail/sdsfdg");
        cy.get("[data-cy=errorAlert]").should("contain", "Row not found");
    });

    it("should have a 5 products", () => {
        cy.intercept(
            "GET",
            "http://localhost:3333/api/products?maxPrice=1000&page=1",
            { fixture: "products.json" }
          );

        cy.visit("http://localhost:5173/products");
        cy.get("[data-cy=products]").should("have.length", 5);
    });

    it("should have the product chair", () => {
        cy.intercept(
            "GET",
            "http://localhost:3333/api/products?maxPrice=1000&page=1",
            { fixture: "products.json" }
          );

        cy.visit("http://localhost:5173/products");
        cy.get("[data-cy=productsName]").eq(0).contains("Chair");
        cy.get("[data-cy=productsPrice]").eq(0).contains("99.99");
        const string ="Ergonomic office chair with adjustable lumbar support, padded armrests, and breathable mesh backrest for ultimate comfort and productivity."
        const shortDescription = string.substring(0, 100)+"...";
        cy.get("[data-cy=productsShoprtDescription]").eq(0).contains(shortDescription);
        cy.get("[data-cy=productsImg]").eq(0).should("have.attr", "src").should("include", "https://www.gerowonen.be/media/39/25/df/1645550042/621519dac8c2b-V015-EVE-1018%20(2).png.png");
    });

    it("should have a detailpage of product chair", () => {
        cy.intercept(
            "GET",
            "http://localhost:3333/api/products?maxPrice=1000&page=1",
            { fixture: "products.json" }
          );

        cy.visit("http://localhost:5173/products");

        cy.intercept(
            "GET",
            "http://localhost:3333/api/products/1",
            { fixture: "productsDetails.json" }
          );

        cy.get("[data-cy=productsImg]").eq(0).click();  
        cy.get("h1").should("contain", "ProductDetail");
        cy.get("[data-cy=productDetailImg]").eq(0).should("have.attr", "src").should("include", "https://www.gerowonen.be/media/39/25/df/1645550042/621519dac8c2b-V015-EVE-1018%20(2).png.png");
        cy.get("[data-cy=productDetailName]").eq(0).contains("Chair");
        cy.get("[data-cy=productDetailShortDescription]").eq(0).contains("Ergonomic office chair with adjustable lumbar support, padded armrests, and breathable mesh backrest for ultimate comfort and productivity.");
        cy.get("[data-cy=productDetailLongDescription]").eq(0).contains("Maximize your comfort and productivity with our ergonomic office chair. Crafted for long hours of sitting, this chair features adjustable lumbar support, padded armrests, and a breathable mesh backrest. The ergonomic design ensures that you can maintain proper posture and reduce strain on your back, neck, and shoulders. Whether you're working on important projects or catching up on emails, our office chair offers the perfect blend of comfort and support. Upgrade your workspace and enhance your workday with superior comfort and productivity.");          
        cy.get("[data-cy=productDetailCategorie]").eq(0).contains("Office furniture");
        cy.get("[data-cy=productDetailPrice]").eq(0).contains("€ 99.99");
        cy.get("[data-cy=backButton]").eq(0).click().get("h1").should("contain", "Products");
    });

    it("should be able to filter by category", () => {

        cy.visit("http://localhost:5173/products");
        cy.get("[data-cy=filterButtonProducts]").click();
        cy.get("[data-cy=categoryProducts]").click();
        cy.get("li").contains("Office furniture").click();
        cy.get("[data-cy=applyButtonProducts]").click();
        cy.get("[data-cy=productsImg]").eq(0).click();
        cy.get("[data-cy=productDetailCategorie]").eq(0).contains("Office furniture");
    })

    it("should be able to filter by supplier", () => {

        cy.visit("http://localhost:5173/products");
        cy.get("[data-cy=filterButtonProducts]").click();
        cy.get("[data-cy=supplierProducts]").click();
        cy.get("li").contains("AuroraTech").click();
        cy.get("[data-cy=applyButtonProducts]").click();
        cy.get("[data-cy=productsImg]").eq(0).click();
    })

    it("should be able to order by name ASC", () => {

        cy.visit("http://localhost:5173/products");
        cy.get("[data-cy=filterButtonProducts]").click();
        cy.get("[data-cy=orderByCategorieProducts]").click();
        cy.get("li").contains("Name").click();
        cy.get("[data-cy=orderProducts]").click();
        cy.get("li").contains("Ascending").click(); 
        cy.get("[data-cy=applyButtonProducts]").click();

        cy.get("[data-cy=productsName]").then($products => {
            const names = $products.map((index, element) => Cypress.$(element).text()).get();
            const sortedNames = [...names].sort();
            expect(names).to.deep.equal(sortedNames);
        });
    })

    it("should be able to order by name DESC", () => {
        cy.visit("http://localhost:5173/products");
        cy.get("[data-cy=filterButtonProducts]").click();
        cy.get("[data-cy=orderByCategorieProducts]").click();
        cy.get("li").contains("Name").click();
        cy.get("[data-cy=orderProducts]").click();
        cy.get("li").contains("Descending").click(); 
        cy.get("[data-cy=applyButtonProducts]").click();
    
        cy.get("[data-cy=productsName]").then($products => {
            const names = $products.map((index, element) => Cypress.$(element).text()).get();
            const sortedNames = [...names].sort().reverse(); 
            expect(names).to.deep.equal(sortedNames);
        });
    });

    it("should be able to order by price ASC", () => {
        cy.visit("http://localhost:5173/products");
        cy.get("[data-cy=filterButtonProducts]").click();
        cy.get("[data-cy=orderByCategorieProducts]").click();
        cy.get("li").contains("Price").click(); 
        cy.get("[data-cy=orderProducts]").click();
        cy.get("li").contains("Ascending").click(); // Change to Ascending
        cy.get("[data-cy=applyButtonProducts]").click();
    
        cy.get("[data-cy=productsPrice]").then($products => {
            const prices = $products.map((index, element) => parseFloat(Cypress.$(element).text().replace('$', ''))).get();
            const sortedPrices = [...prices].sort((a, b) => a - b); // Sort in ascending order
            expect(prices).to.deep.equal(sortedPrices);
        });
    });
    
    it("should be able to order by price DESC", () => {
        cy.visit("http://localhost:5173/products");
        cy.get("[data-cy=filterButtonProducts]").click();
        cy.get("[data-cy=orderByCategorieProducts]").click();
        cy.get("li").contains("Price").click(); 
        cy.get("[data-cy=orderProducts]").click();
        cy.get("li").contains("Descending").click(); 
        cy.get("[data-cy=applyButtonProducts]").click();
    
        cy.get("[data-cy=productsPrice]").then($products => {
            const prices = $products.map((index, element) => parseFloat(Cypress.$(element).text().replace('$', ''))).get();
            const sortedPrices = [...prices].sort((a, b) => b - a);
            expect(prices).to.deep.equal(sortedPrices);
        });
    });

    it("should be able to filter by name", () => {
        cy.visit("http://localhost:5173/products");
        cy.get("[data-cy=filterButtonProducts]").click();
        cy.get("[data-cy=searchNameProducts]").type("ch");
        cy.get("[data-cy=applyButtonProducts]").click();

        cy.get("[data-cy=productsName]").each($productName => {
            cy.wrap($productName).invoke('text').then(text => {
                expect(text.toLowerCase()).to.include('ch');
            });
        });

    });
    
    it('should show the products of the logged in supplier when visiting the page "My Products"', () => {
        cy.intercept(
            "GET",
            "http://localhost:3333/api/me/products?maxPrice=1000&page=1",
            { fixture: "myProducts.json" }
        );

        cy.login('account@supplier.com', 'Password')
        cy.wait(1000);
        cy.visit("http://localhost:5173/profile/products");
        cy.get("[data-cy=products]").should("have.length", 5);
    }) 
    
});