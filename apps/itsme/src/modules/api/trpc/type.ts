import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server'
import type {
	MutationProcedure,
	QueryProcedure,
	SubscriptionProcedure,
} from '@trpc/server/unstable-core-do-not-import'

type RemoveUnusedKey<T> = Omit<
	T,
	'_def' | '_procedure' | '_type' | 'meta' | 'createCaller' | 'getErrorShape'
>

type RemoveDefRecursive<T> = RemoveUnusedKey<{
	[K in keyof T]: RemoveDefRecursive<T[K]>
}>

type DeepKeyOf<T> =
	T extends object ?
		{
			[K in keyof T & string]: T[K] extends object ?
				`${K}` | `${K}.${DeepKeyOf<T[K]>}`
			:	`${K}`
		}[keyof T & string]
	:	never

type GetRoute<T, Path extends string> =
	Path extends `${infer Key}.${infer Rest}` ?
		Key extends keyof T ?
			GetRoute<T[Key], Rest>
		:	never
	: Path extends keyof T ? T[Path]
	: never

type AnyProcedure =
	| QueryProcedure<any>
	| MutationProcedure<any>
	| SubscriptionProcedure<any>

type GetProcedure<T, Path extends string> =
	GetRoute<T, Path> extends AnyProcedure ? GetRoute<T, Path> : never

export type ItemType<T> = T extends (infer U)[] ? U : T

export type RoutePath<T> = DeepKeyOf<RemoveDefRecursive<T>>

export type ApiResponseType<
	Router,
	Path extends RoutePath<Router>,
> = inferProcedureOutput<GetProcedure<Router, Path>>

export type ApiRequestType<
	Router,
	Path extends RoutePath<Router>,
> = inferProcedureInput<GetProcedure<Router, Path>>
