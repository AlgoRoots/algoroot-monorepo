"use server";

import type { ChatMessageProps } from "@/components/Chat/ChatMessage";

export type State = {
  messages: ChatMessageProps[];
  error?: string;
  userId?: string;
};

export async function createMessage(
  state: State,
  formData: FormData
): Promise<State> {
  const input = formData.get("message") as string;
  const userId = formData.get("userId") as string;

  if (!input.trim())
    return { messages: [...state.messages], error: "입력값이 비어 있습니다." };
  if (!userId)
    return { messages: [...state.messages], error: "userId는 필수값입니다." };

  try {
    const res = await fetch(`http://localhost:3000/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input, userId }),
    });

    const data = await res.json();
    const aiMessage: ChatMessageProps = {
      role: "ai",
      content: data.answer || "답변을 찾을 수 없습니다.",
    };

    return {
      messages: [
        ...state.messages,
        { role: "user" as const, content: input },
        aiMessage,
      ],
    };
  } catch (error) {
    console.error("API 호출 오류:", error);
    return {
      messages: [...state.messages],
      error: "서버 오류가 발생했습니다.",
    };
  }
}
