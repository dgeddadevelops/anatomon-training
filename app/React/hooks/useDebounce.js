function useDebounce(fn, delay) {
  let tm;

  return function (...args) {
    clearTimeout(tm);
    tm = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export default useDebounce;
