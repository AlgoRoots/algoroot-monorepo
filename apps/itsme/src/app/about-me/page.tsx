import { List, ListRenderer, MenuLink } from '@algoroot/shared/components'
import { Badge } from '@algoroot/ui/components/badge'
import { Separator } from '@algoroot/ui/components/separator'

import { Container, Section } from '@/components/ContainerSet'
import { Logo } from '@/components/LogoSet'
import { Highlight } from '@/components/TextDecoratorSet'

const TECH_STACKS = [
	'LangGraph.js',
	'Supabase Vector DB',
	'ai sdk',
	'Next.js',
	'Tailwind CSS',
	'tRPC',
	'Supabase',
	'Zod',
]

const CORE_FEATURES = [
	{
		title: 'AI 기반 데이터 벡터화 및 검색 최적화 (RAG)',
		description: [
			'이력서(기술, md) 및 JSON(취미, 장단점) 데이터를 Supabase Vector DB에 벡터화하여 저장 및 검색',
			'LangGraph.js 기반 Retrieval-Augmented Generation(RAG) 적용',
			'기존 OpenAI API 호출 대비 더 정확한 맥락 기반 응답 제공',
		],
	},
	{
		title: '지속적인 대화 흐름 유지 (Memory Management)',
		description: [
			'MemorySaver를 활용한 채팅 내역 저장 및 문맥 유지',
			'Message Trimmer로 최대 10 Token 유지하여 메모리 사용량 최적화',
		],
	},
	{
		title: 'RSC 환경 실시간 스트리밍 응답 처리',
		description: [
			'createStreamableValue를 활용하여 AI 응답을 RSC 환경에서 실시간 스트리밍',
			'LangGraph.stream을 사용해 AI 응답을 즉시 전달하고 대화 흐름 유지',
			'readStreamableValue로 클라이언트에서 토큰 단위 응답을 처리하여 사용자 대기 시간 단축',
			'기존 API 응답 방식 대비 빠른 사용자 피드백 제공 및 UX 개선',
		],
	},
	{
		title: '사용자 입력을 반영한 동적 응답 생성',
		description: [
			'StateGraph 활용하여 입력된 데이터 기반 AI 응답 생성',
			'프롬프트 엔지니어링 기법 적용 → 상황별 맞춤 응답 제공',
			'사용자의 답변 스타일에 맞춘 맞춤형 AI 응답 제공',
		],
	},
	{
		title: 'UX/UI 최적화 및 ChatGPT 스타일 채팅 인터페이스 개선',
		description: [
			'최신 메시지를 상단에 배치하여 정보 접근성 향상 및 화면 이동 최소화',
			'모바일 환경에서 body 스크롤과 채팅창 내부 스크롤을 분리하여 자연스러운 UX 제공',
			'마지막 메시지와 입력창 간격을 조정하여 가독성과 레이아웃 균형 유지',
			'ChatGPT UX 패턴을 참고하여 사용자 친화적인 대화 흐름 개선',
		],
	},
]

const API_FEATURES = [
	{
		title: '타입 안전한 API 통신 – tRPC + Zod',
		description: [
			'클라이언트에서 호출하는 모든 API는 tRPC로 연결되어 있어 타입 자동 완성 및 일관된 통신 구조 유지',
			'각 API의 입력/출력 스키마는 Zod로 정의되어 있어 유효성 검사와 타입 추론을 동시에 처리',
		],
	},
	{
		title: 'Supabase 기반의 실시간 데이터 처리 및 인증',
		description: [
			'Supabase Client를 통해 벡터 데이터와 사용자 정보 읽기/쓰기 처리',
		],
	},
]

export default function AboutMe() {
	return (
		<div className="h-full w-full overflow-y-auto">
			<Container>
				<Section
					title={
						<div className="flex items-end gap-2">
							<p>AI 자기소개서 </p>
							{<Logo />}
						</div>
					}
				>
					<MenuLink
						variant={'link'}
						className="px-0 underline"
						href="https://sunghyes-organization.gitbook.io/dev-portfolio/its-me"
					>
						상세 기술서
					</MenuLink>
					<p>
						저에 대해 더 흥미롭게 알아갈 수 있도록{' '}
						<Highlight>AI 기반 자기소개서 서비스 'It`s ME!' </Highlight> 를
						개발했습니다. 수많은 이력서 속에서 저만의 차별점을 강조하고, 보다
						직관적이고 재미있는 방식으로 저를 소개할 수 있도록 기획했습니다.
					</p>
				</Section>

				<Section title={'🛠 사용 기술'}>
					<ListRenderer
						className="flex flex-wrap gap-2"
						data={TECH_STACKS}
						render={(tech) => (
							<Badge key={tech} className="p-1 font-extrabold">
								{tech}
							</Badge>
						)}
					/>
				</Section>

				<Section title={'🚀 핵심 기능'}>
					<ListRenderer
						className="space-y-6"
						data={CORE_FEATURES}
						render={(feature, index) => (
							<article key={index} className="space-y-2">
								<h3 className="text-primary font-bold">{feature.title}</h3>
								<List items={feature.description} listType="dot" />
								{index < CORE_FEATURES.length - 1 && <Separator />}
							</article>
						)}
					/>
				</Section>

				<Section title={'🚀 API 구조 및 통신 방식'}>
					<ListRenderer
						className="space-y-6"
						data={API_FEATURES}
						render={(feature, index) => (
							<article key={index} className="space-y-2">
								<h3 className="text-primary font-bold">{feature.title}</h3>
								<List items={feature.description} listType="dot" />
								{index < API_FEATURES.length - 1 && <Separator />}
							</article>
						)}
					/>
				</Section>
			</Container>
		</div>
	)
}
