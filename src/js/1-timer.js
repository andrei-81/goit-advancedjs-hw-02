
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
      const dateInPicker = selectedDates[0].getTime()
      const now = new Date();
      button.disabled = false
      if (dateInPicker <= now) {
        iziToast.error({
          title: 'Error',
          message: 'Please select a future date and time.',
        });
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    },
};

const dataSelector = document.querySelector("#datetime-picker")
const button = document.querySelector('[data-start]');
let intervalId = null
button.disabled = true;

const dataPick = flatpickr(dataSelector, options)

const timerElements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

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

button.addEventListener('click', function() {
  const selectedDate = new Date(dataSelector.value);
  if(Date.now() < selectedDate) {
    dataSelector.disabled = true;
    button.disabled = true;
    intervalId = setInterval(() => {
      const currentTime = new Date();
      const timeDifference = selectedDate - currentTime;
      if (timeDifference <= 0) {
        clearInterval(intervalId);
        iziToast.success({
          title: 'Timer Finished',
          message: 'The countdown has ended.',
        });
        dataSelector.disabled = false;
      } else {
        const timeArray = convertMs(timeDifference)
        for (const key in timerElements) {
          if (timerElements[key]) { 
            timerElements[key].textContent = timeArray[key].toString().padStart(2, '0')
          }
        }
      }
    }, 1000);
  }
})
