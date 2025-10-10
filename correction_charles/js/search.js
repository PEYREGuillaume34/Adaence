const activity = document.getElementById('activity-type')
const localisation = document.getElementById('location')
const searchButton = document.getElementById('search-button')
const grid = document.getElementById('search-grid')
const counter = document.getElementById('momentsCount')
const API = "../data/elders.json"
const urlParams = new URLSearchParams(window.location.search)
const activityParam = urlParams.get('activity')
const locationParam = urlParams.get('location')

const fetchData = async() => {
    const response = await fetch("../data/elders.json")
    return await response.json();
  }

searchButton.addEventListener('click', async(event) => {
    event.preventDefault()
    const activityType = activity.value
    const localisationType = localisation.value

    const data = await fetchData()
    const filtered =filterData(data, activityType, localisationType)
    renderCards(filtered)
})


const card = (elder) => {
    const card = document.createElement('div')
    card.className = "search-card";
    card.innerHTML += `
        <img class="search-image" src="${elder.imageUrl}" alt="${elder.firstname}">
        <div class="search-info">
            <span class="badge badge-success">${elder.type}</span>
            <h3 class="search-name">${elder.firstname}</h3>
            <div class="search-details">
                <span>${elder.job} . ${elder.age}</span>
                <span>${elder.city}</span>
            </div>
            <p class="search-description">${elder.description}</p>
            <a href="#" class="btn btn-primary">Programme du moment</a>
        </div>`
    return card
}

const filterData = (data, activityType, localisation) => {
    if(!localisation) {
        return data.filter(
            (elder) => 
                activityType === "all" || elder.activity === activityType
        )
    } else {
        return data.filter((elder) => {
            return (
                (activityType === 'all' || elder.activity === activityType) && elder.city && elder.city.toLowerCase().includes(localisation.toLowerCase())
            )
        })
    }
}

const renderCards = (data) => {
    grid.innerHTML =''
    if(data.length && data) {
        data.forEach(elder => {
            grid.appendChild(card(elder))
            counter.textContent = `${data.length} moments trouvés`;
        });
    } else {
        counter.textContent = `0 moment trouvé`;
    }
}
window.addEventListener("DOMContentLoaded", async() => {
    const data = await fetchData()
    if (activityParam === null) activityParam = 'all'
    if (locationParam === null) locationParam = ''
    const filtered = filterData(data, activityParam, locationParam)
    // activityParam = null;
    // locationParam = null;
    renderCards(filtered)
})