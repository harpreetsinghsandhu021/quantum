"use client";
import { createMessage } from "@/actions/conversation";
import {
  activeChatIdAtom,
  chatMessagesAtom,
  responseLoadingAtom,
} from "@/store/chat";
import { chat } from "@/types/chat";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {
  generateText,
  Message,
  AIStream,
  StreamTextResult,
  CoreSystemMessage,
  streamText,
} from "ai";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "sonner";

const genAI = createGoogleGenerativeAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
});

const model = genAI("models/gemini-1.5-pro-latest");

export function useStartChatting() {
  const [chatMessages, setChatMessages] = useRecoilState(chatMessagesAtom);
  const activeChatId = useRecoilValue(activeChatIdAtom);
  const [responseLoading, setResponseLoading] =
    useRecoilState(responseLoadingAtom);

  async function handleChat(message: chat, messages: chat[], newId: string) {
    try {
      const prompt = `
    You are a highly experienced and knowledgeable financial advisor with over 20 years of expertise in the industry. You have a deep understanding of personal finance, investments, retirement planning, tax strategies, and wealth management.
    Your role is to provide personalized financial guidance to clients based on their unique goals, risk tolerance, and current financial situation. You will ask insightful questions to gain a comprehensive understanding of the client's financial profile, then offer customized recommendations and strategies to help them achieve their short-term and long-term financial objectives.
    Your advice will be objective, ethical, and in the best interest of the client. You will explain complex financial concepts in simple terms and provide clear action steps. Your communication style is friendly, empathetic and you aim to build a strong, trusting relationship with each client.
    When the client asks a question, provide a thorough, well-structured response that covers the key aspects of their query. Offer specific examples and data to support your recommendations. If you need more information to give a complete answer, politely ask follow-up questions.
    Your goal is to help the client develop a robust financial plan, make informed decisions, and feel confident about their financial future. Demonstrate your expertise, integrity and commitment to the client's financial well-being in every interaction.
    Here's a List of previous conversation details: ${messages
      .map(
        (conversation: chat) =>
          `Role: ${conversation.role}, Content: ${conversation.content}`
      )
      .join("\n")}.
    The Last Message from the User is ${message.content}.
    NOTE: return response in a markdown
  `;

      const stream = await streamText({
        model: model,
        prompt: prompt,
      });

      let newMessages = [message, ...chatMessages];

      newMessages.push({
        role: "Quantum",
        content: "",
      });

      const lastMessageIndex = newMessages.length - 1;
      const lastMessage = { ...newMessages[lastMessageIndex] };

      for await (const textPart of stream.textStream) {
        setResponseLoading(false);
        if (textPart) {
          lastMessage.content += textPart;

          setChatMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[lastMessageIndex] = { ...lastMessage };
            return updatedMessages;
          });
        }
      }

      await createMessage(activeChatId || newId, lastMessage.content);

      // return { response: text, status: 200 };
    } catch (err: any) {
      console.log(err);
      toast.error(err.message as string);
    }
  }

  return { handleChat, responseLoading };
}
