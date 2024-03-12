import { useEffect, useState } from "react";

export const useDebounce = (value: boolean, delay = 2000) => {
  const [canClose, setCanClose] = useState(true);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (canClose) {
        setDebouncedValue(false);
        setCanClose(false);
        console.log("Closed");
      } else {
        setDebouncedValue(true);
        setCanClose(true);
        console.log("Opened");
      }
      console.log(canClose);
    }, delay);
    return () => {
      clearTimeout(timeout);
      console.log("clearing...");
    };
  }, [value]);

  return debouncedValue;
};
