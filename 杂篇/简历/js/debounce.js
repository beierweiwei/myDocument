function debounce (fn, imd, time) {
  let timer = 0;
  return function () {
    if (imd) { 
      fn.apply(arguments);
      imd = false;
    }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn && fn.apply(arguments)
    }, time)
  }

}

function throttle (fn, time, imd) {
  let stp = 0; let gap = 0; let timer;
  return function () {
    const now = Date.now();

    if (stp) {
      gap = now - stp
      clearTimeout(timer)
      if (gap >= time) {
        fn.apply(this, arguments);
        stp = now;
        gap = 0;
      } else {
        timer = setTimeout(() => {
          fn();
          stp = now;
          gap = 0;
        }, time - gap)
      }
    } else {
      if (imd) {
        fn.apply(this, arguments)
      }
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        stp = now;
        gap = 0;
      }, time - gap)

      stp = now
    }


  }

}

const throttleFn = throttle(() => console.log('throttle test'), 1000, false);

const now = Date.now();
const timer = setInterval(() => {
  throttleFn()
  const _now = Date.now();
  const gap = _now - now;
  if (gap > 50) clearInterval(timer)
}, 200);

