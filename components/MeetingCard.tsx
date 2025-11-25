import { useState } from 'react';
import { formatTime } from '../lib/time';
export default function MeetingCard({ meeting, showSummaryButton=true, onGenerateSummary }: any) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-lg font-semibold">{meeting.title}</div>
          <div className="text-sm text-gray-500">{formatTime(meeting.start)} — {formatTime(meeting.end)} · {meeting.duration} min</div>
        </div>
        <div className="text-right text-sm text-gray-500"><div>{meeting.attendees?.length ?? 0} attendees</div></div>
      </div>
      <div className="mt-2 text-sm text-gray-700">
        {meeting.description ? (<div>{expanded ? meeting.description : `${meeting.description.slice(0, 140)}${meeting.description.length>140? '...': ''}`} {meeting.description.length>140 && (<button className="ml-2 text-blue-600" onClick={()=>setExpanded(!expanded)}>{expanded? 'Show less':'Show more'}</button>)}</div>) : <div className="text-gray-400 italic">No description</div>}
      </div>
      <div className="mt-3 flex gap-2">{showSummaryButton && (<button onClick={()=>onGenerateSummary?.(meeting)} className="px-3 py-1 border rounded">Generate Summary</button>)}</div>
    </div>
  );
}
