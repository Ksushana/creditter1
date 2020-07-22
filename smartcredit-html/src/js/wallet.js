/* eslint-disable no-new */

function init() {
  const container = document.querySelector('.application-cards-list');
  const cards = document.querySelectorAll('.application-cards-list li');
  const total = cards.length;
  if (!total) {
    return;
  }

  const cardHeight = cards[0].offsetHeight;
  const gutterHeight = 10;
  const maxMargin = gutterHeight;
  const minVisible = 2;
  const minInvisible = 12;
  const cardMaxSlideDistance = cardHeight - minVisible - minInvisible;
  const customTopCardsNumber = 2;
  const maxSlideDistance = calculateMaxPosition();
  const minCollapseablePosition = cardMaxSlideDistance * 2.5;

  let position = minCollapseablePosition;
  let startY;
  let startPosition;

  container.addEventListener('touchstart', handleTouchstart, false);
  container.addEventListener('touchmove', handleTouchmove, { passive: false });

  function handleTouchstart(evt) {
    const { pageY } = evt.touches[0];
    startY = pageY;
    startPosition = position;
  }

  function handleTouchmove(evt) {
    evt.preventDefault();
    const { pageY } = evt.touches[0];
    const diff = pageY - startY;
    position = Math.max(
      Math.min(startPosition + diff, maxSlideDistance),
      minCollapseablePosition,
    );
    draw();
  }

  function draw() {
    cards.forEach((card, index) => drawCard(card, index));
  }

  function drawCard(card, index) {
    const translateY = calculateTranslateY({ index });
    card.style.transform = `translateY(${translateY}px)`;
  }

  function calculateTranslateY({ index }) {
    const reverseIndex = total - index - 1;
    const defaultOffset = (cardHeight - minVisible) * index;
    const maxPositionDiff =
      maxSlideDistance - cardMaxSlideDistance * reverseIndex;
    const positionDiff = Math.max(
      Math.min(
        position - cardMaxSlideDistance * (reverseIndex + 1),
        maxPositionDiff,
      ),
      0,
    );
    const offset = defaultOffset - positionDiff;
    return -offset;
  }

  function calculateMaxPosition() {
    return cardMaxSlideDistance * total;
  }

  draw();
  window.p = position;
  window.dd = draw;
}

export default init;
