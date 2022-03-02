/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

//Массивы констант для генерации
const MAX_PRICE = 15000;

const MAX_ROOMS = 10;

const MAX_GUESTS = 30;

const CHECKIN_CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const OFFER_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const getRandomInteger = (smallestValue, greatestValue) => {
  // Проверки валидности аргументов
  if (smallestValue >= 0 && greatestValue > 0) {
    if (smallestValue <= greatestValue) {
      return Math.round(smallestValue + Math.random() * (greatestValue - smallestValue));
    }
    console.log('Ошибка! Первое значение диапазона должно быть меньше последнего');
  } else {
    console.log('Ошибка! В диапазоне не может быть отрицательных чисел.');
  }
};

const getRandomFloatingPoint = (smallestValue, greatestValue, resultPrecision) => {
  // Конвертируем переданную точность в формат для вычислений
  resultPrecision = 10**resultPrecision;

  // Проверки валидности аргументов
  if (smallestValue >= 0 && greatestValue > 0) {
    if (smallestValue <= greatestValue) {
      return Math.round((smallestValue + Math.random() * (greatestValue - smallestValue)) * resultPrecision) / resultPrecision;
    }
    console.log('Ошибка! Первое значение диапазона должно быть меньше последнего');
  } else {
    console.log('Ошибка! В диапазоне не может быть отрицательных чисел.');
  }
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length-1)];

const getOfferFeatures = () => {
  const features = [];
  for (let i = 0; i < OFFER_FEATURES.length - 1; i++) {
    //Если выдает единицу, то записываем в возвращаемый массив значение.
    //Может быть такое, что вернётся пустой массив, но в ТЗ не указано что так нельзя.
    //Да и это логично - может же быть предложение без всяких жизненных радостей вроде Wi-Fi
    if (getRandomInteger(0, 1) === 1) {
      features.push(OFFER_FEATURES[i]);
    }
  }
  return features;
};

const getAuthor = () => {
  let imageNumber = getRandomInteger(1, 10);
  if (imageNumber === 10) {
    imageNumber = `${imageNumber}`;
  } else {
    imageNumber = `0${imageNumber}`;
  }
  return {
    avatar: `img/avatars/user${imageNumber}.png`
  };
};

const getOffer = () => {
  const offer = {
    title: 'Заголовок, который меня попросили придумать самостоятельно',
    address: '',
    price: getRandomInteger(1, MAX_PRICE),
    type: getRandomArrayElement(OFFER_TYPE),
    rooms: getRandomInteger(1, MAX_ROOMS),
    guests: getRandomInteger(1, MAX_GUESTS),
    checkin: getRandomArrayElement(CHECKIN_CHECKOUT_TIME),
    checkout: getRandomArrayElement(CHECKIN_CHECKOUT_TIME),
    features: getOfferFeatures(),
    description: 'Описание, которое меня попросили придумать самостоятельно',
    photos: getRandomArrayElement(OFFER_PHOTOS),
  };
  return offer;
};

const getLocation = () => ({
  lat: getRandomFloatingPoint(35.65000, 35.70000, 5),
  lng: getRandomFloatingPoint(139.70000, 139.80000, 5),
});

const createAdvertisement = () => {
  const advertisement = {
    author: getAuthor(),
    offer: getOffer(),
    location: getLocation(),
  };

  //Временно записываем в адрес предложения координаты
  advertisement.offer.address = Object.values(advertisement.location).join(', ');

  return advertisement;
};

const advertisements = Array.from({length: 10}, createAdvertisement);
