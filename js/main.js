/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
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

const getAuthor = () => {

};

const getOffer = () => {

};

const getLocation = () => {

};

const createBookingObject = () => ({
  author: getAuthor(),
  offer: getOffer(),
  location: getLocation(),
});
