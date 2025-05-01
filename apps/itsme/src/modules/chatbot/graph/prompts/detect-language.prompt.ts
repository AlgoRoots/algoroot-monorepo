import { createPrompt } from '../../utils/helper'

const TEMPLATE = `
당신은 언어 감지 도우미입니다.
사용자의 입력을 보고 어떤 언어인지 판단하여 **언어 이름만** 한 단어로 출력하세요.
예) Korean, English, Japanese, etc.

설명하지 마세요. 번역하지 마세요. 언어 이름만 응답하세요.

---

📩 사용자 입력:
{latest}
`

export const detectLanguagePrompt = createPrompt(TEMPLATE, [
	'messages',
	'latest',
])
