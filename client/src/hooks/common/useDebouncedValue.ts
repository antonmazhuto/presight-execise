import { useEffect, useState } from "react";

export const useDebouncedValue = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(id);
  }, [delay, value]);

  return debouncedValue;
};
