// Año del footer
document.getElementById("year").textContent = new Date().getFullYear();

// Toast simple
const toast = document.getElementById("toast");
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.hidden = true), 2500);
}

// Calculadora de tokens
const TOKENS_PER_MSG = 1500; // promedio pregunta + respuesta
const plans = [
  { name: "Starter", tokens: 1_000_000 },
  { name: "Pro", tokens: 5_000_000 },
  { name: "Business", tokens: 25_000_000 },
];

const slider = document.getElementById("msgs");
const msgsValue = document.getElementById("msgs-value");
const tokensMonth = document.getElementById("tokens-month");
const planReco = document.getElementById("plan-reco");
const planCards = document.querySelectorAll(".plan");

function formatTokens(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  return Math.round(n / 1000) + "k";
}

function updateCalc() {
  const msgs = Number(slider.value);
  const total = msgs * TOKENS_PER_MSG * 30;
  const reco = plans.find((p) => p.tokens >= total) ?? plans[plans.length - 1];

  msgsValue.textContent = msgs;
  tokensMonth.textContent = formatTokens(total);
  planReco.textContent = reco.name;

  planCards.forEach((card) =>
    card.classList.toggle("highlight", card.dataset.plan === reco.name)
  );
}

slider.addEventListener("input", updateCalc);
updateCalc();

// Botones de compra
document.querySelectorAll(".buy").forEach((btn) => {
  btn.addEventListener("click", () => {
    const plan = btn.closest(".plan").dataset.plan;
    showToast(`🛒 Agregaste el paquete ${plan} (demo)`);
  });
});

// Formulario de registro
document.getElementById("signup").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.hidden = true;
  document.getElementById("signup-msg").hidden = false;
});

// Animación al hacer scroll
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.15 }
);

document.querySelectorAll(".card, .section h2, details").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});
