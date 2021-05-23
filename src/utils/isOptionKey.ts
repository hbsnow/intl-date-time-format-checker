import { optionKeys } from "../constants";

export const isOptionKey = (key: any): key is typeof optionKeys[number] => {
  return optionKeys.includes(key);
};
