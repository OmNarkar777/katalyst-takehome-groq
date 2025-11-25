import dayjs from 'dayjs';
export function formatTime(iso: string) { return dayjs(iso).format('MMM D, YYYY h:mm A'); }
