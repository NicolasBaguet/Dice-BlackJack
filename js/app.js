import { dice } from '../js/dice.js';

const app = {
    init: function () {
        document.getElementById("play").addEventListener("click", dice.playGame);
        document.getElementById("stop").addEventListener("click", dice.stopGame);
    }
}
app.init();
