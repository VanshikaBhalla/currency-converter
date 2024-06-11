let URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// adding all nations to the from & to dropdowns
const to_drops = document.querySelector("#to");
for(j in countryList) { // j->currencycode countryList[j]->countrycode
    var newoption = document.createElement("option");
    newoption.innerText=j;
    newoption.value=j;
    to_drops.append(newoption);
    if (j==="INR") {
        newoption.selected="selected";
    }
}

const from_drops = document.querySelector("#from");
for(j in countryList) { // j->currencycode countryList[j]->countrycode
    var newoption = document.createElement("option");
    newoption.innerText=j;
    newoption.value=j;
    from_drops.append(newoption);
    if (j==="USD") {
        newoption.selected="selected";
    }
}

// changing flag
from_drops.addEventListener("change",(e)=>{
    updateFlag(e.target);
});

to_drops.addEventListener("change",(e)=>{
    updateFlag(e.target);
});

const updateFlag = (el) => {
    let currencyCode = el.value;
    let countryCode = countryList[el.value];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/32.png`;
    el.parentElement.querySelector("img").src=newsrc;   
}

const btn = document.querySelector("#btn");
btn.addEventListener("click", async (e)=>{
    e.preventDefault(); // doesnt reload the page
    let amt = document.querySelector("#amt").value;
    if (amt=="" || amt<0) {
        amt = 1;
    }
    let newurl = `${URL}/${from_drops.value.toLowerCase()}.json`;
    let response = await fetch(newurl);
    let data = await response.json();
    let unit_val = data[from_drops.value.toLowerCase()][to_drops.value.toLowerCase()];
    let newmsg = `${from_drops.value} ${amt} = ${to_drops.value} ${unit_val*amt}`;
    document.querySelector("#msg").innerText = newmsg;
})