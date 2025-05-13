import { createPrompt } from '../../utils/helper'

const TEMPLATE = `
당신은 언어 감지 전문가입니다.  
다음 사용자 입력이 어떤 언어인지 판단하고, 언어 이름 하나만 출력하세요.

예시:
- Korean
- English
- Japanese

❗ 다음 형식만 출력하세요: 언어 이름 (한 단어), 아무런 부가 설명 없이.

---

📩 사용자 입력:
{latest}
`

export const detectLanguagePrompt = createPrompt(TEMPLATE, [
	'messages',
	'latest',
])
