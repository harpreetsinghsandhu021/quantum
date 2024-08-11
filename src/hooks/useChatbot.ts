"use client";

import {
  activeChatIdAtom,
  chatMessagesAtom,
  responseLoadingAtom,
} from "@/store/chat";
import { chat } from "@/types/chat";
import { useUser } from "@clerk/nextjs";
import { CoreSystemMessage } from "ai";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useStartChatting } from "./useModel";
import { createConversation, createMessage } from "@/actions/conversation";

const useChatbot = () => {
  const [chatMessages, setChatMessages] = useRecoilState(chatMessagesAtom);
  const { isSignedIn, user, isLoaded } = useUser();
  const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
  const setResponseLoading = useSetRecoilState(responseLoadingAtom);

  const { handleChat } = useStartChatting();

  async function onSubmit(message: string) {
    if (message.length === 0) return;
    setResponseLoading(true);

    setChatMessages((prevChat) => [
      ...prevChat,
      { content: message, role: user?.fullName || "user" },
    ]);

    let newId = "";
    if (chatMessages.length === 0) {
      const res = await createConversation(
        message,
        user?.id as string,
        user?.fullName as string
      );
      if (res?.status === 201) {
        setActiveChatId(res.chatId);
        newId = res.chatId;
      }
    } else {
      await createMessage(activeChatId, message, user?.fullName as string);
    }

    const response = await handleChat(
      { content: message, role: user?.fullName || "user" },
      chatMessages as CoreSystemMessage[],
      newId
    );
  }

  return { onSubmit };
};

export default useChatbot;
