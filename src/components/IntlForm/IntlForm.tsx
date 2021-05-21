import React, { DOMAttributes } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { classnames } from "tailwindcss-classnames";
import { useSnapshot } from "valtio";

import { initialState, store } from "../../stores/store";
import { formatDate } from "../../utils/formatDate";
import { IntlInput } from "../IntlInput";
import { useErrorMessages } from "./useErrorMessages";

export type IntlFormInputs = {
  locale: string;
  datetime: string;
  secounds: number;
};

export const IntlForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IntlFormInputs>();

  const snap = useSnapshot(store);

  const errorMessages = useErrorMessages(errors);

  const onSubmit: SubmitHandler<IntlFormInputs> = (data) => {
    store.locale = data.locale;
    store.datetime = data.datetime;
    store.secounds = data.secounds;
  };

  const handleResetClick: DOMAttributes<HTMLButtonElement>["onClick"] = () => {
    setValue("locale", initialState.locale);
    setValue("datetime", formatDate(new Date()));
    setValue("secounds", 0);

    trigger();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classnames("grid", "gap-4", "grid-flow-row", "auto-rows-max")}
    >
      <div
        className={classnames(
          "grid",
          "gap-4",
          "grid-flow-row",
          "auto-rows-max",
          "md:grid-flow-col"
        )}
      >
        <IntlInput
          type="text"
          label="Locale"
          errorMessage={errorMessages.locale}
          defaultValue={snap.locale}
          {...register("locale", {
            required: true,
            pattern: /^[A-Za-z-]+$/,
          })}
        />

        <IntlInput
          type="datetime-local"
          label="Datetime"
          errorMessage={errorMessages.datetime}
          defaultValue={snap.datetime}
          {...register("datetime", {
            required: true,
          })}
        />

        <IntlInput
          type="number"
          label="Seconds"
          errorMessage={errorMessages.secounds}
          defaultValue={snap.secounds}
          {...register("secounds", {
            required: true,
            min: 0,
            max: 59,
          })}
        />
      </div>

      <div className="flex space-x-4">
        <div>
          <button
            type="submit"
            className={classnames(
              "bg-indigo-500",
              "px-6",
              "py-2",
              "text-white",
              "rounded-full",
              "focus:outline-none",
              "focus:ring-4",
              "focus:ring-indigo-200",
              "hover:bg-indigo-600"
            )}
          >
            Submit
          </button>
        </div>

        <div>
          <button
            type="button"
            className={classnames(
              "bg-white",
              "px-6",
              "py-2",
              "text-indigo-500",
              "rounded-full",
              "focus:outline-none",
              "focus:ring-4",
              "focus:ring-indigo-200",
              "hover:bg-indigo-50"
            )}
            onClick={handleResetClick}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};
