import customSelect from 'custom-select';

function init() {
  if (document.querySelector('.new-ticket-select')) {
    const selectInstances = customSelect('.new-ticket-select');
    selectInstances.forEach(instance => {
      const selectElement = instance.select;

      const openerElement = selectElement.parentElement.querySelector(
        '.custom-select-opener',
      );

      if (selectElement && openerElement) {
        const initialValue = instance.value;
        const firstPlaceHolderValue = selectElement.options[0].value;

        if (initialValue === firstPlaceHolderValue) {
          openerElement.classList.add('custom-select-opener--placeholder');
        }

        selectElement.addEventListener('change', event => {
          const { value } = event.target;

          if (openerElement && value === firstPlaceHolderValue) {
            openerElement.classList.add('custom-select-opener--placeholder');
          } else {
            openerElement.classList.remove('custom-select-opener--placeholder');
          }
        });
      }
    });
  }
}

export default init;
