// "use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/resizable";
import Sidebar from "./sidebar";
import ChatPanel from "./chatPanel";

const Chatbot = ({ id }: { id?: string }) => {
  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={23} minSize={15} maxSize={25}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>
          <ChatPanel id={id} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default Chatbot;
