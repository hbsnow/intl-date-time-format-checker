import React, { useEffect, useMemo, useState } from "react";

import { useSnapshot } from "valtio";

import { store } from "../../stores/store";

export type Props = Readonly<{
  options?: Intl.DateTimeFormatOptions;
}>;

const formatDate = (
  date: Date,
  locale: string | undefined,
  options: Intl.DateTimeFormatOptions
): string | JSX.Element => {
  try {
    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (e) {
    return <span className="text-red-600">[error]</span>;
  }
};

const optionsList = {
  dateStyle: ["full", "long", "medium", "short"],
  timeStyle: ["full", "long", "medium", "short"],
  // calendar: [
  //   "buddhist",
  //   "chinese",
  //   "coptic",
  //   "ethiopia",
  //   "ethiopic",
  //   "gregory",
  //   "hebrew",
  //   "indian",
  //   "islamic",
  //   "iso8601",
  //   "japanese",
  //   "persian",
  //   "roc",
  // ],
  // numberingSystem: [
  //   "arab",
  //   "arabext",
  //   "bali",
  //   "beng",
  //   "deva",
  //   "fullwide",
  //   "gujr",
  //   "guru",
  //   "hanidec",
  //   "khmr",
  //   "knda",
  //   "laoo",
  //   "latn",
  //   "limb",
  //   "mlym",
  //   "mong",
  //   "mymr",
  //   "orya",
  //   "tamldec",
  //   "telu",
  //   "thai",
  //   "tibt",
  // ],
  formatMatcher: ["basic", "best fit"],
  weekday: ["long", "short", "narrow"],
  era: ["long", "short", "narrow"],
  year: ["numeric", "2-digit"],
  month: ["numeric", "2-digit", "long", "short", "narrow"],
  day: ["numeric", "2-digit"],
  hour: ["numeric", "2-digit"],
  minute: ["numeric", "2-digit"],
  second: ["numeric", "2-digit"],
  fractionalSecondDigits: [0, 1, 2, 3],
  timeZoneName: ["long", "short"],
} as const;

export const IntlList = (): JSX.Element => {
  const [browserLocale, setBrowserLocale] = useState<string>();

  const snap = useSnapshot(store);

  const tableData = useMemo(() => {
    const keys = Object.keys(optionsList) as (keyof typeof optionsList)[];

    const date = new Date(snap.datetime);
    date.setSeconds(snap.secounds);

    const result = keys.flatMap((key) =>
      optionsList[key].map((value: string | number) => [
        JSON.stringify({ [key]: value }),
        formatDate(date, undefined, { [key]: value }),
        formatDate(date, snap.locale, { [key]: value }),
      ])
    );

    return result;
  }, [snap.locale, snap.datetime, snap.secounds]);

  useEffect(() => {
    setBrowserLocale(navigator.language);
  }, []);

  return (
    <table className="w-full text-left border-collapse divide-y overflow-hidden">
      <thead>
        <tr>
          <td className="w-1/5">options</td>
          <td className="w-2/5">{browserLocale}</td>
          <td className="w-2/5">{snap.locale}</td>
        </tr>
      </thead>
      <tbody>
        {tableData.map((record, j) => (
          <tr key={j}>
            {record.map((column, i) => (
              <td key={i}>
                <pre>{column}</pre>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
