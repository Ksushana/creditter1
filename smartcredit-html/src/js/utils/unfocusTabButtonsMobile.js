/* eslint-disable no-inner-declarations */
const MOBILE_RES = '(max-width: 767px)';

function unfocusTabButtonOnMobile(selector) {
  const tabButtons = document.querySelectorAll(selector);

  if (tabButtons !== null) {
    const mql = window.matchMedia(MOBILE_RES);

    function handleFocusTabButtons(event) {
      event.currentTarget.blur();

      return null;
    }

    function handleMobileMatches({ matches }) {
      if (matches) {
        Array.from(tabButtons).forEach(btn => {
          btn.addEventListener('focus', handleFocusTabButtons);
        });
      } else {
        Array.from(tabButtons).forEach(btn => {
          btn.removeEventListener('focus', handleFocusTabButtons);
        });
      }

      return null;
    }

    handleMobileMatches(mql);
    mql.addListener(handleMobileMatches);
  }
}

export default unfocusTabButtonOnMobile;
