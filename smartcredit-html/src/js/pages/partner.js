/* eslint-disable no-param-reassign */
import noUiSlider from 'nouislider';

import { formatThousands } from '../utils/formatNumber';
import { setInputFilter } from '../utils/inputFilter';

function init() {
  const completedCounts = document.querySelectorAll(
    '.partner-calculator-form__counts',
  );
  if (completedCounts) {
    Array.from(completedCounts).forEach(completedCountsBlock => {
      const min = parseInt(completedCountsBlock.getAttribute('data-min'), 10);
      const max = parseInt(completedCountsBlock.getAttribute('data-max'), 10);
      const step = parseInt(completedCountsBlock.getAttribute('data-step'), 10);

      const calculatorInput = completedCountsBlock.querySelector(
        '.partner-calculator-form__counts-field__input',
      );
      const calculatorSlider = completedCountsBlock.querySelector(
        '.choose-slider',
      );

      const calculatorResultValue = completedCountsBlock.parentElement.querySelector(
        '.partner-calculator-form__result-value',
      );

      if (!calculatorInput || !calculatorSlider) {
        return null;
      }

      let calculatorNoUiSlider = null;
      const startNumericInputValue = parseInt(calculatorInput.value, 10);

      calculatorInput.value = formatThousands(startNumericInputValue);

      setInputFilter(calculatorInput, value => {
        const numericValue = parseInt(value, 10);

        return (
          value === '' || (/^\d*$/.test(numericValue) && numericValue <= max)
        );
      });
      calculatorInput.addEventListener('focus', event => {
        event.target.value = parseInt(
          event.target.value.replace(/\s+/g, ''),
          10,
        );
      });
      calculatorInput.addEventListener('blur', event => {
        const numericValue = event.target.value;
        event.target.value = formatThousands(numericValue);

        if (calculatorNoUiSlider) {
          const current = Math.round(calculatorNoUiSlider.get());
          const next = Math.round(numericValue);

          if (current !== next) {
            calculatorNoUiSlider.set(next);
          }
        }
      });

      calculatorNoUiSlider = noUiSlider.create(calculatorSlider, {
        start: [startNumericInputValue],
        connect: 'lower',
        range: { min, max },
        step,
      });

      calculatorNoUiSlider.on('update', (values, handle) => {
        const current = Math.round(calculatorInput.value);
        const next = Math.round(values[handle]);

        if (current !== next) {
          calculatorInput.value = formatThousands(next);

          if (calculatorResultValue) {
            const coefficient = parseInt(
              calculatorResultValue.getAttribute('data-coefficient') || 1,
              10,
            );
            calculatorResultValue.textContent = formatThousands(
              next * coefficient,
            );
          }
        }
      });

      return null;
    });
  }
}

export default init;
