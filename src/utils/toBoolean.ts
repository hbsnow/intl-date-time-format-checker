export const toBoolean = <T>(arg: T): T | boolean => {
  if (typeof arg === "string") {
    if (arg === "true") {
      return true;
    }

    if (arg === "false") {
      return false;
    }
  }
  return arg;
};
