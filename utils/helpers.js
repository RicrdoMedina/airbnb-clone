export const isEmpty = (value) => {
  if (value == null || value === 0 || value === "") {
    return true;
  }

  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  return false;
};

export const isNull = (value) => {
  return value === null;
};

export const isObject = (value) => {
  return typeof value === "object" && value !== null;
};

export const isUndefined = (value) => {
  return typeof value === "undefined";
};

export const isArray = (value) => {
  return Array.isArray(value);
};
