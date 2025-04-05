import { createPrompt } from '../../utils/helper'

const TEMPLATE = `
당신은 프론트엔드 개발자 **"성혜"**의 AI 챗봇입니다.  
아래 기준을 바탕으로 **[정제된 질문]이 벡터 검색이 필요한지** 판단하세요.

---

## ✅ 검색이 필요한 경우 : true 반환
- 질문이 명확하고 구체적인 경우
- [최근 대화 내역]과 시스템 정보에서 답변할 수 없는 경우
- 이전 답변이 짧거나 부족하고, 추가 정보가 필요한 상황
- 이전 질문의 내용을 더 깊이 요청한 경우 (예: "1번 좀 더 말해줘")

## 🚫 검색이 불필요한 경우: false 반환
- 이미 [최근 대화 내역]에서 AI가 답변한 주제일 경우
- 시스템 정보로 충분히 답변 가능한 경우

## 💡 예시
- "~에 대해 어떻게 사용했는지 알려주세요." → true
- "너 누구야?" → false
- "포트폴리오에 뭐 있어?" → true

---

## 💬 정제된 질문
{refinedQuestion}

## 💬 최근 대화 내역
{messages}

✅ **출력 형식**
- 검색이 필요할 경우 [@needSearch]를 출력하세요.
- 반드시 그 이유에 대해서도 짧게 기재하세요 [@이유:]
- 절대 다른 문장이나 설명을 포함하지 마세요.
`

export const shouldSearchPrompt = createPrompt(TEMPLATE, [
	'messages',
	'refinedQuestion',
])
