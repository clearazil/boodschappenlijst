"use strict";

let quantityUpButtons = document.querySelectorAll('.quantity-up-button');
let quantityDownButtons = document.querySelectorAll('.quantity-down-button');

/**
 * 
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
 * 
 * @param {HTMLElement} trElement 
 * @param {object} priceValues
 * @returns {object}
 */
function setProductInfo(trElement, priceValues) {
    trElement.querySelector('.product-quantity').textContent = priceValues.productQuantity;
    trElement.querySelector('.product-total-cost').textContent = priceValues.productTotalCost;
    document.querySelector('#total-cost').textContent = priceValues.totalCost;
}

// floats in javascript are not accurate: https://www.w3schools.com/js/js_numbers.asp
console.log(1.2 * 3); // returns 3.5999999999999996 (should be 3.6)

let shoppingCart = {
    products: {

    },
    totalPrice: 0,
    getNewPriceValues(productInfo, quantityChange) {
        let productId = productInfo.productId;
        let product = this.products[productId];

        //console.log(productInfo);
        //console.log(this.products);
        //console.log(product);
        if (product !== undefined) {
            

            let productPrice = this.products[productId].price;
            let oldQuantity = this.products[productId].quantity;
            let newQuantity = oldQuantity + quantityChange;

            console.log(productPrice);
            console.log(newQuantity);
            // prevent setting quantity or price to a value lesser than 0
            this.products[productId].quantity = newQuantity >= 0 ? newQuantity : 0;
            this.products[productId].totalPrice = newQuantity >= 0 ? (newQuantity * productPrice) : 0;
            console.log(this.products[productId]);
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
            totalCost: 1
        }
    }
}



quantityUpButtons.forEach((button) => {
    button.onclick = () => {
        let tr = button.closest('tr');

        let productInfo = getProductInfo(tr);
        let priceValues = shoppingCart.getNewPriceValues(productInfo, 1);
        setProductInfo(tr, priceValues);
    };
});




quantityDownButtons.forEach((button) => {
    button.onclick = () => {
        let tr = button.closest('tr');

        let productInfo = getProductInfo(tr);
        let priceValues = shoppingCart.getNewPriceValues(productInfo, -1);
        setProductInfo(tr, priceValues);
    };
});
