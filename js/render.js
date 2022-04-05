import {setStateActive} from './states.js';

const addressField = document.querySelector('#address');

const OFFER_TYPE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const offerCardTemplate = document.querySelector('#card').content;
const map = L.map('map-canvas');
L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinSettings = {
  draggable: true,
  icon: mainPinIcon,
};

const regularPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const setOfferPhotos = (photos, photoSources) => {
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

const onMapLoad = () => {
  setStateActive();
  addressField.value = '35.6895, 139.69171';
};

map.on('load', onMapLoad).setView([35.6895, 139.69171], 13);

const mainPin = L.marker(
  {
    lat: 35.6895,
    lng: 139.69171,
  },
  mainPinSettings);

mainPin.addTo(map);

mainPin.on('moveend', (evt) => {
  addressField.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});
