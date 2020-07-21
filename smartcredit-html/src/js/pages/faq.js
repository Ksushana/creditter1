import List from 'list.js';

function init() {
  const CLASSES = {
    searchInput: 'question-search-field__input',
    list: 'faq-questions-search-list',
    values: 'faq-search-question',
  };

  const container = document.getElementById('faq-main-search');
  const searchInputElement = document.querySelector(`.${CLASSES.searchInput}`);

  if (container !== null && searchInputElement !== null) {
    const firstTabButton = container.querySelector('#all');

    searchInputElement.addEventListener('keyup', () => {
      firstTabButton.click();
    });

    // eslint-disable-next-line no-unused-vars
    const questionsList = new List(container, {
      valueNames: [CLASSES.values],
      listClass: CLASSES.list,
      searchClass: CLASSES.searchInput,
    });
  }
}

export default init;
