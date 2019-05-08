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
    seconds = workTime * 60
    countdown = 0
    isPaused = true
    isBreak = true
})

// Timer handles countdown magic
const timer = () => {
    seconds--
    if (seconds < 0) {
        clearInterval(countdown)
        alarm.currentTime = 0
        alarm.play()
        seconds = (isBreak ? breakTime : workTime) * 60
        isBreak = !isBreak
    }
}

// Update WORK and BREAK times
let increment = 5

let incrementFunctions =
{
    "#work-plus": () => { workTime = Math.min(workTime + increment, 60) },
    "#work-minus": () => { workTime = Math.max(workTime - increment, 5) },
    "#break-plus": () => { breakTime = Math.min(breakTime + increment, 60) },
    "#break-minus": () => { breakTime = Math.max(breakTime - increment, 5) }
}

for (var key in incrementFunctions) {
    if (incrementFunctions.hasOwnProperty(key)) {
        document.querySelector(key).onclick = incrementFunctions[key]
    }
}

// Update HTML content
const countdownDisplay = () => {
    let minutes = Math.floor(seconds / 60)
    let remainderSeconds = seconds % 60
    timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
}

const buttonDisplay = () => {
    if (isPaused && countdown == 0) {
        startBtn.textContent = "START"
    } else if (isPaused && countdown !== 0) {
        startBtn.textContent = "Continue"
    } else {
        startBtn.textContent = "Pause"
    }
}

const updateHTML = () => {
    countdownDisplay()
    buttonDisplay()
    isBreak ? status.textContent = "Keep Working" : status.textContent = "Take a Break!"
    workMin.textContent = workTime
    breakMin.textContent = breakTime
}

window.setInterval(updateHTML, 100)

document.onclick = updateHTML