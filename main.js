"use strict";

let quantityUpButtons = document.querySelectorAll('.quantity-up-button');
let quantityDownButtons = document.querySelectorAll('.quantity-down-button');



//console.log()
quantityUpButtons.forEach((button) => {
    button.onclick = () => {
        console.log('test');
    };
});

quantityDownButtons.forEach((button) => {
    button.onclick = () => {
        console.log('test');
    };
});
