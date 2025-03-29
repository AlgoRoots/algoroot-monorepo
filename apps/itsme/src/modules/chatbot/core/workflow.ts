import { END, START, StateGraph } from '@langchain/langgraph'

import { callModel } from './actions/call-model'
import { searchVectorStore } from './actions/search-vector-store'
import { GraphAnnotation } from './state'

export const chatWorkflow = new StateGraph(GraphAnnotation)
	.addNode('search', searchVectorStore)
	.addNode('model', callModel)
	.addEdge(START, 'search')
	.addEdge('search', 'model')
	.addEdge('model', END)
