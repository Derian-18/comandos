/* main.js · Estado de la app y conexión entre módulos */
console.log('Proyecto para tener todo organizado y poder visualizar comandos de distintos lenguajes y frameworks');
console.log('%c' + [
  '██████╗ ███████╗██████╗ ██╗ █████╗ ███╗   ██╗    ██╗',
  '██╔══██╗██╔════╝██╔══██╗██║██╔══██╗████╗  ██║    ██║',
  '██║  ██║█████╗  ██████╔╝██║███████║██╔██╗ ██║    ██║',
  '██║  ██║██╔══╝  ██╔══██╗██║██╔══██║██║╚██╗██║██╗ ██║',
  '██████╔╝███████╗██║  ██║██║██║  ██║██║ ╚████║╚█║ ╚█████╔╝',
  '╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚╝  ╚════╝'
].join('\n'), 'color:#00ffcc;font-family:monospace;font-weight:bold;');

document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);
  const els = {
    main: $('mainContent'), sidebar: $('sidebarNav'), chips: $('chips'),
    search: $('search'), clear: $('clearSearch'), stats: $('stats'), result: $('resultInfo')
  };
  const state = { query: '', group: CS.store.read('cs:group', 'all') };
  if (state.group === 'favs' && !CS.store.favs.size) state.group = 'all';

  function render() {
    const techs = CS.render.filter(state);
    els.main.innerHTML = CS.render.mainHTML(techs, state);
    els.sidebar.innerHTML = CS.render.sidebarHTML(techs);
    els.chips.innerHTML = CS.render.chipsHTML(state);
    els.clear.hidden = !state.query;

    const n = CS.render.countCmds(techs);
    els.result.textContent = state.query || state.group !== 'all'
      ? `${n} comando${n === 1 ? '' : 's'} en ${techs.length} tecnología${techs.length === 1 ? '' : 's'}`
      : '';
    CS.ui.initSpy();
  }

  function renderStats() {
    const all = CS.data.techs;
    els.stats.innerHTML =
      `<span><strong>${all.length}</strong> tecnologías</span><span><strong>${CS.render.countCmds(all)}</strong> comandos</span>`;
  }

  function reset() {
    state.query = ''; state.group = 'all'; els.search.value = '';
    CS.store.write('cs:group', 'all');
    render();
  }

  /* Búsqueda */
  els.search.addEventListener('input', CS.utils.debounce(() => {
    state.query = els.search.value;
    render();
  }));
  els.clear.addEventListener('click', () => { els.search.value = ''; state.query = ''; render(); els.search.focus(); });

  /* Clicks delegados */
  document.addEventListener('click', e => {
    const t = e.target;
    const chip = t.closest('[data-group]');
    if (chip && chip.classList.contains('chip')) {
      state.group = chip.dataset.group;
      CS.store.write('cs:group', state.group);
      render();
      return;
    }
    if (t.closest('[data-reset]')) return reset();

    const copy = t.closest('[data-copy]');
    if (copy) return CS.ui.handleCopy(copy);

    const fav = t.closest('.fav-btn');
    if (fav) {
      const cmd = fav.dataset.cmd;
      const on = !CS.store.favs.has(cmd);
      on ? CS.store.favs.add(cmd) : CS.store.favs.delete(cmd);
      CS.store.saveFavs();
      CS.ui.toast(on ? 'Añadido a favoritos' : 'Quitado de favoritos');
      if (state.group === 'favs') return render();
      fav.setAttribute('aria-pressed', on);
      fav.textContent = on ? '★' : '☆';
      els.chips.innerHTML = CS.render.chipsHTML(state);
    }
  });

  /* Atajos: "/" o Ctrl+K enfocan la búsqueda, Esc la limpia */
  document.addEventListener('keydown', e => {
    const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
    if ((e.key === '/' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
      e.preventDefault(); els.search.focus(); els.search.select();
    } else if (e.key === 'Escape' && document.activeElement === els.search) {
      els.search.value = ''; state.query = ''; render(); els.search.blur();
    }
  });

  CS.ui.initTheme();
  CS.ui.initBackToTop();
  renderStats();
  render();
});