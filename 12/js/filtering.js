const filterByType = (settings) => (ad) => {
  if (settings.type !== 'any'){
    return ad.offer.type === settings.type;
  }
  return true;
};

const filterByPrice = (settings) => (ad) =>
{
  if (settings.price !== 'any'){
    switch (settings.price) {
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

const filterByRooms = (settings) => (ad) =>
{
  if (settings.rooms !== 'any'){
    return ad.offer.rooms.toString() === settings.rooms;
  }
  return true;
};

const filterByGuests = (settings) => (ad) =>
{
  if (settings.guests !== 'any'){
    return ad.offer.guests.toString() === settings.guests;
  }
  return true;
};

const filterByFeatures = (settings) => (ad) =>
{
  if (settings.features.length){
    if (ad.offer.features) {
      for (let i = 0; i < settings.features.length; i++) {
        if(!ad.offer.features.includes(settings.features[i])) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  return true;
};

const getFilteredArray = (features, filterSettings) => {
  let filteredArray = features.slice();
  filteredArray = filteredArray
    .filter(filterByType(filterSettings))
    .filter(filterByPrice(filterSettings))
    .filter(filterByRooms(filterSettings))
    .filter(filterByGuests(filterSettings))
    .filter(filterByFeatures(filterSettings));

  return filteredArray;
};

export {getFilteredArray};
