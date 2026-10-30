/* ui.js · Interacciones: copiar, toast, tema, scrollspy, volver arriba */
window.CS = window.CS || {};

CS.ui = (() => {
  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 1800);
  }

  /* ---------- Copiar ---------- */
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch { /* noop */ }
      ta.remove();
      return ok;
    }
  }

  async function handleCopy(btn) {
    const ok = await copyText(btn.dataset.copy);
    if (!ok) return toast('No se pudo copiar');
    const prev = btn.textContent;
    btn.textContent = '¡Copiado!';
    btn.classList.add('copied');
    toast('Comando copiado al portapapeles');
    setTimeout(() => { btn.textContent = prev; btn.classList.remove('copied'); }, 1500);
  }

  /* ---------- Tema ---------- */
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    }
  }
  function initTheme() {
    applyTheme(document.documentElement.dataset.theme || 'dark');
    document.getElementById('themeToggle')?.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      CS.store.write('cs:theme', next);
    });
  }

  /* ---------- Scrollspy ---------- */
  let observer;
  function initSpy() {
    observer?.disconnect();
    const links = new Map([...document.querySelectorAll('[data-spy]')].map(a => [a.dataset.spy, a]));
    if (!links.size || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(a => a.classList.remove('active'));
        links.get(e.target.id)?.classList.add('active');
      });
    }, { rootMargin: '-120px 0px -65% 0px' });
    document.querySelectorAll('.tech-card').forEach(c => observer.observe(c));
  }

  /* ---------- Volver arriba ---------- */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 400), { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  return { toast, handleCopy, initTheme, initSpy, initBackToTop };
})();