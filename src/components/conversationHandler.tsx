"use client";

import { chatMessagesAtom } from "@/store/chat";
import { Sparkles, User, User2 } from "lucide-react";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { TextGenerateEffect } from "./textGenerate";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useChatbot from "@/hooks/useChatbot";
import { useStartChatting } from "@/hooks/useModel";

const ConversationHandler = () => {
  const chatMessages = useRecoilValue(chatMessagesAtom);
  const messageWindowRef = useRef<HTMLDivElement | null>(null);

  const { responseLoading } = useStartChatting();

  const onScrollToBottom = () => {
    if (messageWindowRef.current) {
      messageWindowRef.current.scrollTo({
        top: messageWindowRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    onScrollToBottom();
  }, [chatMessages]);

  return (
    <div>
      <div
        ref={messageWindowRef}
        className=" px-4 no-visible-scrollbar h-[34rem] overflow-scroll"
      >
        {chatMessages.map((message, index) => {
          return (
            <div
              key={index}
              className={`flex gap-3 my-4 text-black text-sm flex-1`}
            >
              {message.role === "Quantum" ? <AIIcon /> : <PersonIcon />}

              <div className="leading-relaxed">
                <span className="block font-bold text-base text-gray-700 dark:text-gray-300">
                  {message.role}
                </span>
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  className={
                    "dark:text-white markdown-container text-base leading-7 font-[400]"
                  }
                >
                  {message.content}
                </Markdown>
              </div>
            </div>
          );
        })}
        {responseLoading && (
          <div className="flex gap-3">
            <AIIcon />
            <div className="leading-relaxed w-full">
              <span className="block font-bold text-gray-700"> AI</span>
              <Loader />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function Loader() {
  return (
    <div className="w-full mt-1 animate-pulse">
      <div className="h-2.5 bg-gray-300 delay-150 rounded-full dark:bg-gray-700 w-full mb-4"></div>
      <div className="h-2.5 bg-gray-300 delay-75 rounded-full dark:bg-gray-700 w-full mb-4"></div>
      <div className="h-2.5 bg-gray-300 delay-150 rounded-full dark:bg-gray-700 w-full mb-4"></div>
      <div className="h-2.5 bg-gray-300 delay-75 rounded-full dark:bg-gray-700 w-full mb-4"></div>
      <div className="h-2.5 bg-gray-300 delay-150 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
    </div>
  );
}

function AIIcon() {
  return (
    <div className="min-w-10 h-10 rounded-full bg-black flex justify-center items-center border">
      <Sparkles className="fill-white w-8 h-8" />
    </div>
  );
}

function PersonIcon() {
  return (
    <div className="min-w-10 h-10 rounded-full bg-black flex justify-center items-center border">
      <User2 className="fill-white w-6 h-6" />
    </div>
  );
}

export default ConversationHandler;
