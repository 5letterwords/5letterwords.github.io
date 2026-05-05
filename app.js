// ============================================
// app.js - Main Application Logic
// ============================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initHeader();
    initFooter();
    initFloatingLetters();
    initStatsCounter();
    initWordFinder();
    initAlphaGrid();
    initCommonWords();
    initScrabbleSection();
    initLengthCards();
    initWordOfTheDay();
    initSEOAccordion();
    initQuickReference();
    initFAQ();
    initScrollReveal();
    initMobileMenu();
    initTabSystem();
    initWordleHelper();
    initPatternSearch();
});

// ============================================
// Header & Footer
// ============================================
function initHeader() {
    const headerRoot = document.getElementById('header-root');
    if (!headerRoot) return;
    
    headerRoot.innerHTML = `
        <header class="site-header">
            <div class="container header-inner">
                <a href="#home" class="logo">
                    <div class="logo-icon">5L</div>
                    <div class="logo-text">5<span>Letter</span>Words</div>
                </a>
                <nav>
                    <ul class="nav-menu">
                        <li><a href="#home" class="nav-link active">Home</a></li>
                        <li><a href="#finder" class="nav-link">Word Finder</a></li>
                        <li><a href="#word-lists" class="nav-link">Word Lists</a></li>
                        <li><a href="#common-words" class="nav-link">Common Words</a></li>
                        <li><a href="#scrabble" class="nav-link">Scrabble</a></li>
                        <li><a href="#learn" class="nav-link">Learn</a></li>
                    </ul>
                    <button class="hamburger" id="hamburgerBtn">
                        <span></span><span></span><span></span>
                    </button>
                </nav>
            </div>
            <div class="mobile-nav" id="mobileNav">
                <a href="#home" class="nav-link">Home</a>
                <a href="#finder" class="nav-link">Word Finder</a>
                <a href="#word-lists" class="nav-link">Word Lists</a>
                <a href="#common-words" class="nav-link">Common Words</a>
                <a href="#scrabble" class="nav-link">Scrabble</a>
                <a href="#learn" class="nav-link">Learn</a>
            </div>
        </header>
    `;
}

function initFooter() {
    const footerRoot = document.getElementById('footer-root');
    if (!footerRoot) return;
    
    footerRoot.innerHTML = `
        <footer class="site-footer">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <div class="logo-text">5<span>Letter</span>Words</div>
                        <p>The ultimate resource for finding and learning 5 letter words. Perfect for Wordle, Scrabble, crosswords, and vocabulary building.</p>
                        <div class="footer-letter-row" id="footerLetterRow"></div>
                    </div>
                    <div class="footer-col">
                        <h4>Quick Links</h4>
                        <ul class="footer-links">
                            <li><a href="#finder">Word Finder</a></li>
                            <li><a href="#word-lists">Word Lists</a></li>
                            <li><a href="#common-words">Common Words</a></li>
                            <li><a href="#scrabble">Scrabble Words</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Resources</h4>
                        <ul class="footer-links">
                            <li><a href="#learn">Learning Guide</a></li>
                            <li><a href="#word-of-day">Word of the Day</a></li>
                            <li><a href="#faq">FAQ</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Legal</h4>
                        <ul class="footer-links">
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Use</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>© 2024 5 Letter Words. All rights reserved.</p>
                    <div class="footer-bottom-links">
                        <a href="#">Sitemap</a>
                        <a href="#">Accessibility</a>
                    </div>
                </div>
            </div>
        </footer>
    `;
    
    // Populate footer letters
    const footerRow = document.getElementById('footerLetterRow');
    if (footerRow) {
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            const span = document.createElement('span');
            span.className = 'footer-letter';
            span.textContent = letter;
            span.onclick = () => {
                document.getElementById('alphaGrid')?.scrollIntoView({ behavior: 'smooth' });
                const btn = document.querySelector(`.alpha-btn[data-letter="${letter}"]`);
                btn?.click();
            };
            footerRow.appendChild(span);
        });
    }
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    if (!hamburger || !mobileNav) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
    });
    
    // Close when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
        });
    });
}

// ============================================
// Hero Animations
// ============================================
function initFloatingLetters() {
    const container = document.getElementById('floatingLetters');
    if (!container) return;
    
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 15; i++) {
        const span = document.createElement('span');
        span.className = 'float-letter';
        span.textContent = letters[Math.floor(Math.random() * letters.length)];
        span.style.left = Math.random() * 100 + '%';
        span.style.top = Math.random() * 100 + '%';
        span.style.animationDelay = Math.random() * 10 + 's';
        span.style.animationDuration = 8 + Math.random() * 10 + 's';
        span.style.fontSize = 2 + Math.random() * 5 + 'rem';
        container.appendChild(span);
    }
}

function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-num[data-target]');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (target === 8500) {
            stat.textContent = window.wordDatabase.words5.length.toLocaleString();
        } else if (target === 26) {
            stat.textContent = '26';
        } else if (target === 100) {
            stat.textContent = '100';
        }
    });
}

// ============================================
// Word Finder Functionality
// ============================================
let currentResults = [];

function initWordFinder() {
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');
    const startsWith = document.getElementById('startsWith');
    const endsWith = document.getElementById('endsWith');
    const contains = document.getElementById('contains');
    const excludes = document.getElementById('excludes');
    const sortSelect = document.getElementById('sortSelect');
    
    if (!searchBtn) return;
    
    const performSearch = () => {
        let words = [...window.wordDatabase.words5];
        
        const starts = startsWith.value.toLowerCase();
        if (starts) words = words.filter(w => w.toLowerCase().startsWith(starts));
        
        const ends = endsWith.value.toLowerCase();
        if (ends) words = words.filter(w => w.toLowerCase().endsWith(ends));
        
        const inc = contains.value.toLowerCase();
        if (inc) {
            const letters = inc.split('');
            words = words.filter(w => letters.every(l => w.toLowerCase().includes(l)));
        }
        
        const exc = excludes.value.toLowerCase();
        if (exc) {
            const letters = exc.split('');
            words = words.filter(w => !letters.some(l => w.toLowerCase().includes(l)));
        }
        
        currentResults = words;
        displayResults(currentResults);
        showResultsControls();
    };
    
    searchBtn.addEventListener('click', performSearch);
    resetBtn.addEventListener('click', () => {
        startsWith.value = '';
        endsWith.value = '';
        contains.value = '';
        excludes.value = '';
        performSearch();
    });
    
    sortSelect?.addEventListener('change', () => {
        sortResults();
        displayResults(currentResults);
    });
    
    // Initial search to show all words
    performSearch();
}

function sortResults() {
    const sortBy = document.getElementById('sortSelect')?.value || 'alpha';
    
    switch(sortBy) {
        case 'alpha':
            currentResults.sort((a, b) => a.localeCompare(b));
            break;
        case 'alpha-desc':
            currentResults.sort((a, b) => b.localeCompare(a));
            break;
        case 'scrabble':
            currentResults.sort((a, b) => window.wordDatabase.getScrabbleScore(b) - window.wordDatabase.getScrabbleScore(a));
            break;
        case 'vowels':
            currentResults.sort((a, b) => window.wordDatabase.countVowels(b) - window.wordDatabase.countVowels(a));
            break;
    }
}

function displayResults(words) {
    const container = document.getElementById('resultsContainer');
    const resultsInfo = document.getElementById('resultsInfo');
    
    if (!container) return;
    
    if (!words || words.length === 0) {
        container.innerHTML = `
            <div class="results-placeholder">
                <div class="placeholder-icon">🔍</div>
                <p>No words found matching your criteria.</p>
                <p class="placeholder-sub">Try different letters or reset filters.</p>
            </div>
        `;
        if (resultsInfo) resultsInfo.textContent = 'No results found';
        return;
    }
    
    const html = `
        <div class="words-grid">
            ${words.slice(0, 200).map(word => `
                <div class="word-chip" onclick="copyWord('${word}')">
                    ${word}
                    <span class="score">${window.wordDatabase.getScrabbleScore(word)} pts</span>
                </div>
            `).join('')}
        </div>
        ${words.length > 200 ? `<p class="text-center mt-16" style="color: var(--text-light);">Showing 200 of ${words.length} words</p>` : ''}
    `;
    
    container.innerHTML = html;
    if (resultsInfo) resultsInfo.textContent = `Found ${words.length} words`;
}

function showResultsControls() {
    const controls = document.getElementById('resultsControls');
    if (controls) controls.style.display = 'flex';
}

// Copy word to clipboard
window.copyWord = function(word) {
    navigator.clipboard.writeText(word);
    showToast(`"${word}" copied to clipboard!`);
};

function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// ============================================
// Pattern Search
// ============================================
function initPatternSearch() {
    const patternBoxes = document.querySelectorAll('.pattern-box');
    const searchBtn = document.getElementById('patternSearchBtn');
    const resetBtn = document.getElementById('patternResetBtn');
    
    // Auto-focus and move to next input
    patternBoxes.forEach((box, idx) => {
        box.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && idx < 4) {
                patternBoxes[idx + 1].focus();
            }
        });
    });
    
    searchBtn?.addEventListener('click', () => {
        const pattern = Array.from(patternBoxes).map(box => {
            const val = box.value.trim();
            return val ? val.toLowerCase() : '?';
        }).join('');
        
        const regex = new RegExp('^' + pattern.replace(/\?/g, '.') + '$', 'i');
        const matches = window.wordDatabase.words5.filter(word => regex.test(word));
        currentResults = matches;
        displayResults(currentResults);
        showResultsControls();
    });
    
    resetBtn?.addEventListener('click', () => {
        patternBoxes.forEach(box => box.value = '');
        patternBoxes[0].focus();
    });
}

// ============================================
// Tab System
// ============================================
function initTabSystem() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const activeTab = document.getElementById(`tab-${tabId}`);
            if (activeTab) activeTab.classList.add('active');
        });
    });
}

// ============================================
// Wordle Helper
// ============================================
let wordleRows = [];

function initWordleHelper() {
    const container = document.getElementById('wordleRows');
    const searchBtn = document.getElementById('wordleSearchBtn');
    const resetBtn = document.getElementById('wordleResetBtn');
    
    if (!container) return;
    
    // Create 6 rows
    for (let r = 0; r < 6; r++) {
        const row = document.createElement('div');
        row.className = 'wordle-row';
        row.dataset.row = r;
        
        for (let c = 0; c < 5; c++) {
            const cell = document.createElement('div');
            cell.className = 'wordle-cell';
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.dataset.state = 'empty';
            
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.placeholder = '?';
            
            input.addEventListener('input', (e) => {
                const val = e.target.value.toUpperCase();
                if (val && /[A-Z]/i.test(val)) {
                    input.value = val;
                    cell.classList.remove('state-green', 'state-yellow', 'state-gray');
                    cell.classList.add('state-empty');
                    cell.dataset.state = 'empty';
                } else {
                    input.value = '';
                }
            });
            
            cell.addEventListener('click', () => {
                const states = ['empty', 'state-green', 'state-yellow', 'state-gray'];
                const current = cell.dataset.state;
                let next = states[(states.indexOf(current) + 1) % states.length];
                cell.classList.remove(...states);
                if (next !== 'empty') cell.classList.add(next);
                cell.dataset.state = next;
            });
            
            cell.appendChild(input);
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
    
    searchBtn?.addEventListener('click', () => {
        const constraints = {
            fixed: Array(5).fill(null),
            yellow: [],
            excluded: new Set()
        };
        
        const rows = document.querySelectorAll('.wordle-row');
        rows.forEach(row => {
            const cells = row.querySelectorAll('.wordle-cell');
            cells.forEach((cell, idx) => {
                const input = cell.querySelector('input');
                const letter = input?.value.toLowerCase();
                const state = cell.dataset.state;
                
                if (!letter) return;
                
                if (state === 'state-green') {
                    constraints.fixed[idx] = letter;
                } else if (state === 'state-yellow') {
                    constraints.yellow.push({ letter, position: idx });
                } else if (state === 'state-gray') {
                    constraints.excluded.add(letter);
                }
            });
        });
        
        // Filter words based on constraints
        let matches = window.wordDatabase.words5.filter(word => {
            const w = word.toLowerCase();
            
            // Check fixed positions
            for (let i = 0; i < 5; i++) {
                if (constraints.fixed[i] && w[i] !== constraints.fixed[i]) return false;
            }
            
            // Check yellow constraints
            for (const y of constraints.yellow) {
                if (!w.includes(y.letter)) return false;
                if (w[y.position] === y.letter) return false;
            }
            
            // Check excluded letters
            for (const ex of constraints.excluded) {
                if (w.includes(ex)) {
                    // Don't exclude if it's fixed green
                    let isFixed = false;
                    for (let i = 0; i < 5; i++) {
                        if (constraints.fixed[i] === ex) isFixed = true;
                    }
                    if (!isFixed) return false;
                }
            }
            
            return true;
        });
        
        currentResults = matches;
        displayResults(currentResults);
        showResultsControls();
    });
    
    resetBtn?.addEventListener('click', () => {
        document.querySelectorAll('.wordle-row').forEach(row => {
            row.querySelectorAll('.wordle-cell').forEach(cell => {
                const input = cell.querySelector('input');
                if (input) input.value = '';
                cell.classList.remove('state-green', 'state-yellow', 'state-gray');
                cell.classList.add('state-empty');
                cell.dataset.state = 'empty';
            });
        });
    });
}

// ============================================
// Alphabet Grid - Word Lists by Starting Letter
// ============================================
function initAlphaGrid() {
    const grid = document.getElementById('alphaGrid');
    const display = document.getElementById('letterWordsDisplay');
    
    if (!grid) return;
    
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    letters.forEach(letter => {
        const btn = document.createElement('button');
        btn.className = 'alpha-btn';
        btn.textContent = letter;
        btn.dataset.letter = letter;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const words = window.wordDatabase.words5.filter(w => w.startsWith(letter));
            const count = words.length;
            
            display.innerHTML = `
                <div class="letter-display-header">
                    <div class="letter-display-badge">${letter}</div>
                    <div class="letter-display-info">
                        <h3>Words starting with "${letter}"</h3>
                        <p>Found ${count} five-letter words beginning with ${letter}</p>
                    </div>
                </div>
                <div class="words-grid">
                    ${words.slice(0, 100).map(word => `
                        <div class="word-chip" onclick="copyWord('${word}')">
                            ${word}
                            <span class="score">${window.wordDatabase.getScrabbleScore(word)} pts</span>
                        </div>
                    `).join('')}
                </div>
                ${count > 100 ? `<p class="text-center mt-16">Showing 100 of ${count} words</p>` : ''}
            `;
        });
        grid.appendChild(btn);
    });
    
    // Trigger first letter
    document.querySelector('.alpha-btn')?.click();
}

// ============================================
// Common Words Section
// ============================================
function initCommonWords() {
    const container = document.getElementById('wordChips');
    const catBtns = document.querySelectorAll('.cat-btn');
    
    if (!container) return;
    
    const getWordsByCategory = (category) => {
        switch(category) {
            case 'common':
                return window.wordDatabase.words5.slice(0, 50);
            case 'vowels':
                return [...window.wordDatabase.words5].sort((a, b) => window.wordDatabase.countVowels(b) - window.wordDatabase.countVowels(a)).slice(0, 30);
            case 'scrabble':
                return [...window.wordDatabase.words5].sort((a, b) => window.wordDatabase.getScrabbleScore(b) - window.wordDatabase.getScrabbleScore(a)).slice(0, 30);
            case 'wordle':
                const starters = ['ADIEU', 'AUDIO', 'ARISE', 'CRANE', 'SLATE', 'SOARE', 'ROATE', 'RAISE', 'STARE', 'TRACE'];
                return starters;
            default:
                return window.wordDatabase.words5.slice(0, 50);
        }
    };
    
    const renderCategory = (category) => {
        const words = getWordsByCategory(category);
        container.innerHTML = words.map(word => `
            <div class="word-chip" onclick="copyWord('${word}')">
                ${word}
                <span class="score">${window.wordDatabase.getScrabbleScore(word)} pts</span>
            </div>
        `).join('');
    };
    
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCategory(btn.dataset.cat);
        });
    });
    
    renderCategory('common');
}

// ============================================
// Scrabble Section
// ============================================
function initScrabbleSection() {
    const board = document.getElementById('scrabbleBoard');
    const searchBtn = document.getElementById('scrabbleSearchBtn');
    const minScoreSlider = document.getElementById('minScore');
    const minScoreVal = document.getElementById('minScoreVal');
    const resultsContainer = document.getElementById('scrabbleResults');
    
    if (board) {
        const highValueLetters = [
            { letter: 'Q', pts: 10 },
            { letter: 'U', pts: 1 },
            { letter: 'A', pts: 1 },
            { letter: 'Z', pts: 10 },
            { letter: 'Z', pts: 10 }
        ];
        board.innerHTML = highValueLetters.map(tile => `
            <div class="scrabble-tile">
                <div class="scrabble-tile-letter">${tile.letter}</div>
                <div class="scrabble-tile-pts">${tile.pts}</div>
            </div>
        `).join('');
    }
    
    minScoreSlider?.addEventListener('input', (e) => {
        if (minScoreVal) minScoreVal.textContent = e.target.value + '+';
    });
    
    searchBtn?.addEventListener('click', () => {
        const minScore = parseInt(minScoreSlider?.value || 5);
        const words = window.wordDatabase.words5.filter(w => window.wordDatabase.getScrabbleScore(w) >= minScore);
        const sorted = [...words].sort((a, b) => window.wordDatabase.getScrabbleScore(b) - window.wordDatabase.getScrabbleScore(a)).slice(0, 50);
        
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="words-grid" style="margin-top: 32px;">
                    ${sorted.map(word => `
                        <div class="word-chip" onclick="copyWord('${word}')">
                            ${word}
                            <span class="score">${window.wordDatabase.getScrabbleScore(word)} pts</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    });
}

// ============================================
// Length Cards
// ============================================
function initLengthCards() {
    const container = document.getElementById('lengthCards');
    if (!container) return;
    
    const lengths = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    lengths.forEach(len => {
        const count = window.wordDatabase.wordsByLength[len]?.length || 0;
        const card = document.createElement('div');
        card.className = `length-card ${len === 5 ? 'featured' : ''}`;
        card.innerHTML = `
            <div class="length-num">${len}</div>
            <div class="length-label">${len}-Letter Words</div>
            <div class="length-count">${count.toLocaleString()} words</div>
            ${len === 5 ? '<div class="length-badge">Most Popular</div>' : ''}
        `;
        card.addEventListener('click', () => {
            if (len === 5) {
                document.getElementById('finder')?.scrollIntoView({ behavior: 'smooth' });
            } else {
                showToast(`${len}-letter words coming soon!`);
            }
        });
        container.appendChild(card);
    });
}

// ============================================
// Word of the Day
// ============================================
let currentWOTD = null;

function initWordOfTheDay() {
    const words = window.wordDatabase.words5;
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWOTD = words[randomIndex];
    
    updateWordOfTheDay(currentWOTD);
    
    const nextBtn = document.getElementById('nextWordBtn');
    nextBtn?.addEventListener('click', () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * words.length);
        } while (words[newIndex] === currentWOTD);
        currentWOTD = words[newIndex];
        updateWordOfTheDay(currentWOTD);
    });
}

function updateWordOfTheDay(word) {
    const wordEl = document.getElementById('wotdWord');
    const defEl = document.getElementById('wotdDef');
    const posEl = document.getElementById('wotdPos');
    const phoneticEl = document.getElementById('wotdPhonetic');
    const exampleEl = document.getElementById('wotdExample');
    const tilesEl = document.getElementById('wotdTiles');
    
    if (wordEl) wordEl.textContent = word.toUpperCase();
    if (phoneticEl) phoneticEl.textContent = `/${word.toLowerCase()}/`;
    if (posEl) posEl.textContent = ['noun', 'verb', 'adjective'][Math.floor(Math.random() * 3)];
    if (defEl) defEl.textContent = getRandomDefinition(word);
    if (exampleEl) exampleEl.textContent = `"An example sentence using the word ${word.toLowerCase()} in context."`;
    
    if (tilesEl) {
        tilesEl.innerHTML = word.split('').map(letter => `
            <div class="wotd-tile">${letter.toUpperCase()}</div>
        `).join('');
    }
}

function getRandomDefinition(word) {
    const definitions = [
        `A five-letter word that can be used in various contexts. "${word}" is commonly found in word games.`,
        `An interesting word that demonstrates the richness of the English language. "${word}" has ${word.length} letters.`,
        `A useful word for word puzzles and vocabulary building. "${word}" appears in many word lists.`
    ];
    return definitions[Math.floor(Math.random() * definitions.length)];
}

// ============================================
// SEO Accordion
// ============================================
function initSEOAccordion() {
    const container = document.getElementById('seoAccordion');
    if (!container) return;
    
    const items = [
        { title: 'What are 5 letter words?', content: 'Five-letter words are words that consist of exactly five alphabetic characters. They are among the most common word lengths in the English language, with thousands of examples ranging from everyday vocabulary like "apple" and "bread" to more specialized terms like "xenon" and "quaff".' },
        { title: 'Why are 5 letter words important for Wordle?', content: 'Wordle specifically uses 5-letter words as its daily puzzle format. Having a strong vocabulary of five-letter words dramatically improves your chances of solving the puzzle in fewer attempts. Common starting words like "ARISE", "CRANE", or "STARE" can help you narrow down possibilities quickly.' },
        { title: 'What are the highest scoring 5 letter words in Scrabble?', content: 'High-scoring 5-letter words often include rare letters like Q, Z, J, and X. Examples include "JAZZY" (36 points), "QUAFF" (20+ points), "ZAPPY" (21 points), and "JACKY" (21 points). Using these words on premium squares can yield even higher scores.' }
    ];
    
    container.innerHTML = items.map((item, idx) => `
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
// Quick Reference
// ============================================
function initQuickReference() {
    const container = document.getElementById('quickRefGrid');
    if (!container) return;
    
    const categories = [
        { title: '🎯 Top Wordle Starters', words: ['ADIEU', 'AUDIO', 'ARISE', 'STARE', 'CRANE', 'SLATE'] },
        { title: '💰 High Scrabble Score', words: ['JAZZY', 'QUAFF', 'ZAPPY', 'XYLYL', 'JACKY', 'FRIZZ'] },
        { title: '🔤 Common Endings', words: ['ING', 'TION', 'NESS', 'MENT', 'IGHT', 'OUND'] },
        { title: '⭐ Most Common', words: ['ABOUT', 'OTHER', 'WHICH', 'THEIR', 'THERE', 'FIRST'] }
    ];
    
    container.innerHTML = categories.map(cat => `
        <div class="quick-ref-card">
            <h3>${cat.title}</h3>
            <div class="quick-ref-words">
                ${cat.words.map(w => `<span class="quick-word" onclick="copyWord('${w}')">${w}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// ============================================
// FAQ Section
// ============================================
function initFAQ() {
    const container = document.getElementById('faqList');
    if (!container) return;
    
    const faqs = [
        { q: 'How many 5 letter words are there in English?', a: 'There are approximately 8,500 to 9,000 commonly used 5-letter words in the English language. Our database contains over 8,500 words, making it one of the most comprehensive resources available.' },
        { q: 'What is the best 5-letter word to start Wordle with?', a: 'Popular starting words include "ARISE", "CRANE", "STARE", "AUDIO", and "ADIEU". These words contain common vowels and frequently used consonants to maximize information from the first guess.' },
        { q: 'Can I use this tool for other word games?', a: 'Absolutely! Our word finder works great for Scrabble, Words With Friends, crossword puzzles, anagrams, and any other word game that uses 5-letter words.' }
    ];
    
    container.innerHTML = faqs.map((faq, idx) => `
        <div class="faq-item" data-faq="${idx}">
            <div class="faq-q">
                <span>${faq.q}</span>
                <span class="faq-icon">+</span>
            </div>
            <div class="faq-a">
                <p>${faq.a}</p>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.faq-item').forEach(item => {
        const q = item.querySelector('.faq-q');
        q.addEventListener('click', () => {
            item.classList.toggle('open');
        });
    });
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    // Add reveal class to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
