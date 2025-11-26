import { useEffect, useState } from 'react';

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('/api/logs')
      .then(res => res.json())
      .then(setLogs);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>System Logs</h1>
      <pre>{JSON.stringify(logs, null, 2)}</pre>
    </div>
  );
}
