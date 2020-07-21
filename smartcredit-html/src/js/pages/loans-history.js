/* eslint-disable no-param-reassign */

function init() {
  const mql = window.matchMedia('(max-width: 480px)');

  const fullDateElements = Array.from(document.querySelectorAll('.with-date'));

  if (fullDateElements && fullDateElements.length > 0) {
    fullDateElements.forEach(element => {
      const month = element.getAttribute('data-month');

      if (!month) {
        const monthValue = element.textContent.split(' ')[1];

        element.setAttribute('data-month', monthValue);
      }
    });

    const handleMobileMatches = ({ matches }) => {
      if (matches) {
        fullDateElements.forEach(element => {
          const splittedContent = element.textContent.split(' ');
          const month = element.getAttribute('data-month');

          if (month && splittedContent.length === 3) {
            element.textContent = `${splittedContent[0]} ${month.slice(
              0,
              3,
            )}. ${splittedContent[2]}`;
          }
        });
      } else {
        fullDateElements.forEach(element => {
          const splittedContent = element.textContent.split(' ');
          const month = element.getAttribute('data-month');

          if (month && splittedContent.length === 3) {
            element.textContent = `${splittedContent[0]} ${month} ${
              splittedContent[2]
            }`;
          }
        });
      }

      return null;
    };

    handleMobileMatches(mql);
    mql.addListener(handleMobileMatches);
  }
}

export default init;
