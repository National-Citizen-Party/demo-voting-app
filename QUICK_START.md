# Quick Start Guide

## 🚀 Start the Application

```bash
npm start
```

The server will start on `http://localhost:3000`

## 📋 Quick Workflow

### 1. Generate Keys (Observers) 🔑
- Visit: `http://localhost:3000/keygen`
- Click "Generate New Key Pair"
- **Save both keys** (copy to clipboard)
- Share PUBLIC KEY with voters
- Keep PRIVATE KEY secret

### 2. Vote (Voters) ✍️
- Visit: `http://localhost:3000/vote`
- Enter ballot code: `BALLOT-001` through `BALLOT-020`
- Select candidates for each post
- Paste the PUBLIC KEY
- Encrypt and submit vote

### 3. View Dashboard (Anyone) 📊
- Visit: `http://localhost:3000/dashboard`
- See all encrypted votes
- Verify transparency

### 4. Count Votes (Observers) 👁️
- Visit: `http://localhost:3000/observer`
- Paste the PRIVATE KEY
- Click "Decrypt All Votes"
- View results and export

## 🔐 Security Features

✅ **All encryption happens in the browser** (client-side)
✅ **Server never sees decrypted votes**
✅ **Server never handles private keys**
✅ **Public verification of encrypted votes**
✅ **Transparent vote storage**

## 📝 Valid Ballot Codes

```
BALLOT-001, BALLOT-002, BALLOT-003, BALLOT-004, BALLOT-005
BALLOT-006, BALLOT-007, BALLOT-008, BALLOT-009, BALLOT-010
BALLOT-011, BALLOT-012, BALLOT-013, BALLOT-014, BALLOT-015
BALLOT-016, BALLOT-017, BALLOT-018, BALLOT-019, BALLOT-020
```

Each code can only be used once!

## 🎯 Election Posts

1. **Convenor** - 4 candidates
2. **Secretary** - 4 candidates  
3. **Organizer** - 4 candidates

## 💡 Tips

- Generate keys **offline** for maximum security
- Voters should save both plain and encrypted vote copies
- All three observers should collectively safeguard the private key
- Use the public dashboard to verify your encrypted vote was recorded

## 🛠️ Customization

Edit `election-params.json` to change:
- Posts and candidate names
- Ballot codes
- Number of positions

## 📦 Tech Stack

- **Backend**: Node.js + Express (lightweight, only stores encrypted data)
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Encryption**: Web Crypto API (RSA-OAEP 2048-bit)
- **Storage**: In-memory (easily replaceable with database)

---

**Ready to vote?** Run `npm start` and open `http://localhost:3000`

