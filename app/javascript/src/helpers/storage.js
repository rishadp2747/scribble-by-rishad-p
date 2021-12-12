const setToLocalStorage = store => {
  Object.keys(store).map(key =>
    localStorage.setItem(key, JSON.stringify(store[key]))
  );
};

const getFromLocalStorage = key => {
  return JSON.parse(localStorage.getItem(key));
};

const clearLocalStorage = (keys = null) => {
  if (!keys) {
    localStorage.clear();
  } else {
    keys.map(key => localStorage.removeItem(key));
  }
};

export { setToLocalStorage, getFromLocalStorage, clearLocalStorage };
