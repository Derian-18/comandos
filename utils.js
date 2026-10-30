/* utils.js · Helpers puros y almacenamiento seguro */
window.CS = window.CS || {};

CS.utils = (() => {
  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ESC[c]);
  const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  /** Escapa el texto y resalta las coincidencias de la búsqueda. */
  function hl(text, q) {
    if (!q) return esc(text);
    const re = new RegExp(`(${escRe(q)})`, 'ig');
    return text.split(re).map((p, i) => (i % 2 ? `<mark>${esc(p)}</mark>` : esc(p))).join('');
  }

  /** Formatea un comando: marca los <placeholders> y resalta la búsqueda. */
  function fmtCmd(cmd, q) {
    return cmd
      .split(/(<[\wáéíóúñ.\-]+>)/i)
      .map(p => (/^<[\wáéíóúñ.\-]+>$/i.test(p) ? `<span class="ph">${hl(p, q)}</span>` : hl(p, q)))
      .join('');
  }

  /** Texto con `código` en línea. */
  function fmtRich(text) {
    return esc(text).replace(/`([^`]+)`/g, '<code class="inline">$1</code>');
  }

  const debounce = (fn, ms = 120) => {
    let t;
    return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
  };

  return { esc, hl, fmtCmd, fmtRich, debounce };
})();

CS.store = (() => {
  const read = (k, d) => {
    try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; }
  };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin storage */ } };
  const favs = new Set(read('cs:favs', []));
  return {
    read, write, favs,
    saveFavs: () => write('cs:favs', [...favs])
  };
})();