import { createPrompt } from '../../utils/helper'

const TEMPLATE = `
다음 문장의 주요 언어를 판단합니다:
{latest}

규칙:
- 가장 많이 사용된 단어의 언어 하나만 정확히 출력
- 부가 설명, 번역, 확장 출력 없이 언어 이름만 출력

출력 예시:
English
Korean
Japanese
Spanish  
`

export const detectLanguagePrompt = createPrompt(TEMPLATE, [
	'messages',
	'latest',
])
