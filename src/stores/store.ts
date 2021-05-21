import { proxy } from "valtio";

import { formatDate } from "../utils/formatDate";

type Store = {
  locale: string;
  datetime: string;
  secounds: number;
};

export const initialState: Store = {
  locale: "en-US",
  datetime: formatDate(new Date()),
  secounds: new Date().getSeconds(),
};

export const store = proxy<Store>(initialState);
