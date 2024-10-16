import { message } from './message.js';

export const dice = {
    audio: new Audio("../sound/dice.mp3"),
    totalPlayer: 0,
    totalDealer: 0,
    play: document.querySelector("#play"),
    stop: document.querySelector("#stop"),
    new: document.querySelector("#new"),
    rules: document.querySelector("#rules"),
    healthPlayer: 20,
    healthPlayerSpan: document.querySelector("#player span"),
    healthPlayerBar: document.querySelector("#player .healthBarGreen"),
    healthDealer: 20,
    healthDealerSpan: document.querySelector("#dealer span"),
    healthDealerBar: document.querySelector("#dealer .healthBarGreen"),

    launcheDice: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    createDice: function (targetSelector) {
        let divDice = document.createElement("div");
        divDice.classList.add("dice");
        document.querySelector(targetSelector).append(divDice)
        const random6 = dice.launcheDice(0, 5);
        divDice.style.backgroundPositionX = (-random6 * 100) + 'px';
        return random6 + 1;
    },
    playGame: function () {
        dice.audio.play();
        dice.totalPlayer += dice.createDice("#player");
        document.querySelector("#score #playerScore p").textContent = `Score Joueur : ${dice.totalPlayer}`
        if (dice.totalPlayer > 21 || dice.totalDealer > 21) {
            dice.stopGame();
        }
        if (dice.totalDealer < 18) {
            dice.totalDealer += dice.createDice("#dealer");
            document.querySelector("#score #dealerScore p").textContent = `Score Banque : ${dice.totalDealer}`
        }
    },
    stopGame: function () {
        dice.play.setAttribute("disabled", "");
        dice.stop.setAttribute("disabled", "");
        dice.stop.style.opacity = "0.7";
        dice.play.style.opacity = "0.7";
        while (dice.totalDealer < 18) {
            dice.totalDealer += dice.createDice("#dealer");
            document.querySelector("#score #dealerScore p").textContent = `Score Banque : ${dice.totalDealer}`
        }
        if (dice.totalPlayer > 21) {
            dice.looseHealthPlayer();
            message.show(`Et c'est perdu ! tu as fait plus de 21 avec ton ${dice.totalPlayer}`, "error")
        } else if (dice.totalDealer > 21) {
            dice.looseHealthDealer();
            message.show(`Et c'est gagné ! La banque a fait plus de 21 avec son ${dice.totalDealer}`, "success")
        } else if (dice.totalDealer > dice.totalPlayer) {
            dice.looseHealthPlayer();
            message.show(`Et c'est perdu ! la banque as fait plus que ton ${dice.totalPlayer} avec son ${dice.totalDealer}`, "error")
        } else if (dice.totalDealer === dice.totalPlayer) {
            dice.looseHealthPlayer();
            message.show(`Et c'est perdu ! la banque as fait autant que toi avec ${dice.totalDealer}`, "warning")
        } else {
            dice.looseHealthDealer();
            message.show(`Et c'est gagné ! La banque as fait moins que ton ${dice.totalPlayer} avec son ${dice.totalDealer}`, "success")
        }
    },
    resetGame: function () {
        const allDice = document.querySelectorAll(".dice");
        for (const dice of allDice) {
            dice.remove();
        }
        dice.play.removeAttribute("disabled", "");
        dice.stop.removeAttribute("disabled", "");
        dice.stop.style.opacity = "1";
        dice.play.style.opacity = "1";
        dice.totalPlayer = 0;
        dice.totalDealer = 0;
        document.querySelector("#score #dealerScore p").textContent = `Score Banque : ${dice.totalDealer}`
        document.querySelector("#score #playerScore p").textContent = `Score Joueur : ${dice.totalPlayer}`
    },
    rulesGame: function () {
        message.show(`Il faut lancer des dés pour avoir un meilleur score que la banque, sans jamais dépasser 21.`, "info", 10000)
        message.show(`x pv perdus par écart avec l'adversaire, 10 pv si 21 est dépassé.`, "info", 10000)
    },
    looseHealthPlayer: function () {
        if (dice.totalPlayer > 21) {
            dice.healthPlayer += -10;
        } else {
            dice.healthPlayer += dice.totalPlayer - dice.totalDealer;
        }
        if (dice.healthPlayer < 0) {
            dice.healthPlayer = 0;
        }
        dice.healthPlayerSpan.textContent = dice.healthPlayer;
        dice.healthPlayerBar.style.width = (dice.healthPlayer / 20 * 100) + "%";

    },
    looseHealthDealer: function () {
        if (dice.totalDealer > 21) {
            dice.healthDealer += -10;
        } else {
            dice.healthDealer += dice.totalDealer - dice.totalPlayer;
        }
        if (dice.healthDealer < 0) {
            dice.healthDealer = 0;
        }
        dice.healthDealerSpan.textContent = dice.healthDealer;
        dice.healthDealerBar.style.width = (dice.healthDealer / 20 * 100) + "%";
    },
}
