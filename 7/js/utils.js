const getRandomInteger = (smallestValue, greatestValue) => {
  // Проверки валидности аргументов
  if (smallestValue >= 0 && greatestValue > 0) {
    if (smallestValue <= greatestValue) {
      return Math.round(smallestValue + Math.random() * (greatestValue - smallestValue));
    }
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
  }
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length-1)];

export {getRandomInteger, getRandomFloatingPoint, getRandomArrayElement};
