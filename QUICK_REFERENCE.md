# Quick Reference Guide - Version 2.0

## 🔑 New Key System

### Key Format Comparison

| Feature | Old (RSA) | New (BIP39 + AES) |
|---------|-----------|-------------------|
| Public Key Length | ~400 characters | 44 characters |
| Private Key Length | ~1600 characters | 12 words |
| Algorithm | RSA-OAEP 2048 | AES-GCM 256 |
| Key Derivation | N/A | PBKDF2 (100k iterations) |
| Mnemonic Standard | N/A | BIP39 |

### Example Keys

**Public Key (44 chars):**
```
dGVzdCBrZXkgZm9yIGVsZWN0aW9uIG9ic2VydmVycw==
```

**Private Key (12 words):**
```
abandon ability able about above absent absorb abstract absurd abuse access accident
```

## 📝 New Features Summary

### 1. Default Public Key
**File:** `election-params.json`

```json
{
  "defaultObserverPublicKey": "YOUR_PUBLIC_KEY_HERE"
}
```

- Set this after generating keys
- Voters won't need to paste the key manually
- Leave empty ("") if you want voters to paste it each time

### 2. Already-Used Ballot Display

When a voter tries to use an already-used ballot code:
- ❌ Shows error: "This ballot code has already been used"
- ✅ Displays the encrypted vote that was submitted
- ✅ Voter can copy and verify it matches their saved copy

### 3. Enhanced Vote JSON

**Old Format:**
```json
{
  "ballotCode": "BALLOT-001",
  "votes": {
    "convenor": "c1",
    "secretary": "s2",
    "organizer": "o3"
  }
}
```

**New Format:**
```json
{
  "ballotCode": "BALLOT-001",
  "timestamp": "2025-11-16T03:30:00.000Z",
  "votes": {
    "convenor": {
      "candidateId": "c1",
      "candidateName": "Alice Johnson",
      "postName": "Convenor"
    },
    "secretary": {
      "candidateId": "s2",
      "candidateName": "Frank Miller",
      "postName": "Secretary"
    },
    "organizer": {
      "candidateId": "o3",
      "candidateName": "Kate Thomas",
      "postName": "Organizer"
    }
  }
}
```

### 4. Save Instructions

On the voting page, voters now see:

```
📝 IMPORTANT: Save Your Votes!

• Copy and save both your plain text vote and encrypted vote
• Store them in a safe place (text file, notes app, etc.)
• You can use these to verify your vote was recorded correctly
```

### 5. Finalization Warning

Before submission:

```
⚠️ Your vote is NOT finalized yet!

You must click "Submit Vote" below and verify it appears 
on the public dashboard for your vote to count.
```

## 🚀 Quick Start Commands

### Start Server
```bash
cd voting-app
npm start
```

### Generate Keys (Observers)
1. Visit: `http://localhost:3000/keygen`
2. Click "Generate New Key Pair"
3. Copy PUBLIC KEY (44 chars)
4. Copy PRIVATE KEY (12 words)
5. Optionally set default in `election-params.json`

### Vote (Voters)
1. Visit: `http://localhost:3000/vote`
2. Enter ballot code (e.g., `BALLOT-001`)
3. Select candidates
4. Public key auto-filled (if default set)
5. Click "Encrypt Vote"
6. **SAVE both plain and encrypted votes**
7. Click "Submit Vote"
8. Verify on dashboard

### Decrypt Votes (Observers)
1. Visit: `http://localhost:3000/observer`
2. Paste 12-word mnemonic
3. Click "Decrypt All Votes"
4. View results
5. Export as JSON

## 🔐 Security Checklist

- [x] Keys generated offline
- [x] Private key (12 words) kept secret
- [x] Public key shared with voters
- [x] All encryption happens client-side
- [x] Server never sees private key
- [x] Server never sees decrypted votes
- [x] Voters save their encrypted votes
- [x] Votes verified on public dashboard

## 🎯 Troubleshooting

### "Invalid mnemonic" error
- Check you entered exactly 12 words
- Verify words are from BIP39 word list
- Check for typos or extra spaces
- Words should be lowercase

### Public key not auto-filling
- Check `election-params.json` has `defaultObserverPublicKey` set
- Restart server after editing config
- Refresh browser page

### Can't decrypt votes
- Verify mnemonic matches the one used to generate public key
- Check that votes were encrypted with the correct public key
- Ensure BIP39 library loaded (check browser console)

### Ballot code already used
- Each code can only be used once
- Check the displayed encrypted vote matches your saved copy
- Contact election administrators if there's a discrepancy

## 📊 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/election-params` | GET | Get election config (includes default public key) |
| `/api/verify-ballot` | POST | Verify ballot code (returns encrypted vote if already used) |
| `/api/submit-vote` | POST | Submit encrypted vote |
| `/api/votes` | GET | Get all encrypted votes |

## 🔄 Backward Compatibility

The system handles both old and new formats:

**Vote Format:**
- Old: `{"convenor": "c1"}`
- New: `{"convenor": {"candidateId": "c1", "candidateName": "Alice Johnson"}}`

**Encryption:**
- Old: RSA-OAEP
- New: AES-GCM

Observer dashboard automatically detects and handles both formats.

## 💡 Best Practices

### For Observers:
1. Generate keys offline (disconnect internet)
2. Write down 12-word mnemonic on paper
3. Store in secure location (safe, vault)
4. Share public key via secure channel
5. Keep private key secret until vote counting

### For Voters:
1. Keep ballot code secret
2. Save both plain and encrypted votes
3. Verify vote appears on dashboard
4. Compare encrypted vote matches your saved copy
5. Report any discrepancies immediately

### For Administrators:
1. Set default public key in config
2. Distribute ballot codes securely
3. Monitor public dashboard for issues
4. Keep server logs for audit trail
5. Backup encrypted votes regularly

## 📞 Support

For issues or questions:
1. Check this guide first
2. Review CHANGELOG.md for recent changes
3. Check browser console for errors
4. Verify server is running
5. Contact election administrators

---

**Version:** 2.0  
**Last Updated:** November 16, 2025  
**Encryption:** AES-GCM 256-bit with BIP39 mnemonics

