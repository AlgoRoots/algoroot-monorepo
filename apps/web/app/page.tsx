"use client";

import { useActionState, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ScrollArea } from "@docbot/ui/components/scroll-area";
import ChatLayout from "@/components/Chat/ChatLayout";
import { EmptyView } from "@/components/EmptyView";
import { ListRenderer } from "@/components/ListRenderer";
import ChatMessage from "@/components/Chat/ChatMessage";
import { createMessage } from "./actions/create-message";
import ChatInput from "@/components/Chat/ChatInput";

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const [state, formAction, isPending] = useActionState(createMessage, {
    messages: [
      // { content: "ㄷ랴더랴ㅐ덜ㄹ", role: "ai" },
      // { content: "ㄷ랴더랴ㅐ덜ㄹ", role: "ai" },
      // { content: "ㄷ랴더랴ㅐ덜ㄹ", role: "ai" },
      // { content: "ㄷ랴더랴ㅐ덜ㄹ", role: "ai" },
      // { content: "ㄷ랴더랴ㅐ덜ㄹ", role: "ai" },
      // { content: "ㄷ랴더랴ㅐ덜ㄹ", role: "ai" },
      // { content: "ㄷ랴더랴ㅐ덜ㄹ", role: "ai" },
      // { content: "ㄷ랴더랴ㅐ덜ㄹ", role: "ai" },
      // { content: "ㄷ랴더랴ㅐ덜ㄹ", role: "ai" },
      // { content: "ㄷ랴더랴ㅐ덜ㄹ", role: "ai" },
      // { content: "ㄷ랴더랴ㅐ덜ㄹ", role: "ai" },
      // { content: "ㄷ랴더랴ㅐ덜ㄹ", role: "ai" },
      // { content: "ㄷ랴더랴ㅐ덜ㄹ", role: "ai" },
    ],
    error: "",
    userId: "",
  });

  useEffect(() => {
    setUserId(uuidv4());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <ChatLayout>
        <ScrollArea className="min-h-[50vh] max-h-[80vh] overflow-y-auto border-b pb-4">
          <EmptyView
            isEmpty={state.messages.length === 0}
            fallback={
              <p className="text-center text-gray-500">대화를 시작하세요!</p>
            }
          >
            <ListRenderer
              data={state.messages}
              render={(item, idx) => (
                <ChatMessage
                  key={idx}
                  role={item.role}
                  content={item.content}
                />
              )}
            />
          </EmptyView>
        </ScrollArea>

        <form action={formAction} className="flex flex-col gap-2">
          <ChatInput isLoading={isPending} />
          <input type="hidden" name="userId" value={userId || ""} />
        </form>
      </ChatLayout>
    </div>
  );
}
