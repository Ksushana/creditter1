/* eslint-disable no-param-reassign */
import closestParent from './utils/closestParent';

function init() {
  const tableElementList = Array.from(document.querySelectorAll('.lk-table'));
  if (tableElementList && tableElementList.length > 0) {
    const handleToggleLoansDetails = event => {
      const loansHistoryItem = closestParent(
        event.currentTarget,
        '.lk-table__row',
      );
      if (loansHistoryItem) {
        loansHistoryItem.classList.toggle('lk-table__row--active');
      }
    };

    const loansHistoryStatusElementList = Array.from(
      document.querySelectorAll('[data-toggle-table-details]'),
    );
    if (
      loansHistoryStatusElementList &&
      Array.isArray(loansHistoryStatusElementList)
    ) {
      loansHistoryStatusElementList.forEach(element => {
        element.addEventListener('click', handleToggleLoansDetails);
      });
    }
  }
}

export default init;
