const advertisementForm = document.querySelector('.ad-form');
const guestNumberField = advertisementForm.querySelector('#capacity');
const roomsNumberField = advertisementForm.querySelector('#room_number');

const validationConfig = {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
};

const guestsForRoomsAmount = {
  '100': ['0'],
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
};

const pristine = new Pristine(advertisementForm, validationConfig);

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

const validatePrice = (value) => value <= 100000;

//Возвращаем соответствующее сообщение об ошибке в зависимости от выбора пользователя
const getGuestAmountError = () => {
  if (roomsNumberField.value === '100') {
    return 'В жилье с данным количеством комнат не могут быть размещены гости';
  } else if (guestNumberField.value === '0') {
    return 'Выберите количество гостей';
  }
  return 'Комнат не может быть меньше чем гостей';
};

//Функция проверки количества гостей
const validateGuests = (value) => guestsForRoomsAmount[roomsNumberField.value].includes(value);

//Валидация заголовка
pristine.addValidator(
  advertisementForm.querySelector('#title'),
  validateTitle,
  'Длина заголовка должна быть от 30 до 100 символов'
);

//Валидация количества комнат и гостей
pristine.addValidator(
  guestNumberField,
  validateGuests,
  getGuestAmountError);

//Валидация цены за ночь
pristine.addValidator(
  advertisementForm.querySelector('#price'),
  validatePrice,
  'Цена не может быть выше 100000 руб.'
);

advertisementForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
