{console.log('Hello world')
let time, seconds;

const DOMS = {
    startBtn: "#btn-start",
    hours: "#hours",
    minutes: "#minutes",
    seconds: "#seconds",
}

const countSec = () => {
    seconds++;
}

const updateTimer = (sec) => {
    document.querySelector(DOMS.seconds).textContent = sec;
}

const setupEventListeners = () => {
    seconds = 0;
    document.querySelector(DOMS.startBtn).addEventListener('click', () => {
        timer();
    });
}

const timer = () => {
    time = requestAnimationFrame(timer);
    updateTimer(Math.floor(seconds/60));
    countSec();
    console.log(Math.floor(seconds/60));
}

setupEventListeners();
}