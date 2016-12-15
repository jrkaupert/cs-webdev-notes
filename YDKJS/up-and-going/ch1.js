const TAX_RATE = 0.08;
const PHONE_PRICE = 99.99;
const ACCESSORY_PRICE = 9.99;
const SPENDING_THRESHOLD = 200;


var bank_account_balance = prompt("How much money do you have?");

function calculateFinalPurchaseAmount(amt) {
  return amt + (amt * TAX_RATE);
}


var subtotal = 0;

while (subtotal < bank_account_balance) {
  subtotal += PHONE_PRICE;

  if (subtotal < SPENDING_THRESHOLD) {
    subtotal += ACCESSORY_PRICE
  }
}

var total = calculateFinalPurchaseAmount(subtotal);
console.log("Total purchase = $" + String(total.toFixed(2)));

if (total > bank_account_balance) {
  console.log("You cannot afford this!");
}
