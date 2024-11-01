const billInput = document.getElementById("total");
const tipButtons = document.querySelectorAll(".buttons button");
const customTipInput = document.getElementById("custom-tip");
const peopleInput = document.getElementById("people");
const tipAmountDisplay = document.getElementById("tip-amount");
const totalDisplay = document.getElementById("total-amount");
const resetButton = document.getElementById("reset-button");

let bill = 0;
let tipPercent = 0;
let numPeople = 1;

function updateAmounts() {
    if (numPeople === 0) return;
    const tipAmount = (bill * (tipPercent / 100)) / numPeople;
    const totalAmount = (bill + bill * (tipPercent / 100)) / numPeople;
    tipAmountDisplay.innerText = `$${tipAmount.toFixed(2)}`;
    totalDisplay.innerText = `$${totalAmount.toFixed(2)}`;
}

billInput.addEventListener("input", () => {
    bill = parseFloat(billInput.value) || 0;
    updateAmounts();
});

tipButtons.forEach(button => {
    button.addEventListener("click", () => {
        tipButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        tipPercent = parseFloat(button.innerText) || 0;
        customTipInput.value = "";
        updateAmounts();
    });
});

customTipInput.addEventListener("input", () => {
    tipPercent = parseFloat(customTipInput.value) || 0;
    tipButtons.forEach(btn => btn.classList.remove("active"));
    updateAmounts();
});

peopleInput.addEventListener("input", () => {
    numPeople = parseInt(peopleInput.value) || 1;
    updateAmounts();
});

resetButton.addEventListener("click", () => {
    billInput.value = "";
    customTipInput.value = "";
    peopleInput.value = 1;
    tipButtons.forEach(btn => btn.classList.remove("active"));
    tipAmountDisplay.innerText = "$0.00";
    totalDisplay.innerText = "$0.00";
    bill = 0;
    tipPercent = 0;
    numPeople = 1;
    resetButton.disabled = true;
});

[billInput, customTipInput, peopleInput, ...tipButtons].forEach(element => {
    element.addEventListener("input", () => {
        resetButton.disabled = false;
    });
});
