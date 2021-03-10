import { isScrolledInTheMiddle } from '../utils/isScrolledIntoView';

const CLASSES = {
  CONTAINER: 'report-charts__line-icon',
  SVG: 'report-charts__line-icon svg',
  ISACTIVE: 'is-active',
};

function init() {
  const icons = document.querySelectorAll(`.${CLASSES.CONTAINER}`);

  if (icons === null) {
    return null;
  }

  function handleWindowScroll() {
    document.addEventListener('scroll', () => {
      Array.from(icons).forEach(icon => {
        if (isScrolledInTheMiddle(icon)) {
          icon.classList.add('is-orange');
        } else {
          icon.classList.remove('is-orange');
        }
      });
    })
  }
  handleWindowScroll();
}

export default init;