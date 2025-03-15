import { END, START, StateGraph } from '@langchain/langgraph'

import { callModel } from './model'
import { GraphAnnotation } from './state'

export const chatWorkflow = new StateGraph(GraphAnnotation)
	.addNode('model', callModel)
	.addEdge(START, 'model')
	.addEdge('model', END)
