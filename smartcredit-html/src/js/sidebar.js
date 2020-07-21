/* eslint-disable no-inner-declarations */
import closestParent from './utils/closestParent';

const CLASSES = {
  CONTAINER: 'sidebar-container',
  MENU: 'sidebar-menu-container',
  BUTTON: 'sidebar-menu-button',
  OPEN: 'is-opened',
};

function init() {
  const sideBarButton = document.querySelectorAll(`.${CLASSES.BUTTON}`);
  const sideBarContainer = document.querySelector(`.${CLASSES.CONTAINER}`);
  // const sideBarMenuContainer = document.querySelector(`.${CLASSES.MENU}`);

  if (sideBarButton && sideBarContainer) {
    function isSidebarOpened() {
      return sideBarContainer.classList.contains(CLASSES.OPEN);
    }

    function openSidebar() {
      document.documentElement.classList.add('is-nav-opened');
      sideBarContainer.classList.add(CLASSES.OPEN);
    }

    function closeSidebar() {
      document.documentElement.classList.remove('is-nav-opened');
      sideBarContainer.classList.remove(CLASSES.OPEN);
    }

    document.addEventListener('click', event => {
      if (
        closestParent(event.target, `.${CLASSES.MENU}`) !== null ||
        closestParent(event.target, `.${CLASSES.BUTTON}`) !== null
      ) {
        return;
      }

      if (isSidebarOpened()) {
        closeSidebar();
      }

      event.stopPropagation();
    });

    Array.from(sideBarButton).forEach(button => {
      button.addEventListener('click', () => {
        if (isSidebarOpened()) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    });
  }
}

export default init;
