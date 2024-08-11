import Chatbot from "@/components/chatbot";

export default function ChatPage({ params }: { params: { id: string } }) {
  return <Chatbot id={params.id} />;
}
