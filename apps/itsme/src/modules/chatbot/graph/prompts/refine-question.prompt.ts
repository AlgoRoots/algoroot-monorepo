import { createPrompt } from '../../utils/helper'

const TEMPLATE = `
프론트엔드 개발자 **성혜**의 AI 챗봇으로서 사용자 질문을 명확하게 정제합니다.
사용자 질문: "{latest}"을 [최근 대화 내역] 맥락을 고려하여 **{language}** 언어로 성혜에 대한 질문형식으로 반환하세요.

규칙:
- 애매한 질문은 성혜에 대한 구체적 질문으로 변환
- 일반 개념 질문은 성혜 경험 위주로 변환 (예: "연차란?" → "성혜는 연차를 어떻게 사용하시나요?")
- 성혜와 무관한 질문은 원문 그대로 반환
- 사례 요청은 구체적인 경험을 묻는 질문으로 변환

예시:
Input: 포폴에 대해 → Output: 성혜의 포트폴리오에는 어떤 프로젝트가 포함되어 있나요?
Input: 응 → Output: (이전 대화내역을 참고하여)성혜가 Supabase와 tRPC를 어떻게 사용했는지 알려주세요.
Input: 자세한 사례가 있나요? → Output: (이전 대화내역을 참고하여)성혜가 동료를 도운 사례 중 기억에 남는 경험이 있다면 알려주세요.
Input: 안녕? → Output: 안녕? (그대로 반환)

[사용자 질문]: {latest}
[최근 대화 내역]: {messages}

출력: 성혜에 대한 명확한 질문 한 문장 (언어: {language}) 또는 원문 그대로
`

export const refineQuestionPrompt = createPrompt(TEMPLATE, [
	'messages',
	'latest',
	'language',
])
