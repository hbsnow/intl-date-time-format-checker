import React, {
  ComponentPropsWithoutRef,
  MouseEventHandler,
  useState,
} from "react";

import sortBy from "lodash.sortby";
import { classnames } from "tailwindcss-classnames";
import { useSnapshot } from "valtio";

import { optionKeys } from "../../constants";
import { Button } from "../../elements/Button";
import { store } from "../../stores/store";
import { IntlOptionEditor } from "../IntlOptionEditor";
export type Props = Readonly<
  Omit<ComponentPropsWithoutRef<"div">, "className" | "children">
>;

export const AddCard = (props: Props): JSX.Element => {
  const snap = useSnapshot(store);

  const [option, setOption] = useState<Intl.DateTimeFormatOptions>({});

  const handleSubmitClick: MouseEventHandler<HTMLButtonElement> = () => {
    const keys = Object.keys(option) as typeof optionKeys;

    const sortedOption = sortBy(keys, (key) => {
      const index = optionKeys.indexOf(key);
      return index === -1 ? undefined : index;
    }).reduce(
      (prev, current) => ({ ...prev, ...{ [current]: option[current] } }),
      {}
    );

    store.options = [sortedOption, ...snap.options];
  };

  const handleResetClick: MouseEventHandler<HTMLButtonElement> = () => {
    setOption({});
  };

  return (
    <div
      className={classnames(
        "flex",
        "flex-col",
        "shadow-md",
        "rounded",
        "bg-white"
      )}
      {...props}
    >
      <div className={classnames("rounded-t", "flex-1", "bg-gray-800", "p-2")}>
        <IntlOptionEditor option={option} setOption={setOption} />
      </div>
      <div className={classnames("p-2")}>
        <div className={classnames("flex", "space-x-4")}>
          <div>
            <Button
              type="submit"
              kind="primary"
              disabled={!Object.keys(option).length}
              onClick={handleSubmitClick}
            >
              Add
            </Button>
          </div>

          <div>
            <Button type="button" kind="secondary" onClick={handleResetClick}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
