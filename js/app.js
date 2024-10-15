import { dice } from '../js/dice.js';

const app = {
    init: function () {
        dice.play.addEventListener("click", dice.playGame);
        dice.stop.addEventListener("click", dice.stopGame);
        dice.new.addEventListener("click", dice.resetGame);
    }
}
app.init();
