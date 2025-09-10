const profilsBlock = document.getElementById("profilsBlock");
const form = document.getElementById("form");
const momentInput = document.querySelector(".activity-type");
const cityInput = document.querySelector(".loc");
const momentsCount = document.getElementById("momentsCount");


// Déterminer le bon chemin vers data.json selon la page
let dataPath = "./data/data.json"; // par défaut (index.html à la racine)
if (window.location.pathname.includes("Pages")) {
    dataPath = "../data/data.json"; // si on est dans /Pages/pageProfils.html
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
    profilsBlock.innerHTML = "";

    const moment = momentInput.value.toLowerCase();
    const city = cityInput.value.toLowerCase();


    fetch(dataPath)
        .then(response => response.json())
        .then(data => {
            const filtered = data.filter(profile => {
                const matchMoment = moment === "all" || profile.type.toLowerCase() === moment;
                const matchCity = city === "all" || profile.city.toLowerCase() === city;
                return matchMoment && matchCity;
            });

            // Afficher le résultat filtré
            for (const profile of filtered) {
                profilsBlock.innerHTML += `
          <div id="${profile.firstname}" class="profile-card">
              <img src="${profile.imageUrl}">
              <p>${profile.type}</p>
              <h4>${profile.firstname}</h4>
              <p>${profile.job} • ${profile.age} <br> ${profile.city}</p>
              <p>${profile.description}</p>
              <button id="btnProfils">Programmer un moment</button>
          </div>`;
            }

            // Mettre à jour le compteur
            
            momentsCount.innerText = `${filtered.length} moments trouvés`;
        return;
        });
});











