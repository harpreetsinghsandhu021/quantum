"use client";
import { getUserConversations } from "@/actions/conversation";
import { chatMessagesAtom } from "@/store/chat";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { TextGenerateEffect } from "./textGenerate";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export type conversation = {
  id: string;
  messageSnippet: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

const RecentHistory = () => {
  const { user } = useUser();
  const [recents, setRecents] = useState<conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const chatMessages = useRecoilValue(chatMessagesAtom);
  const pathName = usePathname();

  async function fetchRecents() {
    setLoading(true);
    const recents = await getUserConversations(user?.id as string);
    setLoading(false);

    if (recents?.status == 200) {
      setRecents(recents?.conversations);
    }
  }

  useEffect(() => {
    fetchRecents();
  }, []);

  useEffect(() => {
    if (chatMessages.length === 1) {
      fetchRecents();
    }
  }, [chatMessages]);

  return (
    <ul className={`${recents.length! > 0 && "border-l-2"}  ml-4 py-2 pl-1`}>
      {loading && (
        <div className=" flex gap-1 items-center">
          <MessageCircle className="w-4 h-4 text-muted-foreground group-hover:text-white" />
          <div className="h-3 bg-gray-300 delay-150 rounded-full dark:bg-gray-400 w-full mb"></div>
        </div>
      )}
      {recents.map((d: any) => {
        return (
          <li key={d.id} className={`group text-xs`}>
            <Link
              href={d.id}
              className={`${
                pathName.includes(d.id) && "bg-zinc-500"
              }  flex gap-1 text-sm w-max justify-start items-center transition-all group-hover:translate-x-2 group-hover:bg-zinc-500 px-2.5 py-0.5 rounded-xl`}
            >
              <MessageCircle className="w-4 h-4 text-muted-foreground group-hover:text-white" />
              <div className="leading-7 w-64 truncate text-ellipsis   group-hover:text-white">
                <TextGenerateEffect words={d.messageSnippet} />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default RecentHistory;
