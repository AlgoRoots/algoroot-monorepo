# @algoroot/itsme

## 1.2.6

### Patch Changes

- [`1e591fc`](https://github.com/AlgoRoots/algoroot-monorepo/commit/1e591fc50036cf625a69a8cbfce1dbf06978cea4) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - graph node state 일괄 수정

  - tread_id가 동일하다면 유지되는 state로 인해 다음 대화에서 참고하면 안되는 state가 유지되고 있었습니다.
    이로 인해 사용자가 다시 질문을 할 때 이전 검색 결과가 state에서 참고가 되어 답변에 영향이 있었습니다.
    마지막 노드인 generate-response 노드에서 리셋되어야 하는 state들을 null로 리턴되게 변경하였습니다.

- [`370c7a2`](https://github.com/AlgoRoots/algoroot-monorepo/commit/370c7a2a998734df869be5175ae929afb4393a20) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - 프롬포트 템플릿 수정

  - 제한을 조금 더 풀고, ai가 더 능동적으로 답할 수 있게 수정했습니다.
  - 다만, 참고자료가 없는 기술 질문의 경우 좀 더 엄격히 검사하도록 수정했습니다.
  - 예시를 덜고 좀더 명확히 지시하는 쪽으로 수정했습니다 .

- [`c8a37fc`](https://github.com/AlgoRoots/algoroot-monorepo/commit/c8a37fc933a8ad0ed1fa8ddc912b837843a9a4d7) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - Graph 노드 반환값 및 상태 병합 방식 개선

  - 각 노드에서 전체 `state`를 직접 오버라이딩(`...state`)하던 방식을 제거하고, 필요한 값만 리턴하도록 수정했습니다.
    → LangGraph는 노드 리턴 값을 기존 상태와 자동 병합하기 때문에 `...state`는 불필요하다고 판단했습니다.
  - `history` 상태를 제거하고, 대화 흐름은 `messages` 하나로 일관되게 관리하도록 구조를 단순화했습니다.
  - 과도한 메시지 누적을 방지하기 위해, 최대 10개로 제한하는 `trim` 처리를 message를 사용하던 두번째(refineQuestion) 노드가 아닌 첫 노드에서만 수행하도록 변경했습니다.
  - 프롬프트 호출 방식에서 `prompt.format()` → `prompt.invoke()`로 교체하여
    LLM 호출 시 템플릿과 메시지가 함께 처리되도록 표준화했고, 이에 따라 응답 정확도와 LangSmith 기록 품질이 향상되었습니다.

- [`15fc714`](https://github.com/AlgoRoots/algoroot-monorepo/commit/15fc7144ed1bfd37ceb20102a24da5b76e0a2720) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - chat action input data 수정

  - 기존 history list -> 최신 human message 단일 값
  - Langsmith 추적시 messages state가 중복되는 이슈로 message history 최적화에 영향이 가고 있었던 이슈를 해결했습니다.

- [`90b44a6`](https://github.com/AlgoRoots/algoroot-monorepo/commit/90b44a6966159ffe1474fdf957c8c0314e0c692f) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - prompt 형식 통일

- [`44807f2`](https://github.com/AlgoRoots/algoroot-monorepo/commit/44807f28abd7d75b31c7307d7c4a636b76fb541b) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - 검색 결과가 없다면 @no_reference로 반환

  - 기존에 검색 필요 판단 노드(`checkSearchNeed`) 결과에 따라 백터 검색을 실행하기때문에 응답 값이 `false`일 경우 `generateResponse` 에서 searchResults가 undefined가 오는 경우가 있었습니다. string으로 템플릿이 이뤄지기 때문에 좀 더 명시적인 @no_reference로 통일하여, 검색 결과가 없을시 반환해야되는 규칙을 지정했습니다.
  - 검색 결과의 개수를 3개에서 4개로 늘렸습니다.

- [`2d65bd3`](https://github.com/AlgoRoots/algoroot-monorepo/commit/2d65bd3fac056af81b73d49b4b8a414b3d49c23b) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - 메세지 trim 개수 조정 (10->20)

## 1.2.5

### Patch Changes

- [`62530ea`](https://github.com/AlgoRoots/algoroot-monorepo/commit/62530eabcbb154e42cdde31851f2b67cb3d6b536) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! -message history format

기존 BaseMessage[]타입을 프롬포트에 보냈지만,
정확도와 히스로리 추적이 어려워 포맷 후 프롬포트 전달,
단순 프롬포트에만 전달하는 용으로 추가했습니다.

- [`7211ad2`](https://github.com/AlgoRoots/algoroot-monorepo/commit/7211ad2fe863ca721f1cf625075f9df8ab822b96) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - 사용자 언어 감지 기능 추가

  최근 사용자 기록 중 영어로 질문하는 사례가 있어, 간단한 언어 감지 노드를 추가해 영어 질문에도 대응할 수 있도록 기능을 보완했습니다.
  다만, 본 서비스는 한국 내 채용을 목적으로 한 프로젝트이며, 다국어 지원을 주된 목표로 하고 있지는 않습니다.
  현재 추가된 다국어 대응은 테스트 목적의 최소한의 수준이며, 예를 들어 [추천 질문] 영역에는 아직 다국어 적용이 되어 있지 않습니다.
  전체 서비스의 다국어화를 진행할 경우 별도의 리소스와 설계가 필요하기 때문에, 향후 필요 시 신중히 고려할 예정입니다.

## 1.2.4

### Patch Changes

- [`233090e`](https://github.com/AlgoRoots/algoroot-monorepo/commit/233090e5fe644a43f5c87859e268a773f3f7e352) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - maxDuration / 경로에서 제거

  지난 버전 업데이트에서 요청을 /chat 에서만 하도록 수정했기 때문에 해당 경로에서는 maxDuration을 제거

  # chat message 컴포넌트 에러 분기 추가

  role이 ai일 때의 조건을 추가했습니다.

  # 불필요한 주석 제외

## 1.2.3

### Patch Changes

- [`49d4a13`](https://github.com/AlgoRoots/algoroot-monorepo/commit/49d4a139e7d1ef89a39b81bffc274ea7b4660172) Thanks [@AlgoRoots](https://github.com/AlgoRoots)!

  - ### 1. 대화 세션 관리 방식 개선

  - 기존에는 고정된 `thread_id` 없이 매 요청이 독립된 세션으로 처리되었습니다.
  - 이제 `thread_id`를 명시적으로 생성 및 전달하여, 대화 세션 단위의 컨텍스트 제어가 가능해졌습니다.
  - 단, 로컬/세션 스토리지에 `thread_id`를 저장하지 않고, 앱 실행 시마다 새로운 ID를 발급하는 구조를 유지합니다.
    - 이는 사용자가 새로고침 시 매번 새로운 대화를 시작하도록 유도하기 위한 의도적인 설계입니다.
    - 사용자 추적이나 장기 히스토리 저장 없이도, 간단한 문맥 흐름 제어만 가능하도록 구현되었습니다.

  ### 2. IP 기반 사용량 제한 강화

  - `X-Forwarded-For` 헤더와 `User-Agent`를 조합해 해시 처리된 약식 식별자(`weakIp`)를 생성합니다.
  - 하루 최대 50회 대화 제한 로직이 이 식별자를 기준으로 동작합니다.
  - 완전한 고유성을 보장하지는 않지만, 주 사용자층인 채용 담당자의 접근 허들을 낮추기 위해 로그인 과정을 생략한 구조이며, 과도한 사용을 방지하고 기본적인 디버깅 및 통계 수집 용도로 충분한 수준으로 설계되었습니다.

## 1.2.2

### Patch Changes

- [`5e9ed71`](https://github.com/AlgoRoots/algoroot-monorepo/commit/5e9ed71811d11429397d8eb2853e27e72cbdc90e) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - - QuestionList 링크 제거 → `handleHomeSubmit` 로 통합

  - `router.push('/chat')`로 라우팅
  - `router.prefetch('/chat')`로 prefetch 기능 유지
  - Chat 응답 흐름 리팩토링

    - LangChain 응답 스트리밍 시 `updateStreamMessage` 유틸로 상태 누적 처리
    - 마지막 AI 메시지를 prev기반으로 갱신

  - 모달 상태 네이밍 개선

    - `isExceeded` → `isLimitModalOpen` 으로 UI 상태 표현 명확화

  - 홈 제출 로직 변경
    - 홈에서 직접 `chat.handler.submit()` 호출 ❌
    - `/chat` 페이지 진입 후 자동 실행되도록 분리 (`useEffect` + `pendingMessage`)

## 1.2.1

### Patch Changes

- [`aa7e624`](https://github.com/AlgoRoots/algoroot-monorepo/commit/aa7e62467f78cc7a63ab66824bc1f87d2b8ff518) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - - createPrompt 생성 후 반환되는 prompt 입력받은 타입으로 반환되게 보완

  - 전체적인 프롬포트 템플릿 수정
  - ChatQuestionListBase
    - 페이지 진입시 보이는 QuestionList > min-h 제한 제거
  - About 페이지 내용 수정

- [`56d7055`](https://github.com/AlgoRoots/algoroot-monorepo/commit/56d7055f228be9be0e3198c43fa0f3128e18448e) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - ## shouldSearch 수정

  - 응답이 원하는 바로 나오지 않을 때가 있어서 이유와 같이 출력하게 변경
  - 예시 추가

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
