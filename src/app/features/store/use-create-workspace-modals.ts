import { atom, useAtom } from "jotai";
// const modalState = atom(false);
// export const useCreateSpaceModal = () => {
//   return useAtom(modalState);
// };

const dialogState = atom("");

export const useCreateDialogModal = () => {
  return useAtom(dialogState);
};
