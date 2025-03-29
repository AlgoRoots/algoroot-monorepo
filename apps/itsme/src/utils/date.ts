import dayjs from 'dayjs'

import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export const nowKST = () => dayjs().tz('Asia/Seoul')

export const getKSTDay = () => nowKST().format('YYYY-MM-DD')
