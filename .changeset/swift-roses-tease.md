---
'@algoroot/itsme': patch
---

검색 결과가 없다면 @no_reference로 반환

- 기존에 검색 필요 판단 노드(`checkSearchNeed`) 결과에 따라 백터 검색을 실행하기때문에 응답 값이 `false`일 경우 `generateResponse` 에서 searchResults가 undefined가 오는 경우가 있었습니다. string으로 템플릿이 이뤄지기 때문에 좀 더 명시적인 @no_reference로 통일하여, 검색 결과가 없을시 반환해야되는 규칙을 지정했습니다.

- 검색 결과의 개수를 3개에서 4개로 늘렸습니다.
