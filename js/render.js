const OFFER_TYPE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const offerCardTemplate = document.querySelector('#card').content;


const setOfferPhotos = (photos, photoSources) => {
  // Можно было бы обойтись без этого условия, но сказано скрывать именно соответствующий блок,
  // что, строго говоря, не подходит (без этого условия при передаче пустого массива будут скрыты дети блока, но не он сам).
  // Надеюсь, правильно понял, что требовалось.
  if (photoSources.length) {
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
  // Аналогично setOfferPhotos
  if (features.length) {
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

export {createOfferCard};
