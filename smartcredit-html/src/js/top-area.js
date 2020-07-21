import { isScrolledOutOfView } from './utils/isScrolledIntoView';
import closestParent from './utils/closestParent';
import getWindowScrollTop from './utils/getWindowScrollTop';
import scrollTo from './utils/scrollTo';

const CLASSES = {
  CONTAINER: 'top-area-container',
  BUTTON: 'top-area-link',
  OPEN: 'is-opened',
};

function init() {
  const topAreaContainer = document.querySelector(`.${CLASSES.CONTAINER}`);
  const topAreaButton = document.querySelectorAll(`.${CLASSES.BUTTON}`);

  if (topAreaContainer === null || topAreaButton === null) {
    return null;
  }

  function isAreaOpened() {
    return topAreaContainer.classList.contains(CLASSES.OPEN);
  }

  function openTopArea() {
    if (getWindowScrollTop() > 0) {
      scrollTo(0, 300, () => {
        topAreaContainer.classList.add(CLASSES.OPEN);
      });
    } else {
      topAreaContainer.classList.add(CLASSES.OPEN);
    }
  }

  function closeTopArea() {
    topAreaContainer.classList.remove(CLASSES.OPEN);
  }

  Array.from(topAreaButton).forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      const tabButton = document.getElementById(id);
      const isActiveTab = tabButton.getAttribute('aria-selected') === 'true';

      if (isAreaOpened() && isActiveTab) {
        closeTopArea();

        return false;
      }

      openTopArea();

      if (tabButton) {
        tabButton.click();
      }

      return null;
    });
  });

  document.addEventListener('click', event => {
    if (
      closestParent(event.target, `.${CLASSES.CONTAINER}`) !== null ||
      closestParent(event.target, `.${CLASSES.BUTTON}`) !== null
    ) {
      return;
    }

    if (isAreaOpened()) {
      closeTopArea();
    }

    event.stopPropagation();
  });

  let scheduledAnimationFrame = false;
  function handleWindowScroll() {
    if (isScrolledOutOfView(topAreaContainer) && isAreaOpened()) {
      closeTopArea();
    }

    scheduledAnimationFrame = false;
  }

  function handleWindowScrollRAF() {
    if (scheduledAnimationFrame) {
      return;
    }

    scheduledAnimationFrame = true;
    requestAnimationFrame(handleWindowScroll);
  }

  window.addEventListener('scroll', handleWindowScrollRAF);

  return null;
}

export default init;
