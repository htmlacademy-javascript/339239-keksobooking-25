const advertisementForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const setStateActive = () => {
  advertisementForm.classList.remove('ad-form--disabled');
  for (const formField of advertisementForm.children) {
    formField.classList.remove('disabled');
  }

  mapFilters.classList.remove('map__filters--disabled');
  for (const formField of mapFilters.children) {
    formField.classList.remove('disabled');
  }
};

const setStateDisabled = () => {
  advertisementForm.classList.add('ad-form--disabled');
  for (const formField of advertisementForm.children) {
    formField.classList.add('disabled');
  }

  mapFilters.classList.add('map__filters--disabled');
  for (const formField of mapFilters.children) {
    formField.classList.add('disabled');
  }
};

export {setStateActive, setStateDisabled};
