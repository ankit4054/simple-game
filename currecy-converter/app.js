const BASE_URL ="https://latest.currency-api.pages.dev/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".form-btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");


// for(code in countryList){
//     console.log(code , countryList[code])
// }

for(let select of dropdown){
    for(currcode in countryList){
        // let option = `<option value="${code}">${code}</option>`; ////good away
        // select.insertAdjacentHTML("beforeend", option);

    //another method uper wale ko likne ke liye
        let newoption = document.createElement("option");
        newoption.textContent = currcode; //text content is used to set the text of the option
        newoption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newoption.selected = "selected";
        }
        else if(select.name === "to" && currcode === "INR"){
            newoption.selected = "selected";
        }
        select.appendChild(newoption); //append the option to the select element
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target); //load the flag when the select element is changed
    });
}

const updateFlag = (element) => {
    let currcode = element.value; //get the value of the select element
    let countrycode = countryList[currcode]; //get the country code from the countryList object
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`; //set the src of the img tag to the flag image
    let img = element.parentElement.querySelector("img"); //get the img tag from the parent element of the select element
    img.src = newSrc; //set the src of the img tag to the newSrc
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault(); //prevent the default action of the button
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value; //get the value of the input field
    if(amtVal === "" || amtVal <= 1){
        amtVal = 1; //if the input field is empty or less than or equal to 1, set the value to 1
        amount.value = "1";
    }

    // console.log(toCurr.value, fromCurr.value, amtVal);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`; //set the URL to the API endpoint with the selected currencies
    let respone = await fetch(URL); //fetch the data from the API
    let data = await respone.json(); //convert the response to JSON format
    let rate = data[toCurr.value.toLowerCase()]; //get the exchange rate from the data
    // console.log(rate);
    
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
