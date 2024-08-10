"use client";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Forward, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./ui/tooltip";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next13-progressbar";
import { useSetRecoilState, useRecoilState } from "recoil";
import { chatMessagesAtom } from "@/store/chat";
import { useUser } from "@clerk/nextjs";
import useChatbot from "@/hooks/useChatbot";

const PromptForm = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const { onSubmit } = useChatbot();

  return (
    <div className="mt-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          onSubmit(message as string);
          setMessage("");
        }}
        className="border-2 rounded-full"
      >
        <input
          type="file"
          className="hidden"
          id="file"
          ref={fileRef}
          onChange={async (event) => {
            if (!event.target.files) {
              // toast.error('No file selected')
              return;
            }

            const file = event.target.files[0];

            if (file.type.startsWith("video/")) {
            } else {
              const reader = new FileReader();
              reader.readAsDataURL(file);

              reader.onloadend = async () => {
                const base64String = reader.result;
              };
            }
          }}
        />

        <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden dark:bg-background bg-zinc-100 px-12 sm:rounded-full sm:px-12">
          <Button
            variant="outline"
            size="icon"
            type="button"
            className="absolute left-4 top-[14px] size-8 border-none  rounded-full bg-transparent p-0 sm:left-4"
            onClick={() => {
              fileRef.current?.click();
            }}
          >
            <Plus />
          </Button>
          <input
            tabIndex={0}
            placeholder="Send a message."
            className="min-h-[60px] w-full bg-transparent  placeholder:text-zinc-900 dark:placeholder:text-gray-400  dark:text-white resize-none px-4 py-[1.3rem] focus-within:outline-none sm:text-base"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="absolute right-4 top-[13px] sm:right-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="submit"
                    size="icon"
                    disabled={false}
                    className="bg-transparent shadow-none text-zinc-950 dark:text-white rounded-full hover:bg-zinc-200"
                  >
                    <Forward />
                    <span className="sr-only">Send message</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send message</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromptForm;
