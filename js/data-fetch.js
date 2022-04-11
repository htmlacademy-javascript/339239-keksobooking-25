const getAdvertisements = (onSuccess, onFail) => fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((advertisements) => onSuccess(advertisements))
  .catch(() => onFail('Не удалось получить данные о существующих объявлениях. Попробуйте перезагрузить страницу.'));

const sendUserAdvertisement = (onSuccess, onFail, body) => fetch('https://25.javascript.pages.academy/keksobooking',
  {
    method: 'POST',
    body,
    //Почему-то из-за кода ниже сервер отдаёт пятисотку, поэтому пока оставил стандартный тип
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
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
