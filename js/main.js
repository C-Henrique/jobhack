/* ─── Presets data ─────────────────────────────────────── */
const presets = [
  { name: 'Gerente de Marketing', desc: 'Vagas sênior com foco em estratégia e gestão de equipes', cargo: 'gerente de marketing', jobSites: ['linkedin.com'], keywords: ['estratégia', 'gestão', 'liderança', 'KPIs'], nivel: 'gerente OR coordenador', regime: '' },
  { name: 'Analista de Marketing Digital', desc: 'Vagas de performance e tráfego pago', cargo: 'analista de marketing digital', jobSites: ['gupy.io', 'linkedin.com'], keywords: ['Google Ads', 'Meta Ads', 'tráfego pago', 'ROI'], nivel: 'pleno', regime: 'remoto' },
  { name: 'Coordenador de Growth', desc: 'Vagas de growth com foco em retenção e funil de conversão', cargo: 'growth hacker', jobSites: ['linkedin.com', 'vagas.com.br'], keywords: ['funil', 'retenção', 'churn', 'conversão', 'CRO'], nivel: 'pleno', regime: 'híbrido' },
  { name: 'Especialista em Conteúdo', desc: 'Vagas de produção de conteúdo e inbound marketing', cargo: 'analista de conteúdo', jobSites: ['infojobs.com.br', 'gupy.io'], keywords: ['copywriting', 'SEO', 'blog', 'produção de conteúdo'], nivel: '', regime: 'remoto' },
  { name: 'Head de Branding', desc: 'Posições estratégicas de identidade e posicionamento', cargo: 'head de branding', jobSites: ['linkedin.com'], keywords: ['identidade visual', 'posicionamento', 'brand strategy'], nivel: 'senior OR sênior', regime: '' },
  { name: 'Desenvolvedor Full Stack', desc: 'Vagas de dev com stack moderna e trabalho remoto', cargo: 'desenvolvedor full stack', jobSites: ['linkedin.com', 'indeed.com'], keywords: ['React', 'Node.js', 'API REST', 'remoto'], nivel: 'pleno', regime: 'remoto' },
];

(function renderPresets() {
  const grid = document.getElementById('presetsGrid');
  presets.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'preset-card';
    card.innerHTML = `
        <span class="preset-badge">preset #${String(i + 1).padStart(2, '0')}</span>
        <div class="preset-name">${p.name}</div>
        <div class="preset-desc">${p.desc}</div>
      `;
    card.onclick = () => applyPreset(p);
    grid.appendChild(card);
  });
})();


document.querySelectorAll('#areaChips .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.getElementById('cargoInput').value = chip.dataset.val;
    document.getElementById('cargoInput').focus();
    chip.classList.add('active');
    setTimeout(() => chip.classList.remove('active'), 400);
  });
});

document.querySelectorAll('#siteChips .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('#siteChips .chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
  });
});

document.querySelectorAll('#jobSiteChips .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    if (chip.dataset.val === '') {
      document.querySelectorAll('#jobSiteChips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    } else {
      document.querySelector('#jobSiteChips .chip[data-val=""]').classList.remove('active');
      chip.classList.toggle('active');
      const anyActive = [...document.querySelectorAll('#jobSiteChips .chip')]
        .some(c => c.dataset.val !== '' && c.classList.contains('active'));
      if (!anyActive) document.querySelector('#jobSiteChips .chip[data-val=""]').classList.add('active');
    }
  });
});

document.querySelectorAll('#opChips .chip').forEach(chip => {
  chip.addEventListener('click', () => chip.classList.toggle('active'));
});

let keywords = [];

document.getElementById('kwInput').addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    addKeyword();
  }
  if (e.key === 'Backspace' && e.target.value === '' && keywords.length) {
    keywords.pop();
    renderTags();
  }
});

document.getElementById('kwInput').addEventListener('keyup', e => {
  if (e.key === 'Enter') addKeyword();
});

function addKeyword() {
  const input = document.getElementById('kwInput');
  const val = input.value.trim().replace(/,$/, '');
  if (val && !keywords.includes(val)) {
    keywords.push(val);
    renderTags();
  }
  input.value = '';
  input.focus();
}

document.getElementById('kwWrap').addEventListener('click', e => {
  if (!e.target.closest('.btn-kw-add') && !e.target.closest('.remove')) {
    document.getElementById('kwInput').focus();
  }
});

function renderTags() {
  const wrap = document.getElementById('kwWrap');
  wrap.querySelectorAll('.kw-tag').forEach(t => t.remove());
  keywords.forEach((kw, i) => {
    const tag = document.createElement('div');
    tag.className = 'kw-tag';
    tag.innerHTML = `${kw}<span class="remove" data-i="${i}">×</span>`;
    tag.querySelector('.remove').onclick = e => {
      keywords.splice(parseInt(e.target.dataset.i), 1);
      renderTags();
    };
    wrap.insertBefore(tag, document.getElementById('kwInput'));
  });
}

document.getElementById('kwWrap').onclick = () => document.getElementById('kwInput').focus();

function getActiveChips(id) {
  return [...document.querySelectorAll(`#${id} .chip.active`)].map(c => c.dataset.val);
}

function getSelectedEngine() {
  return document.querySelector('#siteChips .chip.active') || null;
}

function setQueryReady(hasQuery) {
  const box = document.getElementById('queryBox');
  const searchBtn = document.getElementById('searchLink');
  const copyBtn = document.getElementById('copyBtn');
  if (hasQuery) {
    box.classList.add('has-query');
    searchBtn.classList.add('has-query');
    copyBtn.classList.add('copy-ready');
    setTimeout(() => searchBtn.focus(), 50);
  } else {
    box.classList.remove('has-query');
    searchBtn.classList.remove('has-query');
    copyBtn.classList.remove('copy-ready');
    searchBtn.blur();
  }
}

function buildQuery() {
  const cargo = document.getElementById('cargoInput').value.trim();
  const jobSites = getActiveChips('jobSiteChips').filter(v => v !== '');
  const ops = getActiveChips('opChips');
  const regime = document.getElementById('regimeSelect').value;
  const nivel = document.getElementById('nivelSelect').value;
  const formacao = document.getElementById('formacaoSelect').value;
  const location = document.getElementById('locationInput').value.trim();
  
  
  const parts = [];
  
  if (location) parts.push(`"${location}"`);
  if (cargo) parts.push(ops.includes('intitle') ? `intitle:"${cargo}"` : `"${cargo}"`);

  if (keywords.length) {
    parts.push(ops.includes('intext')
      ? `intext:(${keywords.map(k => `"${k}"`).join(' OR ')})`
      : keywords.map(k => `"${k}"`).join(' ')
    );
  }

  if (!ops.includes('intitle')) parts.unshift('(vaga OR "oportunidade" OR "estamos contratando")');
  if (regime) parts.push(`"${regime}"`);
  if (nivel) parts.push(`(${nivel})`);
  if (formacao) parts.push(`"${formacao}"`);
  if (ops.includes('filetype:pdf')) parts.push('filetype:pdf');

  let siteStr = '';
  if (jobSites.length === 1) {
    siteStr = `site:${jobSites[0]}`;
    if (ops.includes('inurl')) siteStr += ' inurl:jobs';
  } else if (jobSites.length > 1) {
    siteStr = `(${jobSites.map(s => `site:${s}`).join(' OR ')})`;
  }

  const query = [siteStr, ...parts].filter(Boolean).join(' ');

  const highlighted = query
    .replace(/(site:|intitle:|intext:|inurl:|filetype:)/g, '<span class="op">$1</span>')
    .replace(/"([^"]+)"/g, '<span class="str">"$1"</span>')
    .replace(/\b(OR|AND|NOT)\b/g, '<span class="op">$1</span>');

  document.getElementById('queryOutput').innerHTML = highlighted ||
    '<span style="color:#666">Preencha o cargo e clique em <span style="color:#4ade80;font-weight:600">▶ GERAR</span></span>';

  const engine = getSelectedEngine();
  const url = engine ? engine.dataset.url : 'https://www.google.com/search?q=';
  document.getElementById('searchLink').href = query ? url + encodeURIComponent(query) : '#';

  setQueryReady(!!query);
}

function copyQuery() {
  const text = document.getElementById('queryOutput').innerText;
  if (!text || text.includes('Preencha')) return;
  navigator.clipboard.writeText(text).then(() => {
    const t = document.getElementById('toast');
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  });
}

function applyPreset(p) {
  document.getElementById('cargoInput').value = p.cargo || '';

  document.querySelectorAll('#jobSiteChips .chip').forEach(c => {
    c.classList.toggle('active', p.jobSites.includes(c.dataset.val));
  });
  const anyActive = [...document.querySelectorAll('#jobSiteChips .chip')]
    .some(c => c.dataset.val !== '' && c.classList.contains('active'));
  if (!anyActive) document.querySelector('#jobSiteChips .chip[data-val=""]').classList.add('active');

  keywords = [...p.keywords];
  renderTags();

  document.getElementById('nivelSelect').value = p.nivel || '';
  document.getElementById('regimeSelect').value = p.regime || '';

  if (window.innerWidth <= 768) {
    const jobSitesActive = p.jobSites && p.jobSites.length > 0;
    if (jobSitesActive) document.getElementById('panel-sites').classList.remove('collapsed');
    if (p.keywords && p.keywords.length > 0) document.getElementById('panel-sugestoes').classList.remove('collapsed');
  }

  buildQuery();
  document.getElementById('queryBox').scrollIntoView({ behavior: 'smooth' });
}

function applyRandomPreset() {
  applyPreset(presets[Math.floor(Math.random() * presets.length)]);
  const btn = document.querySelector('.random-btn .dice');
  if (btn) {
    btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    btn.style.transform = 'rotate(360deg)';
    setTimeout(() => { btn.style.transform = 'rotate(0deg)'; btn.style.transition = ''; }, 550);
  }
}

function clearAll() {
  document.getElementById('cargoInput').value = '';
  document.getElementById('regimeSelect').value = '';
  document.getElementById('locationInput').value = '';
  document.getElementById('nivelSelect').value = '';
  document.getElementById('formacaoSelect').value = '';

  keywords = [];
  renderTags();

  document.querySelectorAll('#siteChips .chip').forEach(c => c.classList.remove('active'));
  document.querySelector('#siteChips .chip[data-val="google"]').classList.add('active');

  document.querySelectorAll('#jobSiteChips .chip').forEach(c => c.classList.remove('active'));
  document.querySelector('#jobSiteChips .chip[data-val=""]').classList.add('active');

  document.querySelectorAll('#opChips .chip').forEach(c => c.classList.remove('active'));
  document.querySelector('#opChips .chip[data-val="intitle"]').classList.add('active');

  document.getElementById('queryOutput').innerHTML =
    '<span style="color:#666">Preencha o cargo e clique em <span style="color:#4ade80;font-weight:600">▶ GERAR</span></span>';
  document.getElementById('searchLink').href = '#';

  setQueryReady(false);
}

function showTutorial() {
  const o = document.getElementById('tutorialOverlay');
  o.style.display = 'flex';
  o.style.animation = 'none';
  void o.offsetWidth;
  o.style.animation = '';
}

function closeTutorial() {
  const o = document.getElementById('tutorialOverlay');
  o.style.opacity = '0';
  o.style.transition = 'opacity 0.2s';
  setTimeout(() => { o.style.display = 'none'; o.style.opacity = ''; o.style.transition = ''; }, 200);
  try { localStorage.setItem('jobhack_visited', '1'); } catch (e) { }
}

function togglePanel(id) {
  if (window.innerWidth > 768) return;
  document.getElementById(id).classList.toggle('collapsed');
}

function collapseOnMobile() {
  const mobile = window.innerWidth <= 768;
  ['panel-sugestoes', 'panel-sites', 'panel-ops'].forEach(id => {
    document.getElementById(id).classList.toggle('collapsed', mobile);
  });
}

collapseOnMobile();
window.addEventListener('resize', collapseOnMobile);

/* ─── Init ─────────────────────────────────────────────── */
try {
  if (!localStorage.getItem('jobhack_visited')) setTimeout(showTutorial, 600);
} catch (e) {
  setTimeout(showTutorial, 600);
}

buildQuery();