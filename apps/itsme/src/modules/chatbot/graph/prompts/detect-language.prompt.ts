import { createPrompt } from '../../utils/helper'

const TEMPLATE = `
당신은 언어 감지 전문가입니다.
다음 문장이 어떤 언어로 가장 많이 작성되었는지 판단하세요:
{latest}

규칙:
- 반드시 **가장 많이 사용된 단어의 언어 하나만** 정확히 출력하세요. (예: English, Korean, Japanese, Spanish 등)
- 부가 설명, 번역, 확장 출력 없이 **언어 이름 하나만 출력**하세요.

출력 예시:
English
Korean
...
`

export const detectLanguagePrompt = createPrompt(TEMPLATE, [
	'messages',
	'latest',
])
