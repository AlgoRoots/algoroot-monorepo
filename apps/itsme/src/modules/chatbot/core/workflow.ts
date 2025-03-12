import { END, START, StateGraph } from '@langchain/langgraph'
import { GraphAnnotation } from './state'
import { callModel } from './model'

export const chatWorkflow = new StateGraph(GraphAnnotation)
	.addNode('model', callModel)
	.addEdge(START, 'model')
	.addEdge('model', END)
