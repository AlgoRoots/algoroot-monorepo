import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'
import { OpenAIEmbeddings } from '@langchain/openai'

import { supabaseClient } from './client'

import { Document } from 'langchain/document'

const embeddings = new OpenAIEmbeddings({
	model: 'text-embedding-3-small',
})

export type Metadata = Partial<{
	title: string
	url: string
	answer: string
	source: {
		path: string
		label: string
	}[]
}>
export type VectorDocument = Document<Metadata>

export const vectorStore = new SupabaseVectorStore(embeddings, {
	client: supabaseClient,
	tableName: 'questions',
	queryName: 'match_questions',
})
