# Custom Audio Files Setup

This folder is for your custom sound effects!

## How to Add Your Custom Sounds

### 1. **Login Sound**

- **File name:** `login.mp3`
- **Location:** Place in this `sounds/` folder
- **When plays:** When you successfully login
- **Recommended:** Uplifting/celebration sound (0.5 seconds)
- **Formats:** MP3, WAV, OGG, or any browser-supported audio

### 2. **Button Click Sound**

- **File name:** `click.mp3`
- **Location:** Place in this `sounds/` folder
- **When plays:** When you click "DABA DO YAAR" button
- **Recommended:** Short beep/boing sound (0.1-0.3 seconds)
- **Formats:** MP3, WAV, OGG, or any browser-supported audio

## Setup Instructions

### Step 1: Find Your Audio Files

- Use your own audio files (.mp3, .wav, .ogg, etc.)
- Can download from royalty-free sites like:
  - Freesound.org
  - Zapsplat.com
  - Pixabay.com
  - Mixkit.co

### Step 2: Rename & Place Files

```
useless machine/
├── sounds/
│   ├── login.mp3     ← Your login sound here
│   └── click.mp3     ← Your click sound here
├── script.js
├── styles.css
└── index-clean.html
```

### Step 3: Done!

That's it! The app will automatically:

- Load your custom audio files
- Play them when events happen
- Fall back to generated sounds if files are missing

## Volume Control

Edit in `script.js` (around line 70-71):

```javascript
loginAudio.volume = 0.7; // 0 to 1 (0.7 = 70%)
clickAudio.volume = 0.5; // 0 to 1 (0.5 = 50%)
```

## File Paths

You can customize the file paths in `script.js` (lines 64-65):

**Current:**

```javascript
var loginAudioFile = "sounds/login.mp3";
var clickAudioFile = "sounds/click.mp3";
```

**To change:**

```javascript
var loginAudioFile = "path/to/your/login-sound.wav";
var clickAudioFile = "path/to/your/click-sound.mp3";
```

## Troubleshooting

### Sound not playing?

1. ✅ Check file exists in `sounds/` folder
2. ✅ Verify file name matches exactly (case-sensitive on some systems)
3. ✅ Try a different audio format (.mp3 vs .wav vs .ogg)
4. ✅ Check browser console (F12) for errors
5. ✅ Some browsers require user interaction first

### Fallback sounds

If your custom audio files aren't found or fail to load:

- Login sound: Falls back to generated uplifting beep
- Click sound: Falls back to generated boing sound

## Recommended Audio

### Good Login Sounds:

- Success bells/chimes
- Uplifting beeps
- Victory fanfare
- Whoosh with ascending pitch
- Duration: 0.5-1 second

### Good Click Sounds:

- Short beeps
- Boing/spring sounds
- Pop sounds
- Button clicks
- Duration: 0.1-0.3 seconds

## Browser Support

Works on:

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

Note: Some browsers require user interaction (like clicking) before playing audio.

---

**Enjoy your custom sounds!** 🎵
