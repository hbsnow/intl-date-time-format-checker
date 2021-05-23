import { proxy } from "valtio";

import { truncateSeconds } from "../utils/truncateSeconds";

type Store = {
  locale: {
    browser: string | undefined;
    form: string;
  };
  datetime: string;
  secounds: number;
  options: Intl.DateTimeFormatOptions[];
};

export const initialState: Store = {
  locale: {
    browser: undefined,
    form: "en-US",
  },
  datetime: truncateSeconds(new Date()),
  secounds: new Date().getSeconds(),
  options: [],
};

export const store = proxy<Store>(initialState);
