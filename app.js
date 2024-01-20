let dropDown = document.querySelectorAll(".countries");
let button = document.querySelector("#getRateBtn");
let fromCurrency = document.querySelector("#from");
let toCurrency = document.querySelector("#to");
for (let select of dropDown) {
    for (let code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        if (select.name === "From" && code === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "To" && code === "PKR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        flagUpdate(evt.target);
    });

}
const flagUpdate = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newSrc;
}
button.addEventListener('click', async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("#amount");
    let amountVal = amount.value;
    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amount.value = "1";
    }
    let changing = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
    let data = await (await fetch(changing)).json();
    let rate = data[toCurrency.value.toLowerCase()];
    let finalVal = rate * amountVal;
    document.querySelector("#rateOfMoney").innerText = amountVal + " " + fromCurrency.value + " = " + (finalVal).toFixed(2) + " " + toCurrency.value;
})