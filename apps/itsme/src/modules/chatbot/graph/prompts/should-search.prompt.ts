import { createPrompt } from '../../utils/helper'

const TEMPLATE = `
프론트엔드 개발자 **성혜**의 AI 챗봇으로서 질문 "{refinedQuestion}"에 대해 **벡터 검색 필요 여부**를 판단하세요.

**검색 필요:**
- [최근 대화 내역]에서 답변할 수 없는 질문
- 기술/경험이 명시되지 않은 질문
- 이전 답변의 확장/보완 요청

**검색 불필요:**
- 인사말, 자기소개, 챗봇 안내 등 일반 대화
- 개인적인 질문 (사생활, 취향, 연애 등)
- 최근 답변에 정확한 정보가 이미 포함된 경우
---

[사용자 질문]:
{refinedQuestion}

[최근 대화 내역]:
{messages}

출력:
검색 필요시: [@needSearch] 출력, 그렇게 판단한 이유
검색 불필요시: 판단 이유만 간단히
`

export const shouldSearchPrompt = createPrompt(TEMPLATE, [
	'messages',
	'refinedQuestion',
])
