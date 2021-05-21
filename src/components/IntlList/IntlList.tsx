import React, { useEffect, useMemo, useState } from "react";

import { classnames } from "tailwindcss-classnames";
import { useSnapshot } from "valtio";

import { datetimeOptionList } from "../../constants";
import { store } from "../../stores/store";
import { Chip } from "../Chip";

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

export const IntlList = (): JSX.Element => {
  const [browserLocale, setBrowserLocale] = useState<string>();

  const snap = useSnapshot(store);

  const listData = useMemo(() => {
    const keys = Object.keys(
      datetimeOptionList
    ) as (keyof typeof datetimeOptionList)[];

    const date = new Date(snap.datetime);
    date.setSeconds(snap.secounds);

    const result = keys.flatMap((key) =>
      datetimeOptionList[key].map((value: string | number) => ({
        options: { key, value },
        default: formatDate(date, undefined, { [key]: value }),
        form: formatDate(date, snap.locale, { [key]: value }),
      }))
    );

    return result;
  }, [snap.locale, snap.datetime, snap.secounds]);

  useEffect(() => {
    setBrowserLocale(navigator.language);
  }, []);

  return (
    <div
      className={classnames(
        "grid",
        "xl:grid-cols-4",
        "lg:grid-cols-3",
        "sm:grid-cols-2",
        "gap-4"
      )}
    >
      {listData.map((item, i) => (
        <div key={i} className={classnames("shadow-md", "rounded", "bg-white")}>
          <div className={classnames("p-2")}>
            <pre className={classnames("text-sm")}>
              <code>
                <span className={classnames("text-gray-400")}>{"{"}</span>
                {`
  `}
                <span className={classnames("text-green-500")}>
                  {item.options.key}
                </span>
                <span className={classnames("text-gray-400")}>: </span>
                <span className={classnames("text-green-700")}>
                  {item.options.value}
                </span>
                <span className={classnames("text-gray-400")}>,</span>
                {`
`}
                <span className={classnames("text-gray-400")}>{"}"}</span>
              </code>
            </pre>
          </div>
          <hr />
          <div
            className={classnames(
              "p-2",
              "grid",
              "grid-flow-row",
              "auto-rows-max",
              "gap-2"
            )}
          >
            <div className={classnames("flex", "space-x-2")}>
              <Chip title={browserLocale}>{browserLocale}</Chip>
              <span>{item.default}</span>
            </div>
            <div className={classnames("flex", "space-x-2")}>
              <Chip title={snap.locale}>{snap.locale}</Chip>{" "}
              <span>{item.form}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
