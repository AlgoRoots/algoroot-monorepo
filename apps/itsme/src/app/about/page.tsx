import { List, ListRenderer, MenuLink } from '@algoroot/shared/components'
import { Badge } from '@algoroot/ui/components/badge'
import { Separator } from '@algoroot/ui/components/separator'

import { Container, Section } from '@/components/ContainerSet'
import { Logo } from '@/components/LogoSet'
import { Highlight } from '@/components/TextDecoratorSet'

const TECH_STACKS = [
	{
		title: '🧠 AI 기술',
		items: ['LangGraph.js', 'Supabase Vector DB', 'OpenAI', 'AI SDK'],
	},
	{
		title: '🌐 웹 프론트엔드',
		items: ['Next.js', 'Tailwind CSS', 'Shadcn UI'],
	},
	{
		title: '🧩 API 및 백엔드',
		items: ['tRPC', 'Supabase', 'Zod'],
	},
]

const SERVICE_INFO = [
	'GPT-4o-mini 모델을 기반으로 응답을 생성합니다.',
	'최근 대화 흐름을 유지하기 위해, 최대 10개의 메시지를 기억하여 문맥을 반영합니다.',
	'과도한 사용을 방지하기 위해, IP 기준 하루 최대 50회의 대화로 제한하고 있습니다.',
	'IP는 User-Agent와 함께 해싱된 값으로 저장되며, 완전한 고유성은 보장되지 않지만 디버깅 및 제한 목적이므로 일부 중복 가능성은 감수합니다.'
]

const CORE_FEATURES = [
	{
		title: 'AI 기반 데이터 벡터화 및 검색 최적화 (RAG)',
		description: [
			'포트폴리오(Web Crawling), 이력서(Markdown), 자기소개(JSON) 데이터를 벡터화하여 저장',
			'LangGraph의 StateGraph를 활용해 질문 정제 → 검색 필요 판단 → 조건 분기 → 응답 생성 흐름을 구현',
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
		title: '실시간 스트리밍 응답 처리 (LangGraph stream & AI SDK)',
		description: ['빠르게 응답을 보여주며 대기 시간 약 60% 감소 (5초 → 2초)'],
	},
	{
		title: '사용자 입력을 반영한 동적 응답 생성',
		description: [
			'사용자 입력과 검색 결과를 기반으로 프롬프트를 동적으로 구성',
			'프롬프트 설계 과정은 LangGraph의 상태 흐름을 통해 구성되었으며, 현재는 간단한 search → model 단계를 기반으로 함',
		],
	},
	{
		title: 'UX/UI 최적화 및 ChatGPT 스타일 채팅 인터페이스 개선',
		description: [
			'최신 메시지를 상단에 배치하여 정보 접근성 향상 및 화면 이동 최소화',
			'모바일 환경에서 body 스크롤과 채팅창 내부 스크롤을 분리하여 자연스러운 UX 제공',
			'마지막 메시지와 입력창 간격을 조정하여 가독성과 레이아웃 균형 유지',
			'ChatGPT UX를 참고하여 채팅 인터페이스 및 대화 흐름 개선',
			'서버 컴포넌트 환경에서 tRPC·React Query 기반 API Prefetch 및 SSR 최적화 (apps/itsme/src/app/page.tsx)',
		],
	},
]

const API_FEATURES = [
	{
		title: '일관되고 타입 기반의 API 설계 (tRPC + Zod)',
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
						className="px-0"
						href="https://sunghyes-organization.gitbook.io/dev-portfolio/its-me"
					>
						상세 기술서 링크 🔗
					</MenuLink>
					<p>
						저에 대해 더 흥미롭게 알아갈 수 있도록{' '}
						<Highlight>
							AI 기반 자기소개서 서비스 &apos;It`s ME!&apos;{' '}
						</Highlight>{' '}
						를 개발했습니다. 수많은 이력서 속에서 저만의 차별점을 강조하고, 보다
						직관적이고 재미있는 방식으로 저를 소개할 수 있도록 기획했습니다.
					</p>
				</Section>

				<Section title={'⚙️ 서비스 이용 안내 및 모델 정보'}>
					<article className="space-y-2">
						<List items={SERVICE_INFO} listType="dot" />
					</article>
				</Section>

				<Section title={'🛠 사용된 기술 스택'}>
					<ListRenderer
						data={TECH_STACKS}
						className="space-y-4"
						render={({ title, items }) => (
							<div key={title}>
								<h3 className="text-muted-foreground mb-2 text-sm font-semibold">
									{title}
								</h3>
								<ListRenderer
									className="flex flex-wrap gap-2"
									data={items}
									render={(tech) => (
										<Badge
											key={tech}
											variant={'outline'}
											className="p-1 font-extrabold"
										>
											{tech}
										</Badge>
									)}
								/>
							</div>
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

				<Section title={'🔌  API 구조 및 통신 방식'}>
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
