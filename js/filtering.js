import {removeArrayElement} from './utils.js';
import {createAdvertisementPin} from './pins.js';

const filterForm = document.querySelector('.map__filters');
const MAX_ADVERTISEMENTS_RENDERED = 10;

const filterByType = (type) => (ad) => {
  if (type !== 'any'){
    return ad.offer.type === type;
  }
  return true;
};

const filterByPrice = (price) => (ad) =>
{
  if (price !== 'any'){
    switch (price) {
      case 'low':
        return ad.offer.price < 10000;
      case 'middle':
        return ad.offer.price >= 10000 && ad.offer.price < 50000;
      case 'high':
        return ad.offer.price >= 50000;
    }
  }
  return true;
};

const filterByRooms = (rooms) => (ad) =>
{
  if (rooms !== 'any'){
    return ad.offer.rooms.toString() === rooms;
  }
  return true;
};

const filterByGuests = (guests) => (ad) =>
{
  if (guests !== 'any'){
    return ad.offer.guests.toString() === guests;
  }
  return true;
};

const filterByFeatures = (features) => (ad) =>
{
  if (features.length){
    if (ad.offer.features) {
      for (let i = 0; i < features.length; i++) {
        if(!ad.offer.features.includes(features[i])) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  return true;
};

const getFilteredArray = (advertisementsToFilter, features) => {
  let filteredArray = advertisementsToFilter;
  const filterType = filterForm.querySelector('#housing-type').value;
  const filterPrice = filterForm.querySelector('#housing-price').value;
  const filterRooms = filterForm.querySelector('#housing-rooms').value;
  const filterGuests = filterForm.querySelector('#housing-guests').value;

  filteredArray = filteredArray
    .filter(filterByType(filterType))
    .filter(filterByPrice(filterPrice))
    .filter(filterByRooms(filterRooms))
    .filter(filterByGuests(filterGuests))
    .filter(filterByFeatures(features));

  return filteredArray;
};

const filtering = (advertisements, advertisementsLayer) => {
  const advertisementsToFilter = advertisements.slice();
  let features = [];
  // debugger;
  const setFilteredPins = (evt) => {
    if (evt.target.classList.contains('map__checkbox')) {
      if (!evt.target.classList.contains('checked')) {
        evt.target.classList.add('checked');
        features.push(evt.target.value);
      } else {
        evt.target.classList.remove('checked');
        features = removeArrayElement(features, evt.target.value);
      }
    }

    const advertisementsToRender = getFilteredArray(advertisementsToFilter, features).slice(0, MAX_ADVERTISEMENTS_RENDERED);
    advertisementsLayer.clearLayers();
    advertisementsToRender.forEach((advertisement) => {
      createAdvertisementPin(advertisement, advertisementsLayer);
    });
  };

  return setFilteredPins;
};

export {filtering};
