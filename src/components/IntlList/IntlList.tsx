import React, { MouseEventHandler, PropsWithChildren, useMemo } from "react";

import { classnames } from "tailwindcss-classnames";
import { useSnapshot } from "valtio";

import { store } from "../../stores/store";
import { IntlOptionViewer } from "../IntlOptionViewer";
import { IntlOutputViewer } from "../IntlOutputViewer/IntlOutputViewer";

export type Props = Readonly<
  PropsWithChildren<{
    options: Intl.DateTimeFormatOptions[];
    deletable?: boolean;
  }>
>;

export const IntlList = (props: Props): JSX.Element => {
  const { options, deletable, children } = props;

  const snap = useSnapshot(store);

  const date = useMemo(() => {
    const date = new Date(snap.datetime);
    date.setSeconds(snap.secounds);

    return date;
  }, [snap.datetime, snap.secounds]);

  const handleDeleteClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const index = parseInt(e.currentTarget.value);

    store.options = store.options.filter((_, i) => i !== index);
  };

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
        <div key={i} className={classnames("relative")}>
          {deletable && (
            <button
              className={classnames(
                "absolute",
                "text-white",
                "right-2",
                "top-1",
                "focus:outline-none",
                "focus:text-indigo-300"
              )}
              value={i}
              onClick={handleDeleteClick}
            >
              <svg
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
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
              className={classnames(
                "flex-1",
                "rounded-t",
                "bg-gray-800",
                "p-2"
              )}
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
        </div>
      ))}
    </div>
  );
};
