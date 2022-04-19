const getAdvertisements = (onSuccess, onFail) => fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((advertisements) => onSuccess(advertisements))
  .catch(() => onFail());

const sendUserAdvertisement = (onSuccess, onFail, body) => fetch('https://25.javascript.pages.academy/keksobooking',
  {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then((response) => {
    if(response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
  .catch(() => onFail());

export {getAdvertisements, sendUserAdvertisement};
