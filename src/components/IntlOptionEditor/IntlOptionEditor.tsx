import React, {
  ChangeEventHandler,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";

import { classnames } from "tailwindcss-classnames";

import { optionKeys, options } from "../../constants";
import { Button } from "../../elements/Button";
import { isOptionKey } from "../../utils/isOptionKey";

export type Props = Readonly<{
  option: Intl.DateTimeFormatOptions;
  setOption: Dispatch<SetStateAction<Intl.DateTimeFormatOptions>>;
}>;

export const IntlOptionEditor = (props: Props): JSX.Element => {
  const { option, setOption } = props;

  const [selectedKey, setSelectedKey] = useState(optionKeys[0]);
  const [selectedValue, setSelectedValue] = useState<string | number | boolean>(
    options[optionKeys[0]][0]
  );

  const handleKeyChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const key = e.currentTarget.value;
    if (!isOptionKey(key)) {
      throw new Error("error: key must be option key");
    }

    setSelectedKey(key);
    setSelectedValue(options[key][0]);
  };

  const handleValueChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.currentTarget.value;

    if (typeof value !== "string" && typeof value !== "number") {
      throw new Error("error: type of value must be string or number");
    }

    setSelectedValue(value);
  };

  const handleSubmitClick: MouseEventHandler<HTMLButtonElement> = () => {
    setOption((prevState) => ({
      ...prevState,
      [selectedKey]: selectedValue,
    }));
  };

  const handleRemoveClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const key = e.currentTarget.value as keyof Intl.DateTimeFormatOptions;
    setOption((prevState) => {
      delete prevState[key];

      return { ...prevState };
    });
  };

  return (
    <div
      className={classnames(
        "grid",
        "grid-flow-row",
        "auto-rows-max",
        "text-sm",
        "bg-gray-800",
        "gap-2"
      )}
    >
      <div>
        <code className={classnames("text-gray-400", "block")}>{"{"}</code>
        {Object.entries(option).map(([key, value]) => {
          if (typeof value !== "string" && typeof value !== "number") {
            throw new Error("error: type of value must be string or number");
          }

          return (
            <div key={key} className={classnames("flex", "space-x-2", "pl-4")}>
              <div>
                <code className={classnames("text-blue-50")}>{key}</code>
                <code className={classnames("text-gray-400")}>: </code>
                <code className={classnames("text-blue-300")}>{value}</code>
                <code className={classnames("text-gray-400")}>,</code>
              </div>
              <div>
                <button
                  className={classnames(
                    "px-2",
                    "text-xs",
                    "bg-red-500",
                    "text-white",
                    "rounded-full",
                    "focus:ring-red-200",
                    "hover:bg-red-600",
                    "focus:outline-none",
                    "focus:ring-2"
                  )}
                  value={key}
                  onClick={handleRemoveClick}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
        <code className={classnames("text-gray-400", "block")}>{"}"}</code>
      </div>

      <div
        className={classnames(
          "grid",
          "gap-2",
          "grid-flow-row",
          "auto-rows-max",
          "sm:grid-flow-col",
          "sm:auto-cols-max",
          "items-center"
        )}
      >
        <div>
          <select
            className={classnames("rounded", "text-sm")}
            onChange={handleKeyChange}
          >
            {optionKeys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <code className={classnames("text-gray-400")}>: </code>
          <select
            className={classnames("rounded", "text-sm")}
            onChange={handleValueChange}
            value={`${selectedValue}`}
          >
            {options[selectedKey].map((item: unknown) => {
              if (typeof item !== "string" && typeof item !== "number") {
                throw new Error(
                  "error: type of value must be string or number"
                );
              }

              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <Button type="submit" kind="primary" onClick={handleSubmitClick}>
            Add Option
          </Button>
        </div>
      </div>
    </div>
  );
};
