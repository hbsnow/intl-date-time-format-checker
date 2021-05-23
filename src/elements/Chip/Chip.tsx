import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import { classnames } from "tailwindcss-classnames";

export type Props = Readonly<
  PropsWithChildren<Omit<ComponentPropsWithoutRef<"span">, "className">>
>;

export const Chip = (props: Props): JSX.Element => {
  const { children, ...rest } = props;

  return (
    <span
      className={classnames(
        "text-sm",
        "inline-block",
        "rounded",
        "border",
        "bg-green-500",
        "text-white",
        "font-semibold",
        "w-14",
        "text-center",
        "truncate",
        "px-1"
      )}
      {...rest}
    >
      {children}
    </span>
  );
};
