export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export type Database = {
	public: {
		Tables: {
			ip_question_count: {
				Row: {
					count: number
					date: string
					ip: string
				}
				Insert: {
					count?: number
					date: string
					ip: string
				}
				Update: {
					count?: number
					date?: string
					ip?: string
				}
				Relationships: []
			}
			question_suggestions: {
				Row: {
					category: string | null
					content: string
					created_at: string | null
					id: number
				}
				Insert: {
					category?: string | null
					content: string
					created_at?: string | null
					id?: number
				}
				Update: {
					category?: string | null
					content?: string
					created_at?: string | null
					id?: number
				}
				Relationships: []
			}
			questions: {
				Row: {
					content: string | null
					embedding: string | null
					id: number
					metadata: Json | null
				}
				Insert: {
					content?: string | null
					embedding?: string | null
					id?: number
					metadata?: Json | null
				}
				Update: {
					content?: string | null
					embedding?: string | null
					id?: number
					metadata?: Json | null
				}
				Relationships: []
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			binary_quantize:
				| {
						Args: {
							'': string
						}
						Returns: unknown
				  }
				| {
						Args: {
							'': unknown
						}
						Returns: unknown
				  }
			bytea_to_text: {
				Args: {
					data: string
				}
				Returns: string
			}
			halfvec_avg: {
				Args: {
					'': number[]
				}
				Returns: unknown
			}
			halfvec_out: {
				Args: {
					'': unknown
				}
				Returns: unknown
			}
			halfvec_send: {
				Args: {
					'': unknown
				}
				Returns: string
			}
			halfvec_typmod_in: {
				Args: {
					'': unknown[]
				}
				Returns: number
			}
			hnsw_bit_support: {
				Args: {
					'': unknown
				}
				Returns: unknown
			}
			hnsw_halfvec_support: {
				Args: {
					'': unknown
				}
				Returns: unknown
			}
			hnsw_sparsevec_support: {
				Args: {
					'': unknown
				}
				Returns: unknown
			}
			hnswhandler: {
				Args: {
					'': unknown
				}
				Returns: unknown
			}
			http: {
				Args: {
					request: Database['public']['CompositeTypes']['http_request']
				}
				Returns: Database['public']['CompositeTypes']['http_response']
			}
			http_delete:
				| {
						Args: {
							uri: string
						}
						Returns: Database['public']['CompositeTypes']['http_response']
				  }
				| {
						Args: {
							uri: string
							content: string
							content_type: string
						}
						Returns: Database['public']['CompositeTypes']['http_response']
				  }
			http_get:
				| {
						Args: {
							uri: string
						}
						Returns: Database['public']['CompositeTypes']['http_response']
				  }
				| {
						Args: {
							uri: string
							data: Json
						}
						Returns: Database['public']['CompositeTypes']['http_response']
				  }
			http_head: {
				Args: {
					uri: string
				}
				Returns: Database['public']['CompositeTypes']['http_response']
			}
			http_header: {
				Args: {
					field: string
					value: string
				}
				Returns: Database['public']['CompositeTypes']['http_header']
			}
			http_list_curlopt: {
				Args: Record<PropertyKey, never>
				Returns: {
					curlopt: string
					value: string
				}[]
			}
			http_patch: {
				Args: {
					uri: string
					content: string
					content_type: string
				}
				Returns: Database['public']['CompositeTypes']['http_response']
			}
			http_post:
				| {
						Args: {
							uri: string
							content: string
							content_type: string
						}
						Returns: Database['public']['CompositeTypes']['http_response']
				  }
				| {
						Args: {
							uri: string
							data: Json
						}
						Returns: Database['public']['CompositeTypes']['http_response']
				  }
			http_put: {
				Args: {
					uri: string
					content: string
					content_type: string
				}
				Returns: Database['public']['CompositeTypes']['http_response']
			}
			http_reset_curlopt: {
				Args: Record<PropertyKey, never>
				Returns: boolean
			}
			http_set_curlopt: {
				Args: {
					curlopt: string
					value: string
				}
				Returns: boolean
			}
			ivfflat_bit_support: {
				Args: {
					'': unknown
				}
				Returns: unknown
			}
			ivfflat_halfvec_support: {
				Args: {
					'': unknown
				}
				Returns: unknown
			}
			ivfflathandler: {
				Args: {
					'': unknown
				}
				Returns: unknown
			}
			l2_norm:
				| {
						Args: {
							'': unknown
						}
						Returns: number
				  }
				| {
						Args: {
							'': unknown
						}
						Returns: number
				  }
			l2_normalize:
				| {
						Args: {
							'': string
						}
						Returns: string
				  }
				| {
						Args: {
							'': unknown
						}
						Returns: unknown
				  }
				| {
						Args: {
							'': unknown
						}
						Returns: unknown
				  }
			match_qa: {
				Args: {
					query_embedding: string
					match_threshold: number
					match_count: number
				}
				Returns: {
					id: number
					question: string
					answer: string
					similarity: number
				}[]
			}
			match_questions: {
				Args: {
					query_embedding: string
					match_count?: number
					filter?: Json
				}
				Returns: {
					id: number
					content: string
					metadata: Json
					embedding: Json
					similarity: number
				}[]
			}
			sparsevec_out: {
				Args: {
					'': unknown
				}
				Returns: unknown
			}
			sparsevec_send: {
				Args: {
					'': unknown
				}
				Returns: string
			}
			sparsevec_typmod_in: {
				Args: {
					'': unknown[]
				}
				Returns: number
			}
			text_to_bytea: {
				Args: {
					data: string
				}
				Returns: string
			}
			urlencode:
				| {
						Args: {
							data: Json
						}
						Returns: string
				  }
				| {
						Args: {
							string: string
						}
						Returns: string
				  }
				| {
						Args: {
							string: string
						}
						Returns: string
				  }
			vector_avg: {
				Args: {
					'': number[]
				}
				Returns: string
			}
			vector_dims:
				| {
						Args: {
							'': string
						}
						Returns: number
				  }
				| {
						Args: {
							'': unknown
						}
						Returns: number
				  }
			vector_norm: {
				Args: {
					'': string
				}
				Returns: number
			}
			vector_out: {
				Args: {
					'': string
				}
				Returns: unknown
			}
			vector_send: {
				Args: {
					'': string
				}
				Returns: string
			}
			vector_typmod_in: {
				Args: {
					'': unknown[]
				}
				Returns: number
			}
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			http_header: {
				field: string | null
				value: string | null
			}
			http_request: {
				method: unknown | null
				uri: string | null
				headers: Database['public']['CompositeTypes']['http_header'][] | null
				content_type: string | null
				content: string | null
			}
			http_response: {
				status: number | null
				content_type: string | null
				headers: Database['public']['CompositeTypes']['http_header'][] | null
				content: string | null
			}
		}
	}
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends (
		{ schema: keyof Database }
	) ?
		keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])
	:	never = never,
> =
	PublicTableNameOrOptions extends { schema: keyof Database } ?
		(Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends (
			{
				Row: infer R
			}
		) ?
			R
		:	never
	: PublicTableNameOrOptions extends (
		keyof (PublicSchema['Tables'] & PublicSchema['Views'])
	) ?
		(PublicSchema['Tables'] &
			PublicSchema['Views'])[PublicTableNameOrOptions] extends (
			{
				Row: infer R
			}
		) ?
			R
		:	never
	:	never

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends (
		{ schema: keyof Database }
	) ?
		keyof Database[PublicTableNameOrOptions['schema']]['Tables']
	:	never = never,
> =
	PublicTableNameOrOptions extends { schema: keyof Database } ?
		Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends (
			{
				Insert: infer I
			}
		) ?
			I
		:	never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables'] ?
		PublicSchema['Tables'][PublicTableNameOrOptions] extends (
			{
				Insert: infer I
			}
		) ?
			I
		:	never
	:	never

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends (
		{ schema: keyof Database }
	) ?
		keyof Database[PublicTableNameOrOptions['schema']]['Tables']
	:	never = never,
> =
	PublicTableNameOrOptions extends { schema: keyof Database } ?
		Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends (
			{
				Update: infer U
			}
		) ?
			U
		:	never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables'] ?
		PublicSchema['Tables'][PublicTableNameOrOptions] extends (
			{
				Update: infer U
			}
		) ?
			U
		:	never
	:	never

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema['Enums']
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database } ?
		keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
	:	never = never,
> =
	PublicEnumNameOrOptions extends { schema: keyof Database } ?
		Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] ?
		PublicSchema['Enums'][PublicEnumNameOrOptions]
	:	never

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof PublicSchema['CompositeTypes']
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends (
		{
			schema: keyof Database
		}
	) ?
		keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
	:	never = never,
> =
	PublicCompositeTypeNameOrOptions extends { schema: keyof Database } ?
		Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends (
		keyof PublicSchema['CompositeTypes']
	) ?
		PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
	:	never
