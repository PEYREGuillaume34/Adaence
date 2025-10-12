// chemin vers ton fichier JSON
const dataPath = "../data/data.json";

// ===============
// PAGE ACCUEIL
// ===============
const searchForm = document.getElementById("form");
if (searchForm && window.location.pathname.endsWith("index.html")) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const moment = document.querySelector(".activity-type").value;
    const city = document.querySelector(".loc").value;

    // redirection avec paramètres dans l'URL
    window.location.href = `pages/pageProfils.html?activity=${encodeURIComponent(moment)}&location=${encodeURIComponent(city)}`;
  });
}

// ===============
// PAGE PROFILS
// ===============
const profilsBlock = document.getElementById("profilsBlock");
if (profilsBlock && window.location.pathname.endsWith("pageProfils.html")) {
  const momentsCount = document.getElementById("momentsCount");

  // lire les paramètres de l’URL
  const params = new URLSearchParams(window.location.search);
  const activityParam = params.get("activity") || "all";
  const locationParam = params.get("location") || "all";

  // fonction pour charger et filtrer les profils
  function afficherProfils() {
    fetch(dataPath)
      .then((response) => response.json())
      .then((data) => {
        const filtered = data.filter(profile => {
          return (
            (activityParam === "all" || profile.type.toLowerCase() === activityParam.toLowerCase()) &&
            (locationParam === "all" || profile.city.toLowerCase() === locationParam.toLowerCase())
          );
        });

        profilsBlock.innerHTML = "";

        if (filtered.length === 0) {
          profilsBlock.innerHTML = "<p>Aucun profil trouvé.</p>";
        } else {
          for (const profile of filtered) {
            profilsBlock.innerHTML += `
              <div class="profile-card">
                <img src="${profile.imageUrl}" alt="vieuxUno">
                <p>${profile.type}</p>
                <h4>${profile.firstname}</h4>
                <p>${profile.job} • ${profile.age} <br> ${profile.city}</p>
                <p>${profile.description}</p>
                <button class="btnProfils">Programmer un moment</button>
              </div>`;
          }
        }

        // mettre à jour le compteur
        momentsCount.innerText = `${filtered.length} moments trouvés`;
      });
  }

  // exécution au chargement
  afficherProfils();


  function clickBtnSearch() {
    document.querySelector('#searchBtn').addEventListener('click', (e) => {
      e.preventDefault();

      let moment = document.querySelector(".activity-type").value;
      let city = document.querySelector(".loc").value;

      if (city.length === 0) {
        document.querySelector('.error-message').style.display = 'block';
      } else {
        window.location.href = `pageProfils.html?activity=${moment}&location=${city}`;

      }
    });
  }

  clickBtnSearch()

}





// const profilsBlock = document.getElementById("profilsBlock");
// const form = document.getElementById("form");
// const momentInput = document.querySelector(".activity-type");
// const cityInput = document.querySelector(".loc");
// const momentsCount = document.getElementById("momentsCount");

// fetch('../data/data.json')
//   .then(response => response.json())
//   .then(data => {
//     const profiles = data;
//     console.log("je suis", data);

//     profilsBlock.innerHTML = "";

//     for (const profile of profiles) {
//       profilsBlock.innerHTML += `
//         <div id="${profile.firstname.toLowerCase()}" class="profile-card">
//           <img src="${profile.imageUrl}" alt="${profile.firstname}">
//           <p>${profile.type}</p>
//           <h4>${profile.firstname}</h4>
//           <p>${profile.job} • ${profile.age} <br> ${profile.city}</p>
//           <p>${profile.description}</p>
//           <button class="btnProfils">Programmer un moment</button>
//         </div>
//       `;
//     }

//     // console.log montre tout le contenu final
//     console.log("je m'appelle", profilsBlock.innerHTML);
//   })
