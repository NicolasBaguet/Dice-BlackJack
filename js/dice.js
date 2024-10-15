import { message } from '../js/message.js';

export const dice = {
    audio: new Audio("../sound/dice.mp3"),
    totalPlayer: 0,
    totalDealer: 0,
    launcheDice: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    createDice: function (targetSelector) {
        let divDice = document.createElement("div");
        divDice.classList.add("dice");
        document.querySelector(targetSelector).append(divDice)
        const random6 = dice.launcheDice(0, 5);
        console.log(random6 + 1);
        divDice.style.backgroundPositionX = (-random6 * 100) + 'px';
        return random6 + 1;
    },
    playGame: function () {
        dice.audio.play();
        dice.totalPlayer += dice.createDice("#player");
        if (dice.totalDealer < 17) {
            dice.totalDealer += dice.createDice("#dealer");
        }
    },
    stopGame: function () {
        while (dice.totalDealer < 17) {
            dice.totalDealer += dice.createDice("#dealer");
        }
        if (dice.totalDealer > 21) {
            message.show(`Et c'est gagné ! La banque a fait plus de 21 avec son ${dice.totalDealer}`, success)
        }
        if (dice.totalPlayer > 21) {
            message.show(`Et c'est perdu, tu as fait plus de 21 avec ton ${dice.totalPlayer}`, error)
        } else if (dice.totalDealer > dice.totalPlayer) {
            message.show(`Et c'est perdu, la banque as fait plus que ton ${dice.totalPlayer} avec ton ${dice.totalDealer}`, error)
        } else if (dice.totalDealer === dice.totalPlayer) {
            message.show(`Et c'est perdu, la banque as fait autant que toi avec ${dice.totalDealer}`, error)
        } else {
            message.show(`Et c'est gagné ! La banque as fait moins que ton ${dice.totalPlayer} avec ton ${dice.totalDealer}`, success)
        }

    },
    resetGame: function () {
        document.querySelectorAll(".dice").remove();
    }
}
