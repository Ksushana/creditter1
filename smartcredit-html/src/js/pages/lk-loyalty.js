function init() {
  const questionsTitleElement = document.querySelector(
    '.lk-loyalty-questions__title',
  );
  const questionsListElement = document.querySelector(
    '.lk-loyalty-questions-list',
  );

  if (questionsTitleElement && questionsListElement) {
    questionsTitleElement.addEventListener('click', () => {
      questionsListElement.classList.toggle('hidden');
      questionsListElement.classList.add('animated', 'fadeIn');
    });
  }
}

export default init;
