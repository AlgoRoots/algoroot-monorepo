import type { DocumentInterface } from "@langchain/core/documents";
import { vectorStore } from "./lib/vector-store";
import type { Question } from "@/app/api/questions/route";

type SearchOptions = {
  /**
   * 답변 받을 최대 개수
   * @default 2
   */
  count?: number;
  /**
   * 최소 유사도 기준
   * @default 0.4
   */
  minScore?: number;
};

type Document = DocumentInterface<Question["metadata"]>;
type DocumentResult = [Document, number][];

export type SearchResult = {
  data: Question | null;
  similarity: number | null;
};

const USER_PRONOUNS = ["나", "내", "제가", "내가", "저는", "제", "저"];

export const search = async (
  input: string,
  options?: SearchOptions
): Promise<SearchResult[]> => {
  const { count = 2, minScore = 0 } = options ?? {};

  // const normalizedInput = input.trim().replace(/[\s.,!?]/g, "");
  // if (USER_PRONOUNS.some((pronoun) => normalizedInput.startsWith(pronoun))) {
  //   console.log("자기 자신을 나타내는 표현이 감지됨. 검색 중단.");
  //   return { answer: null, similarity: 0 };
  // }

  /**
   * 필요하면 filter 함수로 metadata 넣어 필터링 시킬 수 있음
   * @see https://js.langchain.com/docs/integrations/vectorstores/supabase/#metadata-query-builder-filtering
   */
  const results = (await vectorStore.similaritySearchWithScore(
    input,
    count
  )) as DocumentResult;
  console.log("@@@@@@search results", JSON.stringify(results));
  const bestMatch = results.filter(([_, score]) => score >= minScore);
  const data = bestMatch.map(([d, s]) => {
    return { data: d, similarity: s };
  });
  const retrievedAnswer = bestMatch ? bestMatch[0] : null;
  return data;
};
