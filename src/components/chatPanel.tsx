"use client";
import React, { useEffect } from "react";
import HintCards from "./hintCards";
import PromptForm from "./promptForm";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import ConversationHandler from "./conversationHandler";
import { useRecoilState, useSetRecoilState } from "recoil";
import { activeChatIdAtom, chatMessagesAtom } from "@/store/chat";
import { getParticularChatMessages } from "@/actions/conversation";
import { chat } from "@/types/chat";

const ChatPanel = ({ id }: { id?: string }) => {
  const { isSignedIn, user, isLoaded } = useUser();

  const [chatMessages, setChatMessages] = useRecoilState(chatMessagesAtom);
  const setActiveChatRoomId = useSetRecoilState(activeChatIdAtom);

  useEffect(() => {
    if (!id) return;
    getConversationMessages();
  }, [id]);

  async function getConversationMessages() {
    const res = await getParticularChatMessages(id as string);

    if (res?.status === 200) {
      setChatMessages(res.chatMessages as any);
      setActiveChatRoomId(res.chatId as string);
    }
  }

  return (
    <div className="w-full flex justify-center items-center bg-secondary h-full">
      <div className="h-[80%] w-[75%] max-lg:w-[90%] flex flex-col ">
        {chatMessages.length === 0 && (
          <>
            <h2
              className={`text-5xl max-lg:text-4xl dark:text-muted-foreground font-[700]`}
            >
              Hola, {user?.fullName} <br />
              <p className="mt-2 max-lg:mt-2">
                Your financial goals, our priority.
              </p>
            </h2>
            <HintCards />
          </>
        )}
        {chatMessages.length > 0 && <ConversationHandler id={id} />}
        <PromptForm />
      </div>
    </div>
  );
};

export default ChatPanel;
