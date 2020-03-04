console.log('I love pizza');
let namePizza = 'Hawaiian';
let pricePizza = 10;
console.log('New pizza order: ' + namePizza + ' The price of the pizza is: ' + pricePizza + ' eur');


let amountOrderPizza = 1;
let familySizePizza = true;
let totalPrice;
if (familySizePizza) {
    totalPrice = pricePizza * amountOrderPizza * 2;
}
else {
    totalPrice = pricePizza * amountOrderPizza;
}
console.log('New pizza order: ' + amountOrderPizza  + ' ' +  familySizePizza  + ' ' +  namePizza + ' Total cost for the order  is: ' + totalPrice + ' eur');