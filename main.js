(function() {
    const timer = {
        DOMS: {
            startBtn: "#btn-start",
            stopBtn: "#btn-stop",
            resetBtn: "#btn-reset",
            hours: "#hours",
            minutes: "#minutes",
            seconds: "#seconds",
            timerRunning: false
        },
        frame: 0,
        sec: 0,
        min: 0,
        hour: 0,
        interval: null,
        intervalTime: 1000,
        timerRunning: false,
        timeStart: null,
        updatedTime: null,
        stoppedTime: null,
        laps: [],
        currentIndx: 0,
        timeDiff: 0,
        /**
         * Calculates the seconds, then returns seconds, minutes, and hours in an object
         * @param {number} seconds 
         * @param {number} minutes 
         * @param {number} hours 
         * @returns {object} false
         */
        countSec(seconds) {
            seconds = Math.floor(seconds)
            if (seconds >= 60){
                const result = countMin(minutes, hours);
                hours = result.hours
                minutes = result.minutes
            }
            this.formatNumber(seconds, this.DOMS.seconds);
            return false
        },
        /**
         * calculates the minutes, then returns minutes to the next in line
         * @param {number} minutes
         * @returns false 
         */
        countMin(minutes) {
            minutes = Math.floor(minutes)
            if (minutes >= 60) {
                minutes = 0;
            }
            this.formatNumber(minutes, this.DOMS.minutes);
            return false
        },
        /**
         * Calculates the hours, then returns it to the next in line
         * @param {number} hours 
         * @returns {number} hours
         */
        countHour(hours) {
            hours = Math.floor(hours)
            this.formatNumber(hours, this.DOMS.hours);
            return hours;
        },
        /**
         * Formats the numbers to look proper, also displays the numbers to the webpage
         * @param {number} number 
         * @param {DOM String} time 
         */
        formatNumber(number, time) {
            if (typeof(number) === 'number') {
                document.querySelector(time).textContent = number < 10 ? `0${number}` : `${number}`;
            } else {
                document.querySelector(time).textContent = `00`;
            }
        },
        timeDiffFunc() {
            this.diffTime = (this.updatedTime - this.laps[this.currentIndx].start) + this.timeDiff;
            timeObj = {
                sec: Number(this.diffTime / 1000),
                min: Number(this.diffTime / (1000 * 60)),
                hour: Number(this.diffTime / (1000 * 60 * 60))
            }
            return timeObj
        },
        updateUi (reset = false) {
            let _diff = null
            if(reset) {
                _diff = {
                    sec: 0,
                    min: 0,
                    hour: 0
                }
            } else {
                _diff = this.timeDiffFunc()
            }
            _sec = this.countSec(_diff.sec)
            _min = this.countMin(_diff.min)
            _hour = this.countHour(_diff.hour) 
        },
        update() {
            this.updatedTime = new Date().getTime()
            this.updateUi()
        },
        reset() {
            this.laps = []
            this.updateUi(true)
            this.timeStart = null
            this.countSec(0)
            this.countMin(0)
            this.countHour(0)
            this.timeDiff = 0
        },
        start() {
            if(this.interval) {
                return
            }
            if (this.laps.length > 0) {
                for (let i = 0; i < this.laps.length; i++) {
                    const item = this.laps[i];
                    this.timeDiff += item.diff
                }
            }

            this.currentIndx = this.laps.push({
                start:  new Date().getTime()
            }) - 1
            
            
            this.timeStart = new Date().getTime()
            
            this.interval = setInterval(() => { this.update()}, this.intervalTime)
        },
        stop() {
            clearInterval(this.interval)
            this.interval = null
            const _endTime = new Date().getTime()
            this.laps[this.currentIndx].end = _endTime
            this.laps[this.currentIndx].diff = _endTime - this.laps[this.currentIndx].start
            this.timeDiff = 0
        },
        setupEventListeners() {
            document.querySelector(this.DOMS.startBtn).addEventListener('click', () => {
                if(!this.timerRunning){ 
                    this.start();
                }
                this.timerRunning = true;
            });
            document.querySelector(timer.DOMS.stopBtn).addEventListener('click', () => {
                this.stop()
                this.timerRunning = false;
            });
            document.querySelector(this.DOMS.resetBtn).addEventListener('click', () => {
                if(this.timerRunning) {
                    alert('Stop timmer first.');
                    return false
                }
                this.reset()
            });
        }
    }
    return timer.setupEventListeners()
})();