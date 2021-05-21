import { useMemo } from "react";

import { DeepMap, FieldError } from "react-hook-form/dist/types";

import { IntlFormInputs } from "./IntlForm";

const generateCommonMessage = (errorType: FieldError["type"]) => {
  if (errorType === "required") {
    return "This is required.";
  }

  return "Something went wrong.";
};

export const useErrorMessages = (
  errors: DeepMap<IntlFormInputs, FieldError>
): { [key in keyof IntlFormInputs]: string | undefined } => {
  const locale = useMemo(() => {
    if (!errors.locale?.type) {
      return;
    }

    if (errors.locale.type === "pattern") {
      return "Only alphabet and hyphen can be used.";
    }

    return generateCommonMessage(errors.locale.type);
  }, [errors.locale?.type]);

  const datetime = useMemo(() => {
    if (!errors.datetime?.type) {
      return;
    }

    return generateCommonMessage(errors.datetime.type);
  }, [errors.datetime?.type]);

  const secounds = useMemo(() => {
    if (!errors.secounds?.type) {
      return;
    }

    if (errors.secounds.type === "min") {
      return "The minimum value is 0.";
    }

    if (errors.secounds.type === "max") {
      return "The maximum value is 59.";
    }

    return generateCommonMessage(errors.secounds.type);
  }, [errors.secounds?.type]);

  return { locale, datetime, secounds };
};
