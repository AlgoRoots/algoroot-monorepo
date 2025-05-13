---
'@algoroot/itsme': patch
---

chat action input data 수정

- 기존 history list -> 최신 human message 단일 값
- Langsmith 추적시 messages state가 중복되는 이슈로 message history 최적화에 영향이 가고 있었던 이슈를 해결했습니다.
