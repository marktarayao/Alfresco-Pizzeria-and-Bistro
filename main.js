/* =============================================================
   main.js — Alfresco Pizzeria & Bistro

   ============================================================= */

/* ══════════════════════════════════════════════════════════════
   MOBILE NAV BURGER
══════════════════════════════════════════════════════════════ */
const burger = document.querySelector('.nav-burger');
const drawer = document.getElementById('nav-drawer');

if (burger && drawer) {
  burger.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  /* Close drawer when any link inside is clicked */
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => drawer.classList.remove('open'));
  });
}

/* ══════════════════════════════════════════════════════════════
   MENU TAB SWITCHING
══════════════════════════════════════════════════════════════ */
/**
 * switchTab — activates the selected menu category tab and panel.
 * @param {Event}  e     - the click event
 * @param {string} tabId - matches the id "tab-<tabId>" in the HTML
 */
function switchTab(e, tabId) {
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  e.currentTarget.classList.add('active');
  document.getElementById('tab-' + tabId).classList.add('active');
}

/* ══════════════════════════════════════════════════════════════
   FULL MENU MODALS
══════════════════════════════════════════════════════════════ */
/**
 * openMenuModal — opens the full menu popup for a category.
 * @param {string} category - 'pizzas' | 'pasta' | 'starters' | 'desserts' | 'drinks'
 */
function openMenuModal(category) {
  const modal = document.getElementById('menu-modal-' + category);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/**
 * closeMenuModal — closes the full menu popup.
 * @param {string} category 
 */
function closeMenuModal(category) {
  const modal = document.getElementById('menu-modal-' + category);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* Close menu modal when clicking the dark backdrop */
document.querySelectorAll('.menu-modal').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});


/* ══════════════════════════════════════════════════════════════
   BRANCH MODALS
══════════════════════════════════════════════════════════════ */
function openBranchModal(id) {
  const modal = document.getElementById('branch-modal-' + id);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeBranchModal(id) {
  const modal = document.getElementById('branch-modal-' + id);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* Close branch modal on backdrop click */
document.querySelectorAll('.branch-modal').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});






/* ══════════════════════════════════════════════════════════════
   PIZZA SIZE TOGGLE
══════════════════════════════════════════════════════════════ */
/**
 * selectSize — toggles the active size button and updates the
 * displayed price for that pizza card.
 *
 * Called from onclick in index.html:
 *   onclick="selectSize(this, 420)"  ← pass the price for that size
 *
 * @param {HTMLElement} btn       - the button that was clicked
 * @param {number}      thisPrice - price for the selected size
 */
function selectSize(btn, thisPrice) {
  const cardBody   = btn.closest('.pizza-card-body');
  const allBtns    = cardBody.querySelectorAll('.size-btn');
  const priceEl    = cardBody.querySelector('.price-val');
  const sizeLabel  = cardBody.querySelector('.size-label');

  /* Toggle active state */
  allBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  /* Update displayed price */
  priceEl.textContent  = thisPrice.toLocaleString();
  sizeLabel.textContent = btn.textContent.trim() === '12"' ? '· 12 inch' : '· 14 inch';
}

/* ══════════════════════════════════════════════════════════════
   EVENTS PHOTO MODAL
══════════════════════════════════════════════════════════════ */
/**
 * openEventModal — opens the photo gallery modal for either
 * 'catering' or 'events'. Called from onclick on the service cards.
 * @param {string} type - 'catering' | 'events'
 */
function openEventModal(type) {
  const modal = document.getElementById('modal-' + type);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden'; /* prevent background scroll */
}

/**
 * closeEventModal — closes the specified modal.
 * @param {string} type - 'catering' | 'events'
 */
function closeEventModal(type) {
  const modal = document.getElementById('modal-' + type);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* Close modal when clicking the dark backdrop (outside the content) */
document.querySelectorAll('.events-modal').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

/* ══════════════════════════════════════════════════════════════
   FULLSCREEN IMAGE VIEWER
══════════════════════════════════════════════════════════════ */
let _viewerImgs = []; /* All image srcs for the current modal */
let _viewerIdx  = 0;  /* Index of the currently displayed image */

/**
 * openImgViewer — opens fullscreen view for a specific image
 * within a modal gallery.
 * @param {string} type - 'catering' | 'events'
 * @param {number} idx  - index of the image clicked
 */
function openImgViewer(type, idx) {
  const modal  = document.getElementById('modal-' + type);
  _viewerImgs  = Array.from(modal.querySelectorAll('.modal-gallery-item img')).map(i => i.src);
  _viewerIdx   = idx;

  const viewer = document.getElementById('img-viewer');
  document.getElementById('img-viewer-img').src = _viewerImgs[idx];
  viewer.classList.add('open');
}

/** closeImgViewer — closes the fullscreen viewer */
function closeImgViewer() {
  document.getElementById('img-viewer').classList.remove('open');
  document.getElementById('img-viewer-img').src = '';
}

/**
 * shiftImg — moves forward (+1) or backward (-1) through the images.
 * Wraps around at both ends.
 * @param {number} dir - +1 (next) or -1 (previous)
 */
function shiftImg(dir) {
  _viewerIdx = (_viewerIdx + dir + _viewerImgs.length) % _viewerImgs.length;
  document.getElementById('img-viewer-img').src = _viewerImgs[_viewerIdx];
}

/* Keyboard navigation */
document.addEventListener('keydown', e => {
  const viewer = document.getElementById('img-viewer');

  if (viewer && viewer.classList.contains('open')) {
    if (e.key === 'ArrowRight') shiftImg(1);
    if (e.key === 'ArrowLeft')  shiftImg(-1);
    if (e.key === 'Escape')     closeImgViewer();
    return;
  }

  if (e.key === 'Escape') {
    /* Close any open events modal */
    document.querySelectorAll('.events-modal.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
    /* Close any open full menu modal */
    document.querySelectorAll('.menu-modal.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
    /* Close any open branch modal */
    document.querySelectorAll('.branch-modal.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });

  }
});

/* ══════════════════════════════════════════════════════════════
   SMOOTH SCROLL (accounts for fixed nav height)
══════════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = document.getElementById('main-nav')?.offsetHeight || 84;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navHeight,
        behavior: 'smooth',
      });
    }
  });
});

/* ══════════════════════════════════════════════════════════════
   NAV — shadow on scroll
══════════════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});
