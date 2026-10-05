/* Raw CSS string displayed in the code viewer */
const rawCssCode = `#cake {
  display: block;
  position: relative;
  margin: -10em auto 0 auto;
}

/* ============================================== Candle */
.candle {
  background: #ffffff;
  border-radius: 10px;
  position: absolute;
  top: 228px;
  left: 50%;
  margin-left: -2.4px;
  margin-top: -8.33333333px;
  width: 5px;
  height: 35px;
  transform: translateY(-300px);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-animation: in 500ms 6s ease-out forwards;
  animation: in 500ms 6s ease-out forwards;
}

.candle:after,
.candle:before {
  background: rgba(255, 0, 0, 0.4);
  content: "";
  position: absolute;
  width: 100%;
  height: 2.22222222px;
}

.candle:after {
  top: 25%;
  left: 0;
}

.candle:before {
  top: 45%;
  left: 0;
}

/* ============================================== Fire */
.fire {
  border-radius: 100%;
  position: absolute;
  top: -20px;
  left: 50%;
  margin-left: -2.6px;
  width: 6.66666667px;
  height: 18px;
}

.fire:nth-child(1) { animation: fuego 2s 6.5s infinite; }
.fire:nth-child(2) { animation: fuego 1.5s 6.5s infinite; }
.fire:nth-child(3) { animation: fuego 1s 6.5s infinite; }
.fire:nth-child(4) { animation: fuego 0.5s 6.5s infinite; }
.fire:nth-child(5) { animation: fuego 0.2s 6.5s infinite; }

/* ============================================== Animations */
@keyframes fuego {
  0%, 100% {
    background: rgba(254, 248, 97, 0.5);
    box-shadow: 0 0 40px 10px rgba(248, 233, 209, 0.2);
    transform: translateY(0) scale(1);
  }
  50% {
    background: rgba(255, 50, 0, 0.1);
    box-shadow: 0 0 40px 20px rgba(248, 233, 209, 0.2);
    transform: translateY(-20px) scale(0);
  }
}

@keyframes in {
  to {
    transform: translateY(0);
  }
}`;

const rawHtmlCode = `<!-- Cake with Candle Animation -->
<div class="candle">
  <div class="fire"></div>
  <div class="fire"></div>
  <div class="fire"></div>
  <div class="fire"></div>
  <div class="fire"></div>
</div>

<svg id="cake" version="1.1" width="200px" height="500px" viewBox="0 0 200 500">
  <!-- Layer 3 Sponge -->
  <path fill="#a88679" d="...">
    <animate id="bizcocho_3" begin="relleno_2.end" dur="0.3s" fill="freeze" ... />
  </path>

  <!-- Layer 2 Filling -->
  <path fill="#8b6a60" d="...">
    <animate id="relleno_2" begin="bizcocho_2.end" dur="0.5s" fill="freeze" ... />
  </path>

  <!-- Layer 2 Sponge -->
  <path fill="#a88679" d="...">
    <animate id="bizcocho_2" begin="relleno_1.end" dur="0.5s" fill="freeze" ... />
  </path>

  <!-- Layer 1 Filling -->
  <path fill="#8b6a60" d="...">
    <animate id="relleno_1" begin="bizcocho_1.end" dur="0.5s" fill="freeze" ... />
  </path>

  <!-- Layer 1 Sponge (Base) -->
  <path fill="#a88679" d="...">
    <animate id="bizcocho_1" begin="2s" dur="0.8s" fill="freeze" ... />
  </path>

  <!-- Vanilla Crema Frosting (Dripping effect) -->
  <path fill="#fefae9" d="...">
    <animate id="crema" begin="bizcocho_3.end" dur="2s" fill="freeze" ... />
  </path>
  <rect x="10" y="475.571" fill="#fefae9" width="180" height="4" />
</svg>

<div class="text">
  <h1>happy birthday!</h1>
  <p>Stella</p>
</div>`;

let isCandleBlown = false;
let likeCount = 1420;
let isLiked = false;

const cakeContainer = document.getElementById("cakeContainer");
const candleEl = document.getElementById("candleEl");
const blowCandleBtn = document.getElementById("blowCandleBtn");
const replayBtn = document.getElementById("replayBtn");
const confettiBtn = document.getElementById("confettiBtn");
const nameInput = document.getElementById("nameInput");
const updateNameBtn = document.getElementById("updateNameBtn");
const displayName = document.getElementById("displayName");
const likeBtn = document.getElementById("likeBtn");
const likeCountEl = document.getElementById("likeCount");
const shareBtn = document.getElementById("shareBtn");

// Code Modal elements
const codeModal = document.getElementById("codeModal");
const toggleCodeBtn = document.getElementById("toggleCodeBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const codeDisplay = document.getElementById("codeDisplay");
const copyCodeBtn = document.getElementById("copyCodeBtn");
const tabCssBtn = document.getElementById("tabCssBtn");
const tabHtmlBtn = document.getElementById("tabHtmlBtn");
let activeTab = "css";

// Toast helper
function showToast(msg, icon = "✨") {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");
  const toastIcon = document.getElementById("toastIcon");
  toastMsg.textContent = msg;
  toastIcon.textContent = icon;
  toast.classList.remove("translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");
  setTimeout(() => {
    toast.classList.add("translate-y-20", "opacity-0");
    toast.classList.remove("translate-y-0", "opacity-100");
  }, 2500);
}

function replayAnimation() {
  isCandleBlown = false;
  candleEl.classList.remove("blown-out");
  blowCandleBtn.textContent = "💨 Blow Out";
  blowCandleBtn.className =
    "px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs transition";

  // Re-trigger SVG Birthday animations and CSS keyframes by re-cloning stage
  const htmlBackup = cakeContainer.innerHTML;
  cakeContainer.innerHTML = "";
  void cakeContainer.offsetHeight; // force reflow
  cakeContainer.innerHTML = htmlBackup;

  showToast("Animation replaying from beginning!", "🎂");

  // Schedule confetti right as the candle lights at ~6.5 seconds!
  setTimeout(() => {
    if (!isCandleBlown) {
      triggerConfettiBurst();
    }
  }, 6500);
}

replayBtn.addEventListener("click", replayAnimation);

// Initial confetti at 6.5s after load
setTimeout(() => {
  triggerConfettiBurst();
}, 6500);

// Blow candle toggle
blowCandleBtn.addEventListener("click", () => {
  const currentCandle = cakeContainer.querySelector(".candle");
  if (!currentCandle) return;

  if (!isCandleBlown) {
    isCandleBlown = true;
    currentCandle.classList.add("blown-out");
    blowCandleBtn.textContent = "🔥 Relight";
    blowCandleBtn.className =
      "px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs transition";
    showToast("Candle blown out! Make a wish! 🌟", "🕯️");
  } else {
    isCandleBlown = false;
    currentCandle.classList.remove("blown-out");
    blowCandleBtn.textContent = "💨 Blow Out";
    blowCandleBtn.className =
      "px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs transition";
    showToast("Candle relit! 🔥", "🕯️");
  }
});

// Custom name update
updateNameBtn.addEventListener("click", () => {
  const val = nameInput.value.trim();
  if (val) {
    displayName.textContent = val;

    // Clear textbox after Apply
    nameInput.value = "";

    showToast(`Greeting updated for ${val}!`, "🎉");
  }
});

nameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    updateNameBtn.click();
  }
});

// Confetti celebration helper
function triggerConfettiBurst() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.65 },
    });
  }
}

confettiBtn.addEventListener("click", () => {
  triggerConfettiBurst();
  showToast("Party confetti launched!", "🎊");
});

// Likes counter
likeBtn.addEventListener("click", () => {
  isLiked = !isLiked;
  likeCount += isLiked ? 1 : -1;
  likeCountEl.textContent = isLiked
    ? (likeCount / 1000).toFixed(1) + "k"
    : "1.4k";
  showToast(isLiked ? "Liked post!" : "Unliked post", "❤️");
});

// Share link
shareBtn.addEventListener("click", () => {
  const dummyInput = document.createElement("input");
  dummyInput.value = window.location.href;
  document.body.appendChild(dummyInput);
  dummyInput.select();
  document.execCommand("copy");
  document.body.removeChild(dummyInput);
  showToast("Animation page link copied!", "🔗");
});

function renderCodeView() {
  if (activeTab === "css") {
    codeDisplay.textContent = rawCssCode;
    copyCodeBtn.querySelector("span").textContent = "Copy CSS";
    tabCssBtn.className =
      "py-2.5 px-4 text-indigo-400 border-b-2 border-indigo-500 font-semibold focus:outline-none";
    tabHtmlBtn.className =
      "py-2.5 px-4 text-slate-400 hover:text-slate-200 border-b-2 border-transparent focus:outline-none";
  } else {
    codeDisplay.textContent = rawHtmlCode;
    copyCodeBtn.querySelector("span").textContent = "Copy HTML";
    tabHtmlBtn.className =
      "py-2.5 px-4 text-indigo-400 border-b-2 border-indigo-500 font-semibold focus:outline-none";
    tabCssBtn.className =
      "py-2.5 px-4 text-slate-400 hover:text-slate-200 border-b-2 border-transparent focus:outline-none";
  }
}

tabCssBtn.addEventListener("click", () => {
  activeTab = "css";
  renderCodeView();
});

tabHtmlBtn.addEventListener("click", () => {
  activeTab = "html";
  renderCodeView();
});

toggleCodeBtn.addEventListener("click", () => {
  renderCodeView();
  codeModal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  codeModal.classList.add("hidden");
});

codeModal.addEventListener("click", (e) => {
  if (e.target === codeModal) codeModal.classList.add("hidden");
});

copyCodeBtn.addEventListener("click", () => {
  const textToCopy = activeTab === "css" ? rawCssCode : rawHtmlCode;
  const el = document.createElement("textarea");
  el.value = textToCopy;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  showToast(`Copied ${activeTab.toUpperCase()} to clipboard!`, "📋");
});




// Custom cursor effect
const cursor = document.querySelector(".cursor");
const trail = document.querySelector(".cursor-trail");

let mouseX = 0;
let mouseY = 0;

let trailX = 0;
let trailY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

function animateTrail() {
  // Lower number = smoother/slower
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;

  trail.style.left = trailX + "px";
  trail.style.top = trailY + "px";

  requestAnimationFrame(animateTrail);
}

animateTrail();