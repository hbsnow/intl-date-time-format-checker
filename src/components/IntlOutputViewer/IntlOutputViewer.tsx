import React from "react";

import { classnames } from "tailwindcss-classnames";

import { Chip } from "../../elements/Chip";

export type Props = Readonly<{
  locale: string | undefined;
  option: Intl.DateTimeFormatOptions;
  date: Date;
}>;

const FormattedDate = (props: Props): JSX.Element => {
  const { locale, option, date } = props;

  if (!locale) {
    <span>Loading...</span>;
  }

  try {
    return <span>{new Intl.DateTimeFormat(locale, option).format(date)}</span>;
  } catch (err) {
    return (
      <span className={classnames("text-red-600")}>
        {err?.message ?? "error"}
      </span>
    );
  }
};

export const IntlOutputViewer = (props: Props): JSX.Element => {
  const { locale } = props;

  return (
    <div className={classnames("flex", "space-x-2")}>
      <Chip title={locale}>{locale ?? "-"}</Chip>
      <FormattedDate {...props} />
    </div>
  );
};
