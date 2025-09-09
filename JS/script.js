const profilsBlock = document.getElementById("profilsBlock");
const form = document.getElementById("form");
const momentInput = document.querySelector(".activity-type");
const cityInput = document.querySelector(".loc");
const momentsCount = document.getElementById("momentsCount");


fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {

        console.log("je suis", data)

        for (const profile of data) {
            profilsBlock.innerHTML += `
                <div id="${profile.firstname}" class="profile-card">
                    <img src="${profile.imageUrl}">
                    <p>${profile.type}</p>
                    <h4>${profile.firstname}</h4>
                    <p>${profile.job} • ${profile.age} <br> ${profile.city}</p>
                    <p>${profile.description}</p>
                    <button id="btnProfils">Programmer un moment</button>
                </div>`
            console.log(`je voudrais partager ce moment ${profile.type}`)
            console.log(`mon job est ${profile.job}`)
        }
    })










