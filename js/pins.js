import {createOfferCard} from './utils.js';

const initialLocation = [35.6895, 139.69171];

const getMainPin = () => {
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinSettings = {
    draggable: true,
    icon: mainPinIcon,
  };

  const mainPin = L.marker(
    initialLocation,
    mainPinSettings
  );

  return mainPin;
};

const regularPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const regularPinSettings = {
  draggable: false,
  icon: regularPinIcon,
};

const createAdvertisementPin = (advertisement, advertisementsLayer) => {
  const advertisementPin = L.marker(
    advertisement.location,
    regularPinSettings
  );

  advertisementPin.addTo(advertisementsLayer).bindPopup(createOfferCard(advertisement));

  //По какой-то причине при повторном нажатии на балун попап был пустой, поэтому написал код ниже
  advertisementPin.addEventListener('click', () => {
    advertisementPin.setPopupContent(createOfferCard(advertisement));
  });
};

export {createAdvertisementPin, getMainPin};
