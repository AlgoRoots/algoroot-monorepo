# @algoroot/itsme

## 1.2.0

### Minor Changes

- [`2507ab3`](https://github.com/AlgoRoots/algoroot-monorepo/commit/2507ab3e579345c64a2ddb1943a1f892441fc252) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - # LangGraph 기반 Chat Workflow 개선

  > 챗봇 워크플로우의 유연성과 응답 품질을 높이기 위해 LangGraph 기반의 StateGraph를 구조화하고, 검색 최적화 및 응답 생성을 정교화했습니다.

  ***

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

  ***

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

  ***

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

  ***

  #### 3. `generateResponsePrompt`

  - 역할: refinedQuestion, messages, searchResults를 기반으로 최종 응답 생성
  - 특징:
  - 마크다운 형식, 이모지 헤딩, 포트폴리오 링크 포함
  - 1인칭 시점 유지, 존댓말 사용 강제
  - 검색 결과가 없다면 자연스럽게 "정보 없음" 처리

  ***

  ## 프롬프트 관리 방식 개선

  createPrompt(template, inputs) 유틸 도입하여 템플릿 구조 통일

  ### Reference

  - LangGraph 공식 문서: https://js.langchain.com/docs/tutorials/sql_qa/#orchestrating-with-langgraph

## 1.1.3

### Patch Changes

- [`d414c64`](https://github.com/AlgoRoots/algoroot-monorepo/commit/d414c647758f467d318d7be89adb252453aa4e7c) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - - maxDuration 조정 (함수 최대 요청 시간)

## 1.1.2

### Patch Changes

- [`702618e`](https://github.com/AlgoRoots/algoroot-monorepo/commit/702618e2fe001811da688c79fdfd9f3d1bc7d968) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - - RAG, stream 응답시간 고려 max duration 조정

## 1.1.1

### Patch Changes

- [`83b41a4`](https://github.com/AlgoRoots/algoroot-monorepo/commit/83b41a4cfe29eec935dd965be067208f2a3e0d4e) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - - trpc 관련 로직 정리 및 파일 분리

## 1.1.0

### Minor Changes

- [`1da5aea`](https://github.com/AlgoRoots/algoroot-monorepo/commit/1da5aea63f55aed008bf15a9f627718922078a10) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - ## Chat 기능 구조 개선 및 제안된 질문(`getSuggestQuestions`) API 추가

  ### Features

  - **tRPC 기반 API 구조 도입**

    - 기존의 action/단일 API 사용 방식에서 벗어나 `tRPC`를 도입하여, 모든 API 호출을 타입 안전하게 통합 관리
    - 입력 스키마는 `Zod`로 정의되어, 클라이언트/서버 간 입력 값 유효성 검사와 자동 타입 추론을 동시에 지원
    - `AppRouter` 기반으로 전체 API를 일관된 방식으로 구성

  - **`getSuggestQuestions` API**

    - 기존에 하드코딩된 제안 질문 리스트를 Supabase 테이블(`question_suggestions`)에서 동적으로 조회하는 방식으로 개선
    - 실시간으로 질문 데이터를 Supabase에서 관리할 수 있어, 서비스 운영 중에도 유동적으로 질문 조정 가능

  - **질문 요청 횟수 제한 기능 추가**
    - 동일 IP 기준으로 하루 최대 50개의 질문만 허용되도록 제어
    - `addIpCount`, `getIpCount` API를 통해 Supabase에 날짜별 질문 수를 기록하고, 초과 시 요청 거부 처리
    - 로컬 개발 환경(IP `::1`)은 제한 없이 요청 가능

  ### Internal

  - trpc 셋팅 경로
  - apps/itsme/src/modules/api/trpc
  - `router.ts` 파일 내 전체 API를 한 곳에 통합해 관리하도록 구조화
  - 질문 제한 관련 로직 (`addIpCount`, `getIpCount`)도 `router`에 포함하여 tRPC 기반으로 재정리
  - Supabase 벡터 DB 연동 API (`addDocuments`, `clearDocuments`) 포함하여 RAG 워크플로우 전반 대응

  ***

### Patch Changes

- [`75016ff`](https://github.com/AlgoRoots/algoroot-monorepo/commit/75016ffad46eaf2e6f8287114d10187974f89c08) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - ### Fix

  - IP 사용량 체크 로직 개선
  - 폼 제출 시 `addIpCount` API의 응답 지연 원인을 분석한 결과, 동일한 API에서 조회와 업데이트를 동시에 처리하고 있어 시간이 지연됨
  - 이를 해결하기 위해 조회(GET)와 업데이트(POST)를 분리하여 각각 요청하도록 변경

    - `getIpUsage`: 현재 IP의 사용량 조회
    - `addIpCount`: 사용량 1 증가

  - `useIp` 훅 도입:

    - `ip`, `count`, `isExceeded` 상태를 제공합니다
    - `checkLimit` 함수로 제한 초과 여부를 사전 검사할 수 있습니다
    - `addIpCount`, `refetchIpUsage`, `resetIsExceeded` 함수로 세밀한 제어가 가능합니다

  - production 환경에서 console log 제거

- [`1da5aea`](https://github.com/AlgoRoots/algoroot-monorepo/commit/1da5aea63f55aed008bf15a9f627718922078a10) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - ### FIx

  - env 참조 변경

- [`400f5c2`](https://github.com/AlgoRoots/algoroot-monorepo/commit/400f5c22935aab10eaa1fc5012dbb47c83285e19) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - ### fix

  - Markdown pre display 속성 변경

- [`74f06be`](https://github.com/AlgoRoots/algoroot-monorepo/commit/74f06bec226d4c8d9122661d4cdc9bbd8e2b3a5a) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - - lint 오류 수정 및 불필요한 코드 정리

- [`213239c`](https://github.com/AlgoRoots/algoroot-monorepo/commit/213239ce9deadfa46b722346eff97bf2d15f3f20) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - ### fix

  - 메세지 응답 연결 닫혔을 때 (에러) 다시 시도 버튼 생성

- [`5fca132`](https://github.com/AlgoRoots/algoroot-monorepo/commit/5fca1327d54ab7aaeed274c6089279e95ba72d43) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - ### Fix

  - Streaming 응답 처리 방식 수정

    - 사용자 메시지를 먼저 추가하고, 이후 AI 응답 메시지를 별도로 추가하여 스트리밍 데이터를 누적하도록 개선
    - 이전에는 사용자 메시지와 빈 AI 메시지를 동시에 추가하여 message 순서가 꼬이거나 delta 누적이 되지 않는 문제가 있었음
    - `readStreamableValue`를 통해 AI 응답이 마지막 메시지(`role: 'ai'`)에 정상적으로 이어붙도록 `updateMessage` 로직도 함께 수정

  - 결과적으로 GPT 응답이 실시간으로 자연스럽게 나타나며, 메시지 구조도 안정적으로 유지됨

- [`dc0fb13`](https://github.com/AlgoRoots/algoroot-monorepo/commit/dc0fb139e1c1f13d1e83cb02ce32388112706f3d) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - - getSuggestQuestions API

  - 프롬포트 템플릿 수정

- [`ab60a77`](https://github.com/AlgoRoots/algoroot-monorepo/commit/ab60a770da0ce55c78314362297898da21ab3bcb) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - ff

- [`14da455`](https://github.com/AlgoRoots/algoroot-monorepo/commit/14da455dda1301eacdbd8dc48abd60f125c8a491) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - ### Chore

  - About 페이지 기술 스택을 AI / Web / API 그룹으로 구분하여 시맨틱하게 정리
  - 기술 리스트에 누락되었던 OpenAI, Shadcn UI 등 추가

- Updated dependencies [[`7bd09cf`](https://github.com/AlgoRoots/algoroot-monorepo/commit/7bd09cfbd7a5b93ff0046a0e9f81478520172b8d), [`e993d28`](https://github.com/AlgoRoots/algoroot-monorepo/commit/e993d281d68537abfee14c3251a9eba0cb74df33)]:
  - @algoroot/shared@0.1.0
  - @algoroot/ui@0.1.0

## 1.0.0

### Major Changes

- [`57f496f`](https://github.com/AlgoRoots/algoroot-monorepo/commit/57f496fd13f13fb2cbeea2eb9bd9be378f5dda46) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - 🎉 **AI 자기소개서 서비스 'It's ME!' 첫 메이저 배포**

  AI 기반으로 자기소개서를 자동 생성해주는 'It's ME!' 서비스가 첫 메이저 릴리즈로 배포되었습니다.
  자기소개서, 이력서, 포트폴리오 등 사용자의 다양한 입력 데이터를 바탕으로 AI 챗봇이 문장을 제안하고
  자연스러운 문맥을 이어가는 스마트한 응답을 제공합니다.

  자세한 개발 과정과 회고는 아래 문서에서 확인하실 수 있습니다:
  👉 https://sunghyes-organization.gitbook.io/dev-portfolio/its-me

  ***

  ## 🛠 Skill Stacks

  - **AI**: LangGraph.js, Supabase Vector DB, OpenAI, AI SDK
  - **Web**: Next.js, Tailwind CSS, Shadcn UI

  ***

  ## 🚀 핵심 개발 기능

  - **AI 기반 데이터 벡터화 및 검색 최적화 (RAG)**

    - 포트폴리오(`Web Crawling`), 이력서(`md`), 취미 및 성향 정보(`json`)를 벡터화하여 Supabase Vector DB에 저장
    - OpenAI 단독 호출보다 더 정확한 문맥 기반 응답 제공

  - **지속적인 대화 흐름 유지 (Memory Management)**

    - `MemorySaver`로 이전 대화 문맥을 저장
    - `Message Trimmer`로 토큰 수를 제한해 LangChain memory 최적화

  - **RSC 환경에서의 실시간 스트리밍 응답 처리**

    - `createStreamableValue` + `LangGraph.stream`으로 응답을 실시간 스트리밍
    - `readStreamableValue`로 사용자 대기 시간 최소화

  - **사용자 입력을 반영한 동적 응답 생성**

    - `StateGraph` 기반 동적 흐름 설계
    - 프롬프트 엔지니어링으로 상황 맞춤형 답변 제공

  - **사용자 친화적 UI/UX**
    - ChatGPT UX 패턴을 참고하여 입력 흐름과 응답 구조를 개선

  ***

  ## 📚 관련 글

  - [어쩌다 AI 프로젝트를 ?](https://sunghyes-organization.gitbook.io/dev-portfolio/its-me/introduce)
  - [Chatbot 기술적 개선 과정](https://sunghyes-organization.gitbook.io/dev-portfolio/its-me/tech)
  - [UI / UX 고민과 개선기](https://sunghyes-organization.gitbook.io/dev-portfolio/its-me/ui-ux)
  - [포트폴리오 크롤링 기반 벡터 DB 개선기](https://sunghyes-organization.gitbook.io/dev-portfolio/its-me/web-crawling)
