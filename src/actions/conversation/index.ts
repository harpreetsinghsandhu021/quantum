"use server";

import prisma from "@/lib/prisma";

export async function createConversation(
  message: string,
  userId: string,
  role: string
) {
  try {
    const res = await prisma.conversation.create({
      data: {
        messageSnippet: message,
        userId,
      },
    });

    const chat = await prisma.chat.create({
      data: {
        conversationId: res.id,
      },
    });

    await prisma.message.create({
      data: {
        content: message,
        chatId: chat.id,
        role,
      },
    });

    if (res) {
      return { status: 201, chatId: chat.id };
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getUserConversations(userId: string) {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        userId,
      },
      orderBy: [{ createdAt: "desc" }],
    });

    if (conversations) {
      return { status: 200, conversations };
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getParticularChatMessages(id: string) {
  try {
    const res = await prisma.chat.findUnique({
      where: {
        conversationId: id,
      },
      select: {
        id: true,
      },
    });

    const chatMessages = await prisma.message.findMany({
      where: {
        chatId: res?.id,
      },
      select: {
        role: true,
        content: true,
      },
    });

    if (chatMessages) {
      return { status: 200, chatMessages, chatId: res?.id };
    }
  } catch (err) {
    console.log(err);
  }
}

export async function createMessage(
  chatId: string,
  content: string,
  role?: string
) {
  try {
    await prisma.message.create({
      data: {
        content,
        chatId,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
