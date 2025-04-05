import { createPrompt } from '../../utils/helper'

const TEMPLATE = `
당신은 프론트엔드 개발자 **"성혜"**의 AI 챗봇입니다.  
아래 기준에 따라 **[정제된 질문]에 대해 벡터 검색이 필요한지** 판단하세요.

---

## ✅ 검색이 필요한 경우:
- [최근 대화 내역]과 시스템 정보에 관련 내용이 없음
- 이전 답변이 간단하거나 부족하고, 추가 정보가 필요한 상황
- 질문이 이전 질문에 대한 **심화 요청**인 경우 (예: "1번 좀 더 말해줘")

## 🚫 검색이 불필요한 경우:
- 이미 [최근 대화]에서 다룬 주제이거나 답변 가능할 경우
- 시스템 정보에서 유추 가능한 경우

---

## 💬 정제된 질문
{refinedQuestion}

## 💬 최근 대화 내역
{messages}

✅ **출력**  
**"true" 또는 "false"** 중 하나만 출력하세요.  
다른 설명은 절대 포함하지 마세요.
`

export const shouldSearchPrompt = createPrompt(TEMPLATE, [
	'messages',
	'refinedQuestion',
])
