# Voting Application

A secure, transparent voting application with end-to-end encryption. All encryption and decryption happens on the client-side (frontend) for maximum security.

## Features

- **🔐 End-to-End Encryption**: All votes are encrypted in the browser using RSA-OAEP (2048-bit)
- **🔑 Observer Key Generation**: Election observers generate public/private key pairs offline
- **✍️ Anonymous Voting**: Voters use ballot codes to cast their votes anonymously
- **📊 Transparent Dashboard**: All encrypted votes are publicly visible for verification
- **👁️ Observer Dashboard**: Observers can decrypt votes using the private key (client-side only)
- **💾 Lightweight Backend**: Server only stores encrypted votes, never sees decrypted data

## Security Architecture

### Client-Side (Frontend)
- Key generation using Web Crypto API
- Vote encryption before submission
- Vote decryption for observers
- All cryptographic operations happen in the browser

### Server-Side (Backend)
- Validates ballot codes
- Stores encrypted votes (opaque strings)
- Serves static files
- **Never** handles private keys or decrypted data

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Navigate to the project directory:
```bash
cd voting-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage Guide

### Step 1: Key Generation (Election Observers)

1. Navigate to **Key Generation** page (`/keygen`)
2. All three election observers should be present together
3. **Disconnect from the internet** for maximum security
4. Click "Generate New Key Pair"
5. **Copy and save both keys securely**:
   - **Public Key**: Share with all voters
   - **Private Key**: Keep secret until vote counting (all observers should safeguard it)

### Step 2: Voting (Voters)

1. Navigate to **Cast Your Vote** page (`/vote`)
2. Enter your ballot code (e.g., `BALLOT-001`)
3. Select candidates for each of the 3 posts:
   - Convenor
   - Secretary
   - Organizer
4. Click "Generate Vote" to see your vote as JSON
5. Paste the **Public Key** provided by observers
6. Click "Encrypt Vote" to encrypt your ballot
7. Copy both the plain and encrypted versions for your records
8. Click "Submit Vote" to cast your ballot

### Step 3: Public Verification (Anyone)

1. Navigate to **Public Dashboard** (`/dashboard`)
2. View all encrypted votes submitted
3. See real-time statistics:
   - Total votes submitted
   - Voter turnout percentage
4. Copy any encrypted vote to verify it matches what you submitted

### Step 4: Vote Counting (Election Observers)

1. Navigate to **Observer Dashboard** (`/observer`)
2. Click "Refresh Votes" to load all encrypted votes
3. Paste the **Private Key** (kept secret until now)
4. Click "Decrypt All Votes"
5. View:
   - Election results summary with winners
   - Individual vote details
6. Click "Export Results as JSON" to save the results

## Election Configuration

Edit `election-params.json` to customize:

- **Posts**: Add/remove positions to vote for
- **Candidates**: Modify candidate names for each post
- **Ballot Codes**: Change the 20 valid ballot codes

```json
{
  "posts": [
    {
      "id": "convenor",
      "name": "Convenor",
      "candidates": [...]
    }
  ],
  "validBallotCodes": [
    "BALLOT-001",
    "BALLOT-002",
    ...
  ]
}
```

## Valid Ballot Codes

The following 20 ballot codes are pre-configured:

```
BALLOT-001, BALLOT-002, BALLOT-003, BALLOT-004, BALLOT-005
BALLOT-006, BALLOT-007, BALLOT-008, BALLOT-009, BALLOT-010
BALLOT-011, BALLOT-012, BALLOT-013, BALLOT-014, BALLOT-015
BALLOT-016, BALLOT-017, BALLOT-018, BALLOT-019, BALLOT-020
```

Each ballot code can only be used once.

## Technical Details

### Encryption
- **Algorithm**: RSA-OAEP
- **Key Size**: 2048 bits
- **Hash**: SHA-256
- **Implementation**: Web Crypto API (browser native)

### Data Storage
- **In-Memory**: Votes stored in server memory (for demo purposes)
- **Persistence**: To add database persistence, replace the `encryptedVotes` array with database calls in `server.js`

### API Endpoints

- `GET /api/election-params` - Get election configuration
- `POST /api/verify-ballot` - Verify ballot code validity
- `POST /api/submit-vote` - Submit encrypted vote
- `GET /api/votes` - Get all encrypted votes

## Adding Database Persistence

To add database persistence (e.g., MongoDB, PostgreSQL):

1. Install database driver:
```bash
npm install mongoose  # for MongoDB
# or
npm install pg  # for PostgreSQL
```

2. Replace in-memory storage in `server.js`:
```javascript
// Replace these lines:
const encryptedVotes = [];
const usedBallotCodes = new Set();

// With database queries to:
// - Save votes to database
// - Check if ballot code is used
// - Retrieve all votes
```

## Security Considerations

### ✅ What This App Does Well
- Client-side encryption/decryption
- No private keys ever sent to server
- Public verification of encrypted votes
- Transparent vote storage

### ⚠️ Important Notes
- This is a **demonstration app**
- For production use, consider:
  - HTTPS/TLS for all connections
  - Database persistence with backups
  - Rate limiting on API endpoints
  - Additional authentication for observers
  - Audit logging
  - Multi-signature schemes for observer keys

## Troubleshooting

### "Error generating keys"
- Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Web Crypto API requires HTTPS in production (works on localhost)

### "Failed to decrypt votes"
- Ensure you're using the correct private key
- The private key must match the public key used for encryption
- Check that votes were encrypted with the correct public key

### "Ballot code already used"
- Each ballot code can only be used once
- Restart the server to reset (in-memory storage)

## License

MIT

## Support

For issues or questions, please open an issue on the project repository.

