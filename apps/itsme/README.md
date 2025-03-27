# AI 자기소개서 It's ME!

저에 대해 더 흥미롭게 알아갈 수 있도록 AI 기반 자기소개서 서비스 'ItsMe!’를 개발했습니다. 수많은 이력서 속에서 저만의 차별점을 강조하고, 보다 직관적이고 재미있는 방식으로 저를 소개할 수 있도록 기획했습니다.

![](https://sunghyes-organization.gitbook.io/~gitbook/image?url=https%3A%2F%2F638996060-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F1X5fIO4bVrafwBq0abiw%252Fuploads%252Fg02krX0kBxnTDZEyx2kz%252Flocalhost_3000_.png%3Falt%3Dmedia%26token%3D480b4e63-ac28-48b8-bf5b-5b0b6b071c04&width=768&dpr=4&quality=100&sign=1bd93784&sv=2)

## Skill Stacks

(AI) LangGraph.js, Supabase Vector DB, OpenAI, AI SDK

(Web) Next.js, Tailwind, Shadcn

## 핵심 개발 기능

- AI 기반 데이터 벡터화 및 검색 최적화 (RAG)
  - 포트폴리오(`Web Crawling`), 이력서(기술, `md`) 및 취미, 장단점(`json`) 데이터를 Supabase Vector DB에 벡터화하여 저장
  - 기존 OpenAI API 호출 대비 정확한 맥락 기반 응답 제공
- 지속적인 대화 흐름 유지 (Memory Management)
  - `MemorySaver`로 채팅 내역 저장 및 문맥 유지
  - `Message Trimmer`로 최대 10 Token 유지하여 메모리 사용량 최적화
- RSC환경 실시간 스트리밍 응답 처리 (LangGraph stream & AI SDK)
  - `createStreamableValue`를 활용해 AI 응답을 스트리밍하고, LangGraph.stream으로 대화 흐름 유지
  - `readStreamableValue`로 클라이언트에서 토큰 단위 응답을 처리하여 사용자 대기 시간 단축
- 사용자 입력을 반영한 동적 응답 생성
  - `StateGraph` 활용하여 입력된 데이터 기반 AI 응답 생성
  - 프롬프트 엔지니어링 기법 적용 → 상황별 맞춤 응답 제공
- 편안한 UI/UX 고려
  - Chat GPT의 UX 참고해 UX 개선

## 관련 글

- [어쩌다 AI 프로젝트를 ?](https://sunghyes-organization.gitbook.io/dev-portfolio/its-me/introduce)
- [Chatbot 기술적 개선 과정](https://sunghyes-organization.gitbook.io/dev-portfolio/its-me/tech)
- [UI / UX 고민과 개선기](https://sunghyes-organization.gitbook.io/dev-portfolio/its-me/ui-ux)
- [포트폴리오 크롤링 기반 벡터 DB 개선기](https://sunghyes-organization.gitbook.io/dev-portfolio/its-me/web-crawling)

## 미리보기

일반적인 질문디테일한 설명 요청직접적이지 않은 질문관련없는 질문

### 💬 일반적인 질문

![img](https://sunghyes-organization.gitbook.io/~gitbook/image?url=https%3A%2F%2F638996060-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F1X5fIO4bVrafwBq0abiw%252Fuploads%252FvBvPaxB0khMnwvZezhHh%252Fimage.png%3Falt%3Dmedia%26token%3D22e316c4-aad0-4ede-9101-5dfed3c3193c&width=768&dpr=4&quality=100&sign=2e093865&sv=2)

### 🔎 디테일한 설명 요청

![img](https://sunghyes-organization.gitbook.io/~gitbook/image?url=https%3A%2F%2F638996060-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F1X5fIO4bVrafwBq0abiw%252Fuploads%252FyrXcJGCGGxvf2KacBbA7%252Fimage.png%3Falt%3Dmedia%26token%3D05fa2add-f4be-42fb-8f7a-a06b1d503815&width=768&dpr=4&quality=100&sign=12ea1a59&sv=2)

### ❓ 직접적이지 않은 질문

![img](https://sunghyes-organization.gitbook.io/~gitbook/image?url=https%3A%2F%2F638996060-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F1X5fIO4bVrafwBq0abiw%252Fuploads%252FMeeHhQBnpdAYMbl4q8lo%252Flocalhost_3000_chat%2520%285%29.png%3Falt%3Dmedia%26token%3D118fa77b-72d7-45e0-9fb9-af1df5dd12e5&width=768&dpr=4&quality=100&sign=a2bd6e0e&sv=2)

### 🚫 관련없는 질문

![img](https://sunghyes-organization.gitbook.io/~gitbook/image?url=https%3A%2F%2F638996060-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F1X5fIO4bVrafwBq0abiw%252Fuploads%252FW7CAmDsAMczr6MkW5gYe%252Fimage.png%3Falt%3Dmedia%26token%3Dbfbb60a2-2119-4bca-90fe-ddbb799134f9&width=768&dpr=4&quality=100&sign=bc843942&sv=2)
