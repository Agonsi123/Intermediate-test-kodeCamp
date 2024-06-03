const Apiurl = 'https://restcountries.com/v3.1/all';
const filter = document.querySelector('.filter');
const container = document.getElementById('countries');
const searchInput = document.getElementById('search');
const optionList = document.querySelector('.options');
const optionButton = document.querySelector('.option-button');
const searchResult = document.querySelector("#search_result");


let countries = [];
let search = null;
let region = "All";

const countryApi = () => {

    fetch(Apiurl)
    .then(res => res.json())
    .then(data => {
        countries = [...data]
        if(data.length > 0){
            populateRegions(data)
            displayCountries(data)
        }
    });
}

function populateRegions(countries){
    const regions = ["All",...new Set(countries.map(country => country.region).sort())];
    console.log(regions);
    regions.forEach((region) => {
        const option = document.createElement("div");
        option.textContent = region;
        optionList.appendChild(option);
    });
}
const displayCountries = countries =>{
    const countriesEl = countries.map(country => renderCountry(country));
    container.innerHTML = countriesEl.join(' ')
}
const renderCountry = (country) =>{
    // console.log(country);
    const countryDataString = encodeURIComponent(JSON.stringify(country));
    return `
    <div class="div-country" id="divcountry" data-country="${countryDataString}">
    <img class="country-item" src="${country.flags.png}" data-country="${countryDataString}" />
    <h3 class="country-item" data-country="${countryDataString}">${country.name.common}</h3>
    <h5 class="country-item" data-country="${countryDataString}">Population: ${country.population}</h5>
    <h5 class="country-item" data-country="${countryDataString}">Region: ${country.region}</h5>
    <h5 class="country-item" data-country="${countryDataString}">Capital: ${country.capital}</h5>
    
    </div>
    `
}

const handleSearchInput = () => {
    console.log(searchInput.value);

    console.log({countries})
    console.log({okay:countries[0]})
    console.log({okay:countries[0].name.common})
    const filteredData = countries.filter(country => country.name.common.toLowerCase().startsWith(searchInput.value.toLowerCase()))
    displayCountries(filteredData)
} 





function linkToDetailsPage(data){
    sessionStorage.setItem("countryItem", decodeURIComponent(JSON.stringify(data)));
    window.location.href = 'details.html';
}


const onFilterOptionClick = (e) => {
    region = e.target.textContent;
    console.log({region})
    // filter.classList.toggle('open');
    // console.log(filter.classList.toString())
    // filter.classList.remove('open');
    optionList.style.display = "none";
    console.log(filter.classList.toString())
    const button = filter.querySelector('button');
    button.textContent = region;

    const filteredData = countries.filter(country => country.region.trim() === region.trim());
    displayCountries(filteredData);


};

const onFilterButtonClick = () =>{
    filter.classList.toggle('open');
    console.log("all right")
    // optionList.style.display = "initial";
};

// Check if this script is running on the sending page
// if (window.location.pathname === '/test.html') {
//     var dataToSend = { key: 'value' };
//     sendDataToPage(dataToSend);
// }

if (window.location.pathname === '/details.html') {
    const countryItem = JSON.parse(sessionStorage.getItem("countryItem"));
    
    const image = document.querySelector("#flag");
    const nameCountry = document.querySelector("#name");
    const population = document.querySelector("#population");
    const region = document.querySelector("#region");
    const subregion = document.querySelector("#subregion");
    const capital = document.querySelector("#capital");
    const topLevelDomain = document.querySelector("#topLevelDomain");
    const currencies = document.querySelector("#currencies");
    const languages = document.querySelector("#languages");
    const borCountry = document.querySelector("#borCountry");

    console.log({countryItem})
    image.src = countryItem.flags.png;
    nameCountry.textContent = countryItem.name.common;
    population.textContent = countryItem.population;
    region.textContent = countryItem.region;
    capital.textContent = countryItem.capital;
    topLevelDomain.textContent = countryItem.flag;
    currencies.textContent = countryItem.currencies;
    languages.textContent = countryItem.languages;
    borCountry.textContent = countryItem.borders.toString().split(",").join(", ");
}

  

filter.addEventListener('click', onFilterButtonClick);
searchInput.addEventListener('input', handleSearchInput);
document.addEventListener("DOMContentLoaded", countryApi);
optionList.addEventListener("click", onFilterOptionClick)
optionButton.addEventListener("click", () => {
    optionList.style.display = "block";
    console.log("button click")
})
container.addEventListener("click", (e) => {
    console.log(e.target.classList)
    if(e.target.classList.contains("country-item")){
        // console.log("okay ", e.target.getAttribute("data-country"))
        linkToDetailsPage(JSON.parse(decodeURIComponent(e.target.getAttribute("data-country"))));
    }
})


