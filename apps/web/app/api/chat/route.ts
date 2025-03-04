import { NextResponse } from "next/server";

import { HumanMessage } from "@langchain/core/messages";
import { app } from "@/modules/chatbot/app";
import { search } from "@/modules/vector-store/search";
import { formatSearchResults } from "@/modules/chatbot/utils/format";

/**
 * 유저 질문을 처리하는 API
 */
export async function POST(request: Request) {
  try {
    const { question, userId } = await request.json();

    if (!question?.trim()) {
      return NextResponse.json(
        { error: "질문을 입력해주세요." },
        { status: 400 }
      );
    }

    const searchResults = await search(question).then(formatSearchResults);
    /**
     *  대화 세션(사용자별 ID) 관리 (memory 목적)
     *  */
    const config = { configurable: { thread_id: userId } };

    const input = {
      messages: [new HumanMessage(question)],
      searchResults: searchResults,
    };

    const output = await app.invoke(input, config);
    console.log("output", output);
    const response = output.messages[output.messages.length - 1];
    return NextResponse.json({
      question,
      answer: response?.content,
    });
  } catch (error) {
    console.error("❌ 서버 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
