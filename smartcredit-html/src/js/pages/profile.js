import customSelect from 'custom-select';

function init() {
  if (document.querySelector('.profile-select')) {
    customSelect('.profile-select');
  }
}

export default init;
