const mode = document.querySelector(".mode")
mode.addEventListener("click", ()=>{
    document.body.classList.toggle("dark")
})

const back=document.querySelector(".back")
back.addEventListener("click", ()=>{
    history.back()
})

const urlParams = new URLSearchParams(window.location.search);
const countryInfo = JSON.parse(decodeURIComponent(urlParams.get("countryInfo")))
document.getElementById("name").innerText=countryInfo.name
document.getElementById("flag").src=countryInfo.flags.svg
document.getElementById("nativeName").innerText=countryInfo.nativeName
document.getElementById("population").innerText=countryInfo.population
document.getElementById("region").innerText=countryInfo.region
document.getElementById("subregion").innerText=countryInfo.region
document.getElementById("capital").innerText=countryInfo.capital
document.getElementById("topLevelDomain").innerText=countryInfo.topLevelDomain
document.getElementById("currencies").innerText=countryInfo.currencies[0].name
document.getElementById("languages").innerText=countryInfo.languages[0].name

const bordersList=document.getElementById("borderCountries")
for(const i of countryInfo.borderCountries){
    const borderCountry=document.createElement("li")
    borderCountry.innerText=i
    bordersList.append(borderCountry)
}