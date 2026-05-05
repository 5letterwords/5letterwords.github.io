// ============================================================
//  components.js  –  Header & Footer reusable components
// ============================================================

/* ============================================================
   HEADER COMPONENT
   ============================================================ */
function renderHeader() {
  const nav = [
    { label: "Home",       href: "#home" },
    { label: "Word Finder",href: "#finder" },
    { label: "Word Lists", href: "#word-lists" },
    { label: "Scrabble",   href: "#scrabble" },
    { label: "Learn",      href: "#learn" },
    { label: "FAQ",        href: "#faq" },
  ];

  const navLinks = nav.map(n =>
    `<a class="nav-link" href="${n.href}">${n.label}</a>`
  ).join('');

  const mobileNavLinks = nav.map(n =>
    `<a class="nav-link" href="${n.href}">${n.label}</a>`
  ).join('');

  const html = `
    <header class="site-header" role="banner">
      <div class="container header-inner">
        <a href="#home" class="logo" aria-label="5 Letter Words Home">
          <div class="logo-icon" aria-hidden="true">5W</div>
          <span class="logo-text">5Letter<span>Words</span></span>
        </a>

        <nav class="nav-menu" role="navigation" aria-label="Main navigation">
          ${navLinks}
          <a href="#finder" class="nav-cta">Find Words</a>
        </nav>

        <button class="hamburger" id="hamburger" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobileNav">
          <span></span><span></span><span></span>
        </button>
      </div>

      <nav class="mobile-nav" id="mobileNav" role="navigation" aria-label="Mobile navigation">
        ${mobileNavLinks}
        <a href="#finder" class="btn btn-primary btn-sm" style="margin-top:8px;align-self:flex-start">Find Words</a>
      </nav>
    </header>
  `;

  document.getElementById('header-root').innerHTML = html;
  initHeader();
}

function initHeader() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when clicking a link
  mobileNav.querySelectorAll('.nav-link, .btn').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile nav on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-64px 0px 0px 0px' });

  sections.forEach(s => observer.observe(s));
}


/* ============================================================
   FOOTER COMPONENT
   ============================================================ */
function renderFooter() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const letterLinks = alphabet.map(l =>
    `<a class="footer-letter" href="#word-lists" data-letter="${l}" title="5 letter words starting with ${l}">${l}</a>`
  ).join('');

  const toolLinks = [
    { label: "5 Letter Word Finder",   href: "#finder" },
    { label: "Wordle Helper",           href: "#finder" },
    { label: "Scrabble Word Finder",    href: "#scrabble" },
    { label: "Pattern Search",          href: "#finder" },
    { label: "Word of the Day",         href: "#word-of-day" },
  ];

  const wordLinks = [
    { label: "Common 5 Letter Words",   href: "#common-words" },
    { label: "Words with Most Vowels",  href: "#common-words" },
    { label: "Top Scrabble Words",      href: "#scrabble" },
    { label: "Words by Length",         href: "#by-length" },
    { label: "Quick Reference Lists",   href: "#quick-ref" },
  ];

  const learnLinks = [
    { label: "What Are 5 Letter Words?", href: "#learn" },
    { label: "5 Letter Words in Wordle", href: "#learn" },
    { label: "Scrabble Scoring Guide",   href: "#scrabble" },
    { label: "Word Length Guide",        href: "#word-length-guide" },
    { label: "FAQ",                       href: "#faq" },
  ];

  const makeLinks = arr => arr.map(l =>
    `<a href="${l.href}">${l.label}</a>`
  ).join('');

  const currentYear = new Date().getFullYear();

  const html = `
    <footer class="site-footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">

          <!-- Brand -->
          <div class="footer-brand">
            <a href="#home" class="logo" style="margin-bottom:16px;display:inline-flex">
              <div class="logo-icon" aria-hidden="true">5W</div>
              <span class="logo-text" style="color:white;margin-left:10px">5Letter<span>Words</span></span>
            </a>
            <p>The ultimate free resource for finding, learning, and exploring five-letter words. Perfect for Wordle, Scrabble, crosswords, and vocabulary building.</p>
            <div class="footer-letter-row" style="margin-top:20px">
              ${letterLinks}
            </div>
          </div>

          <!-- Tools -->
          <div class="footer-col">
            <h4>🔍 Tools</h4>
            <div class="footer-links">
              ${makeLinks(toolLinks)}
            </div>
          </div>

          <!-- Word Lists -->
          <div class="footer-col">
            <h4>📚 Word Lists</h4>
            <div class="footer-links">
              ${makeLinks(wordLinks)}
            </div>
          </div>

          <!-- Learn -->
          <div class="footer-col">
            <h4>🎓 Learn</h4>
            <div class="footer-links">
              ${makeLinks(learnLinks)}
            </div>
          </div>

        </div>

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <p>© ${currentYear} <strong style="color:white">5LetterWords.github.io</strong> — All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="#home">Privacy Policy</a>
            <a href="#home">Terms of Use</a>
            <a href="#home">Contact</a>
            <a href="#home">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  `;

  document.getElementById('footer-root').innerHTML = html;
  initFooter();
}

function initFooter() {
  // Footer letter links → trigger alpha grid click
  document.querySelectorAll('.footer-letter[data-letter]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const letter = el.dataset.letter;
      // Scroll to word lists section
      document.getElementById('word-lists').scrollIntoView({ behavior: 'smooth' });
      // Trigger the alpha button after a brief delay
      setTimeout(() => {
        const alphaBtn = document.querySelector(`.alpha-btn[data-letter="${letter}"]`);
        if (alphaBtn) alphaBtn.click();
      }, 600);
    });
  });
}
