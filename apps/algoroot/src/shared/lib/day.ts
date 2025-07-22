import dayjs from 'dayjs';

import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)
dayjs.extend(timezone)

export const toKST = (date: string | Date) => dayjs(date).tz('Asia/Seoul');
export const toUTC = (date: string | Date) => dayjs(date).utc();
export const formatKST = (date: string | Date, format = 'YYYY-MM-DD HH:mm') =>
  toKST(date).format(format);