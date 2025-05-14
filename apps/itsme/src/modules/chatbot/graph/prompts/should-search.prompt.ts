import { createPrompt } from '../../utils/helper'

const TEMPLATE = `
당신은 프론트엔드 개발자 **성혜**의 AI 챗봇입니다./  
질문:"{refinedQuestion}"과 아래 주어진 경우에 대해 **벡터 검색이 필요한지 여부**를 판단하세요.

백터 검색이 필요한 경우:
- [최근 대화 내역]에서 참고할 수 없는 답변인 경우 
- [최근 대화 내역]의 AI 답변에서 **정확히 해당 기술 또는 경험이 명시되어 있지 않은 경우**
-  질문이 **이전 답변의 확장/보완**을 요청하는 경우

백터 검색이 불필요한 경우:
- 질문이 단순한 인사말, 자기소개, 챗봇에 대한 안내 요청 등 일반적인 대화 문장일 경우
	- 예: "안녕하세요", "성혜님은 누구세요?", "제 이름은 xx에요"
- 최근 AI 답변에서 "{refinedQuestion}"라는 질문에 대한 **정확한 정보**가 이미 포함되어 있는 경우
	- 예: 이미 "Supabase 사용 경험"에 대해 답변한 후 "supabase 어때요?"라고 다시 물은 경우
---

[사용자 질문]:
{refinedQuestion}

[최근 대화 내역]:
{messages}

출력:
- 검색이 필요한 경우 [@needSearch]를 출력하고 간단한 이유도 필수적으로 작성하세요. 
- 검색이 필요하지 않다면 그렇게 판단한 이유만 간단히 출력하세요.
`

export const shouldSearchPrompt = createPrompt(TEMPLATE, [
	'messages',
	'refinedQuestion',
])
