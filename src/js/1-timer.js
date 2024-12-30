
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates, instance) {
      dateInPicker = selectedDates[0].getTime()
      button.disabled = false
    },
};

var dateInPicker = Date.now()
const dataSelector = document.querySelector("#datetime-picker")
const timerElement = document.querySelector('.value');
const timerElements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const button = document.querySelector('[data-start]');
let intervalId = null

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  
  // Remaining days
  const days = Math.floor(ms / day)
  // Remaining hours
  const hours = Math.floor((ms % day) / hour)
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute)
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second)
  
  return { days, hours, minutes, seconds }
}


const dataPick = flatpickr(dataSelector, options)

button.addEventListener('click', function() {
  button.disabled = true
  clearInterval(intervalId)
  const fixedDate = dateInPicker
  if(Date.now() >= fixedDate) {
    iziToast.error({
      title: 'Wrong date',
      message: 'Please choose a date in the future'})
      return
  }
  intervalId = setInterval(() => {
    const timeArray = convertMs(fixedDate - Date.now())
    if (Date.now() >= fixedDate) {
      clearInterval(intervalId)
      iziToast.success({
        title: 'Done',
        message: 'Time!'})
    } else {
    for (const key in timerElements) {
      if (timerElements[key]) { 
          timerElements[key].textContent = timeArray[key].toString().padStart(2, '0')
      }
    }
  }
  }, 1000)

})