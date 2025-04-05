---
'@algoroot/itsme': minor
---

# LangGraph 기반 Chat Workflow 개선

> 챗봇 워크플로우의 유연성과 응답 품질을 높이기 위해 LangGraph 기반의 StateGraph를 구조화하고, 검색 최적화 및 응답 생성을 정교화했습니다.

---

## 🔧 StateGraph 구조 개선

- 기존 구조:

  ```nginx
  __start__
   ↓
  searchVectorStore
   ↓
  generateResponse
   ↓
   __end__
  ```

- 개선 구조:

```nginx
__start__
   ↓
refineQuestion
   ↓
checkSearchNeed
   ↓
  ┌───────────────┐
  │ needSearch ?  │
  └──────┬────────┘
         ↓
      true → searchVectorStore → generateResponse
      false ───────────────────→ generateResponse
                                  ↓
                                __end__

```

- 목적:
- refineQuestion: 모호한 질문은 검색 최적화용 쿼리로 정제
- checkSearchNeed: 질문이 명확한 경우 false를 반환하여 검색 생략
- checkSearchNeed 응답에 따라 필요 시에만 벡터 DB 검색을 수행

---

## 프롬프트 역할 분리 및 리팩토링

#### 1. `refineQuestionPrompt`

- 역할: 사용자의 마지막 질문을 검색에 적합한 쿼리로 정제
- 특징:
- 질문이 짧거나 모호한 경우, 최근 대화 흐름을 참고해 보완
- 판단이 어려운 경우 사용자 입력 그대로 반환
- 예시:

| 입력          | 출력                                                       |
| ------------- | ---------------------------------------------------------- |
| `포폴에 대해` | `성혜의 포트폴리오에는 어떤 내용이 있는지 알려줘`          |
| `응`          | `성혜가 Supabase와 tRPC를 어디서 어떻게 활용했는지 알려줘` |
| `안녕?`       | `안녕?`                                                    |

---

#### 2. `shouldSearchPrompt`

- 역할: refinedQuestion에 대해 검색이 필요한지 판단
- 출력: `"true"` 또는 `"false"` (단독 텍스트)
- 검색이 필요한 조건:
- 대화 흐름에 관련 정보 없음
- 질문이 기존 답변의 확장/추가 설명을 요구
- 예시:

| 질문                            | 판단  |
| ------------------------------- | ----- |
| `너 누구야?`                    | false |
| `1번 프로젝트에 대해 더 말해줘` | true  |

---

#### 3. `generateResponsePrompt`

- 역할: refinedQuestion, messages, searchResults를 기반으로 최종 응답 생성
- 특징:
- 마크다운 형식, 이모지 헤딩, 포트폴리오 링크 포함
- 1인칭 시점 유지, 존댓말 사용 강제
- 검색 결과가 없다면 자연스럽게 "정보 없음" 처리

---

## 프롬프트 관리 방식 개선

createPrompt(template, inputs) 유틸 도입하여 템플릿 구조 통일

### Reference

- LangGraph 공식 문서: https://js.langchain.com/docs/tutorials/sql_qa/#orchestrating-with-langgraph
