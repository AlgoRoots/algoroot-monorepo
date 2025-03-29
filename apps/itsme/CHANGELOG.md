# @algoroot/itsme

## 1.1.0

### Minor Changes

- [`b5b3727`](https://github.com/AlgoRoots/algoroot-monorepo/commit/b5b37270c3515928cb6ed061dffa39ddda261548) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - ## Chat 기능 구조 개선 및 제안된 질문(`getSuggestQuestions`) API 추가

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
