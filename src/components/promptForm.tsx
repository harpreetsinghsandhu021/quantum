"use client";
import React, { useRef } from "react";
import { Button } from "./ui/button";
import { Forward, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./ui/tooltip";

const PromptForm = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mt-auto">
      <form onSubmit={() => {}} className="border-2 rounded-full" action="">
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

        <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-zinc-100 px-12 sm:rounded-full sm:px-12">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4"
            onClick={() => {
              fileRef.current?.click();
            }}
          >
            <Plus />
            <span className="sr-only">New Chat</span>
          </Button>
          <textarea
            tabIndex={0}
            placeholder="Send a message."
            className="min-h-[60px] w-full bg-transparent  placeholder:text-zinc-900 resize-none px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            name="message"
            rows={1}
          />
          <div className="absolute right-4 top-[13px] sm:right-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="submit"
                    size="icon"
                    disabled={false}
                    className="bg-transparent shadow-none text-zinc-950 rounded-full hover:bg-zinc-200"
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
