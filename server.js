const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory storage for encrypted votes
const encryptedVotes = [];
const usedBallotCodes = new Set();

// Load election parameters
const electionParams = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'election-params.json'), 'utf8')
);

// API Routes

// Get election parameters
app.get('/api/election-params', (req, res) => {
  res.json(electionParams);
});

// Verify ballot code
app.post('/api/verify-ballot', (req, res) => {
  const { ballotCode } = req.body;
  
  if (!ballotCode) {
    return res.status(400).json({ valid: false, message: 'Ballot code required' });
  }
  
  const isValid = electionParams.validBallotCodes.includes(ballotCode);
  const alreadyUsed = usedBallotCodes.has(ballotCode);
  
  if (!isValid) {
    return res.json({ valid: false, message: 'Invalid ballot code' });
  }
  
  if (alreadyUsed) {
    // Find the encrypted vote for this ballot code
    const existingVote = encryptedVotes.find(v => v.ballotCode === ballotCode);
    return res.json({ 
      valid: false, 
      message: 'This ballot code has already been used',
      alreadyUsed: true,
      encryptedVote: existingVote ? existingVote.encryptedVote : null
    });
  }
  
  res.json({ valid: true, message: 'Valid ballot code' });
});

// Submit encrypted vote
app.post('/api/submit-vote', (req, res) => {
  const { ballotCode, encryptedVote } = req.body;
  
  if (!ballotCode || !encryptedVote) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
  
  // Verify ballot code again
  if (!electionParams.validBallotCodes.includes(ballotCode)) {
    return res.status(400).json({ success: false, message: 'Invalid ballot code' });
  }
  
  if (usedBallotCodes.has(ballotCode)) {
    return res.status(400).json({ success: false, message: 'Ballot code already used' });
  }
  
  // Store the encrypted vote
  const voteEntry = {
    id: encryptedVotes.length + 1,
    ballotCode,
    encryptedVote,
    timestamp: new Date().toISOString()
  };
  
  encryptedVotes.push(voteEntry);
  usedBallotCodes.add(ballotCode);
  
  res.json({ success: true, message: 'Vote submitted successfully', voteId: voteEntry.id });
});

// Get all encrypted votes (public dashboard)
app.get('/api/votes', (req, res) => {
  res.json({
    totalVotes: encryptedVotes.length,
    votes: encryptedVotes
  });
});

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/keygen', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'keygen.html'));
});

app.get('/vote', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'vote.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/observer', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'observer.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Voting app server running on http://localhost:${PORT}`);
  console.log(`Key Generation: http://localhost:${PORT}/keygen`);
  console.log(`Voting Page: http://localhost:${PORT}/vote`);
  console.log(`Public Dashboard: http://localhost:${PORT}/dashboard`);
  console.log(`Observer Dashboard: http://localhost:${PORT}/observer`);
});

