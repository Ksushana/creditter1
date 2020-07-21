const CLASSES = {
  IDLE: 'payment-banks-template-wrapper',
  ACTIVE: 'payment-banks-template-wrapper--active',
};

function deactivateAllPayments() {
  const activePayments = Array.from(
    document.querySelectorAll(`.${CLASSES.ACTIVE}`),
  );

  if (!activePayments) {
    return false;
  }

  activePayments.forEach(element => {
    element.classList.remove(CLASSES.ACTIVE);
  });

  return null;
}

function init() {
  const paymentList = Array.from(document.querySelectorAll(`.${CLASSES.IDLE}`));

  if (paymentList) {
    paymentList.forEach(paymentElement => {
      paymentElement.addEventListener('click', event => {
        if (paymentElement.classList.contains(CLASSES.ACTIVE)) {
          event.preventDefault();
        } else {
          deactivateAllPayments();
          paymentElement.classList.add(CLASSES.ACTIVE);
        }
      });
    });
  }
}

export default init;
