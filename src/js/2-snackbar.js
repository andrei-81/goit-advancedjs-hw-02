import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form')
const makePromise = ({ delay, shouldResolve = true }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
			if(shouldResolve) {
				resolve(`✅ Fulfilled promise in ${delay}ms`)
			} else {
				reject(`❌ Rejected promise in ${delay}ms`)
			}
		}, delay);
  });
};


form.addEventListener('submit', (event) => {
  event.preventDefault()
  const delayInput = form.elements.delay
  const stateRadios = form.elements.state
  const delay = Number(delayInput.value)
  let shouldResolve = true
  for (const radio of stateRadios) {
    if (radio.checked && radio.value === 'rejected') {
      shouldResolve = false
      break
    }
  }

  makePromise({ delay, shouldResolve })
    .then(result => iziToast.success({
      message: result}))
    .catch(error => iziToast.error({
      message: error}))
    // form.reset()
})