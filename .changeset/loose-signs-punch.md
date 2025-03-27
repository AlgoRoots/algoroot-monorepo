---
'@algoroot/itsme': major
---

🎉 **AI 자기소개서 서비스 'It's ME!' 첫 메이저 배포**

AI 기반으로 자기소개서를 자동 생성해주는 'It's ME!' 서비스가 첫 메이저 릴리즈로 배포되었습니다.  
자기소개서, 이력서, 포트폴리오 등 사용자의 다양한 입력 데이터를 바탕으로 AI 챗봇이 문장을 제안하고  
자연스러운 문맥을 이어가는 스마트한 응답을 제공합니다.

자세한 개발 과정과 회고는 아래 문서에서 확인하실 수 있습니다:  
👉 https://sunghyes-organization.gitbook.io/dev-portfolio/its-me

---

## 🛠 Skill Stacks

- **AI**: LangGraph.js, Supabase Vector DB, OpenAI, AI SDK
- **Web**: Next.js, Tailwind CSS, Shadcn UI

---

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

---

## 📚 관련 글

- [어쩌다 AI 프로젝트를 ?](https://sunghyes-organization.gitbook.io/dev-portfolio/its-me/introduce)
- [Chatbot 기술적 개선 과정](https://sunghyes-organization.gitbook.io/dev-portfolio/its-me/tech)
- [UI / UX 고민과 개선기](https://sunghyes-organization.gitbook.io/dev-portfolio/its-me/ui-ux)
- [포트폴리오 크롤링 기반 벡터 DB 개선기](https://sunghyes-organization.gitbook.io/dev-portfolio/its-me/web-crawling)
