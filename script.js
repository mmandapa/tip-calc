const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const tipPercentButtons = document.querySelectorAll(".tip-button");
const customTipInput = document.getElementById("custom-tip");
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");
const resetButton = document.getElementById("reset");

let billValue = 0;
let peopleValue = 1;
let tipPercent = 0;

function calculateTip() {
  const tipPerPerson = (billValue * tipPercent) / peopleValue;
  const totalPerPerson = (billValue + billValue * tipPercent) / peopleValue;
  tipAmount.textContent = "$" + tipPerPerson.toFixed(2);
  totalAmount.textContent = "$" + totalPerPerson.toFixed(2);
  resetButton.disabled = !billValue && !tipPercent && peopleValue <= 1;
}

billInput.addEventListener("input", () => {
  billValue = parseFloat(billInput.value) || 0;
  calculateTip();
});

peopleInput.addEventListener("input", () => {
  peopleValue = parseInt(peopleInput.value) || 1;
  calculateTip();
});

tipPercentButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipPercent = parseFloat(button.value) / 100;
    customTipInput.value = "";
    calculateTip();
  });
});

customTipInput.addEventListener("input", () => {
  tipPercent = parseFloat(customTipInput.value) / 100 || 0;
  calculateTip();
});

resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "";
  tipPercent = 0;
  billValue = 0;
  peopleValue = 0;
  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";
  resetButton.disabled = true;
});