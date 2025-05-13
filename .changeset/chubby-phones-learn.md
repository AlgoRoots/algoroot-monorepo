---
'@algoroot/itsme': patch
---

graph node state 일괄 수정

- tread_id가 동일하다면 유지되는 state로 인해 다음 대화에서 참고하면 안되는 state가 유지되고 있었습니다.
  이로 인해 사용자가 다시 질문을 할 때 이전 검색 결과가 state에서 참고가 되어 답변에 영향이 있었습니다.
  마지막 노드인 generate-response 노드에서 리셋되어야 하는 state들을 null로 리턴되게 변경하였습니다.
