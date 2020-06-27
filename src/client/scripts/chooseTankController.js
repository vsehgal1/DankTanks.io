import { getTank, getTurret } from './assets';

const Constants = require('../../shared/constants');
const { TANK, PLAYER_RADIUS } = Constants;

var tankStyle = 0;
var styles = Object.values(TANK);

const chooseTankCanvas = document.getElementById("choose-tank-canvas");
const context = chooseTankCanvas.getContext('2d');

const prevButton = document.getElementById("prev-tank-button");
const nextButton = document.getElementById("next-tank-button");

function updateChooseTankDisplay() {
    context.clearRect(0, 0, 100, 100);
    context.save()
    context.translate(50, 50);
    context.drawImage(
        getTank(styles[tankStyle]),
        -PLAYER_RADIUS,
        -PLAYER_RADIUS,
        PLAYER_RADIUS * 2,
        PLAYER_RADIUS * 2,
    );
    context.drawImage(
        getTurret(styles[tankStyle]),
        -12.5,
        -25,
        25,
        40,
    );
    context.restore();
}

function handlePrevTankButton() {
    tankStyle = (tankStyle > 0) ? tankStyle - 1 : styles.length - 1;
    updateChooseTankDisplay();
}

function handleNextTankButton() {
    tankStyle = (tankStyle < styles.length - 1) ? tankStyle + 1 : 0;
    updateChooseTankDisplay();
}

export function initChooseTankController() {
    chooseTankCanvas.width = 100;
    chooseTankCanvas.height = 100;
    prevButton.onclick = handlePrevTankButton;
    nextButton.onclick = handleNextTankButton;
    updateChooseTankDisplay();
}

export function getTankStyle() {
    return styles[tankStyle];
}