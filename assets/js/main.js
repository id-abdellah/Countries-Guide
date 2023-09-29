/* Elements References */

const searchInput = document.querySelector(".searche input");
const searchButton = document.querySelector(".searche button");

const country_flag = document.querySelector(".country_img .flag img");
const country_coat = document.querySelector(".country_img .coatOfArme img");

const countryName = document.querySelector(".country_name");

const additionaInfo_capital = document.querySelector(".additional_inforamtions .capital");
const additionaInfo_continent = document.querySelector(".additional_inforamtions .continent");
const additionaInfo_population = document.querySelector(".additional_inforamtions .population");
const additionaInfo_currency = document.querySelector(".additional_inforamtions .currency");
const additionaInfo_commenLang = document.querySelector(".additional_inforamtions .common_languages");
const additionaInfo_map = document.querySelector(".additional_inforamtions .map");


function shwoData(myData) {
    if (myData.message) {
        document.querySelector(".error_case").style.display = "block"
        document.querySelector(".data").style.display = "none";
        return
    }
    document.querySelector(".error_case").style.display = "none"

    let data = myData[0];
    country_flag.setAttribute("src", data.flags.png)
    country_coat.setAttribute("src", data.coatOfArms.png)

    countryName.textContent = data.name.common + " - " + data.name.official;

    additionaInfo_capital.innerHTML = `
        <span>Capital:</span> ${data.capital}
    `

    additionaInfo_continent.innerHTML = `
        <span>Continent:</span> ${data.region + " - " + data.subregion}
    `

    additionaInfo_population.innerHTML = `
        <span>Population:</span> ${data.population}
    `;

    let currency = [];
    for (let cur in data.currencies) {
        currency.push(data.currencies[cur].name, data.currencies[cur].symbol)
    };

    additionaInfo_currency.innerHTML = `
        <span>Currency:</span> ${currency[0] + " " + currency[1]}
    `;

    let languageArr = [];

    for (let lang in data.languages) {
        languageArr.push(data.languages[lang])
    };

    additionaInfo_commenLang.innerHTML = `
        <span>Commen Languages:</span> ${languageArr.join(", ")}
    `

    additionaInfo_map.innerHTML = `
        <span><a href="${data.maps.googleMaps}">Visit The Location</a></span>
    `
}

searchButton.addEventListener("click", () => {
    getData(searchInput.value)
    document.querySelector(".data").style.display = "block";
})

// fetching Data
async function getData(countryName) {
    let respons = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
    let data = await respons.json();
    shwoData(data)
}
