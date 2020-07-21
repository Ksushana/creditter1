import customSelect from 'custom-select';

function init() {
  if (document.querySelector('.news-select__month')) {
    customSelect('.news-select__month');
  }

  if (document.querySelector('.news-select__year')) {
    customSelect('.news-select__year');
  }
}

export default init;
