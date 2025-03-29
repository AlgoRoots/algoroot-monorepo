---
'@algoroot/itsme': patch
---

### Fix

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
