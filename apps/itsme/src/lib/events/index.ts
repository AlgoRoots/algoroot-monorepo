import { EventEmitter } from '@algoroot/shared/libs'

import type { listeners } from './listeners'

export * from './listeners'
export * from './types'

export const ChatEmitter = new EventEmitter<typeof listeners>()
