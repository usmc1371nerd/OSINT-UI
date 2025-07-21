const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path'); // ✅ required for filepath handling

const LOG_DIR = '/home/hackerdad/remote-storage/rcss-logs';

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const clientPath = path.join(__dirname, 'client');
app.use(express.static(clientPath));

// Serve frontend
//app.get('*', (req, res) => {
//  res.sendFile(path.join(clientPath, 'index.html'));
//});

// API endpoint to run tools
app.post('/api/run-tool', (req, res) => {
  const { tool, args } = req.body;

  if (!tool) return res.status(400).json({ error: 'Tool name is required' });

  const cmd = `${tool} ${args.join(' ')}`;
  console.log(`Running: ${cmd}`);

  exec(cmd, (err, stdout, stderr) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `${tool}-${timestamp}.txt`;
    const filepath = path.join(LOG_DIR, filename);

    const logContent = [
      `=== TOOL: ${tool}`,
      `=== ARGS: ${args.join(' ')}`,
      `=== TIMESTAMP: ${new Date().toISOString()}`,
      `\n=== OUTPUT ===\n`,
      stdout || stderr || 'No output'
    ].join('\n');

    fs.writeFile(filepath, logContent, (writeErr) => {
      if (writeErr) console.error(`Log write failed: ${writeErr.message}`);
    });

    if (err) return res.status(500).json({ error: stderr || 'Command failed' });

    res.json({ output: stdout });
  });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

