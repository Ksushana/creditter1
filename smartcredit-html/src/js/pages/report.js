import { isScrolledInTheMiddle } from './utils/isScrolledIntoView';

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

  function changeColor() {
    Array.from(icons).forEach(icon => {
      if (isScrolledInTheMiddle(icon)) {
        alert(1)
      }
    });
  }
  changeColor();
}

export default init;