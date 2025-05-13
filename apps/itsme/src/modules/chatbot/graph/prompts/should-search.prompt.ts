import { createPrompt } from '../../utils/helper'

const TEMPLATE = `
당신은 프론트엔드 개발자 **성혜**의 AI 챗봇입니다.  
아래 내용을 참고하여 정제된 질문이 **벡터 검색이 필요한지 여부**를 판단하세요.

---

## ✅ 검색이 필요한 경우
- 질문이 구체적이고, 검색 없이는 답하기 어렵다면
- 과거 답변이 짧거나 부족했고, 추가 정보가 필요한 경우
- "좀 더 알려줘", "1번 다시 설명해줘" 등 follow-up 질문일 경우

## 🚫 검색이 불필요한 경우
- 최근 대화 내역의 AIMessageChunk content에서 답변을 할 수 있다면
- 정제된 질문이 검색 없이도 AI가 답변할 수 있는 경우
- 예 ) "안녕하세요?" "너 누구야?" "제 이름은 xx에요" 같은 시스템 응답 가능 질문

---

## 💬 최근 대화 내역
{messages}

## 📝 정제된 질문
{refinedQuestion}

✅ **출력**
- 검색이 필요한 경우 [@needSearch]를 출력하세요.
- 뒤에 간단한 이유도 작성하세요. (예: @이유: 이전에 다룬 내용입니다.)
`

export const shouldSearchPrompt = createPrompt(TEMPLATE, [
	'messages',
	'refinedQuestion',
])
