"use client";
import React from "react";
import HintCards from "./hintCards";
import PromptForm from "./promptForm";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import ConversationHandler from "./conversationHandler";
import { useRecoilState } from "recoil";
import { chatMessagesAtom } from "@/store/chat";

const ChatPanel = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  const [chatMessages, setChatMessages] = useRecoilState(chatMessagesAtom);

  return (
    <div className="w-full flex justify-center items-center bg-secondary h-full">
      <div className="h-[80%] w-[75%] max-lg:w-[90%] flex flex-col ">
        {chatMessages.length === 0 && (
          <>
            <h2
              className={`text-5xl max-lg:text-4xl dark:text-muted-foreground font-[700]`}
            >
              Hola, {user?.fullName} <br />
              <p className="mt-4 max-lg:mt-2">
                Your financial goals, our priority.
              </p>
            </h2>
            <HintCards />
          </>
        )}
        {chatMessages.length > 0 && <ConversationHandler />}
        <PromptForm />
      </div>
    </div>
  );
};

export default ChatPanel;
