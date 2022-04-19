import {sendUserAdvertisement} from './data-fetch.js';
import {showSuccessMessage, showErrorMessage} from './status-messages.js';
import {resetSlider} from './slider.js';
import {resetMap} from './render.js';

const MAX_PRICE = 100000;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const initialLocation = [35.6895, 139.69171];
const addressField = document.querySelector('#address');
const advertisementForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const avatarUploadField = advertisementForm.querySelector('#avatar');
const avatarPreview = advertisementForm.querySelector('.ad-form-header__preview').firstElementChild;
const imagesUploadField = advertisementForm.querySelector('#images');
const imagesPreview = advertisementForm.querySelector('.ad-form__photo');
const guestNumberField = advertisementForm.querySelector('#capacity');
const roomsNumberField = advertisementForm.querySelector('#room_number');
const accomodationTypeField = advertisementForm.querySelector('#type');
const accomodationPriceField = advertisementForm.querySelector('#price');
const timeFieldset = advertisementForm.querySelector('.ad-form__element--time');
const timeInField = timeFieldset.querySelector('#timein');
const timeOutField = timeFieldset.querySelector('#timeout');

const accomodationMinimalPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const accomodationPlaceholderPrices = {
  bungalow: 500,
  flat: 5000,
  hotel: 15000,
  house: 25000,
  palace: 50000,
};

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

let currentMinPrice = accomodationMinimalPrices.flat;

const pristine = new Pristine(advertisementForm, validationConfig);

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

//Устанавливаем плейсхолдер и возвращаем минимальную цену жилья в зависимости от его типа
const setAccomodationPrices = (type) => {
  accomodationPriceField.placeholder = accomodationPlaceholderPrices[type];
  return accomodationMinimalPrices[type];
};

const validatePrice = (value) => value >= currentMinPrice && value <= MAX_PRICE;

//Возвращаем соответствующее сообщение об ошибке в зависимости от выбора пользователя
const getGuestAmountError = () => {
  if (roomsNumberField.value === '100') {
    return 'В жилье с данным количеством комнат не могут быть размещены гости';
  } else if (guestNumberField.value === '0') {
    return 'Выберите количество гостей';
  }
  return 'Комнат не может быть меньше чем гостей';
};

const getAccomodationPriceError = () => {
  if (accomodationPriceField.value < currentMinPrice) {
    return `Минимальная цена для данного типа жилья составляет ${currentMinPrice} руб.`;
  } else {
    return `Цена не может быть выше ${MAX_PRICE} руб.`;
  }
};

//Функция проверки количества гостей
const validateGuests = (value) => guestsForRoomsAmount[roomsNumberField.value].includes(value);

const resetForm = () => {
  advertisementForm.reset();
  filterForm.reset();
  addressField.value = initialLocation.toString(', ');
  resetSlider();
};

//При успешной отправке формы
const onFormSendSuccess = () => {
  showSuccessMessage();
  resetForm();
  resetMap();
};

const setValidators = () => {
  //Валидация заголовка
  pristine.addValidator(
    advertisementForm.querySelector('#title'),
    validateTitle,
    'Длина заголовка должна быть от 30 до 100 символов'
  );

  pristine.addValidator(
    accomodationPriceField,
    validatePrice,
    getAccomodationPriceError
  );

  //Валидация количества комнат и гостей
  pristine.addValidator(
    guestNumberField,
    validateGuests,
    getGuestAmountError
  );
};

const setForm = () => {
  //Валидация цены за ночь
  accomodationTypeField.addEventListener('change', () => {
    //Как только меняется значение поля тип жилья, меняется минимальная цена
    currentMinPrice = setAccomodationPrices(accomodationTypeField.value);
  }
  );

  //Синхронизация времени заезда/выезда
  timeFieldset.addEventListener('change', (evt) => {
    if (evt.target === timeInField) {
      timeOutField.value = timeInField.value;
    } else {
      timeInField.value = timeOutField.value;
    }
  }
  );
  avatarUploadField.addEventListener('change', () => {
    const file = avatarUploadField.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      avatarPreview.src = URL.createObjectURL(file);
    }
  });

  imagesUploadField.addEventListener('change', () => {
    const file = imagesUploadField.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches && !(imagesPreview.children.length)) {
      const image = document.createElement('img');
      image.width = '70';
      image.height= '70';
      image.alt = 'Фотография жилья';
      image.src = URL.createObjectURL(file);
      imagesPreview.appendChild(image);
    } else {
      imagesPreview.firstElementChild.src = URL.createObjectURL(file);
    }
  });

  advertisementForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      sendUserAdvertisement(onFormSendSuccess, showErrorMessage, new FormData(evt.target));
    }
  });
};

export {setForm, setValidators, resetForm};
