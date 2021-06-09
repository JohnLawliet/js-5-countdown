"use strict";

var inputContainer = document.getElementById('input-container');
var countdownForm = document.getElementById('countdownForm');
var dateEl = document.getElementById('date-picker');
var countdownEl = document.getElementById('countdown');
var countdownElTitle = document.getElementById('countdown-title');
var countdownBtn = document.getElementById('countdown-button');
var timeElements = document.querySelectorAll('span');
var complete = document.getElementById("complete");
var completeTitle = document.getElementById("complete-title");
var completeInfo = document.getElementById("complete-info");
var completeBtn = document.getElementById("complete-button");
var countdownTitle = '';
var countdownDate = '';
var countdownValue = Date;
var countdownActive;
var savedCountdown;
var second = 1000;
var minute = second * 60;
var hour = minute * 60;
var day = hour * 24; //Set min date

var today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

var hideSwtich = function hideSwtich(hide, show) {
  hide.hidden = true;
  show.hidden = false;
}; //Getting the difference between current date and countdownDate


var updateDOM = function updateDOM() {
  //Hide input container show countdown
  hideSwtich(inputContainer, countdownEl);
  countdownActive = setInterval(function () {
    var now = new Date().getTime();
    var distance = countdownValue - now;
    days = Math.floor(distance / day);
    hours = Math.floor(distance % day / hour);
    minutes = Math.floor(distance % hour / minute);
    seconds = Math.floor(distance % minute / second);

    if (distance < 0) {
      //Hide Countdown and show complete            
      clearInterval(countdownActive);
      hideSwtich(countdownEl, complete);
      completeInfo.textContent = "Countdown completed on ".concat(countdownDate);
    } else {
      countdownElTitle.textContent = countdownTitle;
      timeElements[0].textContent = days;
      timeElements[1].textContent = hours;
      timeElements[2].textContent = minutes;
      timeElements[3].textContent = seconds;
    }
  }, second);
}; ////Take values from form input


var updateCountdown = function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));

  if (countdownDate === '') {
    alert("Empty date provided");
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}; //reset the counter


var reset = function reset() {
  //Hide Countdown & complete
  inputContainer.hidden = false;
  complete.hidden = true; //Show input container

  countdownEl.hidden = true;
  clearInterval(countdownActive);
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
};

var restorePreviousCountdown = function restorePreviousCountdown() {
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}; //Event listener


countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset); //Onloade

restorePreviousCountdown();