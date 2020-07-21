export default function getWindowScrollTop() {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    (document.body && document.body.scrollTop)
  );
}
