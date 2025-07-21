import { useState } from 'react';
import './App.css';

function App() {
  const toolPresets = {
    nmap: '-sV -p 22,80,443 10.0.0.50',
    toutatis: '-u bob -s YOUR_SESSION_ID',
    dig: '+short google.com',
    whois: 'example.com',
  };

  const [tool, setTool] = useState('nmap');
  const [args, setArgs] = useState(toolPresets['nmap']);
  const [output, setOutput] = useState('');

  const handleToolChange = (e) => {
    const selectedTool = e.target.value;
    setTool(selectedTool);
    setArgs(toolPresets[selectedTool] || '');
  };

  const runTool = async () => {
    try {
      const res = await fetch('http://10.0.0.50:5000/api/run-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool, args: args.trim().split(' ') })
      });
      const data = await res.json();
      setOutput(data.output || data.error);
    } catch (err) {
      setOutput('Error contacting server.');
    }
  };


  return (
    <div style={{ padding: '1rem', fontFamily: 'monospace' }}>
      <h1>🧪 Hacker UI</h1>

      <label>Tool:</label>
      <select value={tool} onChange={handleToolChange} style={{ display: 'block', marginBottom: '10px', width: '100%' }}>
        <option value="nmap">Nmap</option>
        <option value="toutatis">Toutatis</option>
        <option value="dig">Dig</option>
        <option value="whois">Whois</option>
      </select>


      <label>Args:</label>
      <input
        value={args}
        onChange={(e) => setArgs(e.target.value)}
        placeholder="e.g., -u bob -s"
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />

      <button onClick={runTool} style={{ padding: '0.5rem 1rem' }}>
        Run Tool
      </button>

      <pre style={{
        background: '#000',
        color: '#0f0',
        padding: '1rem',
        marginTop: '1rem',
        height: '300px',
        overflow: 'auto'
      }}>
        {output}
      </pre>
    </div>
  );
}

export default App;
