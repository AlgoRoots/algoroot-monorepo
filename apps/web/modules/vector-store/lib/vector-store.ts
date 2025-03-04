import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { supabaseClient } from "./supabse";
import { Document } from "langchain/document";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});
export type VectorDocument = Document;

export const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabaseClient,
  tableName: "questions",
  queryName: "match_questions",
});
