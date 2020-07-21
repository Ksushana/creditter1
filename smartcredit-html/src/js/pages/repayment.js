/* eslint-disable no-param-reassign */

import { formatThousands } from '../utils/formatNumber';
import { setInputFilter } from '../utils/inputFilter';

function init() {
  const repaymentInput = document.querySelector('.repayment-data-input');
  if (repaymentInput !== null) {
    const initialValue = repaymentInput.value;

    const startNumericInputValue = parseFloat(initialValue.replace(/\s+/g, ''));
    const suffix = repaymentInput.getAttribute('data-suffix') || '₽';

    repaymentInput.value = `${formatThousands(
      startNumericInputValue,
    )} ${suffix}`;

    setInputFilter(repaymentInput, value => {
      const numericValue = parseFloat(value.replace(/(\s+)/g, ''), 10);

      // eslint-disable-next-line no-useless-escape
      return value === '' || /^[0-9]+([,\.][0-9]+)?$/.test(numericValue);
    });

    repaymentInput.addEventListener('focus', event => {
      const parsedValue = parseFloat(
        event.target.value.replace(/(\s+)/g, ''),
        10,
      );

      setTimeout(() => {
        event.target.value = parsedValue;
      }, 100);
    });

    repaymentInput.addEventListener('blur', event => {
      const numericValue = event.target.value;

      event.target.value = `${formatThousands(numericValue)} ${suffix}`;
    });
  }

  const repaymentShowMoreButton = document.querySelector(
    '.repayment-show-more-button',
  );
  const repaymentPSElements = Array.from(
    document.querySelectorAll('.repayment-ps'),
  );

  if (repaymentShowMoreButton !== null) {
    repaymentShowMoreButton.addEventListener('click', event => {
      if (repaymentPSElements) {
        repaymentPSElements.forEach((element, index) => {
          if (index >= 4) {
            element.classList.add('repayment-ps--show');
          }
        });

        event.currentTarget.classList.add('hidden');
      }
    });
  }

  const CLASSES = {
    IDLE: 'repayment-ps',
    ACTIVE: 'repayment-ps--active',
  };

  function deactivateAllRepaymentPs() {
    const activeRepaymentPsList = Array.from(
      document.querySelectorAll(`.${CLASSES.ACTIVE}`),
    );

    if (activeRepaymentPsList.length <= 0) {
      return false;
    }

    activeRepaymentPsList.forEach(element => {
      element.classList.remove(CLASSES.ACTIVE);
    });

    return null;
  }

  const repaymentPsList = Array.from(
    document.querySelectorAll(`.${CLASSES.IDLE}`),
  );
  if (repaymentPsList && repaymentPsList.length > 0) {
    repaymentPsList.forEach(psElement => {
      psElement.addEventListener('click', event => {
        if (psElement.classList.contains(CLASSES.ACTIVE)) {
          event.preventDefault();
        } else {
          deactivateAllRepaymentPs();
          psElement.classList.add(CLASSES.ACTIVE);
        }
      });
    });
  }
}

export default init;
