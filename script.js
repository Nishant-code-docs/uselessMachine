// ===== CONFETTI ANIMATION =====
var confCanvas = document.getElementById("confettiCanvas");
var ctx = confCanvas.getContext("2d");
confCanvas.width = window.innerWidth;
confCanvas.height = window.innerHeight;
window.addEventListener("resize", function () {
  confCanvas.width = window.innerWidth;
  confCanvas.height = window.innerHeight;
});
var confetti = [];
function spawnConfetti() {
  for (var i = 0; i < 80; i++) {
    confetti.push({
      x: Math.random() * confCanvas.width,
      y: -10,
      r: 4 + Math.random() * 6,
      color: ["#ff3c00", "#ffcc00", "#7affaf", "#fff", "#ff6b6b"][
        Math.floor(Math.random() * 5)
      ],
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 4,
      spin: Math.random() * 0.2 - 0.1,
      angle: 0,
      life: 1,
    });
  }
}
function animateConfetti() {
  ctx.clearRect(0, 0, confCanvas.width, confCanvas.height);
  confetti = confetti.filter(function (c) {
    return c.y < confCanvas.height + 20 && c.life > 0;
  });
  confetti.forEach(function (c) {
    c.x += c.vx;
    c.y += c.vy;
    c.angle += c.spin;
    c.life -= 0.008;
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(c.angle);
    ctx.globalAlpha = c.life;
    ctx.fillStyle = c.color;
    ctx.fillRect(-c.r / 2, -c.r / 2, c.r, c.r * 1.5);
    ctx.restore();
  });
  requestAnimationFrame(animateConfetti);
}
animateConfetti();

// ===== TOAST NOTIFICATIONS =====
function showToast(msg) {
  var t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(function () {
    t.classList.remove("show");
  }, 2800);
}

// ===== SOUND EFFECTS =====
var audioContext = null;

// CUSTOM AUDIO FILES - Add your own audio files here
var loginAudioFile = "sounds/login.mp3"; // Change this to your login sound file
var clickAudioFile = "sounds/click.mp3"; // Change this to your click sound file

// Create audio elements for custom sounds
var loginAudio = new Audio();
var clickAudio = new Audio();

// Set the source files
loginAudio.src = loginAudioFile;
clickAudio.src = clickAudioFile;

// Optional: Set volume (0 to 1)
loginAudio.volume = 0.7;
clickAudio.volume = 0.5;

function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

// Fallback: Generate sound if custom audio fails
function generateLoginSound() {
  try {
    var ctx = initAudioContext();
    var now = ctx.currentTime;
    var duration = 0.5;

    // Create oscillator for login success sound (uplifting beep)
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Frequency sweep: 400 -> 800 Hz
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + duration);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.start(now);
    osc.stop(now + duration);

    // Add a second higher tone for richer sound
    var osc2 = ctx.createOscillator();
    osc2.connect(gain);
    osc2.frequency.setValueAtTime(600, now);
    osc2.frequency.exponentialRampToValueAtTime(1000, now + duration);
    osc2.start(now);
    osc2.stop(now + duration);
  } catch (e) {
    console.log("Audio not supported");
  }
}

// Fallback: Generate click sound if custom audio fails
function generateClickSound() {
  try {
    var ctx = initAudioContext();
    var now = ctx.currentTime;
    var duration = 0.1;

    // Create fun "boing" sound for button click
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Quick frequency sweep down: 600 -> 300 Hz (fun boing effect)
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + duration);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.start(now);
    osc.stop(now + duration);
  } catch (e) {
    console.log("Audio not supported");
  }
}

function playLoginSound() {
  try {
    // Try to play custom audio file
    if (loginAudio.src && loginAudio.src !== "") {
      loginAudio.currentTime = 0;
      var playPromise = loginAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(function () {
          // If custom audio fails, use fallback
          generateLoginSound();
        });
      }
    } else {
      // No custom file set, use fallback
      generateLoginSound();
    }
  } catch (e) {
    // Fallback to generated sound
    generateLoginSound();
  }
}

function playClickSound() {
  try {
    // Try to play custom audio file
    if (clickAudio.src && clickAudio.src !== "") {
      clickAudio.currentTime = 0;
      var playPromise = clickAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(function () {
          // If custom audio fails, use fallback
          generateClickSound();
        });
      }
    } else {
      // No custom file set, use fallback
      generateClickSound();
    }
  } catch (e) {
    // Fallback to generated sound
    generateClickSound();
  }
}

// ===== LOGIN SYSTEM (COMPLETELY USELESS) =====
var isLoggedIn = false;
var currentUser = "";

var loginMessages = [
  "shukriya! server crash ho gaya. phir se try karo.",
  "password galat hai. nahi, username galat tha actually.",
  "login attempt #234 thak gaye. ab bhi failed.",
  "biometric scanner kaam nahi kar raha. sorry bhai.",
  "IT department ke liye notification bhej diya. 2 saal wait kar.",
  "server se pucha. server ne bola 'mujhe nahi pata'. helpful.",
  "password reset mail bhejne ke liye email daalo... oh wait.",
  "acha teri security question ye: kitni password try kar li? utni zyada!",
  "congratulations! tu 2,341st successful login attempt ho!",
  "NASA ke servers hack kar li teri credentials se.",
  "ye password toh mera bhi use karta hoon bhai! insecure!",
  "LOGIN FAILED REASON: bhai nahi hoon main teri security guard.",
];

function attemptLogin() {
  var username = document.getElementById("loginUsername").value.trim();
  var password = document.getElementById("loginPassword").value.trim();
  var msgDiv = document.getElementById("loginMessage");

  if (!username) {
    msgDiv.textContent = "❌ username toh likho yaar!";
    msgDiv.style.color = "#ff6b6b";
    return;
  }

  if (!password) {
    msgDiv.textContent = "❌ password bhi chahiye hota hai! (shayd)";
    msgDiv.style.color = "#ff6b6b";
    return;
  }

  msgDiv.textContent = "🔄 verify ho raha hai... (nahi ho raha)";
  msgDiv.style.color = "#ffcc00";

  setTimeout(
    function () {
      // Always login successfully (useless machine)
      isLoggedIn = true;
      currentUser = username;

      // Show success message
      msgDiv.textContent = "✓ login successful! security toh crack ho hi gaya!";
      msgDiv.style.color = "#7affaf";

      setTimeout(function () {
        showToast("🎉 Welcome " + username + "! Ab jo marzi karo.");
        completeLogin();
      }, 600);
    },
    1000 + Math.random() * 800,
  );
}

function completeLogin() {
  // Hide login modal
  document.getElementById("loginModal").classList.add("hidden");

  // Show logout bar
  document.getElementById("logoutBar").style.display = "flex";
  document.getElementById("loggedInUser").textContent =
    "Logged in as: " + currentUser;

  // Play login sound effect
  playLoginSound();

  // Spawn confetti
  spawnConfetti();

  // Show random login message in chat
  var randomMsg =
    loginMessages[Math.floor(Math.random() * loginMessages.length)];
  var termDiv = document.getElementById("terminal");
  if (termDiv) {
    var line = document.createElement("div");
    line.innerHTML =
      '<span class="warn">[AUTH LOG]</span> <span class="output">' +
      randomMsg +
      "</span>";
    termDiv.appendChild(line);
    termDiv.scrollTop = termDiv.scrollHeight;
  }
}

function logout() {
  isLoggedIn = false;
  currentUser = "";

  // Hide logout bar
  document.getElementById("logoutBar").style.display = "none";

  // Reset login form
  document.getElementById("loginUsername").value = "";
  document.getElementById("loginPassword").value = "";
  document.getElementById("loginMessage").textContent = "";

  // Show login modal
  document.getElementById("loginModal").classList.remove("hidden");

  // Show toast
  showToast("👋 logout ho gaya. phir se login karni padegi!");
}

// ===== MAIN BUTTON — USELESS PRESS =====
var clicks = 0;
var btnMessages = [
  "waah beta! kuch nahi hua. congrats.",
  "phir se daba diya? yaar...",
  "machine ne feel kiya. aur kuch nahi hua.",
  "okay ab toh ruk. matlab seriously.",
  "button ko bhi thoda rest chahiye yaar.",
  "congratulations! tune unlock kiya: aur kuch nahi.",
  "scientists hairan hain teri persistence se.",
  "button says shukriya. waise kuch nahi hua.",
  "yeh toh basically meditation ban gaya.",
  "tune click enlightenment achieve kar li.",
  "ERROR: zyada kuch nahi generate ho gaya. ruk ja.",
  "bhai isko chhod. chai pi. seriously.",
  "teri mummy dekh rahi hain kya? kuch kaam karo.",
  "algorithm ko teri consistency se jealousy ho rahi hai.",
  "100+ clicks? bhai life mein goals hone chahiye.",
];
function pressButton() {
  // Play click sound effect
  playClickSound();

  clicks++;
  document.getElementById("clickCounter").textContent =
    clicks + " baar daba chuke ho \u2022 kuch nahi hua";
  document.getElementById("clickMsg").textContent =
    btnMessages[Math.min(clicks - 1, btnMessages.length - 1)];
  var btn = document.getElementById("mainBtn");
  btn.style.background =
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0");
  setTimeout(function () {
    btn.style.background = "#ff3c00";
  }, 300);
  if (clicks === 10) {
    spawnConfetti();
    showToast("🎉 10 clicks! Bhai itna dedication toh IIT mein daal deta!");
  }
  if (clicks === 50) {
    spawnConfetti();
    showToast("50 clicks. Tu literally useless hai aur ye machine bhi.");
  }
}

// ===== FAKE AI ORACLE =====
var fakeResponses = [
  "gehri soch ke baad conclusion: depend karta hai.",
  "answer hai 42. ya shayad 43. dhyan nahi tha.",
  "bahut badhiya sawaal. unfortunately main sirf memes jaanta hoon.",
  "mera training data sirf cat videos tha bhai.",
  "haan. nahi. shayad. pakka nahi.",
  "1000 simulations chalaaye. sab crash ho gaye.",
  "mere calculations ke hisaab se abhi snack khana chahiye.",
  "error 404: meaningful jawab nahi mila.",
  "maine rubber duck se pucha. woh maan gaya.",
  "vibes bol rahi hai nahi. data inconclusive hai.",
  "maine chandrama se pucha. woh busy tha.",
  "yaar seedha bol do, kuch nahi pata mujhe bhi.",
  "bhai ye sawaal toh ChatGPT bhi nahi jaanta.",
  "iska jawab Google karo. main yahan sirf vibe ke liye hoon.",
  "mere paas gyaan hai but aaj share karne ka mann nahi.",
  "tera sawaal sun ke mera processor hang ho gaya.",
  "consultation fee laga raha hoon. pehle chai pilao.",
];
var aiTyping = false;
function askFakeAI() {
  if (aiTyping) return;
  var inp = document.getElementById("aiInput");
  if (!inp.value.trim()) {
    inp.placeholder = "kuch toh pucho yaar";
    return;
  }
  aiTyping = true;
  var r = document.getElementById("aiResponse");
  r.innerHTML =
    '<span style="color:#555">soch raha hoon...</span><span class="ai-cursor"></span>';
  setTimeout(
    function () {
      var resp =
        fakeResponses[Math.floor(Math.random() * fakeResponses.length)];
      r.innerHTML = "";
      var i = 0;
      var iv = setInterval(function () {
        if (i < resp.length) {
          r.textContent += resp[i++];
        } else {
          clearInterval(iv);
          aiTyping = false;
          r.innerHTML = r.textContent + '<span class="ai-cursor"></span>';
        }
      }, 30);
      inp.value = "";
    },
    800 + Math.random() * 700,
  );
}

// ===== MOOD TRANSLATOR =====
var moodData = {
  happy: {
    advice:
      "khush ho? perfect. experts kehte hain khush rehne se khushi milti hai. profound.",
  },
  cool: {
    advice:
      "bhai tu swag hai. studies show: cool log kam palkein jhapakate hain. stop blinking.",
  },
  dead: {
    advice:
      "mood: ded. prescribed treatment: ek (1) samosa, turant. doctor's orders.",
  },
  fire: {
    advice:
      "AAG LAGI HAI. fan response initiate kiya. fan busy hai. please hold. chai piyo.",
  },
  galaxy: {
    advice:
      "dimag chhod ke gaya hai. galaxy ne call kiya, apna galaxy wapas maanga.",
  },
  chai: {
    advice:
      "CHAI. ye sab sawaalon ka jawab hai. chai piyo, sab theek ho jayega. jai ho.",
  },
};
function setMood(btn, m) {
  document.querySelectorAll(".mood-btn").forEach(function (b) {
    b.classList.remove("active");
  });
  btn.classList.add("active");
  document.getElementById("moodOutput").textContent = moodData[m].advice;
}

// ===== PROGRESS BARS (FAKE) =====
var progData = [
  { label: "vibes load ho rahi hain", v: 0 },
  { label: "chaos install ho raha hai", v: 0 },
  { label: "kuch nahi compile ho raha", v: 0 },
  { label: "uselessness optimize ho rahi hai", v: 0 },
  { label: "mummy ka patience load ho raha hai", v: 0 },
];
function initProgress() {
  var c = document.getElementById("progBars");
  c.innerHTML = "";
  progData.forEach(function (p, i) {
    p.v = 0;
    c.innerHTML +=
      '<div class="progress-label">' +
      p.label +
      '<span id="pv' +
      i +
      '"> 0%</span></div>' +
      '<div class="progress-track"><div class="progress-fill" id="pb' +
      i +
      '" style="width:0%"></div></div>';
    setTimeout(function () {
      animateBar(i);
    }, i * 300);
  });
}
function animateBar(i) {
  var target = 40 + Math.floor(Math.random() * 50);
  var iv = setInterval(function () {
    progData[i].v += 1 + Math.floor(Math.random() * 3);
    if (progData[i].v >= target) {
      progData[i].v = target;
      clearInterval(iv);
      if (target > 85) {
        document.getElementById("pv" + i).textContent =
          " ho gaya! (kuch nahi hua)";
        document.getElementById("pv" + i).style.color = "#ff3c00";
      }
    }
    document.getElementById("pb" + i).style.width = progData[i].v + "%";
    document.getElementById("pv" + i).textContent = " " + progData[i].v + "%";
  }, 60);
}
function resetProgress() {
  initProgress();
}

// ===== EXCUSE GENERATOR =====
var excuses = [
  "karna tha, but mercury retrograde mein tha aur IDE crash ho gaya.",
  "meri machine pe kaam karta tha. tab se machine delete kar di.",
  "ye bug nahi hai, ye undocumented feature hai jiske strong opinions hain.",
  "Google kiya. Google ne bola off-on karo. main dar gaya.",
  "rubber duck ne bola feature hai. main duck pe trust karta hoon.",
  "algorithm sahi tha. reality mein bug tha.",
  "technically kaam karta hai. bas is dimension mein nahi.",
  "fix karne wala tha, but snack kha liya aur bhool gaya.",
  "error message ek aise language mein tha jo main respect karta hoon but samajhta nahi.",
  "vibe coding kar raha tha. vibe misconfigured thi.",
  "ChatGPT ne bola theek hai. galat insaan se pucha tha.",
  "stars aligned nahi the deployment ke liye. reschedule karenge.",
  "bhai kal karta hoon pakka. kal wala kal alag hoga.",
  "wifi slow tha. wifi ki galti hai. main innocent hoon.",
  "mummy ne chai di, concentration toot gaya. mummy ki galti.",
  "neend aa rahi thi. body se bada system koi nahi hota.",
  "iski zaroorat hi nahi thi actually. rethink karna chahiye.",
  "project manager ne scope change kiya tha. iska proof hai mere WhatsApp mein.",
];
function generateExcuse() {
  document.getElementById("excuseBox").textContent =
    '"' + excuses[Math.floor(Math.random() * excuses.length)] + '"';
}

// ===== VIBE METER (REAL-TIME) =====
var vibeLabels = ["energy", "chaos", "swag", "jugaad", "hype", "chai"];
(function () {
  var vb = document.getElementById("vibeMeter");
  vb.innerHTML = "";
  vibeLabels.forEach(function (l) {
    vb.innerHTML +=
      '<div style="flex:1;display:flex;flex-direction:column;align-items:center;">' +
      '<div class="vibe-bar" style="height:4px;width:100%"></div>' +
      '<div class="vibe-label">' +
      l +
      "</div></div>";
  });
})();
document.addEventListener("mousemove", function (e) {
  var bars = document.querySelectorAll(".vibe-bar");
  var score = 0;
  bars.forEach(function (b, i) {
    var h = Math.min(
      80,
      5 +
        Math.abs(
          Math.sin((e.clientX / window.innerWidth + i * 0.3) * Math.PI) * 80,
        ),
    );
    b.style.height = h + "px";
    b.style.background = h > 50 ? "#ff3c00" : "#2a2a2a";
    score += h;
  });
  var s = Math.min(100, Math.round(score / 6));
  document.getElementById("vibeScore").textContent = s;
  var verdicts = [
    "bilkul bekar",
    "thoda theek",
    "okay-ish",
    "bhai sun",
    "certified bhai",
    "MAXIMUM JUGAAD",
  ];
  document.getElementById("vibeVerdict").textContent =
    verdicts[Math.min(5, Math.floor(s / 20))];
});

// ===== DESI HOROSCOPE =====
var signs = [
  "Aries ♈",
  "Taurus ♉",
  "Gemini ♊",
  "Cancer ♋",
  "Leo ♌",
  "Virgo ♍",
  "Libra ♎",
  "Scorpio ♏",
  "Sagittarius ♐",
  "Capricorn ♑",
  "Aquarius ♒",
  "Pisces ♓",
];
var horoReadings = [
  "aaj din accha hai. kuch bhi mat karo. bas chai piyo aur destiny kaam karegi.",
  "planets bol rahe hain: ghar pe raho. delivery order karo. ye sapna nahi, prophesy hai.",
  "aaj koi bada kaam hoga. ya nahi bhi hoga. 50-50 chance hai, bhai.",
  "Mercury retrograde mein hai — matlab sab gadbar hoga. already normal hai ye tere liye.",
  "aaj teri kismat chamkegi, but pehle charger dhundh le. fone marne wala hai.",
  "aaj love life ke baare mein stars keh rahe hain: thoda aur intezaar karo yaar.",
  "career mein aage badhoge — lekin pahle LinkedIn update karo please, 2019 wala hai abhi.",
  "aaj kuch naya try karo. e.g. subah uthna. revolutionary concept.",
  "dost tere liye kuch plan kar rahe hain. probably birthday ya roast. dono mein taiyaar raho.",
  "aaj financially sochna chahiye. matlab chai ki jagah coffee pi — investment hai ye.",
  "Jupiter keh raha hai sab theek hoga. Jupiter ne aaj bhi kuch nahi kiya. but sweet gesture.",
  "aaj ka din average rahega. bilkul kal jaisa. aur kal jaisa bhi. consistency is key.",
];
(function () {
  var g = document.getElementById("horoGrid");
  signs.forEach(function (s, i) {
    var d = document.createElement("div");
    d.className = "horo-sign";
    d.textContent = s;
    d.onclick = function () {
      document.querySelectorAll(".horo-sign").forEach(function (x) {
        x.classList.remove("selected");
      });
      d.classList.add("selected");
      document.getElementById("horoResult").textContent =
        "✦ " + s + ": " + horoReadings[i];
    };
    g.appendChild(d);
  });
})();

// ===== DECISION MAKER AI =====
var decisions = [
  "BILKUL KARO. stars, duck, aur meri gut feeling sab agree kar rahi hai.",
  "MAT KARO. mera dil bol raha hai galat hoga. aur mera dil zyaadatr sahi hota hai.",
  "COIN UCHHAO. destiny tujhe baat karna chahti hai.",
  "PEHLE CHAI PI. clarity aayegi. sab answers chai mein hain.",
  "HAN. matlab nahi. matlab SHAYAD HAN. matlab — bhai tu decide kar.",
  "FATE KE HISAAB SE: kal karo. aaj aaram kar.",
  "ALGORITHM KAH RAHA HAI: 73% probability of good outcome. 27% total disaster. go for it.",
  "YE SAWAAL MUMMY SE PUCHO. unke paas har jawab hota hai. aur lecture bhi free mein milega.",
  "DEFINITELY MAT KARO. ya karo. honestly tujhe pata hai. tujhe kyun AI chahiye?",
  "JUGAAD KARO. third option hamesha hota hai jise hum nahi dekhte.",
  "SIGN WAIT KARO. sign ye message hai. ab le lo decision.",
];
function makeDecision() {
  var inp = document.getElementById("decisionInput");
  if (!inp.value.trim()) {
    inp.placeholder = "pehle sawaal toh daalo yaar";
    return;
  }
  var d = document.getElementById("decisionOutput");
  d.textContent = "...";
  d.style.color = "#555";
  setTimeout(
    function () {
      d.textContent = decisions[Math.floor(Math.random() * decisions.length)];
      d.style.color = "#ffcc00";
    },
    600 + Math.random() * 800,
  );
}

// ===== ROAST MACHINE =====
var roasts = [
  "yaar, teri coding skills dekh ke Stack Overflow ne answer dena band kar diya.",
  "tu itna late uthta hai ki morning standup soch ke rota hai.",
  "teri git history dekh ke merge conflicts khud ro dete hain.",
  "tu vibe code karta hai lekin vibe hi nahi hai teri.",
  "bhai tera LinkedIn profile padh ke HR ne khud close kar diya tab.",
  "teri productivity tracker mein sab kuch hai sirf productivity nahi.",
  "deadline ke baare mein tera attitude dekh ke calendar ne therapy leni shuru kar di.",
  "tu 'kal pakka karunga' itna bolta hai ki kal bhi yaqeen nahi karta tujhe.",
  "teri README file mein 'todo: write README' likha hai.",
  "bhai tera to-do list itna lamba hai ki khud ek project ban gaya.",
  "tu 404 error se itna familiar hai jaise puraana dost ho.",
  "tera 'almost done' sunne ke baad PM ne retirement le liya.",
  "teri commit messages padhke documentation khud ashamed ho jaati hai.",
  "tu itna overthink karta hai ki Google bhi search result dene se darta hai.",
  "bhai daily meeting mein tera camera 'accidentally' band rehta hai. sab jaante hain.",
];
function generateRoast() {
  var box = document.getElementById("roastBox");
  box.style.transition = "opacity 0.3s";
  box.style.opacity = "0";
  setTimeout(function () {
    box.textContent = roasts[Math.floor(Math.random() * roasts.length)];
    box.style.opacity = "1";
    showToast("🔥 Roast delivered. Bura mat maano, dil se keh raha hoon.");
  }, 300);
}

// ===== PRODUCTIVITY TIMER =====
var prodRunning = false,
  prodSeconds = 0,
  prodInterval = null,
  prodTasks = 0;
var fakeTasks = [
  "chai pi (counted as deep work)",
  "ek important tab band kiya",
  "thoda stretch kiya",
  "meeting mein haan bolte rahe",
  "aankh bandi — 'thinking mode'",
  "meme dekha (research)",
  "phone check kiya 4 baar",
  "to-do list banayi (actual kaam nahi kiya)",
];
function toggleProd() {
  var btn = document.getElementById("prodBtn");
  if (!prodRunning) {
    prodRunning = true;
    btn.textContent = "⏹ KAAM BAND KARO";
    prodInterval = setInterval(function () {
      prodSeconds++;
      var m = String(Math.floor(prodSeconds / 60)).padStart(2, "0");
      var s = String(prodSeconds % 60).padStart(2, "0");
      document.getElementById("prodTimer").textContent = m + ":" + s;
      var statuses = [
        "kaam ho raha hai (shayad)",
        "bahut productive lag raha hai",
        "focus mode on hai",
        "pomodoro chal raha hai",
        "bhai kuch toh kar raha hoon main",
      ];
      if (prodSeconds % 10 === 0)
        document.getElementById("prodStatus").textContent =
          statuses[Math.floor(Math.random() * statuses.length)];
    }, 1000);
  } else {
    prodRunning = false;
    clearInterval(prodInterval);
    btn.textContent = "▶ KAAM SHURU KARO";
    document.getElementById("prodStatus").textContent =
      "band kar diya. badhiya. rest deserved hai.";
  }
}
function logTask() {
  prodTasks++;
  var task = fakeTasks[Math.floor(Math.random() * fakeTasks.length)];
  var log = document.getElementById("prodLog");
  var time = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Create task item with animation
  var taskDiv = document.createElement("div");
  taskDiv.className = "task-item";
  taskDiv.innerHTML =
    '<span class="task-time">[' +
    time +
    ']</span> <span class="task-text">✓ ' +
    task +
    "</span>";

  // Add to top of list
  if (log.firstChild) {
    log.insertBefore(taskDiv, log.firstChild);
  } else {
    log.appendChild(taskDiv);
  }

  // Update counter
  document.getElementById("taskCounter").textContent = prodTasks;
  document.getElementById("taskCounter").style.animation = "none";
  setTimeout(function () {
    document.getElementById("taskCounter").style.animation = "pulse 0.5s ease";
  }, 10);

  showToast("✓ Task #" + prodTasks + " logged. Bahut productive lag raha hai!");
  if (prodTasks === 5) {
    spawnConfetti();
    showToast("🎊 5 kaam! Tu toh IIT wala nikla!");
  }
}

// ===== USELESS TERMINAL =====
var termCmds = {
  help: function () {
    return [
      "{w}commands: help, ls, cd, rm, git, sudo, exit, npm install, chai, jugaad, yes, no, maybe, mummy",
      "{o}(sab commands approximately same kaam karte hain — matlab kuch nahi)",
    ];
  },
  ls: function () {
    return [
      "{o}kuch_nahi/   bekaar.txt   kyun.exe   vibe.js   404.md   chai.log",
    ];
  },
  cd: function (a) {
    return [
      "{o}move ho gaye: /" + (a || "kahin_nahi"),
      "{w}yahan bhi same hi dikhta hai",
    ];
  },
  rm: function () {
    return ["{e}rm: delete nahi hoga: object bahut vibeworthy hai"];
  },
  git: function () {
    return ["{w}git: teri commits judge ho gayi. verdict: chaotic neutral"];
  },
  sudo: function () {
    return [
      "{e}sudo: tu sudoers file mein nahi hai. duck ko notify kar diya gaya.",
    ];
  },
  exit: function () {
    return ["{w}exit nahi kar sakta. tu ab machine hai."];
  },
  "npm install": function () {
    return [
      "{o}47,382 dependencies install ho rahi hain...",
      "{o}47,382 packages add hue (47,381 completely useless)",
      "{w}1 package kuch kaam karta tha. hum ne hata diya.",
    ];
  },
  chai: function () {
    return [
      "{o}chai.exe running...",
      "{o}kettle on. pani garam. chai ban rahi hai.",
      "{w}ERROR: chai already pee chuke ho aaj 4 baar. limit exceed.",
    ];
  },
  jugaad: function () {
    return [
      "{o}jugaad mode activated.",
      "{o}problem ka 3rd option dhoondh raha hai...",
      "{w}jugaad found. kaam karega. guarantee nahi.",
    ];
  },
  mummy: function () {
    return [
      "{e}mummy: beta ye sab chhod, padhai karo.",
      "{w}mummy has entered the chat. all processes paused.",
    ];
  },
  yes: function () {
    return ["{o}haan haan haan haan haan haan haan haan haan haan"];
  },
  no: function () {
    return ["{o}theek hai bhai."];
  },
  maybe: function () {
    return ["{o}hamare lawyers ne advice di hai is pe comment na karein."];
  },
  default: function (cmd) {
    return [
      "{e}command nahi mila: " + cmd,
      "{o}kya terminal ke saath thoda acha behave kar sakte ho?",
    ];
  },
};
function runTermCmd() {
  var inp = document.getElementById("termInput");
  var cmd = inp.value.trim().toLowerCase();
  if (!cmd) return;
  inp.value = "";
  addTermLine(
    '<span class="prompt">useless@machine:~$</span> <span class="output">' +
      cmd +
      "</span>",
  );
  var fn =
    termCmds[cmd] ||
    function () {
      return termCmds["default"](cmd);
    };
  fn(cmd.split(" ")[1]).forEach(function (line, idx) {
    setTimeout(function () {
      if (line.startsWith("{o}"))
        addTermLine('<span class="output">' + line.slice(3) + "</span>");
      else if (line.startsWith("{e}"))
        addTermLine('<span class="err">' + line.slice(3) + "</span>");
      else if (line.startsWith("{w}"))
        addTermLine('<span class="warn">' + line.slice(3) + "</span>");
    }, idx * 120);
  });
}
function addTermLine(html) {
  var t = document.getElementById("terminal");
  var d = document.createElement("div");
  d.innerHTML = html;
  t.appendChild(d);
  t.scrollTop = t.scrollHeight;
}

// Initialize progress bars on page load
initProgress();
