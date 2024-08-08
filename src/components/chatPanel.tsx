import React from "react";
import HintCards from "./hintCards";
import PromptForm from "./promptForm";
import { currentUser } from "@clerk/nextjs/server";

const ChatPanel = async () => {
  const user = await currentUser();
  return (
    <div className="w-full flex justify-center items-center bg-secondary h-full">
      <div className="h-[80%] w-[80%] flex flex-col ">
        <h2 className={`text-5xl font-[500]`}>
          Hello, {user?.fullName} <br />
          <p className="mt-4">Your financial goals, our priority.</p>
        </h2>
        <HintCards />
        <PromptForm />
      </div>
    </div>
  );
};

export default ChatPanel;
