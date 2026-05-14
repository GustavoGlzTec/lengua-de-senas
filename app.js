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
  auto: "Idioma detectado automáticamente",
};

const phraseTranslations = [
  { patterns: ["lengua de senas mexicana", "mexican sign language"], sign: "lengua de señas mexicana" },
  { patterns: ["buenos dias", "good morning"], sign: "buenos días" },
  { patterns: ["buenas tardes", "good afternoon"], sign: "buenas tardes" },
  { patterns: ["buenas noches", "good night", "good evening"], sign: "buenas noches" },
  { patterns: ["muchas gracias", "thank you very much", "thanks a lot"], sign: "muchas gracias" },
  { patterns: ["por favor", "please"], sign: "por favor" },
  { patterns: ["de nada", "you are welcome", "you're welcome"], sign: "de nada" },
  { patterns: ["como estas", "how are you"], sign: "¿cómo estás?" },
  { patterns: ["cuanto cuesta", "how much"], sign: "¿cuánto cuesta?" },
  { patterns: ["no entiendo", "i do not understand", "i don't understand"], sign: "no entiendo" },
  { patterns: ["te amo", "i love you"], sign: "te amo" },
  { patterns: ["lengua de senas", "sign language"], sign: "lengua de señas" },
];

const translations = {
  hola: "hola",
  hello: "hola",
  hi: "hola",
  hey: "hola",
  adios: "adiós",
  goodbye: "adiós",
  bye: "adiós",
  gracias: "gracias",
  thanks: "gracias",
  thank: "gracias",
  si: "sí",
  yes: "sí",
  yeah: "sí",
  no: "no",
  ayuda: "ayuda",
  ayudar: "ayuda",
  help: "ayuda",
  necesito: "necesitar",
  necesitar: "necesitar",
  need: "necesitar",
  quiero: "querer",
  querer: "querer",
  want: "querer",
  puedo: "poder",
  puede: "poder",
  poder: "poder",
  can: "poder",
  agua: "agua",
  water: "agua",
  comida: "comida",
  comer: "comida",
  food: "comida",
  eat: "comida",
  casa: "casa",
  home: "casa",
  house: "casa",
  escuela: "escuela",
  school: "escuela",
  hospital: "hospital",
  doctor: "doctor",
  doctora: "doctor",
  nurse: "enfermería",
  enfermera: "enfermería",
  enfermero: "enfermería",
  familia: "familia",
  family: "familia",
  amigo: "amigo",
  amiga: "amigo",
  friend: "amigo",
  madre: "mamá",
  mama: "mamá",
  mom: "mamá",
  mother: "mamá",
  papa: "papá",
  padre: "papá",
  dad: "papá",
  father: "papá",
  hermano: "hermano",
  hermana: "hermano",
  brother: "hermano",
  sister: "hermano",
  trabajo: "trabajo",
  trabajar: "trabajo",
  work: "trabajo",
  bano: "baño",
  baño: "baño",
  bathroom: "baño",
  restroom: "baño",
  donde: "dónde",
  where: "dónde",
  que: "qué",
  what: "qué",
  cuando: "cuándo",
  when: "cuándo",
  quien: "quién",
  who: "quién",
  porque: "por qué",
  why: "por qué",
  bueno: "bien",
  bien: "bien",
  good: "bien",
  mal: "mal",
  bad: "mal",
  feliz: "feliz",
  contento: "feliz",
  happy: "feliz",
  triste: "triste",
  sad: "triste",
  enojado: "enojado",
  enojada: "enojado",
  angry: "enojado",
  miedo: "miedo",
  afraid: "miedo",
  fear: "miedo",
  dias: "día",
  dia: "día",
  day: "día",
  hoy: "hoy",
  today: "hoy",
  manana: "mañana",
  mañana: "mañana",
  tomorrow: "mañana",
  ayer: "ayer",
  yesterday: "ayer",
  tarde: "tarde",
  afternoon: "tarde",
  noche: "noche",
  night: "noche",
  nombre: "nombre",
  name: "nombre",
  persona: "persona",
  people: "persona",
  person: "persona",
  ir: "ir",
  voy: "ir",
  go: "ir",
  venir: "venir",
  ven: "venir",
  come: "venir",
  ver: "ver",
  veo: "ver",
  see: "ver",
  hablar: "hablar",
  hablo: "hablar",
  speak: "hablar",
  say: "hablar",
  aprender: "aprender",
  learn: "aprender",
  estudiar: "estudiar",
  study: "estudiar",
  importante: "importante",
  important: "importante",
  urgente: "urgente",
  urgent: "urgente",
  emergencia: "emergencia",
  emergency: "emergencia",
  policia: "policía",
  police: "policía",
  dinero: "dinero",
  money: "dinero",
  tienda: "tienda",
  store: "tienda",
  calle: "calle",
  street: "calle",
  autobus: "autobús",
  bus: "autobús",
  taxi: "taxi",
  telefono: "teléfono",
  phone: "teléfono",
  celular: "teléfono",
  numero: "número",
  number: "número",
  caliente: "caliente",
  hot: "caliente",
  frio: "frío",
  cold: "frío",
  grande: "grande",
  big: "grande",
  pequeno: "pequeño",
  pequeño: "pequeño",
  small: "pequeño",
};

const signs = {
  "hola": { emoji: "👋", movement: "Mano abierta frente al cuerpo, muévela suavemente de lado a lado.", type: "Seña común" },
  "adiós": { emoji: "👋", movement: "Mano abierta, dedos hacia arriba, cierra y abre los dedos dos veces.", type: "Seña común" },
  "buenos días": { emoji: "🌅", movement: "Combina BIEN con DÍA: pulgar arriba y después el brazo marca la salida del sol.", type: "Saludo" },
  "buenas tardes": { emoji: "🌤️", movement: "Combina BIEN con TARDE: pulgar arriba y luego marca el sol a media altura.", type: "Saludo" },
  "buenas noches": { emoji: "🌙", movement: "Combina BIEN con NOCHE: pulgar arriba y una mano cubre la otra como oscuridad.", type: "Saludo" },
  "gracias": { emoji: "🤲", movement: "Lleva la mano desde la boca hacia adelante con palma abierta.", type: "Cortesía" },
  "muchas gracias": { emoji: "🙏", movement: "Haz GRACIAS y repite el movimiento hacia adelante con énfasis amable.", type: "Cortesía" },
  "por favor": { emoji: "🫱", movement: "Palma sobre el pecho con movimiento circular breve.", type: "Cortesía" },
  "de nada": { emoji: "🙂", movement: "Mano relajada se mueve hacia afuera como rechazando deuda o problema.", type: "Cortesía" },
  "¿cómo estás?": { emoji: "🤔", movement: "Manos al frente cambian de posición y termina con expresión facial interrogativa.", type: "Pregunta" },
  "¿cuánto cuesta?": { emoji: "💲", movement: "Forma pregunta y frota dedos como referencia a precio o dinero.", type: "Pregunta" },
  "no entiendo": { emoji: "🙅", movement: "Haz NO y luego lleva la mano a la frente con gesto de duda.", type: "Frase útil" },
  "te amo": { emoji: "🤟", movement: "Usa la configuración ILY con palma hacia la persona.", type: "Frase común" },
  "lengua de señas": { emoji: "🖐️", movement: "Manos abiertas se mueven frente al torso como conversación visual.", type: "Concepto" },
  "lengua de señas mexicana": { emoji: "🇲🇽", movement: "Haz LENGUA DE SEÑAS y añade referencia a México con gesto de ubicación/bandera.", type: "Concepto" },
  "sí": { emoji: "✊", movement: "Puño cerrado que baja y sube como afirmando con la cabeza.", type: "Respuesta" },
  "no": { emoji: "🤏", movement: "Une índice y medio contra el pulgar una vez frente al cuerpo.", type: "Respuesta" },
  "ayuda": { emoji: "🫶", movement: "Una mano sostiene a la otra y ambas suben ligeramente.", type: "Necesidad" },
  "necesitar": { emoji: "👇", movement: "Índice hacia abajo con dos pulsos cortos frente al torso.", type: "Verbo" },
  "querer": { emoji: "🤲", movement: "Ambas manos se acercan al pecho como atrayendo algo.", type: "Verbo" },
  "poder": { emoji: "💪", movement: "Ambas manos bajan con fuerza desde los hombros como indicando capacidad.", type: "Verbo" },
  "agua": { emoji: "💧", movement: "Forma una W cerca de la boca y toca la barbilla suavemente.", type: "Sustantivo" },
  "comida": { emoji: "🍽️", movement: "Mano en forma de pinza lleva comida imaginaria a la boca.", type: "Sustantivo" },
  "casa": { emoji: "🏠", movement: "Une las puntas de los dedos formando un techo frente a ti.", type: "Lugar" },
  "escuela": { emoji: "🎒", movement: "Palmas se juntan dos veces como aplaudiendo de forma suave.", type: "Lugar" },
  "hospital": { emoji: "🏥", movement: "Dibuja una cruz pequeña en el brazo con dos dedos.", type: "Lugar" },
  "doctor": { emoji: "🩺", movement: "Toca la muñeca como si tomaras el pulso.", type: "Persona" },
  "enfermería": { emoji: "⚕️", movement: "Marca atención médica en el brazo y señala a la persona que cuida.", type: "Persona" },
  "familia": { emoji: "👨‍👩‍👧", movement: "Manos en F trazan un círculo hacia afuera para representar grupo familiar.", type: "Persona" },
  "amigo": { emoji: "🤝", movement: "Engancha índices de ambas manos y alterna la posición.", type: "Persona" },
  "mamá": { emoji: "👩", movement: "Pulgar de mano abierta toca suavemente la barbilla.", type: "Persona" },
  "papá": { emoji: "👨", movement: "Pulgar de mano abierta toca suavemente la frente.", type: "Persona" },
  "hermano": { emoji: "🧑‍🤝‍🧑", movement: "Manos con índices extendidos se juntan para indicar relación cercana.", type: "Persona" },
  "trabajo": { emoji: "💼", movement: "Puños cerrados se golpean suavemente uno sobre otro.", type: "Actividad" },
  "baño": { emoji: "🚻", movement: "Mano con letra T se mueve de lado a lado.", type: "Lugar" },
  "dónde": { emoji: "❓", movement: "Índice levantado oscila de lado a lado con expresión interrogativa.", type: "Pregunta" },
  "qué": { emoji: "❔", movement: "Manos abiertas al frente se mueven levemente con cejas de pregunta.", type: "Pregunta" },
  "cuándo": { emoji: "🕒", movement: "Señala la muñeca o marca tiempo y termina con expresión interrogativa.", type: "Pregunta" },
  "quién": { emoji: "🧑", movement: "Índice apunta al espacio y acompaña con expresión interrogativa.", type: "Pregunta" },
  "por qué": { emoji: "🤷", movement: "Mano cerca de la frente baja hacia afuera con expresión de pregunta.", type: "Pregunta" },
  "bien": { emoji: "👍", movement: "Pulgar arriba con un movimiento corto hacia adelante.", type: "Estado" },
  "mal": { emoji: "👎", movement: "Pulgar abajo con expresión facial negativa.", type: "Estado" },
  "feliz": { emoji: "😊", movement: "Manos abiertas suben sobre el pecho con expresión alegre.", type: "Emoción" },
  "triste": { emoji: "😢", movement: "Dedos bajan frente al rostro acompañados de expresión triste.", type: "Emoción" },
  "enojado": { emoji: "😠", movement: "Manos tensas se alejan del pecho con expresión de enojo.", type: "Emoción" },
  "miedo": { emoji: "😨", movement: "Manos abiertas tiemblan ligeramente frente al pecho.", type: "Emoción" },
  "día": { emoji: "☀️", movement: "Brazo dominante se arquea sobre el otro como el recorrido del sol.", type: "Tiempo" },
  "hoy": { emoji: "📍", movement: "Ambas manos apuntan hacia abajo dos veces para indicar este día.", type: "Tiempo" },
  "mañana": { emoji: "🌄", movement: "Mano se mueve hacia adelante desde la mejilla como algo que viene después.", type: "Tiempo" },
  "ayer": { emoji: "↩️", movement: "Pulgar se mueve hacia atrás por encima del hombro.", type: "Tiempo" },
  "tarde": { emoji: "🌇", movement: "Mano marca el sol bajando hacia el horizonte.", type: "Tiempo" },
  "noche": { emoji: "🌙", movement: "Una mano cubre la otra como si llegara la oscuridad.", type: "Tiempo" },
  "nombre": { emoji: "🏷️", movement: "Dos dedos de ambas manos se cruzan como marcando una etiqueta.", type: "Identidad" },
  "persona": { emoji: "🧍", movement: "Manos verticales bajan a los lados del cuerpo imaginario.", type: "Persona" },
  "ir": { emoji: "➡️", movement: "Índices apuntan y avanzan hacia la dirección deseada.", type: "Verbo" },
  "venir": { emoji: "⬅️", movement: "Mano llama hacia el cuerpo desde el espacio frente a ti.", type: "Verbo" },
  "ver": { emoji: "👀", movement: "Dos dedos salen desde los ojos hacia el punto observado.", type: "Verbo" },
  "hablar": { emoji: "🗣️", movement: "Dedos cerca de la boca se abren hacia afuera como emitiendo palabras.", type: "Verbo" },
  "aprender": { emoji: "📘", movement: "Toma información de la palma y llévala a la frente.", type: "Actividad" },
  "estudiar": { emoji: "✍️", movement: "Mano dominante se mueve sobre la otra como revisando apuntes.", type: "Actividad" },
  "importante": { emoji: "⭐", movement: "Manos forman un énfasis al frente con movimiento firme.", type: "Concepto" },
  "urgente": { emoji: "🚨", movement: "Movimiento rápido y repetido hacia adelante con expresión intensa.", type: "Concepto" },
  "emergencia": { emoji: "🆘", movement: "Manos hacen movimiento rápido de alerta frente al torso.", type: "Concepto" },
  "policía": { emoji: "👮", movement: "Mano toca el pecho como señalando una placa.", type: "Persona" },
  "dinero": { emoji: "💵", movement: "Dedos se frotan o golpean la palma para indicar dinero.", type: "Sustantivo" },
  "tienda": { emoji: "🏪", movement: "Manos dibujan un espacio de comercio frente al cuerpo.", type: "Lugar" },
  "calle": { emoji: "🛣️", movement: "Manos paralelas avanzan hacia el frente como un camino.", type: "Lugar" },
  "autobús": { emoji: "🚌", movement: "Manos sujetan un volante grande o marcan vehículo largo.", type: "Transporte" },
  "taxi": { emoji: "🚕", movement: "Mano dibuja un letrero sobre el techo de un auto imaginario.", type: "Transporte" },
  "teléfono": { emoji: "📱", movement: "Mano cerca de la oreja como teléfono o pantalla frente al cuerpo.", type: "Objeto" },
  "número": { emoji: "#️⃣", movement: "Dedos marcan conteo frente al torso.", type: "Concepto" },
  "caliente": { emoji: "🔥", movement: "Mano se aleja rápido de la boca como aire caliente.", type: "Adjetivo" },
  "frío": { emoji: "🥶", movement: "Puños tiemblan cerca del cuerpo como si hiciera frío.", type: "Adjetivo" },
  "grande": { emoji: "↔️", movement: "Manos se separan para mostrar tamaño amplio.", type: "Adjetivo" },
  "pequeño": { emoji: "🤏", movement: "Dedos se acercan para mostrar tamaño pequeño.", type: "Adjetivo" },
};

const stopWords = new Set([
  "a", "al", "and", "con", "de", "del", "el", "en", "for", "i", "la", "las", "los", "me", "mi", "my", "of", "para", "the", "to", "tu", "un", "una", "y", "yo"
]);

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zñ\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

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

  const normalized = ` ${normalizeText(text)} `;
  const hints = {
    en: [" hello ", " hi ", " thanks ", " please ", " need ", " where ", " water ", " school ", " help ", " good morning ", " how are you "],
    es: [" hola ", " gracias ", " por favor ", " necesito ", " donde ", " agua ", " ayuda ", " buenos dias ", " como estas "],
  };

  const scores = Object.entries(hints).map(([language, words]) => [
    language,
    words.filter((word) => normalized.includes(word)).length,
  ]);
  scores.sort((a, b) => b[1] - a[1]);
  return scores[0][1] > 0 ? scores[0][0] : "auto";
}

function textToSigns(text) {
  const normalizedText = normalizeText(text);
  const sequence = [];
  const consumedWords = new Set();

  phraseTranslations.forEach(({ patterns, sign }) => {
    patterns.forEach((pattern) => {
      const normalizedPattern = normalizeText(pattern);
      const phraseExpression = new RegExp(`(^|\\s)${normalizedPattern.replace(/\\s+/g, "\\s+")}($|\\s)`);

      if (phraseExpression.test(normalizedText) && signs[sign] && !sequence.some((item) => item.name === sign)) {
        sequence.push({ name: sign, ...signs[sign], source: normalizedPattern });
        normalizedPattern.split(" ").forEach((word) => consumedWords.add(word));
      }
    });
  });

  const words = normalizedText.split(/\s+/).map(normalizeWord).filter(Boolean);

  words.forEach((word) => {
    if (consumedWords.has(word) || stopWords.has(word)) {
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
