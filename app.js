// ============================================================
//  app.js  –  Main application logic for 5LetterWords
// ============================================================

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  initFloatingLetters();
  initCounterAnimation();
  initFinderTool();
  initAlphaGrid();
  initCommonWords();
  initScrabbleSection();
  initLengthCards();
  initWordOfDay();
  initSeoAccordion();
  initQuickRef();
  initFAQ();
  initRevealObserver();
  initToast();
});


/* ============================================================
   FLOATING LETTERS (Hero background)
   ============================================================ */
function initFloatingLetters() {
  const container = document.getElementById('floatingLetters');
  if (!container) return;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const count = 18;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'float-letter';
    el.textContent = letters[Math.floor(Math.random() * letters.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.top = Math.random() * 100 + '%';
    el.style.fontSize = (2 + Math.random() * 4) + 'rem';
    el.style.animationDuration = (7 + Math.random() * 8) + 's';
    el.style.animationDelay = -(Math.random() * 10) + 's';
    container.appendChild(el);
  }
}


/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, step);
}


/* ============================================================
   WORD FINDER TOOL
   ============================================================ */
let currentResults = [];

function initFinderTool() {
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
      clearResults();
    });
  });

  // Basic search
  document.getElementById('searchBtn').addEventListener('click', doBasicSearch);
  document.getElementById('resetBtn').addEventListener('click', resetBasicSearch);
  ['startsWith','endsWith','contains','excludes'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => {
      if (e.key === 'Enter') doBasicSearch();
    });
  });

  // Pattern search
  initPatternBoxes();
  document.getElementById('patternSearchBtn').addEventListener('click', doPatternSearch);
  document.getElementById('patternResetBtn').addEventListener('click', resetPattern);

  // Wordle helper
  initWordleHelper();
  document.getElementById('wordleSearchBtn').addEventListener('click', doWordleSearch);
  document.getElementById('wordleResetBtn').addEventListener('click', initWordleHelper);

  // Sort
  document.getElementById('sortSelect').addEventListener('change', () => {
    if (currentResults.length) renderResults(currentResults);
  });
}

/* ---- Basic Search ---- */
function doBasicSearch() {
  const starts   = document.getElementById('startsWith').value.trim().toUpperCase();
  const ends     = document.getElementById('endsWith').value.trim().toUpperCase();
  const contains = document.getElementById('contains').value.trim().toUpperCase();
  const excludes = document.getElementById('excludes').value.trim().toUpperCase();

  let results = WORDS_5_UNIQUE.filter(word => {
    if (starts   && !word.startsWith(starts))                        return false;
    if (ends     && !word.endsWith(ends))                            return false;
    if (contains && ![...contains].every(l => word.includes(l)))     return false;
    if (excludes && [...excludes].some(l => word.includes(l)))       return false;
    return true;
  });

  currentResults = results;
  renderResults(results);
  showToast(`Found ${results.length} words`);
}

function resetBasicSearch() {
  ['startsWith','endsWith','contains','excludes'].forEach(id => {
    document.getElementById(id).value = '';
  });
  clearResults();
}

/* ---- Pattern Search ---- */
function initPatternBoxes() {
  const boxes = document.querySelectorAll('.pattern-box');
  boxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      box.value = box.value.replace(/[^a-zA-Z?]/g, '').slice(0, 1).toUpperCase();
      if (box.value && i < boxes.length - 1) boxes[i + 1].focus();
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && i > 0) boxes[i - 1].focus();
      if (e.key === 'Enter') doPatternSearch();
    });
  });
}

function doPatternSearch() {
  const boxes = document.querySelectorAll('.pattern-box');
  const pattern = [...boxes].map(b => b.value || '?').join('');

  const results = WORDS_5_UNIQUE.filter(word => {
    return [...pattern].every((ch, i) => ch === '?' || word[i] === ch);
  });

  currentResults = results;
  renderResults(results);
  showToast(`Found ${results.length} words matching "${pattern}"`);
}

function resetPattern() {
  document.querySelectorAll('.pattern-box').forEach(b => b.value = '');
  clearResults();
}

/* ---- Wordle Helper ---- */
function initWordleHelper() {
  const container = document.getElementById('wordleRows');
  container.innerHTML = '';
  for (let row = 0; row < 6; row++) {
    const rowEl = document.createElement('div');
    rowEl.className = 'wordle-row';
    for (let col = 0; col < 5; col++) {
      const cell = document.createElement('div');
      cell.className = 'wordle-cell';
      cell.dataset.state = 'empty';
      const inp = document.createElement('input');
      inp.type = 'text';
      inp.maxLength = 1;
      inp.dataset.row = row;
      inp.dataset.col = col;

      inp.addEventListener('input', () => {
        inp.value = inp.value.replace(/[^a-zA-Z]/g,'').slice(0,1).toUpperCase();
        if (inp.value) {
          cell.dataset.state = 'gray';
          cell.className = 'wordle-cell state-gray';
          // Move focus
          const nextInp = document.querySelector(`.wordle-cell input[data-row="${row}"][data-col="${col+1}"]`);
          if (nextInp) nextInp.focus();
        } else {
          cell.dataset.state = 'empty';
          cell.className = 'wordle-cell';
        }
      });

      inp.addEventListener('keydown', e => {
        if (e.key === 'Backspace' && !inp.value) {
          const prev = document.querySelector(`.wordle-cell input[data-row="${row}"][data-col="${col-1}"]`);
          if (prev) { prev.value = ''; prev.closest('.wordle-cell').dataset.state = 'empty'; prev.closest('.wordle-cell').className = 'wordle-cell'; prev.focus(); }
        }
        if (e.key === 'Enter') doWordleSearch();
      });

      // Click cell to cycle state
      cell.addEventListener('click', (e) => {
        if (!inp.value) return;
        const states = ['gray','yellow','green'];
        const classes = ['state-gray','state-yellow','state-green'];
        const cur = states.indexOf(cell.dataset.state);
        const next = (cur + 1) % states.length;
        cell.dataset.state = states[next];
        cell.className = 'wordle-cell ' + classes[next];
      });

      cell.appendChild(inp);
      rowEl.appendChild(cell);
    }
    container.appendChild(rowEl);
  }
}

function doWordleSearch() {
  const greens  = {};   // pos → letter
  const yellows = {};   // letter → [positions where it's NOT]
  const grays   = new Set();

  document.querySelectorAll('.wordle-row').forEach(row => {
    const cells = row.querySelectorAll('.wordle-cell');
    const rowLetters = [...cells].map(c => c.querySelector('input').value);
    if (rowLetters.every(l => !l)) return;

    cells.forEach((cell, i) => {
      const letter = cell.querySelector('input').value;
      if (!letter) return;
      const state = cell.dataset.state;
      if (state === 'green') {
        greens[i] = letter;
      } else if (state === 'yellow') {
        if (!yellows[letter]) yellows[letter] = [];
        yellows[letter].push(i);
      } else {
        grays.add(letter);
      }
    });
  });

  const results = WORDS_5_UNIQUE.filter(word => {
    // Check greens
    for (const [pos, letter] of Object.entries(greens)) {
      if (word[pos] !== letter) return false;
    }
    // Check yellows (letter must exist but not at those positions)
    for (const [letter, positions] of Object.entries(yellows)) {
      if (!word.includes(letter)) return false;
      if (positions.some(p => word[p] === letter)) return false;
    }
    // Check grays (letter must not appear unless it's a green/yellow)
    for (const letter of grays) {
      if (greens[Object.keys(greens).find(k => greens[k] === letter)] === letter) continue;
      if (word.includes(letter) && !Object.keys(yellows).includes(letter)) return false;
    }
    return true;
  });

  currentResults = results;
  renderResults(results);
  showToast(`Found ${results.length} possible Wordle solutions`);
}

/* ---- Sort & Render Results ---- */
function renderResults(words) {
  const sort = document.getElementById('sortSelect').value;

  let sorted = [...words];
  if (sort === 'alpha')       sorted.sort();
  else if (sort === 'alpha-desc') sorted.sort().reverse();
  else if (sort === 'scrabble') sorted.sort((a,b) => getScrabbleScore(b) - getScrabbleScore(a));
  else if (sort === 'vowels')   sorted.sort((a,b) => countVowels(b) - countVowels(a));

  const container = document.getElementById('resultsContainer');
  const controls  = document.getElementById('resultsControls');
  const info      = document.getElementById('resultsInfo');

  controls.style.display = 'flex';
  info.innerHTML = `Showing <span>${sorted.length}</span> word${sorted.length !== 1 ? 's' : ''}`;

  if (sorted.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <p><strong>No words found</strong></p>
        <p style="margin-top:8px;color:var(--text-light);font-size:.9rem">Try adjusting your search filters.</p>
      </div>`;
    return;
  }

  const display = sorted.slice(0, 300); // max 300 shown
  const grid = document.createElement('div');
  grid.className = 'words-grid';

  display.forEach(word => {
    const chip = document.createElement('div');
    chip.className = 'word-chip';
    chip.setAttribute('tabindex', '0');
    chip.setAttribute('role', 'button');
    chip.setAttribute('aria-label', `Word: ${word}`);
    const score = getScrabbleScore(word);
    chip.innerHTML = `${word}<span class="score">${score} pts</span>`;
    chip.addEventListener('click', () => {
      navigator.clipboard?.writeText(word.toLowerCase());
      showToast(`"${word.toLowerCase()}" copied!`);
    });
    chip.addEventListener('keydown', e => { if (e.key === 'Enter') chip.click(); });
    grid.appendChild(chip);
  });

  container.innerHTML = '';
  if (sorted.length > 300) {
    const note = document.createElement('p');
    note.style.cssText = 'color:var(--text-light);font-size:.85rem;margin-bottom:16px;text-align:center';
    note.textContent = `Showing top 300 of ${sorted.length} results. Use more filters to narrow down.`;
    container.appendChild(note);
  }
  container.appendChild(grid);
  animateGrid(grid);
}

function animateGrid(grid) {
  const chips = grid.querySelectorAll('.word-chip');
  chips.forEach((chip, i) => {
    chip.style.opacity = '0';
    chip.style.transform = 'scale(0.85)';
    chip.style.transition = `all .2s ease ${Math.min(i * 10, 300)}ms`;
    requestAnimationFrame(() => {
      chip.style.opacity = '1';
      chip.style.transform = 'scale(1)';
    });
  });
}

function clearResults() {
  currentResults = [];
  document.getElementById('resultsContainer').innerHTML = `
    <div class="results-placeholder">
      <div class="placeholder-icon">📝</div>
      <p>Your word results will appear here.</p>
      <p class="placeholder-sub">Try searching with the filters above!</p>
    </div>`;
  document.getElementById('resultsControls').style.display = 'none';
}


/* ============================================================
   ALPHA GRID
   ============================================================ */
function initAlphaGrid() {
  const grid = document.getElementById('alphaGrid');
  if (!grid) return;

  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'alpha-btn';
    btn.textContent = letter;
    btn.dataset.letter = letter;
    btn.setAttribute('aria-label', `Words starting with ${letter}`);
    btn.addEventListener('click', () => {
      document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showLetterWords(letter);
    });
    grid.appendChild(btn);
  });

  // Show A by default
  setTimeout(() => grid.querySelector('.alpha-btn')?.click(), 300);
}

function showLetterWords(letter) {
  const words = WORDS_5_UNIQUE.filter(w => w.startsWith(letter));
  const display = document.getElementById('letterWordsDisplay');
  if (!display) return;

  display.innerHTML = `
    <div class="letter-display-header">
      <div class="letter-display-badge">${letter}</div>
      <div class="letter-display-info">
        <h3>5 Letter Words Starting with ${letter}</h3>
        <p>${words.length} word${words.length !== 1 ? 's' : ''} found</p>
      </div>
    </div>
    <div class="words-grid" id="letterGrid"></div>
  `;

  const grid = document.getElementById('letterGrid');
  words.forEach(word => {
    const chip = document.createElement('div');
    chip.className = 'word-chip';
    chip.setAttribute('tabindex', '0');
    chip.setAttribute('role', 'button');
    chip.innerHTML = `${word}<span class="score">${getScrabbleScore(word)} pts</span>`;
    chip.addEventListener('click', () => {
      navigator.clipboard?.writeText(word.toLowerCase());
      showToast(`"${word.toLowerCase()}" copied!`);
    });
    chip.addEventListener('keydown', e => { if (e.key === 'Enter') chip.click(); });
    grid.appendChild(chip);
  });
  animateGrid(grid);
}


/* ============================================================
   COMMON WORDS SECTION
   ============================================================ */
const WORD_CATEGORIES = {
  common: ["ABOUT","ABOVE","AFTER","AGAIN","BELOW","BRING","CARRY","COULD","DAILY","DOING","DRIVE","EARLY","EARTH","EIGHT","ENTER","EVERY","FIRST","FOUND","GIVES","GOING","GREAT","GROUP","HANDS","HAPPY","HEARD","HEART","HOUSE","HUMAN","IDEAS","KEEPS","LARGE","LAUGH","LEARN","LIGHT","LIVES","LOVES","LOWER","MAYBE","MIGHT","MONEY","MONTH","MUSIC","NIGHT","NORTH","NOTED","OFTEN","OTHER","PARTS","PLACE","POINT","POWER","PRESS","PRICE","QUICK","QUITE","RAISE","REACH","RIGHT","RIVER","ROUND","SAID","SCALE","SINCE","SMALL","SMILE","SOUTH","SPACE","SPEAK","SPEND","STAND","START","STAYS","STILL","STORY","STUDY","TABLE","TEACH","TERMS","THERE","THEIR","THINK","THREE","TIMES","TITLE","TODAY","TOTAL","TRADE","TRIED","TRUCK","TRULY","UNDER","UNION","UNTIL","UPPER","USING","VALUE","VIDEO","VISIT","VOICE","WATCH","WATER","WHERE","WHICH","WHILE","WHITE","WHOLE","WHOSE","WORLD","WOULD","WRITE","YOUNG","YOUTH"],
  vowels: ["AUDIO","ADIEU","LOUIE","QUEUE","AERIE","URAEI","OAKEN","OCEAN","OZONE","OLIVE","ALIKE","ALIVE","ALONE","AISLE","NAIVE","ADORE","ABOVE","OPTIC","ONION","OKAPI","OWLET","AIOLI","AURAE","UVEAL","ELIDE","OPINE","EERIE","UNTIE","OURIE","LIEGE"],
  scrabble: WORDS_5_UNIQUE.sort((a,b) => getScrabbleScore(b) - getScrabbleScore(a)).slice(0, 40),
  wordle: ["CRANE","SLATE","RAISE","CRATE","TRACE","STARE","SNARE","PARSE","AROSE","IRATE","EARNS","LARES","CARES","SANER","LEAST","TEARS","TRAIL","TRAIN","STEAM","STEAD","STALE","TALES","LEANS","ALERT","ALTER","ARLES","LEARN","RENAL","REALS","LINER","OATER","OATER","LATER","RATEL","ALERT","TALER","ELAST","LEAST","SNARE","STANE","ANTES","STOAE","TOEAS","ETNAS","NEATS","SENTI","TRIES","TIRES","RESIT","TIERS"]
};

function initCommonWords() {
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderWordChips(btn.dataset.cat);
    });
  });
  renderWordChips('common');
}

function renderWordChips(cat) {
  const container = document.getElementById('wordChips');
  const words = WORD_CATEGORIES[cat] || [];
  container.innerHTML = '';

  words.slice(0, 60).forEach(word => {
    const chip = document.createElement('div');
    chip.className = 'word-chip';
    chip.setAttribute('tabindex', '0');
    chip.setAttribute('role', 'button');
    const score = getScrabbleScore(word);
    chip.innerHTML = `${word}<span class="score">${score} pts</span>`;
    chip.addEventListener('click', () => {
      navigator.clipboard?.writeText(word.toLowerCase());
      showToast(`"${word.toLowerCase()}" copied!`);
    });
    chip.addEventListener('keydown', e => { if (e.key === 'Enter') chip.click(); });
    container.appendChild(chip);
  });

  animateGrid(container);
}


/* ============================================================
   SCRABBLE SECTION
   ============================================================ */
const SAMPLE_SCRABBLE_WORD = "JAZZY";

function initScrabbleSection() {
  renderScrabbleTiles(SAMPLE_SCRABBLE_WORD);

  const slider = document.getElementById('minScore');
  const val    = document.getElementById('minScoreVal');
  slider.addEventListener('input', () => { val.textContent = slider.value + '+'; });

  document.getElementById('scrabbleSearchBtn').addEventListener('click', doScrabbleSearch);
  doScrabbleSearch();
}

function renderScrabbleTiles(word) {
  const board = document.getElementById('scrabbleBoard');
  if (!board) return;
  board.innerHTML = '';
  word.split('').forEach((letter, i) => {
    const tile = document.createElement('div');
    tile.className = 'scrabble-tile';
    tile.style.animationDelay = (i * 0.1) + 's';
    tile.innerHTML = `
      <div class="scrabble-tile-letter">${letter}</div>
      <div class="scrabble-tile-pts">${SCRABBLE_VALUES[letter] || 0}</div>
    `;
    board.appendChild(tile);
  });
  // Show score
  const score = getScrabbleScore(word);
  const existing = document.getElementById('scrabbleTileScore');
  if (!existing) {
    const scoreEl = document.createElement('div');
    scoreEl.id = 'scrabbleTileScore';
    scoreEl.style.cssText = 'grid-column:1/-1;text-align:center;font-family:var(--font-display);font-size:1.2rem;color:var(--accent);margin-top:8px';
    scoreEl.textContent = `${word} = ${score} points`;
    board.appendChild(scoreEl);
  } else {
    existing.textContent = `${word} = ${score} points`;
  }
}

function doScrabbleSearch() {
  const minScore = parseInt(document.getElementById('minScore').value);
  const results = WORDS_5_UNIQUE
    .filter(w => getScrabbleScore(w) >= minScore)
    .sort((a,b) => getScrabbleScore(b) - getScrabbleScore(a))
    .slice(0, 80);

  const container = document.getElementById('scrabbleResults');
  container.innerHTML = `<h3 style="margin-bottom:16px;font-size:1rem;color:var(--text-light)">${results.length} words scoring ${minScore}+ points:</h3>`;
  const grid = document.createElement('div');
  grid.className = 'words-grid';
  results.forEach(word => {
    const chip = document.createElement('div');
    chip.className = 'word-chip';
    chip.setAttribute('tabindex', '0');
    const score = getScrabbleScore(word);
    chip.innerHTML = `${word}<span class="score">${score} pts</span>`;
    chip.addEventListener('click', () => {
      renderScrabbleTiles(word);
      navigator.clipboard?.writeText(word.toLowerCase());
      showToast(`"${word.toLowerCase()}" — ${score} Scrabble points`);
    });
    chip.addEventListener('keydown', e => { if (e.key === 'Enter') chip.click(); });
    grid.appendChild(chip);
  });
  container.appendChild(grid);
  animateGrid(grid);
}


/* ============================================================
   LENGTH CARDS
   ============================================================ */
function initLengthCards() {
  const container = document.getElementById('lengthCards');
  if (!container) return;

  WORDS_BY_LENGTH.forEach(item => {
    const card = document.createElement('div');
    card.className = 'length-card reveal' + (item.featured ? ' featured' : '');
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${item.len} letter words`);
    card.innerHTML = `
      <div class="length-num">${item.len}</div>
      <div class="length-label">${item.len}-Letter Words</div>
      <div class="length-count">~${item.count.toLocaleString()} words</div>
      ${item.featured ? '<div class="length-badge">⭐ Most Popular</div>' : ''}
    `;
    card.addEventListener('click', () => {
      if (item.len === 5) {
        document.getElementById('finder').scrollIntoView({ behavior: 'smooth' });
        showToast('Use the Word Finder above to explore 5-letter words!');
      } else {
        showToast(`${item.len}-letter words: ${item.examples.slice(0,3).join(', ')}...`);
      }
    });
    card.addEventListener('keydown', e => { if (e.key === 'Enter') card.click(); });
    container.appendChild(card);
  });
}


/* ============================================================
   WORD OF THE DAY
   ============================================================ */
let wotdIndex = 0;

function initWordOfDay() {
  // Pick word based on day of year for consistency
  const now  = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - start) / 86400000);
  wotdIndex = dayOfYear % WORD_OF_DAY_LIST.length;
  renderWordOfDay();

  document.getElementById('nextWordBtn').addEventListener('click', () => {
    wotdIndex = (wotdIndex + 1) % WORD_OF_DAY_LIST.length;
    renderWordOfDay();
  });
}

function renderWordOfDay() {
  const entry = WORD_OF_DAY_LIST[wotdIndex];
  const el = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
  el('wotdWord',     entry.word);
  el('wotdPhonetic', entry.phonetic);
  el('wotdPos',      entry.pos);
  el('wotdDef',      entry.def);
  el('wotdExample',  '"' + entry.example + '"');

  // Render tiles
  const tilesEl = document.getElementById('wotdTiles');
  if (tilesEl) {
    tilesEl.innerHTML = entry.word.split('').map(l =>
      `<div class="wotd-tile">${l}</div>`
    ).join('');
  }
}


/* ============================================================
   SEO ACCORDION
   ============================================================ */
function initSeoAccordion() {
  const container = document.getElementById('seoAccordion');
  if (!container) return;

  SEO_ACCORDION.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'accordion-item reveal';
    el.innerHTML = `
      <div class="accordion-header" role="button" tabindex="0" aria-expanded="false" aria-controls="acc-body-${i}">
        <h3>${item.title}</h3>
        <span class="accordion-icon" aria-hidden="true">+</span>
      </div>
      <div class="accordion-body" id="acc-body-${i}" role="region">
        ${item.content}
      </div>
    `;
    const header = el.querySelector('.accordion-header');
    header.addEventListener('click', () => toggleAccordion(el, header));
    header.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleAccordion(el, header); } });
    container.appendChild(el);
  });

  // Open first item by default
  setTimeout(() => {
    const first = container.querySelector('.accordion-item');
    if (first) toggleAccordion(first, first.querySelector('.accordion-header'));
  }, 400);
}

function toggleAccordion(item, header) {
  const isOpen = item.classList.toggle('open');
  header.setAttribute('aria-expanded', isOpen);
}


/* ============================================================
   QUICK REFERENCE
   ============================================================ */
function initQuickRef() {
  const container = document.getElementById('quickRefGrid');
  if (!container) return;

  QUICK_REF.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'quick-ref-card reveal';
    const words = cat.words.map(w =>
      `<span class="quick-word" tabindex="0" role="button" title="Copy ${w}">${w}</span>`
    ).join('');
    card.innerHTML = `<h3>${cat.title}</h3><div class="quick-ref-words">${words}</div>`;
    card.querySelectorAll('.quick-word').forEach(el => {
      el.addEventListener('click', () => {
        navigator.clipboard?.writeText(el.textContent.toLowerCase());
        showToast(`"${el.textContent.toLowerCase()}" copied!`);
      });
      el.addEventListener('keydown', e => { if (e.key === 'Enter') el.click(); });
    });
    container.appendChild(card);
  });
}


/* ============================================================
   FAQ
   ============================================================ */
function initFAQ() {
  const container = document.getElementById('faqList');
  if (!container) return;

  // Schema markup for FAQ
  const schemaItems = FAQ_DATA.map((item, i) => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": { "@type": "Answer", "text": item.a }
  }));
  const faqSchema = document.createElement('script');
  faqSchema.type = 'application/ld+json';
  faqSchema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": schemaItems
  });
  document.head.appendChild(faqSchema);

  FAQ_DATA.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'faq-item reveal';
    el.innerHTML = `
      <div class="faq-q" role="button" tabindex="0" aria-expanded="false" aria-controls="faq-a-${i}">
        <span>${item.q}</span>
        <span class="faq-icon" aria-hidden="true">+</span>
      </div>
      <div class="faq-a" id="faq-a-${i}" role="region">${item.a}</div>
    `;
    const q = el.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const isOpen = el.classList.toggle('open');
      q.setAttribute('aria-expanded', isOpen);
    });
    q.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); q.click(); }
    });
    container.appendChild(el);
  });
}


/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Observe existing reveals
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Also observe dynamically added reveals
  const mutObs = new MutationObserver(mutations => {
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          if (node.classList?.contains('reveal')) observer.observe(node);
          node.querySelectorAll?.('.reveal').forEach(el => observer.observe(el));
        }
      });
    });
  });
  mutObs.observe(document.body, { childList: true, subtree: true });
}


/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */
let toastTimer = null;

function initToast() {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.id = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}


/* ============================================================
   SMOOTH SCROLL ANCHOR LINKS
   ============================================================ */
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const target = document.querySelector(anchor.getAttribute('href'));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
