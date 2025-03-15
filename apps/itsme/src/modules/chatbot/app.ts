import { MemorySaver } from '@langchain/langgraph'

import { chatWorkflow } from './core/workflow'

const memory = new MemorySaver()

export const app = chatWorkflow.compile({ checkpointer: memory })
