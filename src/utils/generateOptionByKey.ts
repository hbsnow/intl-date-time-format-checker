import { optionKeys, options } from "../constants";

export const generateOptionByKey = (
  optionKey: typeof optionKeys[number]
): Intl.DateTimeFormatOptions[] => {
  const option = Object.keys(options)
    .filter((key) => key === optionKey)
    .flatMap((key) => {
      if (key !== optionKey) {
        throw new Error("error: key is incorrect");
      }

      return options[key].map((value: unknown) => {
        if (typeof value !== "string" && typeof value !== "number") {
          throw new Error("error: value is incorrect");
        }

        return {
          [key]: value,
        };
      });
    });

  return option;
};
