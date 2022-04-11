import {isEscapeKey} from './utils.js';

const successMessage = document.querySelector('.success');
const errorMessage = document.querySelector('.error');

//Код для сообщения об успехе
const onSuccessMessageEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    closeSuccessMessage();
  }
};

function closeSuccessMessage() {
  successMessage.classList.add('hidden');
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
}

function showSuccessMessage() {
  successMessage.classList.remove('hidden');
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
}

document.addEventListener('click', (evt) => {
  closeSuccessMessage(evt);
});

//Код для сообщения об ошибке
const onErrorMessageEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    closeErrorMessage();
  }
};

function closeErrorMessage() {
  errorMessage.classList.add('hidden');
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
}

function showErrorMessage() {
  errorMessage.classList.remove('hidden');
  document.addEventListener('keydown', onErrorMessageEscKeydown);
}

document.addEventListener('click', (evt) => {
  closeErrorMessage(evt);
});

export {showSuccessMessage, showErrorMessage};
