import React from "react";
import HintCards from "./hintCards";
import PromptForm from "./promptForm";

const ChatPanel = () => {
  return (
    <div className="w-full flex justify-center items-center bg-secondary h-full">
      <div className="h-[80%] w-[80%] flex flex-col ">
        <h2 className={`text-5xl font-[500]`}>
          Hello, Harpreet <br />
          <p className="mt-4">Your financial goals, our priority.</p>
        </h2>
        <HintCards />
        <PromptForm />
      </div>
    </div>
  );
};

export default ChatPanel;
