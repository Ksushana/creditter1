import { Swiper } from 'swiper/dist/js/swiper.esm';

// If need use modules from Swiper
// Swiper.use([Navigation, Pagination, Scrollbar]);

let sliderInstances = [];

const mobileSliders = [
  {
    selector: '.about-advantages__content',
    options: {
      loop: false,
      initialSlide: 0,
      slidesPerView: 'auto',
      centeredSlides: true,
      wrapperClass: 'about-advantages-list',
      slideClass: 'about-advantages-list__item',
    },
  },
  {
    selector: '.about-media__content',
    options: {
      loop: false,
      initialSlide: 0,
      slidesPerView: 'auto',
      centeredSlides: true,
      wrapperClass: 'media-list',
      slideClass: 'media-list__item',
    },
  },
  {
    selector: '.news-content--horizontal',
    options: {
      loop: false,
      initialSlide: 0,
      slidesPerView: 'auto',
      centeredSlides: true,
      wrapperClass: 'news-list',
      slideClass: 'news-list__item',
    },
  },
  {
    selector: '.disclosure-juristic-documents',
    options: {
      loop: false,
      initialSlide: 0,
      slidesPerView: 'auto',
      centeredSlides: false,
      wrapperClass: 'disclosure-juristic-documents__tabs',
      slideClass: 'ctabs-tablist__item',
    },
  },
  {
    selector: '.how-payment-contact__tabs',
    options: {
      loop: false,
      initialSlide: 0,
      slidesPerView: 'auto',
      centeredSlides: false,
      wrapperClass: 'how-payment-contact__tablist',
      slideClass: 'how-payment-contact__tablist-item',
    },
  },
  {
    selector: '.how-tariffs__content',
    options: {
      loop: false,
      initialSlide: 0,
      slidesPerView: 'auto',
      centeredSlides: false,
      wrapperClass: 'how-tariffs-list',
      slideClass: 'how-tariffs-list__item',
    },
  },
  {
    selector: '.faq-tabs',
    options: {
      loop: false,
      initialSlide: 0,
      slidesPerView: 'auto',
      centeredSlides: false,
      wrapperClass: 'faq-tabs__tablist',
      slideClass: 'faq-tabs__tablist-item',
    },
  },
  {
    selector: '.advantages',
    options: {
      loop: false,
      initialSlide: 0,
      slidesPerView: 'auto',
      centeredSlides: false,
      wrapperClass: 'advantages-list',
      slideClass: 'advantages-list__item',
    },
  },
  {
    selector: '.history-bad-reasons-wrapper',
    options: {
      loop: false,
      initialSlide: 0,
      slidesPerView: 1,
      centeredSlides: true,
      wrapperClass: 'history-bad-reasons-list',
      slideClass: 'history-bad-reasons-list__item',
    },
  },
];

function handleWindowResize() {
  const { matches: isMobile } = window.matchMedia('(max-width: 767px)');

  if (isMobile && sliderInstances.length === 0) {
    mobileSliders.forEach(({ selector, options }) => {
      const selectorInstance = document.querySelector(selector);
      if (selectorInstance === null) {
        return false;
      }

      const instance = new Swiper(selector, options);

      sliderInstances.push(instance);

      return null;
    });
  } else if (!isMobile && sliderInstances.length > 0) {
    sliderInstances.forEach(instance => {
      instance.destroy();
    });

    sliderInstances = [];
  }

  if (isMobile && sliderInstances.length > 0) {
    sliderInstances.forEach(sliderInstance => sliderInstance.update());
  }
}

function init() {
  handleWindowResize();
  window.addEventListener('resize', handleWindowResize);
}

export default init;
