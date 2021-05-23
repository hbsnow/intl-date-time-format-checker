import React, {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  useMemo,
} from "react";

import { classnames, TArg } from "tailwindcss-classnames";

export type Props = Readonly<
  {
    kind: "primary" | "secondary";
  } & PropsWithChildren<Omit<ComponentPropsWithoutRef<"button">, "className">>
>;

export const Button = (props: Props): JSX.Element => {
  const { kind, children, ...rest } = props;

  const classes = useMemo<TArg[]>(() => {
    if (props.disabled) {
      return ["bg-indigo-500", "text-white", "opacity-50"];
    }

    switch (kind) {
      case "primary": {
        return [
          "bg-indigo-500",
          "text-white",
          "focus:ring-indigo-200",
          "hover:bg-indigo-600",
        ];
      }
      case "secondary": {
        return [
          "bg-white",
          "text-indigo-500",
          "focus:ring-indigo-200",
          "hover:bg-indigo-50",
        ];
      }
    }
  }, [kind, props.disabled]);

  return (
    <button
      className={classnames(
        "px-6",
        "py-2",
        "rounded-full",
        "focus:outline-none",
        "focus:ring-4",
        ...classes
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
