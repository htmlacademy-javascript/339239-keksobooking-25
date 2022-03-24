const advertisementForm = document.querySelector('.ad-form');
const roomAmount = document.querySelector('#room_number');
const guestAmount = document.querySelector('#capacity');

const validationConfig = {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
};

const pristine = new Pristine(advertisementForm, validationConfig);

// Валидация стандартных полей
advertisementForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});

//Проверка, есть ли гости + 100 комнат
pristine.addValidator(roomAmount, () => {
  if(roomAmount.value === '100') {
    if(guestAmount.value === '0') {
      return true;
    }
  } else {
    return true;
  }
}, 'Если у жилья 100 комнат, то в нём нельзя размещать гостей');

//Проверка, больше ли гостей чем комнат
pristine.addValidator(roomAmount, () => {
  if((parseInt(roomAmount.value, 10) >= parseInt(guestAmount.value, 10))) {
    return true;
  }
}, 'Количество гостей не может превышать количество комнат.');

//Проверка, есть ли гости, если выбрано не 100 комнат
pristine.addValidator(roomAmount, () => {
  if(!(roomAmount.value !== '100' && guestAmount.value === '0')) {
    return true;
  }
}, 'Необходим как минимум один гость.');


