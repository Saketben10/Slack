import { useCallback, useState } from "react";

export const useToggle = (
  initialValue: boolean = false
): [boolean, () => void] => {
  const [value, setValue] = useState<boolean>(initialValue);
  const toggle = useCallback((nextValue?: boolean) => {
    if (typeof nextValue === "boolean") {
      setValue(nextValue);
    } else {
      setValue((prev) => !prev);
    }
  }, []);

  return [value, toggle];
};
