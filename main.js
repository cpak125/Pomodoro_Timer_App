let countdown = 0 // variable to set/clear intervals
let seconds = 1500 // seconds left on clock
let workTime = 25
let breakTime = 5
let isBreak = true
let isPaused = true

const status = document.querySelector("#status")
const timerDisplay = document.querySelector(".timerDisplay")
const startBtn = document.querySelector("#start-btn")
const resetBtn = document.querySelector("#reset")
const workMin = document.querySelector("#work-min")
const breakMin = document.querySelector("#break-min")

const alarm = document.createElement('audio') // bell sound will play when the timer reaches 0
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3")

// Event listeners for START and RESET buttons
startBtn.addEventListener('click', () => {
    clearInterval(countdown)
    isPaused = !isPaused
    if (!isPaused) {
        countdown = setInterval(timer, 1000)
    }
})

resetBtn.addEventListener('click', () => {
    clearInterval(countdown)
    seconds = worktime * 60
    countdown = 0
    isPaused = true
    isBreak = true
})

// Timer handles countdown
const timer = () => {
    seconds--
    if(seconds < 0){
        clearInterval(countdown)
        alarm.currentTime = 0
        alarm.play()
        seconds = (isBreak ? breakTime : workTime) * 60
        isBreak = !isBreak
    }
}

