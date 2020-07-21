/* eslint-disable no-undef */
const yamapsInit = () => {
  const CONTACTS_MAP_ID = 'contacts-map';
  const containerNode = document.getElementById(CONTACTS_MAP_ID);

  if (typeof ymaps !== 'undefined' && containerNode) {
    ymaps.ready(() => {
      const myMap = new ymaps.Map(
        CONTACTS_MAP_ID,
        {
          center: [55.711382, 37.658787],
          zoom: 16,
          controls: [],
        },
        {
          searchControlProvider: 'yandex#search',
        },
      );

      const placemark = new ymaps.Placemark(
        [55.711382, 37.658787],
        {},
        {
          balloonCloseButton: false,
          hideIconOnBalloonOpen: false,
          iconLayout: 'default#image',
          iconShape: {
            type: 'Circle',
            coordinates: [0, 0],
            radius: 32,
          },
          iconImageHref: 'icons/placemark.svg',
          iconImageSize: [32, 48],
          iconImageOffset: [-16, -48],
        },
      );

      myMap.geoObjects.add(placemark);
    });
  }

  return null;
};

function init() {
  yamapsInit();
}

export default init;
