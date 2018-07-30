export const setLocalStorage = (type, value) => {
  localStorage.setItem(type, JSON.stringify(value));
};
export const getLocalStorage = type => {
  const value = localStorage.getItem(type);
  return value && JSON.parse(value);
};
