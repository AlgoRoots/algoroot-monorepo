---
'@algoroot/itsme': patch
---

- QuestionList 링크 제거 → `handleHomeSubmit` 로 통합

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
