import React, { ComponentPropsWithoutRef, forwardRef } from "react";

import { classnames } from "tailwindcss-classnames";

export type Props = Readonly<
  {
    label: string;
    errorMessage?: string;
  } & Omit<ComponentPropsWithoutRef<"input">, "className">
>;

export const IntlInput = forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { label, errorMessage, ...rest } = props;

    return (
      <div>
        <label>
          <span
            className={classnames(
              "p-1",
              "text-gray-500",
              "text-sm",
              "font-semibold"
            )}
          >
            {label}
          </span>
          <input
            ref={ref}
            className={classnames(
              "block",
              "w-full",
              "rounded-md",
              "shadow-sm",
              "focus:ring-opacity-50",
              "focus:ring",
              {
                ["border-gray-300"]: !errorMessage,
                ["border-red-400"]: !!errorMessage,
                ["focus:border-indigo-300"]: !errorMessage,
                ["focus:border-red-400"]: !!errorMessage,
                ["focus:ring-indigo-200"]: !errorMessage,
                ["focus:ring-red-400"]: !!errorMessage,
              }
            )}
            {...rest}
          />
        </label>
        {errorMessage && (
          <div className={classnames("text-red-600", "text-sm")}>
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);
IntlInput.displayName = "IntlInputComponent";
