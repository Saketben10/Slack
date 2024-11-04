import { atom, useAtom } from "jotai";

const toggleAtom = atom(false);

export const useToggleAtom = () => {
  return useAtom(toggleAtom);
};
