import React, { PropsWithChildren, useMemo } from "react";

import { classnames } from "tailwindcss-classnames";
import { useSnapshot } from "valtio";

import { store } from "../../stores/store";
import { IntlOptionViewer } from "../IntlOptionViewer";
import { IntlOutputViewer } from "../IntlOutputViewer/IntlOutputViewer";

export type Props = Readonly<
  PropsWithChildren<{
    options: Intl.DateTimeFormatOptions[];
  }>
>;

export const IntlList = (props: Props): JSX.Element => {
  const { options, children } = props;

  const snap = useSnapshot(store);

  const date = useMemo(() => {
    const date = new Date(snap.datetime);
    date.setSeconds(snap.secounds);

    return date;
  }, [snap.datetime, snap.secounds]);

  return (
    <div
      className={classnames(
        "grid",
        "xl:grid-cols-3",
        "2xl:grid-cols-4",
        "sm:grid-cols-2",
        "gap-4"
      )}
    >
      {children}
      {options.map((option, i) => (
        <div
          key={i}
          className={classnames(
            "flex",
            "flex-col",
            "shadow-md",
            "rounded",
            "bg-white"
          )}
        >
          <div
            className={classnames("flex-1", "rounded-t", "bg-gray-800", "p-2")}
          >
            <IntlOptionViewer option={option} />
          </div>

          <div
            className={classnames(
              "p-2",
              "grid",
              "grid-flow-row",
              "auto-rows-max",
              "gap-2"
            )}
          >
            <div>
              <IntlOutputViewer
                locale={snap.locale.browser}
                option={option}
                date={date}
              />
            </div>
            <div>
              <IntlOutputViewer
                locale={snap.locale.form}
                option={option}
                date={date}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
