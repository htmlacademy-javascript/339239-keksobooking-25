const priceField = document.querySelector('#price');
const priceSlider = document.querySelector('.ad-form__slider');

const resetSlider = () => {
  priceSlider.noUiSlider.updateOptions({
    start: 0
  });
};

noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return value;
    },
  }
});

priceSlider.noUiSlider.on('update', () => {
  priceField.value = priceSlider.noUiSlider.get();
});

priceField.addEventListener('change', () => {
  priceSlider.noUiSlider.updateOptions({
    start: priceField.value
  });
});

export {resetSlider};
