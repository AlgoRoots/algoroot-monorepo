import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import path from "path";

/**
 *
 * pdf loader
 * @see https://js.langchain.com/docs/integrations/document_loaders/file_loaders/pdf/
 *
 * RecursiveCharacterTextSplitter 로 문자열 자르기, 오버랩
 */
const extractTextFromPDF = async (filePath: string) => {
  // splitPages 각 페이지가 개별 문서로 저장됨 (검색 최적화 가능)
  const loader = new PDFLoader(filePath, { splitPages: true });
  const docs = await loader.load();
  console.log(docs);
  return docs;
};

export const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 100,
});

export const getDocsFromPdf = async (relativePath: string) => {
  const filePath = path.join(process.cwd(), relativePath);

  const docs = await extractTextFromPDF(filePath);

  const splitDocs = await textSplitter.splitDocuments(docs);
  return splitDocs;
};
