# algoroot

알고리즘 모음

## FSD 패턴 사용 


## FSD 예시
https://feature-sliced.design/docs/get-started/overview

src/
├── app/                  # Next.js 라우트 (page.tsx, layout.tsx)
│   ├── page.tsx
│   ├── layout.tsx
│   └── (routes)/
│       ├── home/
│       │   └── page.tsx         # ← 내부에서 slice의 `FeedPage` 사용
│       └── article/[slug]/page.tsx
├── pages/                # ← FSD의 Pages layer (기능별 페이지)
│   ├── home/
│   │   ├── ui/
│   │   │   └── FeedPage.tsx
│   │   ├── api/
│   │   │   └── loader.ts
│   │   └── index.ts
│   └── article-read/
├── features/             # ← 공유 기능 단위 (ex: 좋아요 버튼, 팔로우 버튼)
│   ├── like-article/
│   │   ├── model/
│   │   └── ui/
│   └── index.ts
├── entities/             # ← 핵심 도메인: user, article, comment 등
│   ├── article/
│   └── user/
├── shared/               # ← 공통 라이브러리, 컴포넌트, 유틸
│   ├── ui/
│   ├── api/
│   ├── config/
│   └── router/
└── widgets/              # ← Header, Footer 등 공용 블록 UI
    ├── header/
    │   ├── ui/
    │   └── index.ts



## FSD 레벨
폴더	레벨	
shared/	1	버튼, fetch wrapper, 디자인 시스템, 유틸 등
entities/	2	도메인 단위: user, article, comment 등
features/	3	재사용 가능한 기능 단위 UI + 상태 (예: follow 버튼)
widgets/	4	페이지에서 반복되는 복합 UI (예: Header, Sidebar)
pages/	5	라우트에 대응하는 실제 화면 단위


###
백준, 프로그래머스, 구름 한번에 볼수있는 ? 
직행처럼 푸는건 해당사이트로 가야 법적으로 문제없을듯? 

카테고라이징해주고, 

풀고나서 성공실패여부와, 라벨링 (세세하게 추가할수있게끔)
마이페이지에서 좋아요, 푼문제 관리
풀었다고 체크하면 추천문제 비슷한 유형이거나 빈도수많은 문제 추천


마이페이지
+ 내가 푼 문제 기준으로 어떤 유형이 부족하고 괜찮은지 분석 서비스 


## 구조
- home
  - 유형별로 확인하기
- tag ?
  - filter
  - level 1 유형/서비스(백준,프로그래머스,구름?)/난이도
  - lev2l 2 시간(최신,오래된), 빈도(많이푼)


### 유형별 
- 백준
  - https://www.acmicpc.net/problem/tags
  - parsing필요
- 프로그래머스
  - parsing 필요
  - https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit
- 구름
  - https://level.goorm.io/
  - /api/algo/quizzes?query=&category=&verificationStatus[]=1&page=1&limit=20
- 
### 유형 (프로그래머스)
해시 , 스택/큐, 힙, 정렬, 완전탐색, 탐욕법 ,DP, DFS/BFS, 이분탐색, 그래프

### 유형 (백준)
개마늠

## 유형 (구름)
기초 프로그래밍
기초 문법
기초 문자열
기초 수학
단순 구현
반복문
조건문
자료구조
그래프
배열
스택
큐
트리
해시
알고리즘
BFS
DFS
고급 구현
고급 알고리즘
그래프 알고리즘
그리디
기하
동적 프로그래밍
문자열 응용
분할 정복
수학적 응용
완전 탐색
이진 탐색
정렬
기타
