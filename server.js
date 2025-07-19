const express = require('express');
// const { exec } = require('child_process'); // Disabled for production
const cors = require('cors');
const path = require('path');

const app = express();
// Allow specifying port via environment variable, with a default of 3001
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'antd-demo', 'build')));

// --- API Endpoints (Disabled for production) ---
/*
const executeScript = (scriptPath, args, res, isCreate = false) => {
  const commandArgs = args.map((arg, index) => (isCreate && index === 3) ? `'''${arg}'''` : arg);
  const command = `sh ${scriptPath} ${commandArgs.join(' ')}`;
  
  console.log(`
[INFO] Executing command: ${command}`);

  exec(command, (error, stdout, stderr) => {
    console.log(`[DEBUG] Raw stdout from ${scriptPath}:
---BEGIN STDOUT---
${stdout}
---END STDOUT---`);
    if (stderr) {
        console.error(`[DEBUG] Raw stderr from ${scriptPath}:
---BEGIN STDERR---
${stderr}
---END STDERR---`);
    }

    if (error) {
      console.error(`[ERROR] Script execution failed: ${error.message}`);
      return res.status(500).json({ error: 'Failed to execute script', details: error.message });
    }

    try {
      const jsonStartIndex = stdout.indexOf('{');
      if (jsonStartIndex === -1) throw new Error("No JSON object found in script output.");
      const jsonString = stdout.substring(jsonStartIndex);
      const jsonOutput = JSON.parse(jsonString);
      console.log(`[INFO] Successfully parsed JSON for ${scriptPath}.`);
      res.json(jsonOutput);
    } catch (parseError) {
      console.error(`[ERROR] Failed to parse JSON: ${parseError.message}`);
      res.status(500).json({ error: 'Failed to parse script output', details: parseError.message, rawOutput: stdout });
    }
  });
};

app.post('/api/vpcs', (req, res) => {
  const { secretId, secretKey, region } = req.body;
  if (!secretId || !secretKey || !region) return res.status(400).json({ error: 'Missing required parameters' });
  executeScript('./DescribeVpcs.sh', [secretId, secretKey, region], res);
});

app.post('/api/subnets', (req, res) => {
  const { secretId, secretKey, region } = req.body;
  if (!secretId || !secretKey || !region) return res.status(400).json({ error: 'Missing required parameters' });
  executeScript('./DescribeSubnets.sh', [secretId, secretKey, region], res);
});

app.post('/api/create-load-balancer', (req, res) => {
    const { secretId, secretKey, region, payload } = req.body;
    if (!secretId || !secretKey || !region || !payload) return res.status(400).json({ error: 'Missing required parameters' });
    executeScript('./CreateLoadBalancer.sh', [secretId, secretKey, region, JSON.stringify(payload)], res, true);
});
*/

// --- Handle React routing, return all other requests to the React app ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'antd-demo', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`[INFO] Server listening on port ${port}`);
});
