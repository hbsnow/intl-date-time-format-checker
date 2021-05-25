import React from "react";

import { classnames } from "tailwindcss-classnames";

export type Props = Readonly<{
  option: Intl.DateTimeFormatOptions;
}>;

export const IntlOptionViewer = (props: Props): JSX.Element => {
  const { option } = props;

  return (
    <pre className={classnames("text-sm", "bg-gray-800")}>
      <code>
        <span className={classnames("text-gray-400")}>{"{"}</span>
        {Object.entries(option).map(([key, value]) => {
          if (
            typeof value !== "string" &&
            typeof value !== "number" &&
            typeof value !== "boolean"
          ) {
            throw new Error(
              "error: type of value must be string or number or boolean"
            );
          }

          return (
            <span key={key}>
              {`\n  `}
              <span className={classnames("text-blue-50")}>{key}</span>
              <span className={classnames("text-gray-400")}>: </span>
              <span className={classnames("text-blue-300")}>{`${value}`}</span>
              <span className={classnames("text-gray-400")}>,</span>
            </span>
          );
        })}

        <span className={classnames("text-gray-400")}>{`\n}`}</span>
      </code>
    </pre>
  );
};
