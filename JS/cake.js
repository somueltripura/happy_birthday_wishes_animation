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


// Background music toggle
const musicBtn = document.getElementById('musicToggleBtn');
const bgMusic = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
const musicText = document.getElementById('musicText');

let isPlaying = false;

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicIcon.textContent = '🎵';
    musicText.textContent = 'Play Music';
    musicBtn.classList.remove('text-pink-400', 'border-pink-500/50');
  } else {
    bgMusic.play();
    musicIcon.textContent = '⏸️';
    musicText.textContent = 'Pause Music';
    musicBtn.classList.add('text-pink-400', 'border-pink-500/50');
  }
  isPlaying = !isPlaying;
});