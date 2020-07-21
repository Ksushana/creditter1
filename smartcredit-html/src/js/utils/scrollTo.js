/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  t -= 1;

  return (-c / 2) * (t * (t - 2) - 1) + b;
};

Math.easeInCubic = function(t, b, c, d) {
  const tc = (t /= d) * t * t;

  return b + c * tc;
};

Math.inOutQuintic = function(t, b, c, d) {
  const ts = (t /= d) * t;
  const tc = ts * t;

  return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
};

const requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

export default function scrollTo(to, duration, callback) {
  function move(amount) {
    document.documentElement.scrollTop = amount;
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
  }
  function position() {
    return (
      document.documentElement.scrollTop ||
      document.body.parentNode.scrollTop ||
      document.body.scrollTop
    );
  }
  const start = position();
  const change = to - start;
  const increment = 20;

  let currentTime = 0;

  duration = typeof duration === 'undefined' ? 500 : duration;

  const animateScroll = function() {
    currentTime += increment;

    const val = Math.easeInOutQuad(currentTime, start, change, duration);

    move(val);

    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else if (callback && typeof callback === 'function') {
      callback();
    }
  };

  animateScroll();
}
