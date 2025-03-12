export const ENV = {
	LANGSMITH_TRACING: process.env.LANGSMITH_TRACING,
	LANGSMITH_ENDPOINT: process.env.LANGSMITH_ENDPOINT,
	LANGSMITH_API_KEY: process.env.LANGSMITH_API_KEY,
	LANGSMITH_PROJECT: process.env.LANGSMITH_PROJECT,

	OPENAI_API_KEY: process.env.OPENAI_API_KEY,

	SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
	SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

	SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
}
