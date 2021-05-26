export const toValue = <T>(arg: T): string => {
  if (typeof arg === "boolean") {
    return `${arg}`;
  }

  if (typeof arg === "number") {
    return `${arg}`;
  }

  return `"${arg}"`;
};
