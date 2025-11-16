# Architecture & Security Design

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│                    (Client-Side Browser)                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Key Gen     │  │  Voting      │  │  Observer    │      │
│  │  (Offline)   │  │  Page        │  │  Dashboard   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
│         ▼                  ▼                  ▼              │
│  ┌──────────────────────────────────────────────────┐       │
│  │         Web Crypto API (RSA-OAEP 2048)          │       │
│  │  • Generate Keys     • Encrypt     • Decrypt    │       │
│  └──────────────────────────────────────────────────┘       │
│                                                               │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ HTTPS (Encrypted votes only)
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                         BACKEND                              │
│                    (Node.js + Express)                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │              API Endpoints                        │       │
│  │  • /api/election-params  (GET)                   │       │
│  │  • /api/verify-ballot    (POST)                  │       │
│  │  • /api/submit-vote      (POST)                  │       │
│  │  • /api/votes            (GET)                   │       │
│  └──────────────────────────────────────────────────┘       │
│                            │                                  │
│                            ▼                                  │
│  ┌──────────────────────────────────────────────────┐       │
│  │         In-Memory Storage                         │       │
│  │  • encryptedVotes[] (opaque strings)             │       │
│  │  • usedBallotCodes (Set)                         │       │
│  │                                                    │       │
│  │  ⚠️ NO PRIVATE KEYS                              │       │
│  │  ⚠️ NO DECRYPTED DATA                            │       │
│  └──────────────────────────────────────────────────┘       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 🔐 Security Model

### Threat Model

**What we protect against:**
- ✅ Server compromise (server never sees decrypted votes)
- ✅ Network eavesdropping (votes encrypted before transmission)
- ✅ Unauthorized voting (ballot code validation)
- ✅ Double voting (one ballot code = one vote)
- ✅ Vote tampering (public verification of encrypted votes)

**What we don't protect against (by design):**
- ❌ Compromised voter device (malware on voter's computer)
- ❌ Compromised observer devices (if private key is stolen)
- ❌ Coercion (voter forced to reveal their vote)
- ❌ Vote buying (voter can prove how they voted)

### Cryptographic Flow

#### 1. Key Generation (Observers)
```
Observers (offline) → Web Crypto API
                    → Generate RSA-OAEP 2048-bit key pair
                    → Export keys as base64
                    → Public key → shared with voters
                    → Private key → kept secret
```

#### 2. Vote Encryption (Voter)
```
Voter selects candidates
    → Generate JSON vote object
    → Import public key (base64 → CryptoKey)
    → Encrypt with RSA-OAEP
    → Convert to base64
    → Submit to server
```

#### 3. Vote Storage (Server)
```
Receive encrypted vote (base64 string)
    → Validate ballot code
    → Store as opaque string
    → Return success
    
⚠️ Server NEVER:
   - Decrypts votes
   - Handles private keys
   - Sees plaintext votes
```

#### 4. Vote Decryption (Observers)
```
Observer enters private key
    → Fetch encrypted votes from server
    → Import private key (base64 → CryptoKey)
    → For each vote:
        → Decrypt with RSA-OAEP
        → Parse JSON
        → Tally results
    → Display results
    
⚠️ All decryption happens CLIENT-SIDE
```

## 📊 Data Flow

### Vote Submission Flow
```
1. Voter enters ballot code
   ↓
2. Server validates (not used, valid code)
   ↓
3. Voter selects candidates
   ↓
4. Browser generates JSON:
   {
     "ballotCode": "BALLOT-001",
     "timestamp": "2025-11-16T...",
     "votes": {
       "convenor": "c1",
       "secretary": "s2",
       "organizer": "o3"
     }
   }
   ↓
5. Browser encrypts with public key
   ↓
6. Browser sends encrypted blob to server
   ↓
7. Server stores encrypted blob
   ↓
8. Server marks ballot code as used
```

### Vote Counting Flow
```
1. Observer opens dashboard
   ↓
2. Browser fetches all encrypted votes
   ↓
3. Observer enters private key
   ↓
4. Browser decrypts each vote locally
   ↓
5. Browser tallies results
   ↓
6. Browser displays results
   
⚠️ Server never involved in decryption
```

## 🛡️ Security Properties

### Confidentiality
- **Votes encrypted at rest**: Only observers with private key can read
- **Votes encrypted in transit**: HTTPS protects network communication
- **Server blind**: Backend cannot read vote contents

### Integrity
- **Public verification**: Anyone can verify their encrypted vote was recorded
- **Immutable storage**: Once submitted, votes cannot be modified
- **Transparent audit trail**: All encrypted votes publicly visible

### Availability
- **Simple architecture**: Minimal dependencies
- **Stateless server**: Easy to scale/replicate
- **In-memory storage**: Fast access (can be replaced with DB)

### Authentication
- **Ballot codes**: One-time use tokens
- **No voter identity**: Anonymous voting
- **Observer access**: Private key required for decryption

## 🔄 Data Isolation

### What the Server Knows
- ✅ Ballot codes (which codes have been used)
- ✅ Encrypted vote blobs (opaque strings)
- ✅ Submission timestamps
- ❌ Vote contents (encrypted)
- ❌ Candidate selections (encrypted)
- ❌ Private keys (never transmitted)

### What the Voter Knows
- ✅ Their ballot code
- ✅ Their candidate selections
- ✅ Public key (for encryption)
- ✅ Their encrypted vote (for verification)
- ❌ Other voters' choices (encrypted)
- ❌ Private key (only observers have it)

### What Observers Know
- ✅ Public key (shared)
- ✅ Private key (secret)
- ✅ All encrypted votes (from server)
- ✅ All decrypted votes (after decryption)
- ✅ Final results

## 🚀 Scalability Considerations

### Current Design (Demo)
- In-memory storage
- Single server instance
- ~20 voters
- Suitable for small elections

### Production Enhancements
```javascript
// Replace in-memory storage with database
const encryptedVotes = []; // ← Replace with DB queries

// Example with MongoDB:
await Vote.create({
  ballotCode,
  encryptedVote,
  timestamp: new Date()
});

// Example with PostgreSQL:
await db.query(
  'INSERT INTO votes (ballot_code, encrypted_vote) VALUES ($1, $2)',
  [ballotCode, encryptedVote]
);
```

### Recommended Upgrades for Production
1. **Database**: PostgreSQL, MongoDB, or similar
2. **Load Balancer**: Distribute traffic across servers
3. **Rate Limiting**: Prevent abuse
4. **HTTPS**: TLS certificates for encryption in transit
5. **Logging**: Audit trail for security events
6. **Backup**: Regular encrypted backups
7. **Monitoring**: Real-time alerts for issues

## 🎯 Design Principles

1. **Client-Side Crypto**: All sensitive operations in browser
2. **Minimal Backend**: Server only stores encrypted data
3. **Transparency**: Public verification of encrypted votes
4. **Simplicity**: Easy to audit and understand
5. **Isolation**: Server cannot decrypt votes

## 📝 Audit Checklist

- [ ] Verify all encryption happens client-side
- [ ] Confirm server never receives private keys
- [ ] Check that votes are stored encrypted
- [ ] Validate ballot code enforcement
- [ ] Test public dashboard shows encrypted votes
- [ ] Verify observer dashboard decrypts locally
- [ ] Confirm one ballot code = one vote
- [ ] Test that used ballot codes are rejected

## 🔍 Code Review Points

### Critical Security Functions
1. `generateKeys()` - Key generation (keygen.html)
2. `encryptVote()` - Vote encryption (vote.html)
3. `decryptAllVotes()` - Vote decryption (observer.html)
4. `/api/submit-vote` - Vote storage (server.js)

### What to Verify
- ✅ No private keys in server code
- ✅ No decryption in server code
- ✅ Encrypted votes stored as opaque strings
- ✅ Web Crypto API used correctly
- ✅ Ballot codes validated before submission

---

**Security Principle**: The server is untrusted. All cryptographic operations happen client-side.

