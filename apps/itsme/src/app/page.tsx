"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ScrollArea } from "@docbot/ui/components/scroll-area";

import { readStreamableValue } from "ai/rsc";
import { chat, type Message } from "./actions/chat";
import ChatInput from "@/components/Chat/ChatInput";
import ChatLayout from "@/components/Chat/ChatLayout";
import { EmptyView } from "@/components/EmptyView";
import { ListRenderer } from "@/components/ListRenderer";
import ChatMessage from "@/components/Chat/ChatMessage";

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setUserId(uuidv4());
  }, []);

  /**
   * 스트리밍 작업에서 처음 했던 방식 :
   * https://sdk.vercel.ai/cookbook/rsc/stream-text
   * history르
   * 스트리밍 작업에서 개선한 방식 : 위 방식도 동일하게 구현할 수 있지만, 이 방법이 더 깔꼼하고 직관적이어서 바꿈
   * https://sdk.vercel.ai/cookbook/rsc/stream-text-with-chat-prompt
   */
  async function handleSubmit(input: string) {
    if (!input) return;

    setIsPending(true);
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    try {
      const { history, newMessage } = await chat(
        [...messages, { role: "user", content: input }],
        userId!
      );

      let textContent = "";
      for await (const delta of readStreamableValue(newMessage)) {
        textContent += delta;
        setMessages([...history, { role: "ai", content: textContent }]);
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <ChatLayout>
        <EmptyView
          isEmpty={messages.length === 0}
          fallback={
            <div className="w-full h-[80vh] flex items-center">
              <p className="my-auto  mx-auto text-center text-gray-500">
                대화를 시작하세요!
              </p>
            </div>
          }
        >
          <ScrollArea
            // ref={scrollRef}
            className="w-full h-[80vh] overflow-y-auto border-b pb-4"
          >
            <ListRenderer
              data={messages}
              render={(item, idx) => (
                <ChatMessage
                  key={idx}
                  role={item.role}
                  content={item.content}
                />
              )}
            />
          </ScrollArea>
        </EmptyView>
        <ChatInput isLoading={isPending} onSend={handleSubmit} />
      </ChatLayout>
    </div>
  );
}
