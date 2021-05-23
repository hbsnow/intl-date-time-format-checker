import React, { DOMAttributes } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { classnames } from "tailwindcss-classnames";
import { useSnapshot } from "valtio";

import { Button } from "../../elements/Button";
import { initialState, store } from "../../stores/store";
import { truncateSeconds } from "../../utils/truncateSeconds";
import { IntlInput } from "../IntlInput";
import { useErrorMessages } from "./useErrorMessages";

export type IntlFormInputs = {
  locale: string;
  datetime: string;
  secounds: number;
};

export const IntlForm = (): JSX.Element => {
  const snap = useSnapshot(store);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IntlFormInputs>();

  const errorMessages = useErrorMessages(errors);

  const onSubmit: SubmitHandler<IntlFormInputs> = (data) => {
    store.locale.form = data.locale;
    store.datetime = data.datetime;
    store.secounds = data.secounds;
  };

  const handleResetClick: DOMAttributes<HTMLButtonElement>["onClick"] = () => {
    setValue("locale", initialState.locale.form);
    setValue("datetime", truncateSeconds(new Date()));
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
          defaultValue={snap.locale.form}
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

      <div className={classnames("flex", "space-x-4")}>
        <div>
          <Button type="submit" kind="primary">
            Submit
          </Button>
        </div>

        <div>
          <Button type="button" kind="secondary" onClick={handleResetClick}>
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
};
