import { useEffect, useState } from 'react';
import MeetingCard from '../components/MeetingCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorBox from '../components/ErrorBox';
export default function Home(){
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const [upcoming,setUpcoming]=useState<Meeting[]>([]);
  const [past,setPast]=useState<Meeting[]>([]);
  const [summaryMap,setSummaryMap]=useState({});
  async function fetchMeetings(){ setLoading(true); setError(null); try{ const r=await fetch('/api/meetings'); if(!r.ok) throw new Error(await r.text()); const data=await r.json(); setUpcoming(data.upcoming||[]); setPast(data.past||[]); }catch(err: any){ setError(err.message||'Failed to fetch'); } finally{ setLoading(false);} }
  useEffect(()=>{ fetchMeetings(); },[]);
  async function handleGenerateSummary(meeting: any){ try{ const resp=await fetch('/api/summarize',{ method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify({ meeting }) }); const data=await resp.json(); setSummaryMap(prev=>({ ...prev, [meeting.id]: data.summary })); }catch(err: any){ alert('Failed to generate summary'); } }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-6"><h1 className="text-2xl font-bold">Katalyst — Meetings (MCP + Groq)</h1><p className="text-sm text-gray-600">This demo uses an MCP adapter layer (mock by default) and Groq LLM for summaries. Set GROQ_API_KEY in .env.local to enable real summaries.</p></header>
      {loading && <LoadingSkeleton />}
      {error && <ErrorBox message={error} onRetry={fetchMeetings} />}
      {!loading && !error && (<div className="grid md:grid-cols-2 gap-6"><section><h2 className="text-xl font-semibold mb-3">Upcoming Meetings</h2>{upcoming.length===0&&<div className="text-gray-500 italic">No upcoming meetings found</div>}<div className="space-y-3">{upcoming.map(m=>(<div key={m.id}><MeetingCard meeting={m} onGenerateSummary={handleGenerateSummary} />{summaryMap[m.id]&&<div className="mt-2 p-3 bg-gray-50 text-sm rounded">{summaryMap[m.id]}</div>}</div>))}</div></section><section><h2 className="text-xl font-semibold mb-3">Past Meetings</h2>{past.length===0&&<div className="text-gray-500 italic">No past meetings found</div>}<div className="space-y-3">{past.map(m=>(<div key={m.id}><MeetingCard meeting={m} onGenerateSummary={handleGenerateSummary} />{summaryMap[m.id]&&<div className="mt-2 p-3 bg-gray-50 text-sm rounded">{summaryMap[m.id]}</div>}</div>))}</div></section></div>)}
      <footer className="mt-8 text-xs text-gray-500">Built to spec. Timebox: designed to be completed within 5-8 hours. See README for tradeoffs and notes.</footer>
    </div>
  );
}
