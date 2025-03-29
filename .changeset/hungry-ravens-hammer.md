---
'@algoroot/itsme': patch
---

### Fix

- Streaming 응답 처리 방식 수정

  - 사용자 메시지를 먼저 추가하고, 이후 AI 응답 메시지를 별도로 추가하여 스트리밍 데이터를 누적하도록 개선
  - 이전에는 사용자 메시지와 빈 AI 메시지를 동시에 추가하여 message 순서가 꼬이거나 delta 누적이 되지 않는 문제가 있었음
  - `readStreamableValue`를 통해 AI 응답이 마지막 메시지(`role: 'ai'`)에 정상적으로 이어붙도록 `updateMessage` 로직도 함께 수정

- 결과적으로 GPT 응답이 실시간으로 자연스럽게 나타나며, 메시지 구조도 안정적으로 유지됨
