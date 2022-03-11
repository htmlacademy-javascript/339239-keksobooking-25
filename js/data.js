import {getRandomInteger, getRandomFloatingPoint, getRandomArrayElement} from './utils.js';

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

function getOffer (location) {
  const offer = {
    title: 'Заголовок, который меня попросили придумать самостоятельно',
    address: Object.values(location).join(', '),
    price: getRandomInteger(1, MAX_PRICE),
    type: getRandomArrayElement(OFFER_TYPE),
    rooms: getRandomInteger(1, MAX_ROOMS),
    guests: getRandomInteger(1, MAX_GUESTS),
    checkin: getRandomArrayElement(CHECKIN_CHECKOUT_TIME),
    checkout: getRandomArrayElement(CHECKIN_CHECKOUT_TIME),
    features: OFFER_FEATURES.slice(0, getRandomInteger(0, OFFER_FEATURES.length - 1)),
    description: 'Описание, которое меня попросили придумать самостоятельно',
    photos: Array.from({length: getRandomInteger(0, OFFER_PHOTOS.length)}, (_, index) => OFFER_PHOTOS[index]),
  };
  return offer;
}

const createAdvertisement = (_, index = 0) => {
  const advertisementLocation = {
    lat: getRandomFloatingPoint(35.65000, 35.70000, 5),
    lng: getRandomFloatingPoint(139.70000, 139.80000, 5),
  };
  const advertisement = {
    author: {avatar: index === 9 ? `img/avatars/user${index+1}.png}` : `img/avatars/user0${index+1}.png}`},
    location: advertisementLocation,
    offer: getOffer(advertisementLocation),
  };

  return advertisement;
};

export {createAdvertisement};
