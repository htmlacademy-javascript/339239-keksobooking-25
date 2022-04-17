import {isEscapeKey} from './utils.js';

const onSuccessMessageEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    closeSuccessMessageHandler();
  }
};

const onErrorMessageEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    closeErrorMessageHandler();
  }
};

function closeSuccessMessageHandler() {
  const successMessage = document.querySelector('.success');
  successMessage.classList.add('hidden');
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  document.removeEventListener('click', closeSuccessMessageHandler);
}

function showSuccessMessage() {
  const successMessage = document.querySelector('.success');
  successMessage.classList.remove('hidden');
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('click', closeSuccessMessageHandler);
}

function closeErrorMessageHandler() {
  const errorMessage = document.querySelector('.error');
  errorMessage.classList.add('hidden');
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  document.removeEventListener('click', closeErrorMessageHandler);
}

function showErrorMessage() {
  const errorMessage = document.querySelector('.error');
  errorMessage.classList.remove('hidden');
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', closeErrorMessageHandler);
}

export {showSuccessMessage, showErrorMessage};
