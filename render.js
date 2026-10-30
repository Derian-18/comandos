/* render.js · Filtrado y generación del HTML (sin efectos secundarios) */
window.CS = window.CS || {};

CS.render = (() => {
  const { esc, hl, fmtCmd, fmtRich } = CS.utils;
  const OS_LABEL = { win: 'Windows', unix: 'Linux · macOS' };

  /** Devuelve las tecnologías visibles según búsqueda, grupo y favoritos. */
  function filter(state) {
    const q = state.query.trim().toLowerCase();
    const onlyFavs = state.group === 'favs';
    const result = [];

    for (const tech of CS.data.techs) {
      if (!onlyFavs && state.group !== 'all' && tech.group !== state.group) continue;
      const techHit = q && `${tech.name} ${tech.desc}`.toLowerCase().includes(q);
      const sections = [];

      for (const sec of tech.sections) {
        const secHit = q && sec.title.toLowerCase().includes(q);
        const items = sec.items.filter(([cmd, note]) => {
          if (onlyFavs && !CS.store.favs.has(cmd)) return false;
          if (!q || techHit || secHit) return true;
          return `${cmd} ${note || ''}`.toLowerCase().includes(q);
        });
        if (items.length) sections.push({ ...sec, items });
      }
      if (sections.length) result.push({ ...tech, sections });
    }
    return result;
  }

  const countCmds = techs => techs.reduce((n, t) => n + t.sections.reduce((m, s) => m + s.items.length, 0), 0);

  function itemHTML([cmd, note, os], q) {
    const fav = CS.store.favs.has(cmd);
    return `
      <li class="cmd">
        <div class="cmd-body">
          <code class="cmd-code">${fmtCmd(cmd, q)}</code>
          <p class="cmd-note">${note ? hl(note, q) : ''}${os ? `<span class="os os-${os}">${OS_LABEL[os]}</span>` : ''}</p>
        </div>
        <div class="cmd-actions">
          <button class="icon-btn fav-btn" data-cmd="${esc(cmd)}" aria-pressed="${fav}"
                  aria-label="${fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}" title="Favorito">${fav ? '★' : '☆'}</button>
          <button class="copy-btn" data-copy="${esc(cmd)}" aria-label="Copiar comando">Copiar</button>
        </div>
      </li>`;
  }

  function cardHTML(tech, state) {
    const q = state.query.trim();
    const total = tech.sections.reduce((n, s) => n + s.items.length, 0);
    const sections = tech.sections.map(sec => `
      <div class="sec">
        <h4 class="sec-title">${fmtRich(sec.title)}</h4>
        <ul class="cmd-list">${sec.items.map(i => itemHTML(i, q)).join('')}</ul>
      </div>`).join('');
    const tip = tech.tip && !q && state.group !== 'favs'
      ? `<aside class="tip"><span aria-hidden="true">💡</span><p>${fmtRich(tech.tip)}</p></aside>` : '';

    return `
      <section id="${tech.id}" class="tech-card" data-group="${tech.group}" style="--c:${tech.color}">
        <header class="tech-header">
          <span class="badge" aria-hidden="true">${esc(tech.badge)}</span>
          <div class="tech-title">
            <h3>${hl(tech.name, q)}</h3>
            <p>${esc(tech.desc)}</p>
          </div>
          <span class="count">${total}</span>
        </header>
        ${sections}
        ${tip}
      </section>`;
  }

  function mainHTML(techs, state) {
    if (!techs.length) {
      const favs = state.group === 'favs';
      return `
        <div class="empty">
          <div class="empty-icon" aria-hidden="true">${favs ? '☆' : '🔍'}</div>
          <h3>${favs ? 'Aún no tienes favoritos' : 'Sin resultados'}</h3>
          <p>${favs
            ? 'Pulsa la estrella ☆ junto a un comando para guardarlo aquí.'
            : `No encontré nada para “${esc(state.query)}”. Prueba con otra palabra, como <em>docker</em>, <em>migrate</em> o <em>branch</em>.`}</p>
          <button class="chip" data-reset>Limpiar filtros</button>
        </div>`;
    }
    return techs.map(t => cardHTML(t, state)).join('');
  }

  function sidebarHTML(techs) {
    return CS.data.groups.map(g => {
      const list = techs.filter(t => t.group === g.id);
      if (!list.length) return '';
      return `
        <div class="nav-group">
          <p class="nav-label">${g.emoji} ${esc(g.label)}</p>
          <ul>${list.map(t => `
            <li><a href="#${t.id}" data-spy="${t.id}" style="--c:${t.color}">
              <span class="dot"></span>${esc(t.name)}</a></li>`).join('')}
          </ul>
        </div>`;
    }).join('');
  }

  function chipsHTML(state) {
    const favCount = CS.store.favs.size;
    const mk = (id, label, extra = '') =>
      `<button class="chip${state.group === id ? ' active' : ''}" data-group="${id}" aria-pressed="${state.group === id}">${label}${extra}</button>`;
    return [
      mk('all', 'Todo'),
      ...CS.data.groups.map(g => mk(g.id, `${g.emoji} ${esc(g.label)}`)),
      mk('favs', '★ Favoritos', `<span class="chip-count">${favCount}</span>`)
    ].join('');
  }

  return { filter, countCmds, mainHTML, sidebarHTML, chipsHTML };
})();