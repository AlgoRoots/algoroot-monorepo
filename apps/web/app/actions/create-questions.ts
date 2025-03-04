import { v4 as uuidv4 } from "uuid"; // UUID 생성
import {
  vectorStore,
  type VectorDocument,
} from "@/modules/vector-store/lib/vector-store";
import fs from "fs";
import { isArray, isEmpty } from "lodash-es";
import { NextResponse } from "next/server";
import path from "path";
import { supabaseClient } from "@/modules/vector-store/lib/supabse";

const FILE_PATH = "public/data/questions.json";

type Question = {
  question: string;
  answer: string;
};

/**
 * 질문 데이터 추가 함수
 * action으로 할지 fetch로 할지..
 */
export async function createQuestions() {
  try {
    const fileData = getQuestionsFromJson(FILE_PATH);
    const dbData = await getQuestionsFromDB();

    const newDocuments: VectorDocument[] = fileData.map(
      ({ question, answer }, idx) => {
        const existingId = dbData?.get(question);
        return {
          id: existingId ?? String(idx),
          pageContent: question,
          metadata: { answer },
        };
      }
    );

    if (isEmpty(newDocuments)) {
      return NextResponse.json({ message: "추가할 새로운 데이터가 없습니다." });
    }

    if (isEmpty(newDocuments)) {
      console.log("✅ 추가할 새로운 데이터가 없습니다.");
      return;
    }

    try {
      await vectorStore.addDocuments(
        newDocuments.map(({ pageContent, metadata }) => ({
          pageContent,
          metadata,
        })),
        { ids: newDocuments.map(({ id }) => String(id)) }
      );
      console.log("추가 완료!");
    } catch (error) {
      console.error("❌ vectorStore.addDocuments 중 오류 발생:", error);
    }

    return NextResponse.json({
      message: `${newDocuments.length}개의 질문이 성공적으로 추가되었습니다.`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

/**
 * JSON 파일에서 질문 데이터 가져오기
 */
const getQuestionsFromJson = (relativePath: string): Question[] => {
  try {
    const filePath = path.join(process.cwd(), relativePath);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data: Question[] = JSON.parse(fileContent);
    if (!isArray(data)) {
      throw new Error("JSON 형식이 잘못되었습니다.");
    }

    return data;
  } catch (error) {
    throw new Error(`파일을 읽는 중 오류 발생: ${(error as Error).message}`);
  }
};

/**
 * Supabase에서 기존 질문 가져오기 (ID 포함)
 */
const getQuestionsFromDB = async (): Promise<Map<string, string> | null> => {
  try {
    const { data, error } = await supabaseClient
      .from("questions")
      .select("id, content");

    if (error) {
      throw new Error("Supabase에서 데이터를 가져오는데 실패했습니다.");
    }

    if (!data) return null;

    return new Map(data?.map(({ content, id }) => [content, id]));
  } catch (error) {
    throw new Error(`DB 조회 중 오류 발생: ${(error as Error).message}`);
  }
};

/**
 * 실행 함수 (자동 실행 방지)
 */
if (import.meta.url === new URL(import.meta.url, import.meta.url).href) {
  (async () => {
    console.log("실행 시작...");
    await createQuestions().then(() => {
      console.log("실행 완료우");
    });
  })();
}
