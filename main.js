{console.log('Hello world')
let time, seconds, fullSec, fullMin, fullHour, clicked, turned;
const frame = 60;

const DOMS = {
    startBtn: "#btn-start",
    hours: "#hours",
    minutes: "#minutes",
    seconds: "#seconds",
}

const formatNumber = (number, time) =>
{
    if (typeof(number) === 'number' && !NaN) {
        if (number < 10) {
            document.querySelector(time).textContent = `0${number}`;
        } else {
            document.querySelector(time).textContent = `${number}`;
        }
    } else {
        document.querySelector(time).textContent = `00`;
    }
}

const countSec = () => {
    fullSec = Math.floor(seconds/frame)
    seconds++;
    if (fullSec === 60){
        seconds = 0;
    }
    formatNumber(fullSec, DOMS.seconds);
}

const countMin = () => {
    fullMin++;
    turned = false;
    if (fullMin === 60) {
        fullMin = 0;
        turned = true;
    }
    formatNumber(fullMin, DOMS.minutes);
}
const countHour = () => {
    fullHour++;
    if (fullHour === 24) {
        fullHour = 0;
    }
    formatNumber(fullHour, DOMS.hours);
}

const setupEventListeners = () => {
    seconds = 0;
    miuntes = 0;
    fullMin = 0;
    fullHour = 0;
    clicked = false;
    document.querySelector(DOMS.startBtn).addEventListener('click', () => {
        if(!clicked){ 
            timer();
        }
        clicked = true;
    });
}

const timer = () => {
    time = requestAnimationFrame(timer);
    countSec();
    if(fullSec === 60) {
        countMin();
        if (turned) {
            countHour();
        }
    }
   // console.log(fullSec);
    //console.log(fullMin);
    console.log(fullHour);
}

setupEventListeners();
}