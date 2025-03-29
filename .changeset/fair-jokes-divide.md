---
'@algoroot/itsme': minor
---

## Chat 기능 구조 개선 및 제안된 질문(`getSuggestQuestions`) API 추가

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

---
