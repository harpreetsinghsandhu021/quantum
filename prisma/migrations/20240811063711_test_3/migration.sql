/*
  Warnings:

  - A unique constraint covering the columns `[conversationId]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `conversationId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "conversationId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chat_conversationId_key" ON "Chat"("conversationId");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
