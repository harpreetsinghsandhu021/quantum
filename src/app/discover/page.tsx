// "use client";

import Blogs from "@/components/blogs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/resizable";
import Sidebar from "@/components/sidebar";

const Chatbot = () => {
  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={23} minSize={15} maxSize={25}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>
          <div className="w-full flex justify-center py-10 items-center bg-secondary h-full">
            <div className="h-[46rem] max-w-4xl no-visible-scrollbar overflow-scroll w-full max-lg:w-[90%] ">
              <h2 className="text-4xl mb-4 sticky top-0 text-white">
                Discover
              </h2>
              <Blogs />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default Chatbot;
