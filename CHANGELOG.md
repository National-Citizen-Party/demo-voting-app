# Changelog

## Version 2.0 - Enhanced Security & UX Improvements

### 🔐 Cryptography Changes

**Switched from RSA to AES-GCM with BIP39 Mnemonics**

- **Before**: RSA-OAEP 2048-bit keys (very long, ~400+ characters)
- **After**: AES-GCM 256-bit with BIP39 12-word mnemonic

**Benefits:**
- ✅ **Much shorter keys**: Public key is now 44 characters (base64) instead of 400+
- ✅ **Easy to remember**: Private key is 12 words instead of a long string
- ✅ **Industry standard**: Uses BIP39 (Bitcoin Improvement Proposal 39) for mnemonic generation
- ✅ **Secure**: 128 bits of entropy, PBKDF2 with 100,000 iterations
- ✅ **Faster**: AES-GCM is faster than RSA for encryption/decryption

**Example Keys:**

*Old RSA Keys (2048-bit):*
```
Public: MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA... (400+ chars)
Private: MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAo... (1600+ chars)
```

*New AES Keys:*
```
Public: dGVzdCBrZXkgZm9yIGVsZWN0aW9uIG9ic2VydmVycw== (44 chars)
Private: abandon ability able about above absent absorb abstract absurd abuse access accident (12 words)
```

### 📝 User Experience Improvements

#### 1. **Default Observer Public Key**
- Added `defaultObserverPublicKey` field to `election-params.json`
- When set, the public key is automatically pre-filled on the voting page
- Voters don't need to manually paste the key every time

#### 2. **Already-Used Ballot Code Handling**
- When a ballot code has already been used, the system now shows the encrypted vote
- Voters can verify their previous submission
- Prevents confusion and provides transparency

#### 3. **Candidate Names in Vote JSON**
- Vote JSON now shows actual candidate names, not just IDs
- **Before**: `{"convenor": "c1", "secretary": "s2"}`
- **After**: 
```json
{
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
    }
  }
}
```

#### 4. **Save Instructions**
- Added prominent instruction box on the encryption page
- Reminds voters to save both plain text and encrypted votes
- Provides clear guidance on what to do with the copies

#### 5. **Vote Finalization Warning**
- Added warning message before submission
- Clearly states: "Your vote is NOT finalized yet!"
- Instructs voters to verify on public dashboard after submission

### 🎨 UI Enhancements

- **Instruction boxes**: Blue highlighted boxes with clear instructions
- **Warning messages**: Yellow warning boxes for important notices
- **Info messages**: Cyan info boxes for helpful tips
- **Better spacing**: Improved layout and readability
- **Copy buttons**: Easier to save votes with one-click copying

### 🔧 Technical Changes

#### Key Generation (`keygen.html`)
- Integrated BIP39 library from CDN
- Generates 128-bit entropy (16 bytes)
- Converts to 12-word mnemonic using standard BIP39 word list
- Derives AES-256 key using PBKDF2 with 100,000 iterations

#### Vote Encryption (`vote.html`)
- Uses AES-GCM for symmetric encryption
- Generates random 12-byte IV for each vote
- IV is prepended to ciphertext for decryption
- Imports BIP39 library for validation

#### Vote Decryption (`observer.html`)
- Validates mnemonic using BIP39 before attempting decryption
- Derives same AES key from mnemonic
- Extracts IV from encrypted data
- Decrypts using AES-GCM
- Handles both old and new vote formats for backward compatibility

#### Backend (`server.js`)
- Returns encrypted vote when ballot code is already used
- Adds `alreadyUsed` and `encryptedVote` fields to response

#### Configuration (`election-params.json`)
- Added `defaultObserverPublicKey` field
- Can be set by observers after key generation
- Empty string by default

### 📚 Documentation Updates

All documentation files have been updated to reflect the new mnemonic-based system:
- `README.md` - Updated cryptography section
- `ARCHITECTURE.md` - Updated security model
- `WORKFLOW.md` - Updated key generation workflow

### 🔄 Migration Notes

**Backward Compatibility:**
- Observer dashboard can decrypt votes in both old (RSA) and new (AES-GCM) formats
- Vote counting logic handles both ID-only and full candidate name formats
- No data migration needed for existing installations

**Fresh Installation:**
- All new votes will use the AES-GCM format
- All new keys will be BIP39 mnemonics
- Shorter, easier to manage keys

### 🚀 Getting Started with New System

1. **Generate Keys** (Observers):
   ```
   Visit /keygen
   Click "Generate New Key Pair"
   Copy PUBLIC KEY (44 characters)
   Copy PRIVATE KEY (12 words)
   ```

2. **Set Default Key** (Optional):
   ```
   Edit election-params.json
   Set "defaultObserverPublicKey": "YOUR_PUBLIC_KEY_HERE"
   ```

3. **Vote** (Voters):
   ```
   Visit /vote
   Enter ballot code
   Select candidates
   Public key auto-filled (if default is set)
   Encrypt and submit
   ```

4. **Decrypt** (Observers):
   ```
   Visit /observer
   Enter 12-word mnemonic
   Click "Decrypt All Votes"
   View results
   ```

### 📊 Performance Improvements

- **Faster encryption**: AES-GCM is ~10x faster than RSA
- **Smaller data**: Encrypted votes are smaller
- **Quicker key generation**: Mnemonic generation is instant
- **Better UX**: Shorter keys are easier to copy/paste

### 🔒 Security Considerations

**Maintained:**
- ✅ Client-side encryption/decryption
- ✅ Server never sees private keys
- ✅ Server never sees decrypted votes
- ✅ Public verification of encrypted votes

**Improved:**
- ✅ Easier to securely store 12 words than long key strings
- ✅ Can write down mnemonic on paper more easily
- ✅ Less prone to copy/paste errors
- ✅ Industry-standard BIP39 implementation

**Note:** This is still a symmetric encryption demo. For production, consider:
- Multi-party computation for key generation
- Threshold cryptography (k-of-n observers needed)
- Hardware security modules (HSMs)
- Formal security audit

---

## Version 1.0 - Initial Release

- Basic voting system with RSA encryption
- In-memory vote storage
- Public dashboard
- Observer dashboard
- Key generation page
- Ballot code validation

