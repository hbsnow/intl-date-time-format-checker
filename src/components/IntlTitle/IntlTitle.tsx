import React from "react";

import { classnames, TArg } from "tailwindcss-classnames";

export const IntlTitle = (): JSX.Element => {
  return (
    <h1>
      <span
        className={classnames(
          "text-transparent",
          "font-title" as TArg,
          "text-xl",
          "font-black",
          "bg-gradient-to-r",
          "bg-clip-text",
          "from-blue-600",
          "to-purple-500",
          "md:text-3xl"
        )}
      >
        Intl.DateTimeFormat Checker
      </span>
    </h1>
  );
};
