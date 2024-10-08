"use client";

import {
  activeChatIdAtom,
  chatMessagesAtom,
  responseLoadingAtom,
} from "@/store/chat";
import { Sparkles, User, User2 } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ConversationHandler = ({ id }: { id?: string }) => {
  const [chatMessages, setChatMessages] = useRecoilState(chatMessagesAtom);
  const activeChatId = useRecoilValue(activeChatIdAtom);
  const messageWindowRef = useRef<HTMLDivElement | null>(null);

  const responseLoading = useRecoilValue(responseLoadingAtom);

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
                    "dark:text-white markdown-container text-[18px] leading-8 font-[400]"
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
              <span className="block font-bold text-gray-700 dark:text-gray-300">
                {" "}
                Quantum
              </span>
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
    <div className="w-full mt-2 animate-pulse">
      <div className="h-2.5 bg-gray-300 delay-150 rounded-full dark:bg-gray-400 w-full mb-4"></div>
      <div className="h-2.5 bg-gray-300 delay-75 rounded-full dark:bg-gray-400 w-full mb-4"></div>
      <div className="h-2.5 bg-gray-300 delay-150 rounded-full dark:bg-gray-400 w-full mb-4"></div>
      <div className="h-2.5 bg-gray-300 delay-75 rounded-full dark:bg-gray-400 w-full mb-4"></div>
      <div className="h-2.5 bg-gray-300 delay-150 rounded-full dark:bg-gray-400 w-24 mb-4"></div>
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
