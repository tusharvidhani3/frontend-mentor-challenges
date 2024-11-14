const countries = document.querySelector(".countries")
const region = document.querySelector(".region")
const countryCard = document.querySelector(".card")

const countriesList = fetch("data.json")
    .then(response => response.json())
    .then(details => {

        const alpha3CodeLookupTable = {}
        const fragment = document.createDocumentFragment();
        countries.replaceChildren()
        details.forEach((country, index) => {
            const card = countryCard.cloneNode(true)
                    card.querySelector("img").src = country.flags.png
                    card.querySelector("h2").innerText = country.name
                    card.querySelector(".population").innerText = country.population
                    card.querySelector(".reg").innerText = country.region
                    card.querySelector(".capital").innerText = country.capital
                    card.setAttribute("data-index", index)
                    fragment.append(card)
            country.index = index
            alpha3CodeLookupTable[country.alpha3Code] = country.name
        })
        countries.append(fragment)

        const search = document.getElementById("search")
        search.addEventListener("input", debounce(() => {
            countries.replaceChildren()
            const inputText = search.value.toLowerCase()
            const fragment = document.createDocumentFragment();
            details.forEach(country => {
                if (country.name.toLowerCase().includes(inputText)) {
                    const card = countryCard.cloneNode(true)
                    card.querySelector("img").src = country.flags.png
                    card.querySelector("h2").innerText = country.name
                    card.querySelector(".population").innerText = country.population
                    card.querySelector(".reg").innerText = country.region
                    card.querySelector(".capital").innerText = country.capital
                    card.setAttribute("data-index", country.index)
                    fragment.append(card)
                }
            })
            countries.append(fragment)
        }, 300))

        region.addEventListener("change", () => {
            countries.replaceChildren()
            const fragment = document.createDocumentFragment()
            details.forEach(country => {
                if (country.region == region.value) {
                    const card = countryCard.cloneNode(true)
                    card.querySelector("img").src = country.flags.png
                    card.querySelector("h2").innerText = country.name
                    card.querySelector(".population").innerText = country.population
                    card.querySelector(".reg").innerText = country.region
                    card.querySelector(".capital").innerText = country.capital
                    card.setAttribute("data-index", country.index)
                    fragment.append(card)

                    return true
                }
            });
            countries.append(fragment)
        })

        countries.addEventListener("click", (event) => {
            if (event.currentTarget != event.target) {
                const index = event.target.closest('.card').getAttribute("data-index")
                const countryInfo = details[index]
                const borderCountries = []
                for (const i of countryInfo?.borders ?? [])
                    borderCountries.push(alpha3CodeLookupTable[i])
                countryInfo.borderCountries = borderCountries
                window.location.href = `./country-info.html?countryInfo=${encodeURIComponent(JSON.stringify(countryInfo))}`
            }
        })

    })

const mode = document.querySelector(".mode")
mode.addEventListener("click", () => {
    document.body.classList.toggle("dark")
})

//Pause querying when user is typing
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}