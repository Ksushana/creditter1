/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
import unfocusTabButtonsMobile from '../utils/unfocusTabButtonsMobile';

function setUrlWithParams(url, params = {}) {
  const urlObject = new URL(url);

  Object.keys(params).forEach(key =>
    urlObject.searchParams.append(key, params[key]),
  );

  return urlObject;
}

function initSearchMap() {
  const searchInput = document.querySelector('#contact-point-search');

  if (typeof ymaps !== 'undefined' && searchInput) {
    let myMap;
    let objectManager;

    ymaps.ready(() => {
      searchInput.value = '';

      ymaps.geolocation
        .get({
          mapStateAutoApply: true,
          provider: 'auto',
        })
        .then(res => {
          const containerElement = document.querySelector(
            '#how-payment-contact-map',
          );
          const controls = {
            controls: ['geolocationControl', 'typeSelector', 'zoomControl'],
            behaviors: ['drag'],
          };
          const bounds = res.geoObjects.get(0).properties.get('boundedBy');
          const mapState = ymaps.util.bounds.getCenterAndZoom(bounds, [
            containerElement.offsetWidth,
            containerElement.offsetHeight,
          ]);

          const suggestView = new ymaps.SuggestView('contact-point-search');

          myMap = new ymaps.Map(
            'how-payment-contact-map',
            Object.assign(mapState, controls),
          );
          objectManager = new ymaps.ObjectManager({
            clusterize: true,
            gridSize: 32,
          });

          objectManager.objects.options.set('preset', 'islands#blueIcon');
          objectManager.clusters.options.set(
            'preset',
            'islands#invertedBlueClusterIcons',
          );

          myMap.geoObjects.add(objectManager);

          fetch('https://smartcredit.ru/contact/points')
            .then(data => data.json())
            .then(data => {
              objectManager.add({
                type: 'FeatureCollection',
                features: data,
              });
            });

          suggestView.state.events.add('change', () => {
            const activeIndex = suggestView.state.get('activeIndex');

            if (typeof activeIndex === 'number') {
              const activeItem = suggestView.state.get('items')[activeIndex];

              const geocode = ymaps.geocode(activeItem.value);
              geocode.then(geocodeRes => {
                const position = geocodeRes.geoObjects
                  .get(0)
                  .geometry.getCoordinates();

                myMap.setCenter(position, 15);
              });
            }
          });
        });
    });

    function clearMap() {
      myMap.geoObjects.each(geoObject => {
        myMap.geoObjects.remove(geoObject);
      });
    }

    function setObjectManagerOnMap(data) {
      const newObjectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32,
      });

      newObjectManager.objects.options.set('preset', 'islands#blueIcon');
      newObjectManager.clusters.options.set(
        'preset',
        'islands#invertedBlueClusterIcons',
      );

      myMap.geoObjects.add(newObjectManager);

      newObjectManager.add({
        type: 'FeatureCollection',
        features: data,
      });
    }

    document
      .getElementById('contact-pos-in-btn')
      .addEventListener('click', () => {
        clearMap();
        fetch(
          setUrlWithParams('https://smartcredit.ru/contact/points', {
            type: 'in',
          }),
        )
          .then(data => data.json())
          .then(data => {
            setObjectManagerOnMap(data);
          });
      });

    document
      .getElementById('contact-pos-out-btn')
      .addEventListener('click', () => {
        clearMap();
        fetch(
          setUrlWithParams('https://smartcredit.ru/contact/points', {
            type: 'out',
          }),
        )
          .then(data => data.json())
          .then(data => {
            setObjectManagerOnMap(data);
          });
      });

    document
      .getElementById('contact-pos-in-out-btn')
      .addEventListener('click', () => {
        clearMap();
        fetch(
          setUrlWithParams('https://smartcredit.ru/contact/points', {
            type: 'in-out',
          }),
        )
          .then(data => data.json())
          .then(data => {
            setObjectManagerOnMap(data);
          });
      });
  }
}

function init() {
  initSearchMap();

  unfocusTabButtonsMobile('.ctabs-tablist__item');
}

export default init;
