import closestParent from './utils/closestParent';

const CLASSES = {
  IDLE: 'lk-dropdown',
  OPENED: 'lk-dropdown--opened',
  TRIGGER: 'lk-dropdown__trigger',
  CONTENT: 'lk-dropdown__content',
};

function init() {
  const dropdownList = Array.from(
    document.querySelectorAll(`.${CLASSES.IDLE}`),
  );

  if (dropdownList && dropdownList.length > 0) {
    dropdownList.forEach(dropdownElement => {
      const triggerElement = dropdownElement.querySelector(
        `.${CLASSES.TRIGGER}`,
      );
      if (triggerElement) {
        document.addEventListener('click', event => {
          const { target } = event;

          if (
            target === triggerElement ||
            closestParent(target, `.${CLASSES.TRIGGER}`) === triggerElement
          ) {
            dropdownElement.classList.toggle(CLASSES.OPENED);
          } else {
            dropdownElement.classList.remove(CLASSES.OPENED);
          }
        });
      }
    });
  }
}

export default init;
