const setToSession = store => {
  Object.keys(store).map(key =>
    sessionStorage.setItem(key, JSON.stringify(store[key]))
  );
};

const getFromSession = key => {
  return JSON.parse(sessionStorage.getItem(key));
};

export { setToSession, getFromSession };
