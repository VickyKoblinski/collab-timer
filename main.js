let seconds, fullSec, fullMin, fullHour, timerRunning, minSwitch;
const fps = 60;

const DOMS = {
    startBtn: "#btn-start",
    hours: "#hours",
    minutes: "#minutes",
    seconds: "#seconds",
}

/**
 * Formats the numbers to look proper, also displays the numbers to the webpage
 * @param {number} number 
 * @param {DOM String} time 
 */
const formatNumber = (number, time) =>
{
    if (typeof(number) === 'number') {
        document.querySelector(time).textContent = number < 10 ? `0${number}` : `${number}`;
    } else {
        document.querySelector(time).textContent = `00`;
    }
}

/**
 * Counts the seconds, then resets to 0 when it reaches 60
 */
const countSec = () => {
    fullSec = Math.floor(seconds/fps)
    seconds++;
    if (fullSec === 60){
        seconds = 0;
    }
    formatNumber(fullSec, DOMS.seconds);
}

/**
 * Counts the minutes, then reset to 0 when it reaches 60
 */
const countMin = () => {
    fullMin++;
    minSwitch = false;
    if (fullMin === 60) {
        fullMin = 0;
        minSwitch = true;
    }
    formatNumber(fullMin, DOMS.minutes);
}

/**
 * Counts the hours, does not reset
 */
const countHour = () => {
    fullHour++;
    formatNumber(fullHour, DOMS.hours);
}

/**
 * Sets up event listeners
 */
const setupEventListeners = () => {
    seconds = 0;
    miuntes = 0;
    fullMin = 0;
    fullHour = 0;
    timerRunning = false;
    document.querySelector(DOMS.startBtn).addEventListener('click', () => {
        if(!timerRunning){ 
            timer();
        }
        timerRunning = true;
    });
}

/**
 * A function using requestAnimationFrame to gather the data to plug into the other functions
 */
const timer = () => {
    requestAnimationFrame(timer);
    countSec();
    if(fullSec === 60) {
        countMin();
        if (minSwitch) {
            countHour();
        }
    }
}

setupEventListeners();