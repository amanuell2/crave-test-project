export const idGenerator = () => Math.random().toString(36).substr(2, 9);

export const getLocalStorageItem = (key) => {
  return localStorage.getItem(key);
};

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, value);
};
