import dayjs from 'dayjs';
function mk(title: string, start: string, end: string, attendees: any[], description?: string, calendarId?: string) {
  const duration = dayjs(end).diff(dayjs(start), 'minute');
  return { id: `m-${title.replace(/\s+/g,'-')}`, title, start, end, duration, attendees, description: description || '', calendarId };
}
export function getMockMeetings() {
  const now = dayjs();
  const upcoming = [];
  for (let i=1;i<=5;i++) {
    const s = now.add(i, 'day').hour(10).minute(0).toISOString();
    const e = now.add(i, 'day').hour(11).minute(0).toISOString();
    upcoming.push(mk(`Upcoming Meeting ${i}`, s, e, [ { name: 'Alice', email: 'alice@example.com' }, { name: 'Bob', email: 'bob@example.com' } ], `Agenda for upcoming meeting ${i}`, 'primary'));
  }
  const past = [];
  for (let i=1;i<=5;i++) {
    const s = now.subtract(i, 'day').hour(9).minute(30).toISOString();
    const e = now.subtract(i, 'day').hour(10).minute(15).toISOString();
    past.push(mk(`Past Meeting ${i}`, s, e, [ { name: 'Carol', email: 'carol@example.com' }, { name: 'Dan', email: 'dan@example.com' } ], `Notes from past meeting ${i}`, 'primary'));
  }
  return { upcoming, past };
}
