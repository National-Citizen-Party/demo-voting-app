# Complete Voting Workflow

## 📅 Timeline: Election Day Process

```
┌─────────────────────────────────────────────────────────────┐
│                    BEFORE ELECTION                           │
└─────────────────────────────────────────────────────────────┘

Step 1: Setup Server
┌─────────────────────────────────────────────────────────────┐
│  Election Administrator                                      │
│  • npm install                                               │
│  • npm start                                                 │
│  • Server running at http://localhost:3000                  │
└─────────────────────────────────────────────────────────────┘

Step 2: Generate Keys (OFFLINE)
┌─────────────────────────────────────────────────────────────┐
│  3 Election Observers (together)                            │
│  • Disconnect from internet                                  │
│  • Visit /keygen                                             │
│  • Click "Generate New Key Pair"                            │
│  • Copy PUBLIC KEY → share with voters                      │
│  • Copy PRIVATE KEY → secure storage (USB/paper)            │
│  • All 3 observers safeguard private key                    │
└─────────────────────────────────────────────────────────────┘

Step 3: Distribute Ballot Codes
┌─────────────────────────────────────────────────────────────┐
│  Election Administrator                                      │
│  • Give each voter their unique ballot code                 │
│  • BALLOT-001 → Voter 1                                     │
│  • BALLOT-002 → Voter 2                                     │
│  • ...                                                       │
│  • BALLOT-020 → Voter 20                                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    DURING ELECTION                           │
└─────────────────────────────────────────────────────────────┘

Step 4: Voters Cast Ballots
┌─────────────────────────────────────────────────────────────┐
│  Each Voter (independently)                                  │
│                                                              │
│  1. Visit /vote                                              │
│  2. Enter ballot code (e.g., BALLOT-001)                    │
│  3. Select candidates:                                       │
│     • Convenor: [Select from 4 options]                     │
│     • Secretary: [Select from 4 options]                    │
│     • Organizer: [Select from 4 options]                    │
│  4. Click "Generate Vote"                                    │
│  5. Review plain JSON                                        │
│  6. Copy plain JSON (for personal records)                  │
│  7. Paste PUBLIC KEY (from observers)                       │
│  8. Click "Encrypt Vote"                                     │
│  9. Copy encrypted vote (for verification)                  │
│  10. Click "Submit Vote"                                     │
│  11. Receive confirmation with Vote ID                      │
└─────────────────────────────────────────────────────────────┘

Step 5: Public Verification (Ongoing)
┌─────────────────────────────────────────────────────────────┐
│  Anyone (voters, observers, public)                         │
│                                                              │
│  • Visit /dashboard                                          │
│  • See all encrypted votes                                   │
│  • Verify your vote appears                                  │
│  • Compare encrypted text matches your copy                 │
│  • Monitor voter turnout                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    AFTER ELECTION                            │
└─────────────────────────────────────────────────────────────┘

Step 6: Vote Counting
┌─────────────────────────────────────────────────────────────┐
│  3 Election Observers (together)                            │
│                                                              │
│  1. Visit /observer                                          │
│  2. Click "Refresh Votes"                                    │
│  3. Retrieve PRIVATE KEY from secure storage                │
│  4. Paste PRIVATE KEY                                        │
│  5. Click "Decrypt All Votes"                               │
│  6. Review results summary:                                  │
│     • Winner for each post                                   │
│     • Vote counts per candidate                             │
│  7. Review individual votes                                  │
│  8. Click "Export Results as JSON"                          │
│  9. Save results file                                        │
└─────────────────────────────────────────────────────────────┘

Step 7: Announce Results
┌─────────────────────────────────────────────────────────────┐
│  Election Observers                                          │
│  • Publish final results                                     │
│  • Optionally publish decrypted votes (if agreed)           │
│  • Archive election data                                     │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Detailed Voter Journey

```
┌──────────────────────────────────────────────────────────────┐
│                    VOTER EXPERIENCE                           │
└──────────────────────────────────────────────────────────────┘

1. Receive Ballot Code
   ↓
   "Here's your ballot code: BALLOT-007"
   "Keep it secret!"
   
2. Navigate to Voting Page
   ↓
   http://localhost:3000/vote
   
3. Enter Ballot Code
   ┌─────────────────────────────────┐
   │ Enter Your Ballot Code:         │
   │ [BALLOT-007____________]        │
   │                                 │
   │        [Continue]               │
   └─────────────────────────────────┘
   
4. Select Candidates
   ┌─────────────────────────────────┐
   │ Convenor                        │
   │ [Alice Johnson ▼]               │
   │                                 │
   │ Secretary                       │
   │ [Frank Miller ▼]                │
   │                                 │
   │ Organizer                       │
   │ [Kate Thomas ▼]                 │
   │                                 │
   │        [Generate Vote]          │
   └─────────────────────────────────┘
   
5. Review Plain Vote
   ┌─────────────────────────────────┐
   │ Your Vote (Plain JSON)  [Copy]  │
   │ {                               │
   │   "ballotCode": "BALLOT-007",   │
   │   "votes": {                    │
   │     "convenor": "c1",           │
   │     "secretary": "s2",          │
   │     "organizer": "o3"           │
   │   }                             │
   │ }                               │
   └─────────────────────────────────┘
   
6. Paste Public Key
   ┌─────────────────────────────────┐
   │ Paste Observer Public Key:      │
   │ [MIIBIjANBgkqhkiG9w0BAQEF...]  │
   │                                 │
   │        [Encrypt Vote]           │
   └─────────────────────────────────┘
   
7. View Encrypted Vote
   ┌─────────────────────────────────┐
   │ Encrypted Vote          [Copy]  │
   │ kJ8dFg3mN9pQ2rT5vX8zA...       │
   │                                 │
   │        [Submit Vote]            │
   └─────────────────────────────────┘
   
8. Confirmation
   ┌─────────────────────────────────┐
   │ ✅ Vote Submitted Successfully! │
   │                                 │
   │ Vote ID: 7                      │
   │                                 │
   │    [View Public Dashboard]      │
   └─────────────────────────────────┘
   
9. Verify on Dashboard
   ┌─────────────────────────────────┐
   │ Vote #7            📅 Nov 16    │
   │ kJ8dFg3mN9pQ2rT5vX8zA...       │
   │        [Copy Encrypted Vote]    │
   └─────────────────────────────────┘
   
   Compare with your saved copy ✓
```

## 🔐 Observer Journey

```
┌──────────────────────────────────────────────────────────────┐
│                   OBSERVER EXPERIENCE                         │
└──────────────────────────────────────────────────────────────┘

Phase 1: Key Generation (Before Election)
┌─────────────────────────────────────────────────────────────┐
│  http://localhost:3000/keygen                               │
│                                                              │
│  ⚠️ Disconnect from Internet                                │
│                                                              │
│  [Generate New Key Pair]                                     │
│                                                              │
│  🔓 PUBLIC KEY (Share)           [Copy]                     │
│  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...          │
│                                                              │
│  🔐 PRIVATE KEY (Keep Secret!)   [Copy]                     │
│  MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC... │
└─────────────────────────────────────────────────────────────┘

Phase 2: Vote Counting (After Election)
┌─────────────────────────────────────────────────────────────┐
│  http://localhost:3000/observer                             │
│                                                              │
│  [🔄 Refresh Votes]                                         │
│                                                              │
│  Enter Private Key:                                          │
│  [MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...]│
│                                                              │
│  [🔓 Decrypt All Votes]                                     │
└─────────────────────────────────────────────────────────────┘

Phase 3: Results Display
┌─────────────────────────────────────────────────────────────┐
│  📊 Statistics                                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                   │
│  │    15    │ │    20    │ │   75%    │                   │
│  │  Votes   │ │ Ballots  │ │ Turnout  │                   │
│  └──────────┘ └──────────┘ └──────────┘                   │
│                                                              │
│  🏆 Election Results Summary                                │
│                                                              │
│  Convenor                                                    │
│  👑 Alice Johnson         [8 votes]                         │
│     Bob Smith             [4 votes]                         │
│     Carol Williams        [2 votes]                         │
│     David Brown           [1 vote]                          │
│                                                              │
│  Secretary                                                   │
│  👑 Frank Miller          [7 votes]                         │
│     Emma Davis            [5 votes]                         │
│     Grace Wilson          [2 votes]                         │
│     Henry Moore           [1 vote]                          │
│                                                              │
│  Organizer                                                   │
│  👑 Kate Thomas           [9 votes]                         │
│     Jack Anderson         [3 votes]                         │
│     Iris Taylor           [2 votes]                         │
│     Leo Jackson           [1 vote]                          │
│                                                              │
│  Individual Votes                                            │
│  ┌─────────────────────────────────────────────┐           │
│  │ Vote #1              📅 Nov 16, 10:23 AM    │           │
│  │ Ballot Code: BALLOT-001                     │           │
│  │ Convenor: Alice Johnson                     │           │
│  │ Secretary: Frank Miller                     │           │
│  │ Organizer: Kate Thomas                      │           │
│  └─────────────────────────────────────────────┘           │
│                                                              │
│  [📥 Export Results as JSON]                                │
└─────────────────────────────────────────────────────────────┘
```

## 🎭 User Roles & Permissions

### Election Administrator
- **Setup**: Install dependencies, start server
- **Configuration**: Edit election-params.json
- **Distribution**: Give ballot codes to voters
- **Monitoring**: Watch server logs

### Election Observers (3 people)
- **Key Generation**: Create public/private key pair
- **Key Management**: Safeguard private key
- **Vote Counting**: Decrypt and tally votes
- **Results**: Announce winners

### Voters (20 people)
- **Voting**: Cast encrypted ballot
- **Verification**: Check vote on public dashboard
- **Privacy**: Keep ballot code secret

### Public (Anyone)
- **Transparency**: View encrypted votes
- **Verification**: Confirm vote count
- **Trust**: Verify election integrity

## 📱 Page Navigation

```
Home Page (/)
│
├─→ Key Generation (/keygen)
│   └─→ Generate keys offline
│
├─→ Voting Page (/vote)
│   ├─→ Enter ballot code
│   ├─→ Select candidates
│   ├─→ Encrypt vote
│   └─→ Submit vote
│
├─→ Public Dashboard (/dashboard)
│   ├─→ View encrypted votes
│   └─→ Monitor turnout
│
└─→ Observer Dashboard (/observer)
    ├─→ Enter private key
    ├─→ Decrypt votes
    ├─→ View results
    └─→ Export data
```

## ⏱️ Estimated Timeline

```
Pre-Election Setup:        30 minutes
├─ Install & configure:    10 min
├─ Generate keys:          5 min
└─ Distribute codes:       15 min

Voting Period:             Variable
├─ Per voter:              2-3 min
└─ 20 voters:              ~40-60 min

Vote Counting:             10 minutes
├─ Decrypt votes:          2 min
├─ Review results:         5 min
└─ Export & announce:      3 min

Total Election Time:       ~1.5 - 2 hours
```

## 🎯 Success Criteria

✅ All 20 ballot codes distributed
✅ Keys generated offline
✅ Public key shared with all voters
✅ Private key secured by observers
✅ Voters can submit encrypted votes
✅ Encrypted votes visible on dashboard
✅ Observers can decrypt all votes
✅ Results tallied correctly
✅ Winners announced

## 🚨 Troubleshooting Guide

### Voter Can't Submit Vote
1. Check ballot code is correct
2. Verify ballot code not already used
3. Ensure all 3 posts have selections
4. Confirm public key is pasted correctly

### Observer Can't Decrypt Votes
1. Verify private key matches public key
2. Check votes were encrypted with correct key
3. Ensure browser supports Web Crypto API
4. Try refreshing the page

### Vote Not Showing on Dashboard
1. Check server is running
2. Refresh dashboard page
3. Verify vote was submitted successfully
4. Check browser console for errors

---

**Ready to run an election?** Follow this workflow step by step!

