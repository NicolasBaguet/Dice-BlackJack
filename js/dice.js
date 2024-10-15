import { message } from '../js/message.js';

export const dice = {
    audio: new Audio("../sound/dice.mp3"),
    totalPlayer: 0,
    totalDealer: 0,
    play: document.querySelector("#play"),
    stop: document.querySelector("#stop"),
    new: document.querySelector("#new"),
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
        if (dice.totalDealer < 17) {
            dice.totalDealer += dice.createDice("#dealer");
            document.querySelector("#score #dealerScore p").textContent = `Score Banque : ${dice.totalDealer}`
        }
    },
    stopGame: function () {
        dice.play.setAttribute("disabled", "")
        while (dice.totalDealer < 17) {
            dice.totalDealer += dice.createDice("#dealer");
            document.querySelector("#score #dealerScore p").textContent = `Score Banque : ${dice.totalDealer}`
        }
        if (dice.totalPlayer > 21) {
            message.show(`Et c'est perdu, tu as fait plus de 21 avec ton ${dice.totalPlayer}`, "error")
        } else if (dice.totalDealer > 21) {
            message.show(`Et c'est gagné ! La banque a fait plus de 21 avec son ${dice.totalDealer}`, "success")
        } else if (dice.totalDealer > dice.totalPlayer) {
            message.show(`Et c'est perdu, la banque as fait plus que ton ${dice.totalPlayer} avec ton ${dice.totalDealer}`, "error")
        } else if (dice.totalDealer === dice.totalPlayer) {
            message.show(`Et c'est perdu, la banque as fait autant que toi avec ${dice.totalDealer}`, "error")
        } else {
            message.show(`Et c'est gagné ! La banque as fait moins que ton ${dice.totalPlayer} avec son ${dice.totalDealer}`, "success")
        }
    },
    resetGame: function () {
        const allDice = document.querySelectorAll(".dice");
        for (const dice of allDice) {
            dice.remove();
        }
        dice.play.removeAttribute("disabled", "")
        dice.totalPlayer = 0;
        dice.totalDealer = 0;
        document.querySelector("#score #dealerScore p").textContent = `Score Banque : ${dice.totalDealer}`
        document.querySelector("#score #playerScore p").textContent = `Score Joueur : ${dice.totalPlayer}`

    }
}
