/**
 * app.js - Complete functionality for 5 Letter Words Web Application
 * Handles word finder, word lists, Scrabble, Wordle helper, and all interactive components
 */

// ============================================
// GLOBAL STATE
// ============================================
let currentWords = [];
let currentResults = [];
let currentCategory = 'common';
let wordleGuesses = []; // Array of { letters: string[], states: string[] }
let wordOfTheDayIndex = 0;
let scrabbleMinScore = 5;

// DOM Elements cache
let elements = {};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  cacheElements();
  initEventListeners();
  initWordLists();
  initByLengthCards();
  initAlphaGrid();
  initWordleHelper();
  initWordOfTheDay();
  initCommonWords();
  initScrabbleBoard();
  initSEOAccordion();
  initQuickReference();
  initFAQ();
  initFloatingLetters();
  initAnimatedStats();
  initScrollReveal();
  updateResultsPlaceholder();
});

// Cache DOM elements for performance
function cacheElements() {
  elements = {
    startsWith: document.getElementById('startsWith'),
    endsWith: document.getElementById('endsWith'),
    contains: document.getElementById('contains'),
    excludes: document.getElementById('excludes'),
    searchBtn: document.getElementById('searchBtn'),
    resetBtn: document.getElementById('resetBtn'),
    patternSearchBtn: document.getElementById('patternSearchBtn'),
    patternResetBtn: document.getElementById('patternResetBtn'),
    wordleSearchBtn: document.getElementById('wordleSearchBtn'),
    wordleResetBtn: document.getElementById('wordleResetBtn'),
    resultsContainer: document.getElementById('resultsContainer'),
    resultsControls: document.getElementById('resultsControls'),
    resultsInfo: document.getElementById('resultsInfo'),
    sortSelect: document.getElementById('sortSelect'),
    patternBoxes: document.getElementById('patternBoxes'),
    wordleRows: document.getElementById('wordleRows'),
    alphaGrid: document.getElementById('alphaGrid'),
    letterWordsDisplay: document.getElementById('letterWordsDisplay'),
    wordChips: document.getElementById('wordChips'),
    scrabbleBoard: document.getElementById('scrabbleBoard'),
    scrabbleResults: document.getElementById('scrabbleResults'),
    minScore: document.getElementById('minScore'),
    minScoreVal: document.getElementById('minScoreVal'),
    scrabbleSearchBtn: document.getElementById('scrabbleSearchBtn'),
    lengthCards: document.getElementById('lengthCards'),
    nextWordBtn: document.getElementById('nextWordBtn'),
    wotdWord: document.getElementById('wotdWord'),
    wotdPhonetic: document.getElementById('wotdPhonetic'),
    wotdPos: document.getElementById('wotdPos'),
    wotdDef: document.getElementById('wotdDef'),
    wotdExample: document.getElementById('wotdExample'),
    wotdTiles: document.getElementById('wotdTiles'),
    seoAccordion: document.getElementById('seoAccordion'),
    quickRefGrid: document.getElementById('quickRefGrid'),
    faqList: document.getElementById('faqList'),
    catBtns: document.querySelectorAll('.cat-btn')
  };
}

// ============================================
// EVENT LISTENERS
// ============================================
function initEventListeners() {
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Search buttons
  elements.searchBtn?.addEventListener('click', performBasicSearch);
  elements.resetBtn?.addEventListener('click', resetBasicSearch);
  elements.patternSearchBtn?.addEventListener('click', performPatternSearch);
  elements.patternResetBtn?.addEventListener('click', resetPatternSearch);
  elements.wordleSearchBtn?.addEventListener('click', performWordleSearch);
  elements.wordleResetBtn?.addEventListener('click', resetWordleHelper);
  elements.sortSelect?.addEventListener('change', () => displayResults(currentResults));
  elements.scrabbleSearchBtn?.addEventListener('click', performScrabbleSearch);
  elements.minScore?.addEventListener('input', (e) => {
    scrabbleMinScore = parseInt(e.target.value);
    if (elements.minScoreVal) elements.minScoreVal.innerText = scrabbleMinScore + '+';
  });
  elements.nextWordBtn?.addEventListener('click', () => nextWordOfTheDay());

  // Category buttons for common words
  elements.catBtns?.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.cat;
      displayCommonWords(currentCategory);
    });
  });

  // Pattern boxes auto-focus and input handling
  if (elements.patternBoxes) {
    const boxes = elements.patternBoxes.querySelectorAll('.pattern-box');
    boxes.forEach((box, idx) => {
      box.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && idx < 4) {
          boxes[idx + 1].focus();
        }
      });
    });
  }
}

// ============================================
// TAB SWITCHING
// ============================================
function switchTab(tabId) {
  // Update button states
  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update content visibility
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  const activeTab = document.getElementById(`tab-${tabId}`);
  if (activeTab) activeTab.classList.add('active');
}

// ============================================
// BASIC SEARCH
// ============================================
function performBasicSearch() {
  const startsWith = elements.startsWith?.value.toLowerCase() || '';
  const endsWith = elements.endsWith?.value.toLowerCase() || '';
  const contains = elements.contains?.value.toLowerCase() || '';
  const excludes = elements.excludes?.value.toLowerCase() || '';

  let results = [...window.words5 || []];

  if (startsWith) {
    results = results.filter(w => w.startsWith(startsWith));
  }
  if (endsWith) {
    results = results.filter(w => w.endsWith(endsWith));
  }
  if (contains) {
    const containsLetters = contains.split('');
    results = results.filter(w => containsLetters.every(letter => w.includes(letter)));
  }
  if (excludes) {
    const excludeLetters = excludes.split('');
    results = results.filter(w => !excludeLetters.some(letter => w.includes(letter)));
  }

  currentResults = results;
  displayResults(results);
  if (elements.resultsControls) elements.resultsControls.style.display = 'flex';
}

function resetBasicSearch() {
  if (elements.startsWith) elements.startsWith.value = '';
  if (elements.endsWith) elements.endsWith.value = '';
  if (elements.contains) elements.contains.value = '';
  if (elements.excludes) elements.excludes.value = '';
  currentResults = [];
  displayResults([]);
  if (elements.resultsControls) elements.resultsControls.style.display = 'none';
  updateResultsPlaceholder();
}

// ============================================
// PATTERN SEARCH
// ============================================
function performPatternSearch() {
  const boxes = elements.patternBoxes?.querySelectorAll('.pattern-box');
  if (!boxes) return;
  
  let pattern = '';
  boxes.forEach(box => {
    const val = box.value.toLowerCase();
    pattern += val || '?';
  });
  
  const regexPattern = '^' + pattern.replace(/\?/g, '.') + '$';
  const regex = new RegExp(regexPattern, 'i');
  
  const results = (window.words5 || []).filter(word => regex.test(word));
  currentResults = results;
  displayResults(results);
  if (elements.resultsControls) elements.resultsControls.style.display = 'flex';
}

function resetPatternSearch() {
  const boxes = elements.patternBoxes?.querySelectorAll('.pattern-box');
  boxes?.forEach(box => { box.value = ''; });
  currentResults = [];
  displayResults([]);
  if (elements.resultsControls) elements.resultsControls.style.display = 'none';
  updateResultsPlaceholder();
}

// ============================================
// WORDLE HELPER
// ============================================
function initWordleHelper() {
  // Create 6 guess rows
  if (!elements.wordleRows) return;
  elements.wordleRows.innerHTML = '';
  wordleGuesses = [];
  
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('div');
    row.className = 'wordle-row';
    row.dataset.row = i;
    const cells = [];
    const letters = [];
    const states = [];
    
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement('div');
      cell.className = 'wordle-cell';
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 1;
      input.placeholder = '?';
      input.addEventListener('input', (e) => {
        letters[j] = e.target.value.toLowerCase();
        updateWordleGuess(i, letters, states);
      });
      cell.appendChild(input);
      cell.addEventListener('click', (e) => {
        e.stopPropagation();
        // Cycle states: '' -> green -> yellow -> gray -> ''
        const currentState = states[j] || '';
        if (currentState === '') {
          states[j] = 'green';
          cell.classList.add('state-green');
          cell.classList.remove('state-yellow', 'state-gray');
        } else if (currentState === 'green') {
          states[j] = 'yellow';
          cell.classList.add('state-yellow');
          cell.classList.remove('state-green', 'state-gray');
        } else if (currentState === 'yellow') {
          states[j] = 'gray';
          cell.classList.add('state-gray');
          cell.classList.remove('state-green', 'state-yellow');
        } else {
          states[j] = '';
          cell.classList.remove('state-green', 'state-yellow', 'state-gray');
        }
        updateWordleGuess(i, letters, states);
      });
      row.appendChild(cell);
      cells.push(cell);
      letters.push('');
      states.push('');
    }
    elements.wordleRows.appendChild(row);
    wordleGuesses.push({ letters, states, cells });
  }
}

function updateWordleGuess(rowIdx, letters, states) {
  wordleGuesses[rowIdx] = { letters: [...letters], states: [...states], cells: wordleGuesses[rowIdx].cells };
}

function performWordleSearch() {
  // Build constraints from all guesses
  let mustInclude = [];
  let exactPositions = Array(5).fill(null);
  let excludedPositions = Array(5).fill([]);
  let globalExcludes = [];
  
  for (const guess of wordleGuesses) {
    for (let i = 0; i < 5; i++) {
      const letter = guess.letters[i];
      const state = guess.states[i];
      if (!letter) continue;
      
      if (state === 'green') {
        exactPositions[i] = letter;
      } else if (state === 'yellow') {
        mustInclude.push(letter);
        excludedPositions[i] = [...(excludedPositions[i] || []), letter];
      } else if (state === 'gray') {
        globalExcludes.push(letter);
      }
    }
  }
  
  // Remove duplicates
  mustInclude = [...new Set(mustInclude)];
  globalExcludes = [...new Set(globalExcludes)];
  
  let results = [...window.words5];
  
  // Filter exact positions
  for (let i = 0; i < 5; i++) {
    if (exactPositions[i]) {
      results = results.filter(w => w[i] === exactPositions[i]);
    }
  }
  
  // Filter must include letters
  for (const letter of mustInclude) {
    results = results.filter(w => w.includes(letter));
  }
  
  // Filter excluded positions (yellow constraints)
  for (let i = 0; i < 5; i++) {
    const excluded = excludedPositions[i];
    if (excluded && excluded.length) {
      results = results.filter(w => !excluded.includes(w[i]));
    }
  }
  
  // Filter global excludes
  for (const letter of globalExcludes) {
    results = results.filter(w => !w.includes(letter));
  }
  
  currentResults = results;
  displayResults(results);
  if (elements.resultsControls) elements.resultsControls.style.display = 'flex';
}

function resetWordleHelper() {
  for (const guess of wordleGuesses) {
    for (let i = 0; i < 5; i++) {
      guess.letters[i] = '';
      guess.states[i] = '';
      const input = guess.cells[i].querySelector('input');
      if (input) input.value = '';
      guess.cells[i].classList.remove('state-green', 'state-yellow', 'state-gray');
    }
  }
  currentResults = [];
  displayResults([]);
  if (elements.resultsControls) elements.resultsControls.style.display = 'none';
  updateResultsPlaceholder();
}

// ============================================
// DISPLAY RESULTS WITH SORTING
// ============================================
function displayResults(words) {
  if (!elements.resultsContainer) return;
  
  const sortBy = elements.sortSelect?.value || 'alpha';
  let sorted = [...words];
  
  if (sortBy === 'alpha') {
    sorted.sort();
  } else if (sortBy === 'alpha-desc') {
    sorted.sort().reverse();
  } else if (sortBy === 'scrabble') {
    sorted.sort((a, b) => (getScrabbleScore(b) - getScrabbleScore(a)));
  } else if (sortBy === 'vowels') {
    sorted.sort((a, b) => countVowels(b) - countVowels(a));
  }
  
  if (sorted.length === 0) {
    elements.resultsContainer.innerHTML = `
      <div class="results-placeholder">
        <div class="placeholder-icon">🔍</div>
        <p>No words found matching your criteria.</p>
        <p class="placeholder-sub">Try different letters or reset the search.</p>
      </div>
    `;
    if (elements.resultsInfo) elements.resultsInfo.innerHTML = '0 words found';
    return;
  }
  
  const resultsHtml = `
    <div class="words-grid">
      ${sorted.map(word => `
        <div class="word-chip" data-word="${word}">
          ${word}
          <span class="score">${getScrabbleScore(word)} pts</span>
        </div>
      `).join('')}
    </div>
  `;
  
  elements.resultsContainer.innerHTML = resultsHtml;
  if (elements.resultsInfo) {
    elements.resultsInfo.innerHTML = `<span>${sorted.length}</span> words found`;
  }
  
  // Add click-to-copy functionality
  document.querySelectorAll('.word-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const word = chip.dataset.word;
      navigator.clipboard.writeText(word);
      showToast(`Copied "${word}" to clipboard!`);
    });
  });
}

function updateResultsPlaceholder() {
  if (elements.resultsContainer && (!currentResults || currentResults.length === 0)) {
    elements.resultsContainer.innerHTML = `
      <div class="results-placeholder">
        <div class="placeholder-icon">📝</div>
        <p>Your word results will appear here.</p>
        <p class="placeholder-sub">Try searching with the filters above!</p>
      </div>
    `;
  }
}

// ============================================
// WORD LISTS BY STARTING LETTER
// ============================================
function initAlphaGrid() {
  if (!elements.alphaGrid) return;
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  elements.alphaGrid.innerHTML = alphabet.map(letter => `
    <button class="alpha-btn" data-letter="${letter}">${letter}</button>
  `).join('');
  
  elements.alphaGrid.querySelectorAll('.alpha-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      elements.alphaGrid.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const letter = btn.dataset.letter.toLowerCase();
      showWordsByLetter(letter);
    });
  });
  
  // Default show 'A'
  document.querySelector('.alpha-btn')?.click();
}

function showWordsByLetter(letter) {
  const words = (window.words5 || []).filter(w => w[0] === letter);
  if (!elements.letterWordsDisplay) return;
  
  elements.letterWordsDisplay.innerHTML = `
    <div class="letter-display-header">
      <div class="letter-display-badge">${letter.toUpperCase()}</div>
      <div class="letter-display-info">
        <h3>Words starting with "${letter.toUpperCase()}"</h3>
        <p>${words.length} five-letter words found</p>
      </div>
    </div>
    <div class="words-grid">
      ${words.slice(0, 100).map(word => `
        <div class="word-chip" data-word="${word}">${word}<span class="score">${getScrabbleScore(word)} pts</span></div>
      `).join('')}
    </div>
    ${words.length > 100 ? '<p class="text-center mt-16">Showing first 100 words. Use the word finder for more.</p>' : ''}
  `;
  
  document.querySelectorAll('.word-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      navigator.clipboard.writeText(chip.dataset.word);
      showToast(`Copied "${chip.dataset.word}"!`);
    });
  });
}

// ============================================
// COMMON WORDS (CATEGORIES)
// ============================================
function initCommonWords() {
  displayCommonWords('common');
}

function displayCommonWords(category) {
  if (!elements.wordChips) return;
  let words = [];
  
  if (category === 'common') {
    words = getMostCommonWords();
  } else if (category === 'vowels') {
    words = getMostVowelWords();
  } else if (category === 'scrabble') {
    words = getTopScrabbleWords();
  } else if (category === 'wordle') {
    words = getWordleStarters();
  }
  
  elements.wordChips.innerHTML = words.map(word => `
    <div class="word-chip" data-word="${word}">
      ${word}
      <span class="score">${getScrabbleScore(word)} pts</span>
    </div>
  `).join('');
  
  document.querySelectorAll('.word-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      navigator.clipboard.writeText(chip.dataset.word);
      showToast(`Copied "${chip.dataset.word}"!`);
    });
  });
}

function getMostCommonWords() {
  const common = ['ABOUT', 'ABOVE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN', 'AGENT',
    'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIKE', 'ALIVE', 'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'ANGEL',
    'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE', 'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ASIDE', 'ASSET',
    'AVOID', 'AWARD', 'AWARE', 'BADLY', 'BAKER', 'BASIC', 'BEACH', 'BEGAN', 'BEING', 'BELOW', 'BENCH', 'BILLY',
    'BIRTH', 'BLACK', 'BLAME', 'BLIND', 'BLOCK', 'BLOOD', 'BOARD', 'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND',
    'BRAVE', 'BREAD', 'BREAK', 'BREED', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'BUYER'];
  return common;
}

function getMostVowelWords() {
  const vowelHeavy = (window.words5 || []).filter(w => countVowels(w) >= 3).sort((a,b) => countVowels(b) - countVowels(a)).slice(0, 30);
  return vowelHeavy.length ? vowelHeavy : ['AUDIO', 'OUIJA', 'URAEI', 'ADIEU', 'AERIE', 'ALOUE', 'AUREI'];
}

function getTopScrabbleWords() {
  const scored = (window.words5 || []).map(w => ({ word: w, score: getScrabbleScore(w) }));
  scored.sort((a,b) => b.score - a.score);
  return scored.slice(0, 30).map(s => s.word);
}

function getWordleStarters() {
  return ['CRANE', 'SLATE', 'CRATE', 'STARE', 'TRACE', 'SLANT', 'CRAZE', 'STALE', 'SPARE', 'SCARE', 'STORE', 'RAISE'];
}

// ============================================
// SCRABBLE SECTION
// ============================================
function initScrabbleBoard() {
  if (!elements.scrabbleBoard) return;
  const topWord = 'JAZZY';
  const tiles = topWord.split('');
  elements.scrabbleBoard.innerHTML = tiles.map(letter => `
    <div class="scrabble-tile">
      <div class="scrabble-tile-letter">${letter}</div>
      <div class="scrabble-tile-pts">${getLetterScore(letter)}</div>
    </div>
  `).join('');
}

function performScrabbleSearch() {
  const words = (window.words5 || []).filter(w => getScrabbleScore(w) >= scrabbleMinScore);
  const topWords = words.sort((a,b) => getScrabbleScore(b) - getScrabbleScore(a)).slice(0, 50);
  
  if (elements.scrabbleResults) {
    elements.scrabbleResults.innerHTML = `
      <div class="mt-24">
        <h3>Top Scoring Words (${scrabbleMinScore}+ points)</h3>
        <div class="words-grid mt-16">
          ${topWords.map(w => `<div class="word-chip" data-word="${w}">${w}<span class="score">${getScrabbleScore(w)} pts</span></div>`).join('')}
        </div>
      </div>
    `;
    
    document.querySelectorAll('#scrabbleResults .word-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        navigator.clipboard.writeText(chip.dataset.word);
        showToast(`Copied "${chip.dataset.word}"!`);
      });
    });
  }
}

// ============================================
// BY LENGTH SECTION
// ============================================
function initByLengthCards() {
  if (!elements.lengthCards) return;
  const lengths = [1,2,3,4,5,6,7,8,9];
  const wordCounts = lengths.map(len => getWordCountByLength(len));
  
  elements.lengthCards.innerHTML = lengths.map((len, idx) => `
    <div class="length-card" data-length="${len}">
      <div class="length-num">${len}</div>
      <div class="length-label">${len}-Letter Words</div>
      <div class="length-count">${wordCounts[idx]} words</div>
      ${len === 5 ? '<div class="length-badge">Featured</div>' : ''}
    </div>
  `).join('');
  
  elements.lengthCards.querySelectorAll('.length-card').forEach(card => {
    card.addEventListener('click', () => {
      const length = parseInt(card.dataset.length);
      if (length === 5) {
        document.getElementById('finder')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        showToast(`Browse ${length}-letter words in the word finder!`);
      }
    });
  });
}

function getWordCountByLength(len) {
  if (len === 5) return window.words5?.length || 8500;
  // For demo, return estimated counts
  const estimates = { 1: 26, 2: 100, 3: 1200, 4: 4500, 5: 8500, 6: 12000, 7: 15000, 8: 12000, 9: 8000 };
  return estimates[len] || 0;
}

// ============================================
// WORD OF THE DAY
// ============================================
const wordOfTheDayList = [
  { word: 'STOKE', phonetic: '/stoʊk/', pos: 'verb', def: 'To tend or fuel a fire; to stir up or excite.', example: 'The speech helped stoke enthusiasm.' },
  { word: 'FLOUR', phonetic: '/flaʊər/', pos: 'noun', def: 'A powder obtained by grinding grain, used to make bread.', example: 'She sifted the flour before baking.' },
  { word: 'BRIGHT', phonetic: '/braɪt/', pos: 'adj', def: 'Giving out or reflecting much light; intelligent.', example: 'The bright sun warmed the garden.' },
  { word: 'SHARP', phonetic: '/ʃɑrp/', pos: 'adj', def: 'Having an edge or point that cuts easily; acute.', example: 'He has a sharp mind for puzzles.' },
  { word: 'GLEAM', phonetic: '/ɡliːm/', pos: 'noun', def: 'A faint or brief light; a flash.', example: 'A gleam of hope appeared.' }
];

function initWordOfTheDay() {
  wordOfTheDayIndex = Math.floor(Math.random() * wordOfTheDayList.length);
  updateWordOfTheDayDisplay();
}

function updateWordOfTheDayDisplay() {
  const wotd = wordOfTheDayList[wordOfTheDayIndex];
  if (!wotd) return;
  if (elements.wotdWord) elements.wotdWord.innerText = wotd.word;
  if (elements.wotdPhonetic) elements.wotdPhonetic.innerText = wotd.phonetic;
  if (elements.wotdPos) elements.wotdPos.innerText = wotd.pos;
  if (elements.wotdDef) elements.wotdDef.innerText = wotd.def;
  if (elements.wotdExample) elements.wotdExample.innerText = wotd.example;
  
  if (elements.wotdTiles) {
    elements.wotdTiles.innerHTML = wotd.word.split('').map(letter => `
      <div class="wotd-tile">${letter}</div>
    `).join('');
  }
}

function nextWordOfTheDay() {
  wordOfTheDayIndex = (wordOfTheDayIndex + 1) % wordOfTheDayList.length;
  updateWordOfTheDayDisplay();
  showToast('New word of the day loaded!');
}

// ============================================
// SEO ACCORDION
// ============================================
function initSEOAccordion() {
  if (!elements.seoAccordion) return;
  const accordionData = [
    { title: 'What are 5 letter words?', content: 'Five-letter words are words that consist of exactly five letters. They are extremely common in English and form the basis of many word games like Wordle. There are over 8,500 commonly used five-letter words.' },
    { title: 'How to find 5 letter words for Wordle?', content: 'Use our Wordle Helper tab! Input your guesses and mark green (correct position), yellow (wrong position), and gray (not in word). Our tool will suggest possible words that match your constraints.' },
    { title: 'What are the highest scoring 5 letter words in Scrabble?', content: 'High-scoring words include JAZZY (32 pts), QUAFF (20 pts), and ZAPPY (21 pts). Use our Scrabble filter to find words by minimum score.' },
    { title: 'How many 5 letter words are there?', content: 'English has approximately 8,500 to 12,000 five-letter words depending on the dictionary. Our database includes over 8,500 common words.' }
  ];
  
  elements.seoAccordion.innerHTML = accordionData.map((item, idx) => `
    <div class="accordion-item" data-accordion="${idx}">
      <div class="accordion-header">
        <h3>${item.title}</h3>
        <span class="accordion-icon">+</span>
      </div>
      <div class="accordion-body">
        <p>${item.content}</p>
      </div>
    </div>
  `).join('');
  
  document.querySelectorAll('.accordion-item').forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
}

// ============================================
// QUICK REFERENCE
// ============================================
function initQuickReference() {
  if (!elements.quickRefGrid) return;
  const refs = [
    { title: 'Most Common', words: getMostCommonWords().slice(0, 8) },
    { title: 'High Vowels', words: getMostVowelWords().slice(0, 8) },
    { title: 'Top Scrabble', words: getTopScrabbleWords().slice(0, 8) },
    { title: 'Wordle Starters', words: getWordleStarters().slice(0, 8) }
  ];
  
  elements.quickRefGrid.innerHTML = refs.map(ref => `
    <div class="quick-ref-card">
      <h3>📌 ${ref.title}</h3>
      <div class="quick-ref-words">
        ${ref.words.map(w => `<span class="quick-word" data-word="${w}">${w}</span>`).join('')}
      </div>
    </div>
  `).join('');
  
  document.querySelectorAll('.quick-word').forEach(wordEl => {
    wordEl.addEventListener('click', () => {
      const word = wordEl.dataset.word;
      navigator.clipboard.writeText(word);
      showToast(`Copied "${word}"!`);
    });
  });
}

// ============================================
// FAQ ACCORDION
// ============================================
function initFAQ() {
  if (!elements.faqList) return;
  const faqs = [
    { q: 'What is the best 5 letter word to start Wordle?', a: 'CRANE, SLATE, and STARE are popular starting words because they contain common vowels and consonants.' },
    { q: 'How many 5 letter words are in the English dictionary?', a: 'There are around 8,500-12,000 five-letter words in English, depending on the dictionary used.' },
    { q: 'Can I use this tool for Scrabble?', a: 'Yes! The Scrabble section shows points for each word using standard tile values. Filter by minimum score to maximize your game.' },
    { q: 'Are these words from official word lists?', a: 'Our database includes common English words suitable for Wordle, Scrabble, and crossword puzzles.' }
  ];
  
  elements.faqList.innerHTML = faqs.map((faq, idx) => `
    <div class="faq-item" data-faq="${idx}">
      <div class="faq-q">
        <span>${faq.q}</span>
        <span class="faq-icon">+</span>
      </div>
      <div class="faq-a">${faq.a}</div>
    </div>
  `).join('');
  
  document.querySelectorAll('.faq-item').forEach(item => {
    const qEl = item.querySelector('.faq-q');
    qEl.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function getScrabbleScore(word) {
  const scores = {
    a:1,b:3,c:3,d:2,e:1,f:4,g:2,h:4,i:1,j:8,k:5,l:1,m:3,n:1,o:1,p:3,q:10,r:1,s:1,t:1,u:1,v:4,w:4,x:8,y:4,z:10
  };
  return word.toLowerCase().split('').reduce((sum, letter) => sum + (scores[letter] || 0), 0);
}

function getLetterScore(letter) {
  const scores = { A:1,B:3,C:3,D:2,E:1,F:4,G:2,H:4,I:1,J:8,K:5,L:1,M:3,N:1,O:1,P:3,Q:10,R:1,S:1,T:1,U:1,V:4,W:4,X:8,Y:4,Z:10 };
  return scores[letter.toUpperCase()] || 0;
}

function countVowels(word) {
  return (word.match(/[aeiou]/gi) || []).length;
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function initFloatingLetters() {
  const container = document.getElementById('floatingLetters');
  if (!container) return;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (let i = 0; i < 20; i++) {
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const span = document.createElement('span');
    span.className = 'float-letter';
    span.innerText = letter;
    span.style.top = Math.random() * 100 + '%';
    span.style.left = Math.random() * 100 + '%';
    span.style.fontSize = (Math.random() * 3 + 1.5) + 'rem';
    span.style.opacity = (Math.random() * 0.08 + 0.03);
    span.style.animationDelay = Math.random() * 10 + 's';
    container.appendChild(span);
  }
}

function initAnimatedStats() {
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');
  statNumbers.forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.innerText = target;
        clearInterval(timer);
      } else {
        el.innerText = Math.floor(current);
      }
    }, 30);
  });
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
}

// Simple navigation scroll & mobile menu (handled in components.js)
