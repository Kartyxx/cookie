let cookieCount = 0;
let cookiesPerClick = 1;
let alertsEnabled = true; // Variable pour contrôler les alertes

const cookieCountDisplay = document.getElementById("cookieCount");
const cookieButton = document.getElementById("cookieButton");
const upgradeButton = document.getElementById("upgradeButton");
const deleteAlertButton = document.getElementById("deleteAlertButton"); // Corrected name

var dropSound = new Howl({
    src: ["assets/sons/cookierEat.mp3"] // Assurez-vous que le chemin du fichier est correct
});


// Bouton pour améliorer les cookies par clic
upgradeButton.addEventListener("click", () => {
    const upgradeCost = 10; // Coût de l'amélioration

    if (cookieCount >= upgradeCost) {
        cookieCount -= upgradeCost; // Retire le coût
        cookiesPerClick += 1; // Augmente les cookies gagnés par clic
        updateCookieCount(); // Met à jour l'affichage

        if (alertsEnabled) {
            alert("Amélioration achetée ! Vous gagnez 1 cookie supplémentaire par clic.");
        } else {
            console.log("Amélioration achetée !");
        }
    } else {
        if (alertsEnabled) {
            alert("Pas assez de cookies pour cette amélioration !");
        } else {
            console.log("Pas assez de cookies !");
        }
    }
});



// Variables pour l'usine à cookies
let autoGenerateInterval = null;
let cookiesPerSecond = 0; // Nombre total de cookies générés par seconde
let upgrade1Count = 0; // Nombre d'achats pour la première amélioration (1 cookie toutes les 5s)
let upgrade2Count = 0; // Nombre d'achats pour la deuxième amélioration (1 cookie toutes les 1s)
let upgrade3Count = 0; // Nombre d'achats pour la troisième amélioration (1 cookie toutes les 2s)

// Coût pour les améliorations
let upgrade1Cost = 10; // 1 cookie toutes les 5s
let upgrade2Cost = 50; // 1 cookie toutes les 1s
let upgrade3Cost = 100; // 1 cookie toutes les 2s

// Boutons d'amélioration
const buyUpgrade1Button = document.getElementById("buyUpgrade1");
const buyUpgrade2Button = document.getElementById("buyUpgrade2");
const buyUpgrade3Button = document.getElementById("buyUpgrade3");

// Fonction pour démarrer la génération automatique
function startAutoGeneration() {
    // Arrêter les anciennes générations
    if (autoGenerateInterval !== null) {
        clearInterval(autoGenerateInterval);
    }

    // Calculer la fréquence de génération des cookies
    const totalCookiesPerSecond = (upgrade1Count * (1 / 5)) + (upgrade2Count * 1) + (upgrade3Count * (2 / 1)); // 1 cookie toutes les 5s pour la 1ère amélioration, etc.

    // Démarrer la génération automatique si nécessaire
    if (totalCookiesPerSecond > 0) {
        autoGenerateInterval = setInterval(() => {
            cookieCount += totalCookiesPerSecond;
            updateCookieCount();
            dropSound.play(); // Joue le son à chaque génération de cookie
        }, 1000); // Génère tous les 1s
    }
}

// Gérer les régressions aléatoires
function applyRegression() {
    if (Math.random() < 0.05) { // 5% de chance de régression
        const regressionAmount = Math.floor(Math.random() * 10) + 1; // Réduit entre 1 et 10 cookies
        cookieCount -= regressionAmount;
        if (cookieCount < 0) cookieCount = 0; // Empêcher les cookies d'être négatifs
        updateCookieCount();
        alert(`Régression : vous avez perdu ${regressionAmount} cookies !`);
    }
}

// Mise à jour de l'affichage des cookies
function updateCookieCount() {
    cookieCountDisplay.textContent = cookieCount;
}

// Calculer le coût exponentiel inversé des améliorations
function calculateUpgradeCost(upgradeLevel) {
    return Math.floor(10 * Math.pow(1.1, upgradeLevel)); // Le coût augmente de façon exponentielle
}

// Mise à jour des prix des améliorations
function updateUpgradePrices() {
    buyUpgrade1Button.textContent = `1 cookie toutes les 5s - ${upgrade1Cost} cookies (x${upgrade1Count})`;
    buyUpgrade2Button.textContent = `1 cookie toutes les 1s - ${upgrade2Cost} cookies (x${upgrade2Count})`;
    buyUpgrade3Button.textContent = `1 cookie toutes les 2s - ${upgrade3Cost} cookies (x${upgrade3Count})`;
}

// Fonction de téléportation du bouton cookie
function teleportButton() {
    const randomX = Math.floor(Math.random() * (window.innerWidth - cookieButton.offsetWidth));
    const randomY = Math.floor(Math.random() * (window.innerHeight - cookieButton.offsetHeight));
    cookieButton.style.position = "absolute";
    cookieButton.style.left = randomX + "px";
    cookieButton.style.top = randomY + "px";
}

// Cliquez sur le cookie
cookieButton.addEventListener("click", () => {
    cookieCount += cookiesPerClick;
    updateCookieCount();
    teleportButton(); // Téléporte le bouton à une nouvelle position à chaque clic
    dropSound.play();

    if (alertsEnabled) {
        alert("🍪 Vous avez cliqué sur un cookie !");
    }

    // Appliquer une régression aléatoire
    applyRegression();
});

// Acheter la première amélioration de l'usine
buyUpgrade1Button.addEventListener("click", () => {
    if (cookieCount >= upgrade1Cost) {
        cookieCount -= upgrade1Cost;
        upgrade1Count++;
        upgrade1Cost = calculateUpgradeCost(upgrade1Count); // Augmenter le coût de l'upgrade
        updateCookieCount();
        startAutoGeneration(); // Redémarre la génération automatique avec les nouvelles améliorations
        updateUpgradePrices();
    } else {
        if (alertsEnabled) {
            alert("Pas assez de cookies pour acheter cette amélioration !");
        }
    }
});

// Acheter la deuxième amélioration de l'usine
buyUpgrade2Button.addEventListener("click", () => {
    if (cookieCount >= upgrade2Cost) {
        cookieCount -= upgrade2Cost;
        upgrade2Count++;
        upgrade2Cost = calculateUpgradeCost(upgrade2Count); // Augmenter le coût de l'upgrade
        updateCookieCount();
        startAutoGeneration(); // Redémarre la génération automatique avec les nouvelles améliorations
        updateUpgradePrices();
    } else {
        if (alertsEnabled) {
            alert("Pas assez de cookies pour acheter cette amélioration !");
        }
    }
});

// Acheter la troisième amélioration de l'usine
buyUpgrade3Button.addEventListener("click", () => {
    if (cookieCount >= upgrade3Cost) {
        cookieCount -= upgrade3Cost;
        upgrade3Count++;
        upgrade3Cost = calculateUpgradeCost(upgrade3Count); // Augmenter le coût de l'upgrade
        updateCookieCount();
        startAutoGeneration(); // Redémarre la génération automatique avec les nouvelles améliorations
        updateUpgradePrices();
    } else {
        if (alertsEnabled) {
            alert("Pas assez de cookies pour acheter cette amélioration !");
        }
    }
});

// Désactiver les alertes
deleteAlertButton.addEventListener("click", () => {
    if (cookieCount >= 50) { // Coût de l'amélioration
        cookieCount -= 50;
        alertsEnabled = false;
        updateCookieCount();
        deleteAlertButton.textContent = "Alerte supprimée"; // Change le texte du bouton
        deleteAlertButton.disabled = true; // Désactive le bouton
        alert("Les alertes ont été désactivées !");
    } else {
        if (alertsEnabled) {
            alert("Pas assez de cookies pour désactiver les alertes !");
        }
    }
});

// Change la couleur de fond
const colorSquares = document.querySelectorAll(".color-square");

colorSquares.forEach(square => {
    square.addEventListener("click", () => {
        const color = square.getAttribute("data-color");
        const price = parseInt(square.getAttribute("data-price"));
        
        if (cookieCount >= price) {
            cookieCount -= price;
            updateCookieCount();
            document.body.style.backgroundColor = color; // Change la couleur de fond
        } 
    });
});

// Gestion du volume sonore et des effets chaotiques
const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");

volumeSlider.addEventListener("input", () => {
    const volume = volumeSlider.value;

    // Afficher le volume sous forme de pourcentage
    volumeValue.textContent = `${Math.round(volume * 100)}%`;

    // Appliquer des changements de couleur chaotiques
    let color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`; 
    volumeSlider.style.background = `linear-gradient(to right, ${color}, ${color === "rgb(255, 255, 255)" ? "red" : "blue"})`;

    // Effet bordélique de la largeur de la barre
    volumeSlider.style.width = `${Math.random() * 250 + 200}px`; // Modifie aléatoirement la largeur

    // Appliquer une rotation sur la barre pour plus de "chaos"
    volumeSlider.style.transform = `rotate(${Math.random() * 360}deg)`;

    // Appliquer le volume de manière chaotique au son
    dropSound.volume(volume);

    // Ajouter un effet visuel en changeant la taille de la valeur de volume
    volumeValue.style.fontSize = `${Math.random() * 10 + 18}px`; // La taille varie un peu de manière imprévisible
});

volumeSlider.addEventListener("change", () => {
    if (volumeSlider.value == 0) {
        alert("Le son est complètement coupé, c'est le chaos !");
    }
});

// Afficher la barre de contrôle du volume lorsque l'amélioration CutSound est achetée
const buyCutSoundButton = document.getElementById("buyCutSound");

buyCutSoundButton.addEventListener("click", () => {
    if (cookieCount >= 50) {
        cookieCount -= 50;
        updateCookieCount();
        document.getElementById("soundControl").style.display = "block"; // Afficher la barre de contrôle du volume
        buyCutSoundButton.disabled = true; // Désactiver le bouton après l'achat
        alert("Amélioration CutSound achetée !");
    } else {
        if (alertsEnabled) {
            alert("Pas assez de cookies pour acheter cette amélioration !");
        }
    }
});
    


const finalButton = document.getElementById("finalButton");
const endGameOverlay = document.getElementById("endGameOverlay");

// Vérifie si le joueur a assez de cookies pour activer le bouton final
function checkFinalButton() {
    if (cookieCount >= 1000) {
        finalButton.disabled = false;
    }
}

// Ajoute un event listener au bouton final
finalButton.addEventListener("click", () => {
    if (cookieCount >= 1000) {
        cookieCount -= 1000;
        updateCookieCount();

        // Affiche l'overlay de fin
        endGameOverlay.style.display = "flex";

        // Désactive tous les autres boutons
        disableAllButtons();
    }
});

// Désactive tous les boutons pour la fin du jeu
function disableAllButtons() {
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach(button => {
        button.disabled = true;
    });
}

// Met à jour régulièrement l'état du bouton final
setInterval(checkFinalButton, 500);
