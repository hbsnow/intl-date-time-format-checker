import { useState, useEffect } from "react";

export const useBrowserLocale = (): string | undefined => {
  const [browserLocale, setBrowserLocale] = useState<string>();

  useEffect(() => {
    setBrowserLocale(navigator.language);
  }, []);

  return browserLocale;
};
