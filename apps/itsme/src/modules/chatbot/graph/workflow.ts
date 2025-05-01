import { END, START, StateGraph } from '@langchain/langgraph'

import { detectLanguage } from './actions/detect-language'
import { generateResponse } from './actions/generate-response'
import { refineQuestion } from './actions/refine-question'
import { searchVectorStore } from './actions/search-vector-store'
import { shouldSearch } from './actions/should-search'
import { NODES } from './constants'
import { GraphAnnotation } from './state'

/**
 * 사용자 언어를 감지하여 최종 응답을 생성합니다.
 * 검색은 필요한 경우만 실행합니다.
 * 1. 질문 정제 > 사용자 언어로 응답 생성
 * 2. 질문 정제 > 검색 > 사용자 언어로 응답 생성
 */
export const chatWorkflow = new StateGraph(GraphAnnotation)
	.addNode(NODES.DETECT_LANGUAGE, detectLanguage)
	.addNode(NODES.REFINE_QUESTION, refineQuestion)
	.addNode(NODES.CHECK_SEARCH_NEED, shouldSearch)
	.addNode(NODES.SEARCH, searchVectorStore)
	.addNode(NODES.GENERATE_RESPONSE, generateResponse)

	.addEdge(START, NODES.DETECT_LANGUAGE)
	.addEdge(NODES.DETECT_LANGUAGE, NODES.REFINE_QUESTION)
	.addEdge(NODES.REFINE_QUESTION, NODES.CHECK_SEARCH_NEED)

	.addConditionalEdges(NODES.CHECK_SEARCH_NEED, (state) => {
		return state.needSearch ? NODES.SEARCH : NODES.GENERATE_RESPONSE
	})

	.addEdge(NODES.SEARCH, NODES.GENERATE_RESPONSE)
	.addEdge(NODES.GENERATE_RESPONSE, END)
