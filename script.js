const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')

const complete = document.getElementById("complete")
const completeTitle = document.getElementById("complete-title")
const completeInfo = document.getElementById("complete-info")
const completeBtn = document.getElementById("complete-button")

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date
let countdownActive
let savedCountdown

let second = 1000
let minute = second*60
let hour = minute*60
let day = hour*24

//Set min date
const today = new Date().toISOString().split("T")[0]
dateEl.setAttribute("min",today)


const hideSwtich = (hide, show) => {
    hide.hidden = true
    show.hidden = false
}

//Getting the difference between current date and countdownDate
const updateDOM = () => {
    //Hide input container show countdown
    hideSwtich(inputContainer, countdownEl)    

    countdownActive = setInterval(() => {
        const now = new Date().getTime()
        const distance = countdownValue - now
        days = Math.floor(distance/day)
        hours = Math.floor((distance%day) / hour)
        minutes = Math.floor((distance%hour) / minute)
        seconds = Math.floor((distance%minute) / second)

        if (distance < 0){
            //Hide Countdown and show complete            
            clearInterval(countdownActive)            
            hideSwtich(countdownEl, complete)
            completeInfo.textContent = `Countdown completed on ${countdownDate}`
        }
        else{
            countdownElTitle.textContent = countdownTitle
            timeElements[0].textContent = days
            timeElements[1].textContent = hours
            timeElements[2].textContent = minutes
            timeElements[3].textContent = seconds
        }        
    }, second)    
}

////Take values from form input
const updateCountdown = e => {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    }
    localStorage.setItem('countdown',JSON.stringify(savedCountdown))
    if (countdownDate===''){
        alert("Empty date provided")
    }
    else{
        countdownValue = new Date(countdownDate).getTime()
        updateDOM()
    }
}

//reset the counter
const reset = () => {
    //Hide Countdown & complete
    inputContainer.hidden = false
    complete.hidden = true
    //Show input container
    countdownEl.hidden = true
    clearInterval(countdownActive)
    countdownTitle = ''
    countdownDate = ''
    localStorage.removeItem('countdown')
}

const restorePreviousCountdown = () => {
    if (localStorage.getItem('countdown')){
        inputContainer.hidden = true
        savedCountdown = JSON.parse(localStorage.getItem('countdown'))
        countdownTitle = savedCountdown.title
        countdownDate = savedCountdown.date
        countdownValue = new Date(countdownDate).getTime()
        updateDOM()
    }
}

//Event listener
countdownForm.addEventListener('submit',updateCountdown)
countdownBtn.addEventListener('click',reset)
completeBtn.addEventListener('click',reset)

//Onloade
restorePreviousCountdown()