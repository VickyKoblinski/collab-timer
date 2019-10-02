{console.log('Hello world')
let time, seconds, fullSec, miuntes;

const DOMS = {
    startBtn: "#btn-start",
    hours: "#hours",
    minute: "#minutes",
    seconds: "#seconds",
}

const formatNumber = (number, time) =>
{
    if (number < 10) {
        document.querySelector(time).textContent = `0${number}`;
    }
}

const countSec = () => {
    fullSec = Math.floor(seconds/20)
    seconds++;
    if (fullSec === 15){
        seconds = 0;
    }
}

const updateTimer = (sec) => {
    document.querySelector(DOMS.seconds).textContent = sec;
    formatNumber(fullSec, DOMS.seconds);
    if (sec === 14){
        miuntes++;
        document.querySelector(DOMS.minute).textContent = Math.floor(miuntes/20);
        formatNumber(minutes, DOMS.minute);
        console.log(minutes)
    }
}

const setupEventListeners = () => {
    seconds = 0;
    miuntes = 0;
    document.querySelector(DOMS.startBtn).addEventListener('click', () => {
        timer();
    });
}

const timer = () => {
    time = requestAnimationFrame(timer);
    updateTimer(fullSec);
    countSec();
    console.log(fullSec);
}

setupEventListeners();
}