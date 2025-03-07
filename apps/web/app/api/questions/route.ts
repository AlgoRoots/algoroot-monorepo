import { NextResponse } from "next/server";
import {
  vectorStore,
  type VectorDocument,
} from "@/modules/vector-store/lib/vector-store";
import { isEmpty } from "lodash-es";
import { supabaseClient } from "@/modules/vector-store/lib/supabse";
import { getDocsFromJson } from "@/modules/vector-store/utils/get-docs-json";
import { getDocsFromPdf } from "@/modules/vector-store/utils/get-docs-pdf";

const FILE_PATH = "public/data/docs.json";
const PDF_PATH = "public/data/resume.pdf";

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
    const jsonDocs = getDocsFromJson(FILE_PATH);
    console.log("jsonDocs", jsonDocs);
    // const dbData = await getQuestionsFromDB();

    const pdfDocs = await getDocsFromPdf(PDF_PATH);
    console.log("pdfDocs", pdfDocs);

    // const newDocuments: VectorDocument[] = jsonDocs.map(
    //   ({ pageContent, metadata }, idx) => {
    //     // const existingId = dbData?.get(pageContent);
    //     return {
    //       // id: existingId ?? String(idx),
    //       pageContent: pageContent,
    //       metadata: metadata,
    //     };
    //   }
    // );

    const newDocuments: VectorDocument[] = jsonDocs.concat(pdfDocs);

    if (isEmpty(newDocuments)) {
      return NextResponse.json({ message: "추가할 새로운 데이터가 없습니다." });
    }

    try {
      await vectorStore.addDocuments(
        newDocuments.map(({ pageContent, metadata }, idx) => ({
          pageContent,
          metadata,
          id: String(idx),
        }))
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
