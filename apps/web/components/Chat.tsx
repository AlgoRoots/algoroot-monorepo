"use client";
import { Button } from "@docbot/ui/components/button";
import { Input } from "@docbot/ui/components/input";
import { useState } from "react";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    const res = await fetch("/api/ask", {
      method: "POST",
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-xl">
      <Input
        placeholder="면접 질문을 입력하세요..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Button className="mt-2 w-full" onClick={handleAsk}>
        질문하기
      </Button>
      {answer && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <strong>AI의 답변:</strong> {answer}
        </div>
      )}
    </div>
  );
}
