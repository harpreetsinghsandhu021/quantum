"use client";

import { chatMessagesAtom } from "@/store/chat";
import { chat } from "@/types/chat";
import { useUser } from "@clerk/nextjs";
import { CoreSystemMessage } from "ai";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useStartChatting } from "./useModel";

const useChatbot = () => {
  const [chatMessages, setChatMessages] = useRecoilState(chatMessagesAtom);
  const { isSignedIn, user, isLoaded } = useUser();
  const { handleChat } = useStartChatting();

  async function onSubmit(message: string) {
    if (message.length === 0) return;

    setChatMessages((prevChat) => [
      ...prevChat,
      { content: message, role: user?.fullName || "user" },
    ]);

    const response = await handleChat(
      { content: message, role: user?.fullName || "user" },
      chatMessages as CoreSystemMessage[]
    );
  }

  return { onSubmit };
};

export default useChatbot;
