(function () {
  var T = {
    pt: {
      'hero.greeting': 'Oi, meu nome é',
      'skip.link': 'Pular para o conteúdo',
      'nav.about': 'sobre mim',
      'nav.apps': 'meus apps',
      'hero.tagline': 'Eu <strong>investigo, analiso e faço diagnósticos de hardware</strong> e sistemas — e, nas horas vagas, aplicações web e landing pages.',
      'hero.sub': 'Sou entusiasta de tecnologia no geral: testo ferramentas novas, trabalho com agentes de IA e LLMs — mas quem conduz, revisa e valida sou eu. Aprendo na prática.',
      'what.title': 'sobre mim',
      'what.intro': 'Sou apaixonado por tecnologia desde sempre. Me formei em Análise e Desenvolvimento de Sistemas — gosto de aprender como as tecnologias funcionam, de entender o hardware por dentro. Comecei montando e consertando computadores, e continuo aprendendo — agora com agentes de IA, que me abriram novas possibilidades de tirar minhas ideias do papel.',
      'what.hw': 'Faço diagnósticos e instalações de hardware. Desenvolvi também um wrapper para recuperar e certificar HDDs mecânicos — <a href="https://github.com/dmpmuniz/OldButGold" rel="noopener noreferrer">OldButGold</a>.',
      'what.sys': 'sistemas',
      'what.sys.desc': 'Instalo, configuro e otimizo Windows e Linux — e troubleshooting quando preciso.',
      'what.web': 'Desenvolvo aplicações web e landing pages para microempresários e comércio local',
      'apps.title': 'meus apps',
      'apps.obg': 'Criei o OldButGold para uso pessoal, mas vi que pode ajudar outras pessoas — um wrapper que une SMART, badblocks e GPT para recuperar e certificar HDDs mecânicos: o que antes era um monte de comandos no terminal vira poucos passos.',
      'apps.axon': 'A ideia desse app surgiu de uma necessidade real do meu personal trainer: treinos com IA, gestão de alunos, execução offline.',
      'proj.title': 'outros projetos',
      'proj.cwm': 'Landing page do Grupo CWM — soluções em empreendimentos: topografia, marinha, SPU e GRAPROHAB.',
      'proj.prado': 'Landing page do Grupo Prado — gestora de obras em Ilhabela e região.',
      'proj.delucca': 'Site institucional da De Lucca Arquitetura — arquitetura e construção em Itaguassu.',
      'contact.title': 'contato',
      'theme.light': 'Tema claro',
      'theme.dark': 'Tema escuro',
      'foot.made': 'Criado com 🤍 🥰 😤 😭 e muito 😍 desde 2023.',
      'foot.credits': '© 2023–2026 Daniel Muniz · feito com agentes de IA'
    },
    en: {
      'hero.greeting': 'Hi, I\u2019m',
      'skip.link': 'Skip to content',
      'nav.about': 'about me',
      'nav.apps': 'my apps',
      'hero.tagline': 'I <strong>investigate, analyze and diagnose</strong> hardware and systems — and, in my spare time, web apps and landing pages.',
      'hero.sub': 'I\u2019m a tech enthusiast in general: I test new tools and work with AI agents and LLMs — but I\u2019m the one who leads, reviews and validates. I learn by doing.',
      'what.title': 'about me',
      'what.intro': 'I\u2019ve always been passionate about technology. I got a degree in Systems Analysis and Development — I love learning how technologies work, understanding hardware from the inside. I started building and fixing computers, and I keep learning — now with AI agents, which opened new possibilities to turn my ideas into reality.',
      'what.hw': 'I do hardware diagnostics and installations. I also built a wrapper to recover and certify mechanical HDDs — <a href="https://github.com/dmpmuniz/OldButGold" rel="noopener noreferrer">OldButGold</a>.',
      'what.sys': 'systems',
      'what.sys.desc': 'I install, set up and optimize Windows and Linux — and troubleshoot when needed.',
      'what.web': 'I develop web apps and landing pages for small businesses and local commerce',
      'apps.title': 'my apps',
      'apps.obg': 'I built OldButGold for personal use, but I saw it could help others — a wrapper that combines SMART, badblocks and GPT to recover and certify mechanical HDDs: what used to be a bunch of terminal commands becomes a few steps.',
      'apps.axon': 'This app came from a real need of my personal trainer: AI workouts, student management, offline execution.',
      'proj.title': 'other projects',
      'proj.cwm': 'Landing page for Grupo CWM — development solutions: surveying, marine services, SPU and GRAPROHAB.',
      'proj.prado': 'Landing page for Grupo Prado — construction management in Ilhabela and region.',
      'proj.delucca': 'Institutional website for De Lucca Arquitetura — architecture and construction in Itaguassu.',
      'contact.title': 'contact',
      'theme.light': 'Light theme',
      'theme.dark': 'Dark theme',
      'foot.made': 'Made with 🤍 🥰 😤 😭 and lots of 😍 since 2023.',
      'foot.credits': '© 2023–2026 Daniel Muniz · built with AI agents'
    }
  };

  var META = {
    title: {
      pt: 'dmpmuniz — investigo e diagnostico',
      en: 'dmpmuniz — I investigate and diagnose'
    },
    description: {
      pt: 'Daniel Muniz — investigo, analiso e diagnostico: hardware e sistemas — e, nas horas vagas, aplicações web e landing pages. IA acelera, eu conduzo, reviso e valido.',
      en: 'Daniel Muniz — I investigate, analyze and diagnose: hardware and systems — and, in my spare time, web apps and landing pages. AI accelerates, I lead, review and validate.'
    }
  };

  function syncButtons(lang) {
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      var active = b.dataset.lang === lang;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function apply(lang) {
    var dict = T[lang] || T.pt;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (dict[el.dataset.i18n] !== undefined) {
        el.innerHTML = dict[el.dataset.i18n];
      }
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      if (dict[el.dataset.i18nAria] !== undefined) {
        el.setAttribute('aria-label', dict[el.dataset.i18nAria]);
      }
    });
    document.documentElement.lang = lang;
    document.title = META.title[lang];
    document.querySelector('meta[name="description"]').setAttribute('content', META.description[lang]);
    document.querySelector('meta[property="og:description"]').setAttribute('content', META.description[lang]);
    document.querySelector('meta[name="twitter:description"]').setAttribute('content', META.description[lang]);
    syncButtons(lang);
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  var saved = 'pt';
  try { saved = localStorage.getItem('lang') || 'pt'; } catch (e) {}
  if (T[saved] === undefined) saved = 'pt';
  apply(saved);

  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      apply(b.dataset.lang);
    });
  });
})();

(function () {
  var buttons = document.querySelectorAll('[data-theme]');
  if (!buttons.length) return;

  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var current = (saved === 'light' || saved === 'dark') ? saved : (systemDark ? 'dark' : 'light');

  function applyTheme(theme) {
    document.documentElement.style.colorScheme = theme;
    buttons.forEach(function (b) {
      var active = b.dataset.theme === theme;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  applyTheme(current);

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      applyTheme(b.dataset.theme);
      try { localStorage.setItem('theme', b.dataset.theme); } catch (e) {}
    });
  });
})();

(function () {
  var contact = document.querySelector('#contato');
  if (contact) contact.classList.add('visible');

  var sections = document.querySelectorAll('.sec:not(#contato)');

  if (!('IntersectionObserver' in window)) {
    sections.forEach(function (s) { s.classList.add('visible'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      e.target.classList.toggle('visible', e.isIntersecting);
    });
  }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' });

  sections.forEach(function (s) { io.observe(s); });
})();