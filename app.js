/**
 * 5 Letter Words - Main Application Logic
 * Version: 1.0.0
 * 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. DATA & STATE MANAGEMENT
    // Assuming WORDS_DATA is globally available from words-data.js
    const words = typeof WORDS_DATA !== 'undefined' ? WORDS_DATA : [];
    
    const SCRABBLE_POINTS = {
        a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1, m: 3,
        n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10
    };

    const state = {
        activeTab: 'basic',
        currentResults: [],
        wordleGuesses: Array(6).fill(null).map(() => Array(5).fill({ letter: '', state: 'gray' })),
        wotdIndex: Math.floor(Math.random() * 100)
    };

    // 2. COMPONENT INITIALIZATION
    initUI();
    initCounters();
    initWordleHelper();
    initAlphabetGrid();
    initCommonWords();
    initScrabbleBoard();
    initLengthCards();
    initAccordions();
    initWOTD();

    // --- UI & Navigation ---

    function initUI() {
        // Render Header & Footer (Calls from components.js)
        if (typeof renderHeader === 'function') renderHeader('header-root');
        if (typeof renderFooter === 'function') renderFooter('footer-root');

        // Tab Switching
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                const target = document.getElementById(`tab-${tab.dataset.tab}`);
                if (target) target.classList.add('active');
                state.activeTab = tab.dataset.tab;
            });
        });

        // Floating Letters in Hero
        const container = document.getElementById('floatingLetters');
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < 15; i++) {
            const span = document.createElement('span');
            span.className = 'float-letter';
            span.textContent = chars[Math.floor(Math.random() * chars.length)];
            span.style.left = `${Math.random() * 100}%`;
            span.style.top = `${Math.random() * 100}%`;
            span.style.animationDelay = `${Math.random() * 5}s`;
            container.appendChild(span);
        }
    }

    function initCounters() {
        const stats = document.querySelectorAll('.stat-num');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    animateValue(entry.target, 0, target, 1500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // --- Search Functionality ---

    // Basic Search
    document.getElementById('searchBtn').addEventListener('click', () => {
        const start = document.getElementById('startsWith').value.toLowerCase();
        const end = document.getElementById('endsWith').value.toLowerCase();
        const contains = document.getElementById('contains').value.toLowerCase().split('');
        const excludes = document.getElementById('excludes').value.toLowerCase().split('');

        const filtered = words.filter(word => {
            const w = word.toLowerCase();
            const hasStart = w.startsWith(start);
            const hasEnd = w.endsWith(end);
            const hasContains = contains.every(l => w.includes(l));
            const hasExcludes = !excludes.some(l => l !== '' && w.includes(l));
            return hasStart && hasEnd && hasContains && hasExcludes;
        });

        displayResults(filtered);
    });

    // Pattern Search
    document.getElementById('patternSearchBtn').addEventListener('click', () => {
        const boxes = document.querySelectorAll('.pattern-box');
        const pattern = Array.from(boxes).map(b => b.value.toLowerCase() || '?');
        
        const filtered = words.filter(word => {
            const w = word.toLowerCase();
            return pattern.every((char, i) => char === '?' || w[i] === char);
        });

        displayResults(filtered);
    });

    // --- Wordle Helper ---

    function initWordleHelper() {
        const grid = document.getElementById('wordleRows');
        grid.innerHTML = '';
        
        for (let r = 0; r < 3; r++) { // Showing 3 rows for helper
            const row = document.createElement('div');
            row.className = 'wordle-row';
            for (let c = 0; c < 5; c++) {
                const cell = document.createElement('div');
                cell.className = 'wordle-cell state-gray';
                cell.innerHTML = `<input type="text" maxlength="1" data-row="${r}" data-col="${c}">`;
                
                // Toggle state on click
                cell.addEventListener('click', (e) => {
                    if (e.target.tagName === 'INPUT') return;
                    cycleCellState(cell);
                });
                
                row.appendChild(cell);
            }
            grid.appendChild(row);
        }
    }

    function cycleCellState(cell) {
        const states = ['state-gray', 'state-yellow', 'state-green'];
        let currentIdx = states.findIndex(s => cell.classList.contains(s));
        cell.classList.remove(states[currentIdx]);
        cell.classList.add(states[(currentIdx + 1) % states.length]);
    }

    document.getElementById('wordleSearchBtn').addEventListener('click', () => {
        const cells = document.querySelectorAll('.wordle-cell');
        let mustInclude = new Set();
        let mustExclude = new Set();
        let constraints = []; // {pos, char, type}

        cells.forEach(cell => {
            const char = cell.querySelector('input').value.toLowerCase();
            if (!char) return;

            if (cell.classList.contains('state-green')) {
                constraints.push({ pos: cell.querySelector('input').dataset.col, char, type: 'exact' });
                mustInclude.add(char);
            } else if (cell.classList.contains('state-yellow')) {
                constraints.push({ pos: cell.querySelector('input').dataset.col, char, type: 'exclude-pos' });
                mustInclude.add(char);
            } else {
                mustExclude.add(char);
            }
        });

        const filtered = words.filter(word => {
            const w = word.toLowerCase();
            // Check exclusions (but allow if the letter is also marked green/yellow elsewhere)
            for (let char of mustExclude) {
                if (w.includes(char) && !mustInclude.has(char)) return false;
            }
            // Check inclusions
            for (let char of mustInclude) {
                if (!w.includes(char)) return false;
            }
            // Check positional constraints
            return constraints.every(con => {
                if (con.type === 'exact') return w[con.pos] === con.char;
                if (con.type === 'exclude-pos') return w[con.pos] !== con.char;
                return true;
            });
        });

        displayResults(filtered);
    });

    // --- Results Rendering ---

    function displayResults(results) {
        const container = document.getElementById('resultsContainer');
        const controls = document.getElementById('resultsControls');
        const info = document.getElementById('resultsInfo');
        
        state.currentResults = results;
        controls.style.display = results.length > 0 ? 'flex' : 'none';
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🤷‍♂️</div>
                    <h3>No matches found</h3>
                    <p>Try adjusting your filters or using fewer constraints.</p>
                </div>`;
            return;
        }

        info.innerHTML = `Found <span>${results.length}</span> words`;
        renderWordGrid(results);
        showToast(`Found ${results.length} words!`);
    }

    function renderWordGrid(resultsList) {
        const container = document.getElementById('resultsContainer');
        container.innerHTML = '<div class="words-grid"></div>';
        const grid = container.querySelector('.words-grid');

        resultsList.slice(0, 100).forEach(word => {
            const score = calculateScrabbleScore(word);
            const chip = document.createElement('div');
            chip.className = 'word-chip';
            chip.innerHTML = `${word} <span class="score">${score} pts</span>`;
            chip.onclick = () => copyToClipboard(word);
            grid.appendChild(chip);
        });

        if (resultsList.length > 100) {
            const more = document.createElement('p');
            more.className = 'placeholder-sub text-center mt-16';
            more.textContent = `...and ${resultsList.length - 100} more words.`;
            container.appendChild(more);
        }
    }

    // --- Sorting Logic ---
    document.getElementById('sortSelect').addEventListener('change', (e) => {
        const val = e.target.value;
        let sorted = [...state.currentResults];

        if (val === 'alpha') sorted.sort();
        if (val === 'alpha-desc') sorted.sort().reverse();
        if (val === 'scrabble') sorted.sort((a, b) => calculateScrabbleScore(b) - calculateScrabbleScore(a));
        if (val === 'vowels') sorted.sort((a, b) => countVowels(b) - countVowels(a));

        renderWordGrid(sorted);
    });

    // --- Features & Misc ---

    function initAlphabetGrid() {
        const grid = document.getElementById('alphaGrid');
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            const btn = document.createElement('button');
            btn.className = 'alpha-btn';
            btn.textContent = letter;
            btn.onclick = () => {
                document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                loadLetterWords(letter);
            };
            grid.appendChild(btn);
        });
        // Load 'A' by default
        loadLetterWords('A');
    }

    function loadLetterWords(letter) {
        const display = document.getElementById('letterWordsDisplay');
        const filtered = words.filter(w => w.toUpperCase().startsWith(letter)).slice(0, 50);
        
        display.innerHTML = `
            <div class="letter-display-header">
                <div class="letter-display-badge">${letter}</div>
                <div class="letter-display-info">
                    <h3>Words starting with ${letter}</h3>
                    <p>Showing top 50 common words.</p>
                </div>
            </div>
            <div class="words-grid">
                ${filtered.map(w => `<div class="word-chip">${w}</div>`).join('')}
            </div>
        `;
    }

    function initCommonWords() {
        const container = document.getElementById('wordChips');
        const cats = document.querySelectorAll('.cat-btn');
        
        const loadCat = (cat) => {
            let list = [];
            if (cat === 'common') list = words.slice(0, 40);
            if (cat === 'vowels') list = words.filter(w => countVowels(w) >= 3).slice(0, 40);
            if (cat === 'scrabble') list = [...words].sort((a,b) => calculateScrabbleScore(b) - calculateScrabbleScore(a)).slice(0, 40);
            if (cat === 'wordle') list = ['ARISE', 'ADIEU', 'ROATE', 'STARE', 'AUDIO', 'RAISE'].slice(0, 40);

            container.innerHTML = list.map(w => `<div class="word-chip">${w}</div>`).join('');
        };

        cats.forEach(btn => {
            btn.addEventListener('click', () => {
                cats.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                loadCat(btn.dataset.cat);
            });
        });

        loadCat('common');
    }

    function initScrabbleBoard() {
        const board = document.getElementById('scrabbleBoard');
        const example = ['J', 'A', 'Z', 'Z', 'Y'];
        board.innerHTML = '';
        example.forEach(l => {
            const tile = document.createElement('div');
            tile.className = 'scrabble-tile';
            tile.innerHTML = `
                <div class="scrabble-tile-letter">${l}</div>
                <div class="scrabble-tile-pts">${SCRABBLE_POINTS[l.toLowerCase()]}</div>
            `;
            board.appendChild(tile);
        });
    }

    function initLengthCards() {
        const container = document.getElementById('lengthCards');
        for (let i = 1; i <= 9; i++) {
            const card = document.createElement('div');
            card.className = `length-card ${i === 5 ? 'featured' : ''}`;
            card.innerHTML = `
                <div class="length-num">${i}</div>
                <div class="length-label">${i}-Letter Words</div>
                <div class="length-count">Browse List</div>
                ${i === 5 ? '<span class="length-badge">Popular</span>' : ''}
            `;
            container.appendChild(card);
        }
    }

    function initAccordions() {
        const data = [
            { q: "What are the most common 5 letter words?", a: "The most common include: WHICH, THEIR, THERE, WOULD, OTHER, WORDS, ABOUT." },
            { q: "How many 5 letter words are there in English?", a: "There are approximately 8,500 to 12,000 five-letter words depending on the dictionary used (Scrabble vs Standard)." },
            { q: "What are the best Wordle starting words?", a: "Statistically, words like ARISE, SLATE, and CRANE are excellent starters as they use high-frequency letters." }
        ];

        const faqList = document.getElementById('faqList');
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'faq-item';
            div.innerHTML = `
                <div class="faq-q"><span>${item.q}</span> <i class="faq-icon">+</i></div>
                <div class="faq-a">${item.a}</div>
            `;
            div.querySelector('.faq-q').onclick = () => div.classList.toggle('open');
            faqList.appendChild(div);
        });
    }

    function initWOTD() {
        const nextBtn = document.getElementById('nextWordBtn');
        const wordsWOTD = [
            { w: 'AMBER', p: '/ˈæm.bər/', pos: 'noun', d: 'A hard yellowish to brownish translucent fossil resin.', e: 'The insect was perfectly preserved in amber.' },
            { w: 'BLISS', p: '/blɪs/', pos: 'noun', d: 'Perfect happiness; great joy.', e: 'The first day of vacation was pure bliss.' },
            { w: 'CRISP', p: '/krɪsp/', pos: 'adj', d: 'Firm, dry, and brittle.', e: 'The autumn air was cool and crisp.' }
        ];

        let idx = 0;
        const update = () => {
            const item = wordsWOTD[idx];
            document.getElementById('wotdWord').textContent = item.w;
            document.getElementById('wotdPhonetic').textContent = item.p;
            document.getElementById('wotdPos').textContent = item.pos;
            document.getElementById('wotdDef').textContent = item.d;
            document.getElementById('wotdExample').textContent = `"${item.e}"`;
            
            const tiles = document.getElementById('wotdTiles');
            tiles.innerHTML = item.w.split('').map(l => `<div class="wotd-tile">${l}</div>`).join('');
            idx = (idx + 1) % wordsWOTD.length;
        };

        nextBtn.onclick = update;
        update();
    }

    // --- Helpers ---

    function calculateScrabbleScore(word) {
        return word.toLowerCase().split('').reduce((sum, char) => sum + (SCRABBLE_POINTS[char] || 0), 0);
    }

    function countVowels(word) {
        return (word.match(/[aeiou]/gi) || []).length;
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`Copied "${text}" to clipboard!`);
        });
    }

    function showToast(msg) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
});
