function getOffset(element) {
  const box = element.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft,
  };
}

export default function isScrolledIntoView(element) {
  const docViewTop =
    (document.documentElement && document.documentElement.scrollTop) ||
    document.body.scrollTop;
  const docViewBottom = docViewTop + window.innerHeight;

  const elemTop = getOffset(element).top;
  const elemBottom = elemTop + element.clientHeight;

  return elemBottom <= docViewBottom && elemTop >= docViewTop;
}

export function isScrolledOutOfView(element) {
  const docViewTop =
    (document.documentElement && document.documentElement.scrollTop) ||
    document.body.scrollTop;

  const elemTop = getOffset(element).top;
  const elemBottom = elemTop + element.clientHeight;

  return elemBottom < docViewTop;
}
