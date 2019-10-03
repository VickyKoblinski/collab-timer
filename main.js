const fps = 60;

/**
 * An object to hold DOM strings
 */
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
 * Calculates the seconds, then returns seconds, minutes, and hours in an object
 * @param {number} frames 
 * @param {number} minutes 
 * @param {number} hours 
 * @returns {object} result
 */
const countSec = (frames, minutes, hours) => {
    frames++;
    const seconds = Math.floor(frames/fps)
    if (seconds >= 60){
        frames = 0;
        const result = countMin(minutes, hours);
        hours = result.hours
        minutes = result.minutes
    }
    formatNumber(seconds, DOMS.seconds);
    return { frames, minutes, hours };
}

/**
 * calculates the minutes, then returns hours and minutes to the next in line
 * @param {number} minutes 
 * @param {number} hours 
 * @returns {object} 
 */
const countMin = (minutes, hours) => {
    minutes++;
    if (minutes >= 60) {
        minutes = 0;
        hours = countHour(hours);
    }
    formatNumber(minutes, DOMS.minutes);
    return { minutes, hours };
}

/**
 * Calculates the hours, then returns it to the next in line
 * @param {number} hours 
 * @returns {number} hours
 */
const countHour = (hours) => {
    hours++;
    formatNumber(hours, DOMS.hours);
    return hours;
}

/**
 * Sets up event listeners
 */
const setupEventListeners = () => {
    let timerRunning = false;
    document.querySelector(DOMS.startBtn).addEventListener('click', () => {
        if(!timerRunning){ 
            timer(0, 0, 0);
        }
        timerRunning = true;
    });
}

/**
 * A function using requestAnimationFrame to gather the data to plug into the other functions
 */
const timer = (frames, minutes, hours) => {
    const finalResult = countSec(frames, minutes, hours);
    requestAnimationFrame(timer.bind(null, finalResult.frames, finalResult.minutes, finalResult.hours));
}

setupEventListeners();