/* eslint-disable no-new */
// import Tooltip from 'tooltip.js';

// const TOOLTIP_ATTR = 'data-tooltip';
// const BOUNDARIES_ATTR = 'data-tooltip-boundaries';

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

  console.log({ cardMaxSlideDistance, maxSlideDistance });

  // let position = maxSlideDistance;
  window.position = 0;
  let startY;
  let startPosition;

  container.addEventListener('touchstart', handleTouchstart, false);
  container.addEventListener('touchmove', handleTouchmove, { passive: false });

  function handleTouchstart(evt) {
    const { pageY } = evt.touches[0];
    startY = pageY;
    startPosition = position;
    // console.log({ startY });
  }

  function handleTouchmove(evt) {
    evt.preventDefault();
    const { pageY } = evt.touches[0];
    const diff = pageY - startY;
    position = Math.max(Math.min(startPosition + diff, maxSlideDistance), 0);
    console.log({ position });
    draw();
  }

  function draw() {
    cards.forEach((card, index) => drawCard(card, index));
  }

  function drawCard(card, index) {
    // const cardMinMargin = calculateMinMargin({ index });
    // const marginBottom = Math.max(
    //   Math.min(cardMinMargin + position, maxMargin),
    //   cardMinMargin,
    // );
    // console.log({ cardMinMargin, marginBottom });
    const translateY = calculateTranslateY({ index });
    card.style.transform = `translateY(${translateY}px)`;
  }

  // function calculateMinMargin({ index }) {
  //   const reverseIndex = total - index - 1;
  //   if (reverseIndex < customTopCardsNumber) {
  //     return -(cardHeight * (1 / 4) * (reverseIndex + 1)).toFixed();
  //   }
  //   return -(cardHeight - minVisible);
  // }

  function calculateTranslateY({ index }) {
    const reverseIndex = total - index - 1;
    const defaultOffset = (cardHeight - minVisible) * index;
    const reversePosition = maxSlideDistance - position;
    const positionOffset =
      reversePosition < reverseIndex * cardMaxSlideDistance
        ? 0
        : Math.min(
            reverseIndex * cardMaxSlideDistance - reversePosition,
            cardMaxSlideDistance,
          );
    const offset = defaultOffset + positionOffset;
    console.log({
      position,
      reverseIndex,
      reversePosition,
      defaultOffset,
      positionOffset,
      offset,
    });
    return -offset;
  }

  function calculateMaxPosition() {
    return Array.from(cards).reduce((acc, _, index) => {
      // const maxMarginDiff = gutterHeight - calculateMinMargin({ index });
      return acc + cardMaxSlideDistance;
    }, 0);
  }

  draw();
  window.p = position;
  window.dd = draw;
}

export default init;
