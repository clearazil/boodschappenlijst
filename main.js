"use strict";

let quantityButtons = document.querySelectorAll('.quantity-up-button, .quantity-down-button');

/**
 * @param {HTMLElement} trElement 
 * @returns {object}
 */
function getProductInfo(trElement) {
    return {
        productId: trElement.getAttribute('productId'),
        productPrice: parseFloat(trElement.querySelector('.product-price').textContent)
    };
}

/**
 * @param {HTMLElement} trElement 
 * @param {object} priceValues
 * @returns {object}
 */
function setProductInfo(trElement, priceValues) {
    trElement.querySelector('.product-quantity').textContent = priceValues.productQuantity;
    trElement.querySelector('.product-total-cost').textContent = priceValues.productTotalCost;
    document.querySelector('#total-cost').textContent = priceValues.totalCost;
}

let shoppingCart = {
    products: {},

    /**
     * @param {object} productInfo 
     * @param {int} quantityChange
     * @returns {object}
     */
    getNewPriceValues(productInfo, quantityChange) {
        let productId = productInfo.productId;
        let product = this.products[productId];

        // check if a product is already in the cart
        if (product !== undefined) {
            let productPrice = this.products[productId].price;
            let oldQuantity = this.products[productId].quantity;
            let newQuantity = oldQuantity + quantityChange;

            // prevent setting quantity or price to a value lesser than 0
            this.products[productId].quantity = newQuantity >= 0 ? newQuantity : 0;

            let newProductPrice = 0;
            if (newQuantity >= 0) {
                // floats in javascript are not accurate: https://www.w3schools.com/js/js_numbers.asp
                newProductPrice = (newQuantity * (productPrice * 10)) / 10;
                // round the number to 2 decimals
                newProductPrice = Math.round(newProductPrice * 100) / 100;
            }
            this.products[productId].totalPrice = newProductPrice;
        } else {
            this.products[productId] = {
                price: productInfo.productPrice,
                // prevent setting quantity or price to a value lesser than 0
                quantity: quantityChange > 0 ? 1 : 0,
                totalPrice: quantityChange > 0 ? productInfo.productPrice :0
            };
        }

        return {
            productQuantity: this.products[productId].quantity,
            productTotalCost: this.products[productId].totalPrice,
            totalCost: this.getTotalCost()
        }
    },

    /**
     * @returns {float}
     */
    getTotalCost() {
        let totalPrice = 0;

        Object.values(this.products).forEach((product) => {
            // multiply and divide by 10 for semi-accurate floats
            totalPrice += (product.quantity * (product.price * 10)) / 10;
        });

        // round to 2 decimals
        return Math.round(totalPrice * 100) / 100;
    }
}

// gebruik bij voorkeur 1 functie om aantallen te verhogen en te verlagen, kan d.m.v. HTML5 data- custom attribuut
quantityButtons.forEach((button) => {
    button.onclick = () => {
        let amount = parseInt(button.getAttribute('data-amount'));
        let tr = button.closest('tr');
    
        let productInfo = getProductInfo(tr);
        let priceValues = shoppingCart.getNewPriceValues(productInfo, amount);
        setProductInfo(tr, priceValues);
    };;
});
