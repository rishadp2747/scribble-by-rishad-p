const setToLocalStorage = store => {
  Object.keys(store).map(key =>
    localStorage.setItem(key, JSON.stringify(store[key]))
  );
};

const getFromLocalStorage = key => {
  return JSON.parse(localStorage.getItem(key));
};

export { setToLocalStorage, getFromLocalStorage };
