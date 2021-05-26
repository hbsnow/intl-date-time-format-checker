export const fixType = <T extends string>(
  arg: T
): string | number | boolean => {
  if (typeof arg === "string") {
    if (arg === "true") {
      return true;
    }

    if (arg === "false") {
      return false;
    }

    if (/[0-9]+/g.test(arg)) {
      return parseInt(arg);
    }
  }

  return `${arg}`;
};
