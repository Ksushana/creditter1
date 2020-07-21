/* eslint-disable no-param-reassign */
import noUiSlider from 'nouislider';

import { formatThousands } from '../utils/formatNumber';
import { setInputFilter } from '../utils/inputFilter';

function init() {
  const mql = window.matchMedia('(max-width: 480px)');

  const totalsSuffixes = document.querySelectorAll(
    '.totals-item__value-suffix',
  );
  function handleMobileMatches({ matches }) {
    if (matches) {
      Array.from(totalsSuffixes).forEach(suffix => {
        const title = suffix.getAttribute('title');

        if (title) {
          suffix.textContent = `${title.slice(0, 3)}.`;
        }
      });
    } else {
      Array.from(totalsSuffixes).forEach(suffix => {
        const title = suffix.getAttribute('title');

        if (title) {
          suffix.textContent = title;
        }
      });
    }

    return null;
  }

  handleMobileMatches(mql);
  mql.addListener(handleMobileMatches);

  const chooses = document.querySelectorAll('.chooses__block');
  if (chooses) {
    Array.from(chooses).forEach(chooseBlock => {
      const min = parseInt(chooseBlock.getAttribute('data-min'), 10);
      const max = parseInt(chooseBlock.getAttribute('data-max'), 10);
      const step = parseInt(chooseBlock.getAttribute('data-step'), 10);

      const chooseInput = chooseBlock.querySelector('.choose-field__input');
      const chooseSlider = chooseBlock.querySelector('.choose-slider');

      if (!chooseInput || !chooseSlider) {
        return null;
      }

      const suffix = chooseBlock.querySelector('.choose-field__suffix')
        .textContent;

      let chooseNoUiSlider = null;
      const startNumericInputValue = parseInt(chooseInput.value, 10);

      chooseInput.value = `${formatThousands(
        startNumericInputValue,
      )} ${suffix}`;

      setInputFilter(chooseInput, value => {
        const numericValue = parseInt(value, 10);

        return (
          value === '' || (/^\d*$/.test(numericValue) && numericValue <= max)
        );
      });
      chooseInput.addEventListener('focus', event => {
        event.target.value = parseInt(
          event.target.value.replace(/\s+/g, ''),
          10,
        );
      });
      chooseInput.addEventListener('blur', event => {
        const numericValue = event.target.value;
        event.target.value = `${formatThousands(numericValue)} ${suffix}`;

        if (chooseNoUiSlider) {
          const current = Math.round(chooseNoUiSlider.get());
          const next = Math.round(numericValue);

          if (current !== next) {
            chooseNoUiSlider.set(next);
          }
        }
      });

      chooseNoUiSlider = noUiSlider.create(chooseSlider, {
        start: [startNumericInputValue],
        connect: 'lower',
        range: { min, max },
        step,
      });

      chooseNoUiSlider.on('update', (values, handle) => {
        const current = Math.round(chooseInput.value);
        const next = Math.round(values[handle]);

        if (current !== next) {
          chooseInput.value = `${formatThousands(next)} ${suffix}`;
        }
      });

      return null;
    });
  }
}

export default init;
