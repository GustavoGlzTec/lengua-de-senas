const sourceText = document.querySelector("#sourceText");
const translateButton = document.querySelector("#translateButton");
const clearButton = document.querySelector("#clearButton");
const charCount = document.querySelector("#charCount");
const detectedLanguage = document.querySelector("#detectedLanguage");
const signSequence = document.querySelector("#signSequence");
const emptyState = document.querySelector("#emptyState");
const languageSelect = document.querySelector("#languageSelect");
const historyList = document.querySelector("#historyList");
const emptyHistory = document.querySelector("#emptyHistory");
const clearHistoryButton = document.querySelector("#clearHistoryButton");
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector("#themeIcon");
const themeLabel = document.querySelector("#themeLabel");

const HISTORY_KEY = "lsm-translator-history";
const THEME_KEY = "lsm-translator-theme";
const MAX_HISTORY = 10;

const languageLabels = {
  es: "Español detectado",
  en: "Inglés detectado",
  fr: "Francés detectado",
  auto: "Idioma detectado automáticamente",
};

const translations = {
  hola: "hola",
  hello: "hola",
  bonjour: "hola",
  salut: "hola",
  adios: "adiós",
  goodbye: "adiós",
  bye: "adiós",
  revoir: "adiós",
  gracias: "gracias",
  thanks: "gracias",
  thank: "gracias",
  merci: "gracias",
  porfavor: "por favor",
  please: "por favor",
  plait: "por favor",
  oui: "sí",
  si: "sí",
  yes: "sí",
  no: "no",
  ayuda: "ayuda",
  help: "ayuda",
  aide: "ayuda",
  necesito: "necesitar",
  need: "necesitar",
  besoin: "necesitar",
  quiero: "querer",
  want: "querer",
  veux: "querer",
  agua: "agua",
  water: "agua",
  eau: "agua",
  comida: "comida",
  food: "comida",
  manger: "comida",
  casa: "casa",
  home: "casa",
  house: "casa",
  maison: "casa",
  escuela: "escuela",
  school: "escuela",
  ecole: "escuela",
  hospital: "hospital",
  doctor: "doctor",
  docteur: "doctor",
  familia: "familia",
  family: "familia",
  famille: "familia",
  amigo: "amigo",
  amiga: "amigo",
  friend: "amigo",
  ami: "amigo",
  madre: "mamá",
  mama: "mamá",
  mom: "mamá",
  mere: "mamá",
  papa: "papá",
  padre: "papá",
  dad: "papá",
  pere: "papá",
  trabajo: "trabajo",
  work: "trabajo",
  travail: "trabajo",
  bano: "baño",
  bathroom: "baño",
  toilettes: "baño",
  donde: "dónde",
  where: "dónde",
  ou: "dónde",
  bueno: "bien",
  bien: "bien",
  good: "bien",
  mal: "mal",
  bad: "mal",
  mauvais: "mal",
  feliz: "feliz",
  happy: "feliz",
  heureux: "feliz",
  triste: "triste",
  sad: "triste",
  dias: "día",
  day: "día",
  jour: "día",
  noche: "noche",
  night: "noche",
  nuit: "noche",
};

const signs = {
  "hola": { emoji: "👋", movement: "Mano abierta frente al cuerpo, muévela suavemente de lado a lado.", type: "Seña común" },
  "adiós": { emoji: "👋", movement: "Mano abierta, dedos hacia arriba, cierra y abre los dedos dos veces.", type: "Seña común" },
  "gracias": { emoji: "🤲", movement: "Lleva la mano desde la boca hacia adelante con palma abierta.", type: "Cortesía" },
  "por favor": { emoji: "🫱", movement: "Palma sobre el pecho con movimiento circular breve.", type: "Cortesía" },
  "sí": { emoji: "✊", movement: "Puño cerrado que baja y sube como afirmando con la cabeza.", type: "Respuesta" },
  "no": { emoji: "🤏", movement: "Une índice y medio contra el pulgar una vez frente al cuerpo.", type: "Respuesta" },
  "ayuda": { emoji: "🫶", movement: "Una mano sostiene a la otra y ambas suben ligeramente.", type: "Necesidad" },
  "necesitar": { emoji: "👇", movement: "Índice hacia abajo con dos pulsos cortos frente al torso.", type: "Verbo" },
  "querer": { emoji: "🤲", movement: "Ambas manos se acercan al pecho como atrayendo algo.", type: "Verbo" },
  "agua": { emoji: "💧", movement: "Forma una W cerca de la boca y toca la barbilla suavemente.", type: "Sustantivo" },
  "comida": { emoji: "🍽️", movement: "Mano en forma de pinza lleva comida imaginaria a la boca.", type: "Sustantivo" },
  "casa": { emoji: "🏠", movement: "Une las puntas de los dedos formando un techo frente a ti.", type: "Lugar" },
  "escuela": { emoji: "🎒", movement: "Palmas se juntan dos veces como aplaudiendo de forma suave.", type: "Lugar" },
  "hospital": { emoji: "🏥", movement: "Dibuja una cruz pequeña en el brazo con dos dedos.", type: "Lugar" },
  "doctor": { emoji: "🩺", movement: "Toca la muñeca como si tomaras el pulso.", type: "Persona" },
  "familia": { emoji: "👨‍👩‍👧", movement: "Manos en F trazan un círculo hacia afuera para representar grupo familiar.", type: "Persona" },
  "amigo": { emoji: "🤝", movement: "Engancha índices de ambas manos y alterna la posición.", type: "Persona" },
  "mamá": { emoji: "👩", movement: "Pulgar de mano abierta toca suavemente la barbilla.", type: "Persona" },
  "papá": { emoji: "👨", movement: "Pulgar de mano abierta toca suavemente la frente.", type: "Persona" },
  "trabajo": { emoji: "💼", movement: "Puños cerrados se golpean suavemente uno sobre otro.", type: "Actividad" },
  "baño": { emoji: "🚻", movement: "Mano con letra T se mueve de lado a lado.", type: "Lugar" },
  "dónde": { emoji: "❓", movement: "Índice levantado oscila de lado a lado con expresión interrogativa.", type: "Pregunta" },
  "bien": { emoji: "👍", movement: "Pulgar arriba con un movimiento corto hacia adelante.", type: "Estado" },
  "mal": { emoji: "👎", movement: "Pulgar abajo con expresión facial negativa.", type: "Estado" },
  "feliz": { emoji: "😊", movement: "Manos abiertas suben sobre el pecho con expresión alegre.", type: "Emoción" },
  "triste": { emoji: "😢", movement: "Dedos bajan frente al rostro acompañados de expresión triste.", type: "Emoción" },
  "día": { emoji: "☀️", movement: "Brazo dominante se arquea sobre el otro como el recorrido del sol.", type: "Tiempo" },
  "noche": { emoji: "🌙", movement: "Una mano cubre la otra como si llegara la oscuridad.", type: "Tiempo" },
};

const stopWords = new Set([
  "a", "al", "and", "au", "avec", "con", "de", "del", "el", "en", "et", "for", "i", "ir", "je", "la", "las", "le", "les", "los", "me", "mi", "mon", "my", "para", "que", "the", "to", "tu", "un", "una", "une", "y", "yo"
]);

function normalizeWord(word) {
  return word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zñ]/g, "");
}

function detectLanguage(text) {
  if (languageSelect.value !== "auto") {
    return languageSelect.value;
  }

  const normalized = ` ${text.toLowerCase()} `;
  const hints = {
    fr: [" bonjour ", " merci ", " besoin ", " où ", " ou ", " je ", " veux ", " maison "],
    en: [" hello ", " thanks ", " please ", " need ", " where ", " water ", " school ", " help "],
    es: [" hola ", " gracias ", " por favor ", " necesito ", " dónde ", " donde ", " agua ", " ayuda "],
  };

  const scores = Object.entries(hints).map(([language, words]) => [
    language,
    words.filter((word) => normalized.includes(word)).length,
  ]);
  scores.sort((a, b) => b[1] - a[1]);
  return scores[0][1] > 0 ? scores[0][0] : "auto";
}

function textToSigns(text) {
  const words = text.split(/\s+/).map(normalizeWord).filter(Boolean);
  const sequence = [];

  words.forEach((word) => {
    if (stopWords.has(word)) {
      return;
    }

    const signName = translations[word];
    if (signName && signs[signName]) {
      if (!sequence.some((item) => item.name === signName && item.source === word)) {
        sequence.push({ name: signName, ...signs[signName], source: word });
      }
      return;
    }

    sequence.push({
      name: word.toUpperCase(),
      emoji: "🔤",
      movement: `No hay una seña registrada para “${word}”. Deletrea manualmente: ${word.toUpperCase().split("").join(" · ")}.`,
      type: "Deletreo manual",
      source: word,
    });
  });

  return sequence;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;",
  })[character]);
}

function renderSigns(sequence) {
  signSequence.innerHTML = "";
  emptyState.hidden = sequence.length > 0;

  if (sequence.length === 0) {
    emptyState.hidden = false;
    emptyState.querySelector("p").textContent = "No encontré palabras traducibles. Intenta con una frase más específica.";
    return;
  }

  const fragment = document.createDocumentFragment();
  sequence.forEach((sign, index) => {
    const card = document.createElement("article");
    card.className = "sign-card";
    card.innerHTML = `
      <div class="sign-visual" role="img" aria-label="Representación visual de ${sign.name}">
        <span class="hand">${sign.emoji}</span>
      </div>
      <div class="sign-body">
        <span class="sign-chip">${index + 1}. ${sign.type}</span>
        <strong>${sign.name}</strong>
        <small>${sign.movement}</small>
      </div>
    `;
    fragment.append(card);
  });
  signSequence.append(fragment);
}

function loadHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
}

function saveHistoryItem(text, language, sequence) {
  const current = loadHistory();
  const item = {
    id: crypto.randomUUID(),
    text,
    language,
    summary: sequence.map((sign) => sign.name).join(" → "),
    createdAt: new Date().toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short" }),
  };
  localStorage.setItem(HISTORY_KEY, JSON.stringify([item, ...current].slice(0, MAX_HISTORY)));
  renderHistory();
}

function renderHistory() {
  const history = loadHistory();
  historyList.innerHTML = "";
  emptyHistory.hidden = history.length > 0;

  history.forEach((item) => {
    const li = document.createElement("li");
    li.className = "history-item";
    li.innerHTML = `
      <div>
        <strong>${escapeHtml(item.text)}</strong>
        <small>${item.createdAt} · ${languageLabels[item.language] || languageLabels.auto}</small>
        <small>${escapeHtml(item.summary || "Sin señas reconocidas")}</small>
      </div>
      <button type="button" aria-label="Repetir traducción">Repetir</button>
    `;
    li.querySelector("button").addEventListener("click", () => {
      sourceText.value = item.text;
      updateCharCount();
      translate();
      document.querySelector("#translator").scrollIntoView({ behavior: "smooth" });
    });
    historyList.append(li);
  });
}

function updateCharCount() {
  charCount.textContent = `${sourceText.value.length} / ${sourceText.maxLength}`;
}

function translate() {
  const text = sourceText.value.trim();
  if (!text) {
    sourceText.focus();
    return;
  }

  const language = detectLanguage(text);
  const sequence = textToSigns(text);
  detectedLanguage.textContent = languageLabels[language];
  renderSigns(sequence);
  saveHistoryItem(text, language, sequence);
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "Modo claro" : "Modo oscuro";
  localStorage.setItem(THEME_KEY, theme);
}

sourceText.addEventListener("input", updateCharCount);
translateButton.addEventListener("click", translate);
sourceText.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    translate();
  }
});
clearButton.addEventListener("click", () => {
  sourceText.value = "";
  updateCharCount();
  sourceText.focus();
});
clearHistoryButton.addEventListener("click", () => {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
});
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(currentTheme);
});

applyTheme(localStorage.getItem(THEME_KEY) || "light");
updateCharCount();
renderHistory();
