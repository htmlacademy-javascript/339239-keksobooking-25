const OFFER_TYPE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const offerCardTemplate = document.querySelector('#card').content;

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

const setOfferPhotos = (photos, photoSources) => {
  if (photoSources) {
    photos.querySelector('.popup__photo').classList.add('hidden');
    for (let i = 0; i < photoSources.length; i++) {
      const photoTemplate = photos.querySelector('.popup__photo').cloneNode(true);
      photoTemplate.classList.remove('hidden');
      photoTemplate.src = photoSources[i];
      photos.appendChild(photoTemplate);
    }
  } else {
    photos.classList.add('hidden');
  }
};

const setOfferFeatures = (featureList, features) => {
  if (features) {
    const featureElements = featureList.querySelectorAll('.popup__feature');
    const featureClasses = features.map((feature) => `popup__feature--${feature}`);
    featureElements.forEach((featureElement) => {
      if (!featureClasses.includes(featureElement.classList[1])) {
        featureElement.classList.add('hidden');
      }
    });
  } else {
    featureList.classList.add('hidden');
  }
};

const createOfferCard = (advertisement) => {
  const offerCard = offerCardTemplate.cloneNode(true);
  const offerCardContents = {
    avatar: offerCard.querySelector('.popup__avatar'),
    title: offerCard.querySelector('.popup__title'),
    address: offerCard.querySelector('.popup__text--address'),
    price: offerCard.querySelector('.popup__text--price'),
    type: offerCard.querySelector('.popup__type'),
    capacity: offerCard.querySelector('.popup__text--capacity'),
    time: offerCard.querySelector('.popup__text--time'),
    features: offerCard.querySelector('.popup__features'),
    description: offerCard.querySelector('.popup__description'),
    photos: offerCard.querySelector('.popup__photos')
  };

  offerCardContents.avatar.src = advertisement.author.avatar;
  offerCardContents.title.textContent = advertisement.offer.title;
  offerCardContents.address.textContent = advertisement.offer.address;
  offerCardContents.price.textContent = `${advertisement.offer.price} ₽/ночь`;
  offerCardContents.type.textContent = OFFER_TYPE[`${advertisement.offer.type}`];
  offerCardContents.capacity.textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;
  offerCardContents.time.textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;
  setOfferFeatures(offerCardContents.features, advertisement.offer.features);
  setOfferPhotos(offerCardContents.photos, advertisement.offer.photos);

  if (advertisement.offer.description) {
    offerCardContents.description.textContent = advertisement.offer.description;
  } else {
    offerCardContents.description.classList.add('hidden');
  }

  return offerCard;
};

const showErrorPopup = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('error-message');
  alertContainer.textContent = message;
  document.body.insertAdjacentElement('beforebegin', alertContainer);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const removeArrayElement = (array, valueToRemove) => array.filter((element) => valueToRemove !== element);

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {getRandomInteger, getRandomFloatingPoint, getRandomArrayElement, createOfferCard, showErrorPopup, isEscapeKey, removeArrayElement, debounce};
