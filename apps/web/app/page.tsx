"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@docbot/ui/components/button";
import { Card, CardContent } from "@docbot/ui/components/card";
import { Input } from "@docbot/ui/components/input";
import { ScrollArea } from "@docbot/ui/components/scroll-area";
import { v4 as uuidv4 } from "uuid"; // uuid 모듈을 이용하여 userId 생성

/**
 *
 * 테스트 위한 임시 UI, 로직
 */
export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    // 사용자가 처음 접속할 때 userId를 생성 (예: UUID)
    setUserId(uuidv4());
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // ✅ 사용자 메시지 추가 후 상태 업데이트
    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input, userId }), // ✅ userId 포함
      });

      const data = await res.json();
      console.log("📩 받은 응답:", data);

      // ✅ 응답이 정상적인 경우 메시지 추가
      if (data.answer) {
        let responseText = data.answer;
        if (data.similarity) {
          responseText += ` (유사도: ${data.similarity})`;
        }

        setMessages([
          ...updatedMessages,
          { role: "ai", content: responseText },
        ]);
      } else {
        setMessages([
          ...updatedMessages,
          { role: "ai", content: data.message || "답변을 찾을 수 없습니다." },
        ]);
      }
    } catch (error) {
      console.error("❌ API 호출 오류:", error);
      setMessages([
        ...updatedMessages,
        { role: "ai", content: "서버 오류가 발생했습니다." },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardContent className="p-4 space-y-4">
          <ScrollArea className="h-96 overflow-y-auto border-b pb-4">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500">대화를 시작하세요!</p>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex my-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
          </ScrollArea>

          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="질문을 입력하세요..."
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "보내기"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
