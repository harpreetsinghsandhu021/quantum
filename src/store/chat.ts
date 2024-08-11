import { chat } from "@/types/chat";
import { atom } from "recoil";

export const chatMessagesAtom = atom<chat[]>({
  key: "chat",
  default: [],
});

export const responseLoadingAtom = atom<boolean>({
  key: "responseLoading",
  default: false,
});
