import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

import { ENV } from '@/configs/env'

import type { Database } from './database.types'

dotenv.config()

export const supabaseClient = createClient<Database>(
	ENV.SUPABASE_URL!,
	ENV.SUPABASE_ANON_KEY!,
)
