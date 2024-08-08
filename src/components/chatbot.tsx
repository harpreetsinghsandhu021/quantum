import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/resizable";
import Sidebar from "./sidebar";
import ChatPanel from "./chatPanel";

const Chatbot = () => {
  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={22} minSize={15} maxSize={25}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>
          <ChatPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default Chatbot;
