/* eslint-disable no-param-reassign */
import noUiSlider from 'nouislider';
import customSelect from 'custom-select';

import { formatThousands } from '../utils/formatNumber';
import { setInputFilter } from '../utils/inputFilter';

const STEPS_BY_TYPE = {
  amount: {
    min: [5000],
    '33%': [100000, 1000],
    '66%': [300000, 1000],
    max: [500000],
  },
  date: {
    min: [5],
    '33%': [30],
    '66%': [90],
    max: [180],
  },
};

function init() {
  const applicationChooses = document.querySelectorAll('.application-choose');
  if (applicationChooses) {
    Array.from(applicationChooses).forEach(chooseBlock => {
      const min = parseInt(chooseBlock.getAttribute('data-min'), 10);
      const max = parseInt(chooseBlock.getAttribute('data-max'), 10);
      const step = parseInt(chooseBlock.getAttribute('data-step'), 10);
      const type = chooseBlock.getAttribute('data-type');
      const range = STEPS_BY_TYPE[type] || { min, max };

      const chooseInput = chooseBlock.querySelector(
        '.application-choose__value-number',
      );
      const chooseSlider = chooseBlock.querySelector('.choose-slider');

      const suffix = chooseBlock.querySelector(
        '.application-choose__value-suffix',
      ).textContent;

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

      chooseNoUiSlider = noUiSlider.create(chooseSlider, {
        start: [startNumericInputValue],
        connect: 'lower',
        range,
        step,
        pips: {
          mode: 'positions',
          values: [0, 33, 66, 100],
          density: 33,
        },
      });

      chooseNoUiSlider.on('update', (values, handle) => {
        const current = Math.round(chooseInput.value);
        const next = Math.round(values[handle]);

        if (current !== next) {
          chooseInput.value = `${formatThousands(next)} ${suffix}`;
        }
      });

      const pips = chooseSlider.querySelectorAll('.noUi-value');

      function handleClickOnPip() {
        chooseNoUiSlider.set(Number(this.getAttribute('data-value')));
      }

      for (let i = 0; i < pips.length; i += 1) {
        pips[i].addEventListener('click', handleClickOnPip);
      }
    });
  }

  if (document.querySelector('.application-select')) {
    customSelect('.application-select');
  }

  const documentUploadInputs = document.querySelectorAll(
    '.document-uploader__field-input',
  );
  if (documentUploadInputs !== null) {
    Array.from(documentUploadInputs).forEach(input => {
      input.addEventListener('change', event => {
        if (input.files[0]) {
          input.parentElement.classList.add(
            'document-uploader__field--uploaded',
          );
        }
      });
    });
  }
}

export default init;
