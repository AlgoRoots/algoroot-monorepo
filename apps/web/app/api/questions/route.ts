import { NextResponse } from "next/server";
import {
  vectorStore,
  type VectorDocument,
} from "@/modules/vector-store/lib/vector-store";
import fs from "fs";
import { isArray, isEmpty } from "lodash-es";
import path from "path";
import { supabaseClient } from "@/modules/vector-store/lib/supabse";

const FILE_PATH = "public/data/new-questions.json";

export type Question = {
  pageContent: string;
  metadata: {
    category: string;
    keywords: string[];
  };
};

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

    return new Map(data.map(({ content, id }) => [content, id]));
  } catch (error) {
    throw new Error(`DB 조회 중 오류 발생: ${(error as Error).message}`);
  }
};

/**
 * 질문 데이터 추가 API (POST 요청)
 */
export async function POST() {
  try {
    const fileData = getQuestionsFromJson(FILE_PATH);
    const dbData = await getQuestionsFromDB();

    const newDocuments: VectorDocument[] = fileData.map(
      ({ pageContent, metadata }, idx) => {
        const existingId = dbData?.get(pageContent);
        return {
          id: existingId ?? String(idx),
          pageContent: pageContent,
          metadata: metadata,
        };
      }
    );

    if (isEmpty(newDocuments)) {
      return NextResponse.json({ message: "추가할 새로운 데이터가 없습니다." });
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
      console.error("vectorStore.addDocuments 중 오류 발생:", error);
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
