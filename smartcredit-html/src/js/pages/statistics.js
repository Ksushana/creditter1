import flatpickr from 'flatpickr';
import customSelect from 'custom-select';

const Russian = require('flatpickr/dist/l10n/ru.js').default.ru;
// or import { Russian } from "flatpickr/dist/l10n/ru.js"
flatpickr.localize(Russian);

function init() {
  if (document.querySelector('.statistics-select')) {
    customSelect('.statistics-select');
  }

  if (document.querySelector('.statistics-datepicker')) {
    flatpickr.l10ns.default.rangeSeparator = '—';

    flatpickr('.statistics-datepicker', {
      mode: 'range',
      // disableMobile: 'true',
      dateFormat: 'd-m-Y',
      defaultDate: ['01-03-2019', '30-03-2019'],
    });
  }
}

export default init;
