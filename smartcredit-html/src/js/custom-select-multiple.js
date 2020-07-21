function init() {
  const nodes = document.querySelectorAll('.custom-select-multiple');

  if (nodes) {
    let checkedCount = 0;

    Array.from(nodes).forEach(node => {
      const resultInput = node.querySelector('.custom-select-multiple__input');
      const resetValue = node.querySelector(
        '.custom-select-multiple__value-reset',
      );
      const values = node.querySelectorAll('.custom-select-multiple__value');

      const setResultInput = () => {
        resultInput.textContent =
          checkedCount > 0
            ? `Выбрано: ${checkedCount}`
            : resetValue.textContent;
      };

      const resetAllChecked = () => {
        Array.from(values).forEach(valueElement => {
          const valueInputElement = valueElement.querySelector('input');

          if (valueInputElement) {
            valueInputElement.checked = false;
          }
        });

        checkedCount = 0;
      };

      if (resetValue && resultInput && values) {
        resetValue.addEventListener('click', () => {
          resetAllChecked();
          setResultInput();
        });

        Array.from(values).forEach(valueElement => {
          const valueInputElement = valueElement.querySelector('input');

          if (valueInputElement) {
            if (valueInputElement.checked) {
              checkedCount += 1;
            }

            valueInputElement.addEventListener('change', () => {
              if (valueInputElement.checked) {
                checkedCount += 1;
              } else {
                checkedCount -= 1;
              }

              setResultInput();
            });
          }
        });

        setResultInput();
      }

      node.addEventListener('click', () => {
        node.classList.toggle('is-open');
      });
    });
  }
}

export default init;
