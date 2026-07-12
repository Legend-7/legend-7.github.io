/* =============================================
   LEGEND.DEV — MAIN SCRIPT
   ============================================= */

/* === PAGE LOADER === */
(function() {
  var fill = document.querySelector('.loader-fill');
  var pct  = document.getElementById('loader-pct');
  var val  = 0;
  var iv   = setInterval(function() {
    val += Math.random() * 18;
    if (val >= 100) { val = 100; clearInterval(iv); }
    var v = Math.floor(val);
    if (fill) fill.style.width = v + '%';
    if (pct)  pct.textContent  = v + '%';
    if (val >= 100) {
      setTimeout(function() {
        var loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
        initHeroCanvas();
        startCounters();
      }, 300);
    }
  }, 80);
})();

/* === CUSTOM CURSOR === */
var cursor   = document.getElementById('cursor');
var follower = document.getElementById('cursor-follower');
var mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', function(e) {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animF() {
  fx += (mx - fx) * 0.1;
  fy += (my - fy) * 0.1;
  follower.style.left = fx + 'px';
  follower.style.top  = fy + 'px';
  requestAnimationFrame(animF);
})();

document.querySelectorAll('a, button, .project-card, .service-card, .tech-icon, .timeline-card, .skill-category').forEach(function(el) {
  el.addEventListener('mouseenter', function() {
    cursor.style.width    = '14px';
    cursor.style.height   = '14px';
    follower.style.width  = '52px';
    follower.style.height = '52px';
    follower.style.borderColor = 'rgba(168,85,247,0.9)';
  });
  el.addEventListener('mouseleave', function() {
    cursor.style.width    = '8px';
    cursor.style.height   = '8px';
    follower.style.width  = '32px';
    follower.style.height = '32px';
    follower.style.borderColor = 'rgba(168,85,247,0.6)';
  });
});

/* === NAVBAR === */
var navbar = document.getElementById('navbar');
var stickyCta = document.getElementById('sticky-cta');
var heroSection = document.getElementById('hero');
window.addEventListener('scroll', function() {
  var sy = window.scrollY;
  navbar.classList.toggle('scrolled', sy > 50);
  updateActiveNav();
  if (stickyCta) {
    stickyCta.classList.toggle('visible', sy > (heroSection ? heroSection.offsetHeight * 0.7 : 400));
  }
});

/* === MOBILE NAV === */
var burger    = document.getElementById('hamburger');
var mobileNav = document.getElementById('mobile-nav');
var burgerSpans = burger.querySelectorAll('span');

burger.addEventListener('click', function() {
  mobileNav.classList.toggle('open');
  var isOpen = mobileNav.classList.contains('open');
  burgerSpans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
  burgerSpans[1].style.opacity   = isOpen ? '0' : '';
  burgerSpans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
});

function closeMobileNav() {
  mobileNav.classList.remove('open');
  burgerSpans[0].style.transform = '';
  burgerSpans[1].style.opacity   = '';
  burgerSpans[2].style.transform = '';
}

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var t = document.querySelector(this.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* === HERO CANVAS — ARCANE MAGICAL FIRE === */
function initHeroCanvas() {
  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Smoothed mouse position
  var mS = { x: W * 0.5, y: H * 0.7 }; // smoothed
  var mR = { x: W * 0.5, y: H * 0.7 }; // raw
  window.addEventListener('mousemove', function(e) { mR.x = e.clientX; mR.y = e.clientY; });

  var time = 0;

  // ── COLOUR PALETTE ─────────────────────────────────────────────────────────
  // heat 0→1: deep violet → magenta → orange → gold → pale yellow
  var PAL = [
    [0.00,  46,  8,  82],
    [0.20, 124, 38, 190],
    [0.43, 220, 38, 142],
    [0.67, 255,112,  28],
    [0.84, 255,196,  38],
    [1.00, 255,244, 176]
  ];
  function heatRgba(t, a) {
    t = Math.max(0, Math.min(1, t));
    var r=0,g=0,b=0;
    for (var i = 0; i < PAL.length-1; i++) {
      if (t <= PAL[i+1][0]) {
        var f = (t - PAL[i][0]) / (PAL[i+1][0] - PAL[i][0]);
        r = PAL[i][1] + (PAL[i+1][1]-PAL[i][1])*f;
        g = PAL[i][2] + (PAL[i+1][2]-PAL[i][2])*f;
        b = PAL[i][3] + (PAL[i+1][3]-PAL[i][3])*f;
        break;
      }
    }
    return 'rgba('+Math.round(r)+','+Math.round(g)+','+Math.round(b)+','+a.toFixed(3)+')';
  }

  // ── NOISE ──────────────────────────────────────────────────────────────────
  // 3-octave fBm
  function fbm(x, y) {
    return (Math.sin(x*2.1 + y*1.3 + time*1.05) * 0.500 +
            Math.sin(x*4.9 - y*3.2 - time*1.80) * 0.250 +
            Math.sin(x*9.5 + y*7.1 + time*0.72) * 0.125) / 0.875;
  }

  // ── FLAME TONGUES ──────────────────────────────────────────────────────────
  var NUM_TONGUES = 36;
  var tongues = [];
  for (var i = 0; i < NUM_TONGUES; i++) {
    tongues.push({
      xBase:   i / NUM_TONGUES,
      phase:   Math.random() * Math.PI * 2,
      speed:   0.55 + Math.random() * 0.85,
      wf:      0.022 + Math.random() * 0.048, // base width fraction of W
      hf:      0.38  + Math.random() * 0.62,  // height scale
      wobF:    0.7   + Math.random() * 0.9    // wobble intensity
    });
  }

  function drawTongues() {
    var mxN = mS.x / W;
    var myN = mS.y / H;
    // mouse Y position shifts intensity: lower mouse = bigger fire
    var yBoost = Math.max(0, myN - 0.3) * 0.8;

    for (var i = 0; i < NUM_TONGUES; i++) {
      var tg = tongues[i];

      // Slightly animate base X
      var xN  = tg.xBase + fbm(tg.xBase * 2.2, tg.phase * 0.1) * 0.025;
      xN = ((xN % 1) + 1) % 1;
      var cx  = xN * W;

      // Proximity to mouse X raises and brightens tongue
      var dxN = xN - mxN;
      var mb  = Math.exp(-dxN*dxN * 18) * (0.5 + yBoost);

      // Height from noise + mouse boost
      var n  = (fbm(xN * 4.2 + tg.phase, tg.xBase * 3.1) + 1) * 0.5; // 0-1
      // Keep the fire concentrated in the lower hero so it supports the artwork
      // without climbing behind the main headline.
      var h  = (0.035 + n * 0.19 + mb * 0.34) * tg.hf * H;
      h = Math.min(h, H * 0.62);

      // Width: wider near base and near cursor
      var w  = tg.wf * W * (0.35 + h/H) * (1 + mb * 0.6);

      // Tip wobble (makes flames sway)
      var wob = fbm(xN * 6.5 + tg.phase, tg.xBase * 5.3) * w * tg.wobF * 0.55;

      var tipX = cx + wob;
      var tipY = H - h;

      // Heat level for colour
      var heat = Math.min(1, 0.28 + n*0.38 + mb*0.34);

      // Vertical gradient: hot tip → cooler base
      var grad = ctx.createLinearGradient(tipX, tipY, cx, H);
      grad.addColorStop(0.00, heatRgba(heat,         0.00));
      grad.addColorStop(0.08, heatRgba(heat,         0.10 + mb*0.10));
      grad.addColorStop(0.38, heatRgba(heat * 0.78,  0.20 + mb*0.10));
      grad.addColorStop(0.72, heatRgba(heat * 0.48,  0.26 + mb*0.08));
      grad.addColorStop(1.00, heatRgba(heat * 0.22,  0.32));

      // Bezier flame silhouette: wide at base, narrow/curved at tip
      var hw   = w * 0.5;
      var cpY  = H - h * 0.52;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(cx - hw, H);
      ctx.quadraticCurveTo(tipX - hw * 0.30, cpY, tipX, tipY);
      ctx.quadraticCurveTo(tipX + hw * 0.30, cpY, cx + hw, H);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  // ── EMBERS & SPARKS ────────────────────────────────────────────────────────
  var EMBER_N = 130;
  var embers  = [];

  function mkEmber(scatter) {
    return {
      x:      scatter ? Math.random() * W : mS.x + (Math.random()-0.5) * W*0.38,
      y:      H * (0.60 + Math.random() * 0.40),
      vx:     (Math.random()-0.5) * 1.2,
      vy:     -(Math.random() * 3.2 + 0.8),
      r:      Math.random() * 1.9 + 0.4,
      life:   scatter ? Math.random() : 0,
      spark:  Math.random() < 0.18
    };
  }
  for (var i = 0; i < EMBER_N; i++) embers.push(mkEmber(true));

  function updateDrawEmbers(dt) {
    for (var i = 0; i < embers.length; i++) {
      var e = embers[i];
      // turbulence
      e.vx += Math.sin(e.y * 0.018 + time * 2.3) * 0.40 * dt;
      // weak mouse attraction
      e.vx += (mS.x - e.x) * 0.00028 * dt * 60;
      e.vx *= 0.988; e.vy *= 0.990;
      e.x  += e.vx;  e.y  += e.vy;
      e.life += dt * (0.26 + Math.random() * 0.14);

      if (e.life >= 1 || e.y < -25 || e.x < -60 || e.x > W+60) {
        embers[i] = mkEmber(false); continue;
      }

      var a    = Math.pow(1 - e.life, 0.85) * (e.spark ? 0.90 : 0.65);
      var heat = 0.45 + (1 - e.life) * 0.55;
      var rr   = e.r * (e.spark ? 5.0 : 2.8);

      ctx.save();
      ctx.globalCompositeOperation = e.spark ? 'lighter' : 'screen';
      var sg = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, rr);
      sg.addColorStop(0,   heatRgba(heat,        a));
      sg.addColorStop(0.4, heatRgba(heat * 0.72, a * 0.30));
      sg.addColorStop(1,   'transparent');
      ctx.fillStyle = sg;
      ctx.beginPath(); ctx.arc(e.x, e.y, rr, 0, Math.PI*2); ctx.fill();
      ctx.restore();
    }
  }

  // ── ARCANE RUNE WISPS ──────────────────────────────────────────────────────
  // Faint slow-drifting rune-like glyphs that rise and fade
  var GLYPHS = ['⬡','△','◇','⊕','⊗','✦','⟡','⟢','⊶','⊷','⌬','⎔'];
  var wisps = [];
  var WISP_N = 14;
  function mkWisp(scatter) {
    return {
      x:     scatter ? Math.random() * W : mS.x + (Math.random()-0.5) * 280,
      y:     scatter ? H * (0.4 + Math.random() * 0.6) : H * 0.9,
      vy:    -(Math.random() * 0.5 + 0.2),
      vx:    (Math.random()-0.5) * 0.35,
      life:  scatter ? Math.random() : 0,
      size:  14 + Math.random() * 22,
      glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      rot:   Math.random() * Math.PI * 2,
      rotV:  (Math.random()-0.5) * 0.008
    };
  }
  for (var i = 0; i < WISP_N; i++) wisps.push(mkWisp(true));

  function drawWisps() {
    for (var i = 0; i < wisps.length; i++) {
      var w = wisps[i];
      w.x   += w.vx; w.y += w.vy; w.rot += w.rotV;
      w.life += 0.0015;
      if (w.life >= 1 || w.y < -40) { wisps[i] = mkWisp(false); continue; }
      var a = Math.sin(w.life * Math.PI) * 0.22; // fade in + out
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.translate(w.x, w.y);
      ctx.rotate(w.rot);
      ctx.font = w.size + 'px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // heat colour near top of rise
      var heat = 0.3 + w.life * 0.45;
      ctx.fillStyle = heatRgba(heat, a);
      ctx.fillText(w.glyph, 0, 0);
      ctx.restore();
    }
  }

  // ── AMBIENT BASE GLOW ──────────────────────────────────────────────────────
  function drawBaseGlow() {
    var g = ctx.createRadialGradient(mS.x, H * 1.08, 0, mS.x, H * 1.08, W * 0.7);
    g.addColorStop(0,   'rgba(120,40,240,0.14)');
    g.addColorStop(0.42,'rgba(80,20,180,0.05)');
    g.addColorStop(1,   'transparent');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // secondary cyan bloom near cursor
    var g2 = ctx.createRadialGradient(mS.x, mS.y, 0, mS.x, mS.y, 220);
    g2.addColorStop(0,   'rgba(6,182,212,0.06)');
    g2.addColorStop(1,   'transparent');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);
  }

  // ── MAIN LOOP ──────────────────────────────────────────────────────────────
  var lastTs = 0;
  function animate(ts) {
    var dt = Math.min((ts - lastTs) / 1000, 0.05);
    lastTs = ts;
    time  += dt;

    mS.x += (mR.x - mS.x) * 0.07;
    mS.y += (mR.y - mS.y) * 0.07;

    ctx.clearRect(0, 0, W, H);

    ctx.globalCompositeOperation = 'source-over';
    drawBaseGlow();
    drawTongues();
    drawWisps();
    ctx.globalCompositeOperation = 'source-over';
    updateDrawEmbers(dt);
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

/* === STAT COUNTERS === */
function startCounters() {
  document.querySelectorAll('.stat-num').forEach(function(el) {
    var target = parseInt(el.dataset.target) || 0;
    var dur = 1800, start = performance.now();
    function update(now) {
      var p = Math.min((now - start) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(e * target);
      if (p < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

/* === INTERSECTION OBSERVER — REVEAL === */
var revealObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry, i) {
    if (entry.isIntersecting) {
      setTimeout(function() {
        entry.target.classList.add('visible');
      }, i * 70);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(function(el) { revealObs.observe(el); });

/* === ACTIVE NAV LINK === */
var navLinks = document.querySelectorAll('.nav-link');
var sectionIds = ['hero','skills','services','engagement','projects','timeline','faq','contact'];

function updateActiveNav() {
  var scrollY = window.scrollY + 120;
  sectionIds.forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var top = el.offsetTop, bot = top + el.offsetHeight;
    navLinks.forEach(function(link) {
      if (link.getAttribute('href') === '#' + id) {
        link.classList.toggle('active', scrollY >= top && scrollY < bot);
      }
    });
  });
}

/* === PROJECT DATA === */
var projectData = {
  fae: {
    title: 'Fae Frameworks',
    text: 'Fae Frameworks is a realm where creativity meets innovation — a rich tapestry of tools for the modern developer, artist, and gamer. At its core is a powerful custom game engine, an AI-powered animation tool, a social hub for community interaction, and a full suite of backend services including auth, chat, economy, and analytics.',
    images: [
      '/images/fae_logo.png',
      '/images/fae/1.jpg','/images/fae/2.jpg','/images/fae/3.jpg',
      '/images/fae/engine.jpg','/images/fae/hub.jpg'
    ],
    bullets: [
      'Game Engine: Custom JavaScript game engine with physics, collision, rendering, and asset management.',
      'Authentication: Secure JWT-based user auth with MongoDB credential storage.',
      'Chat System: Real-time messaging via WebSockets and Socket.io with low-latency delivery.',
      'AI / Bots: NPC bots and interactive AI characters powered by Node.js and ML API integration.',
      'Transaction / Economy: In-game economy with Stripe and blockchain support via Web3.js.',
      'Analytics: Google Analytics integration and custom MongoDB-backed metrics for game performance.',
      'Admin / Moderation: Full community management and moderation suite integrated into user management.'
    ]
  },
  eldermine: {
    title: 'Eldermine',
    text: 'A comprehensive crypto mining pool supporting a wide variety of coins, complete with a custom-designed frontend, bot-driven support chat, educational resources backed by MongoDB, real-time price APIs, and proprietary mining rig management software.',
    images: [
      '/images/eldermine.png',
      '/images/elder/miner.jpg','/images/elder/1.jpg','/images/elder/2.jpg'
    ],
    bullets: [
      'Full Site Design: Complete frontend architecture from landing page to user dashboard.',
      'Educational Resources: In-depth mining guides authored and served from MongoDB.',
      'Support Chatbot: Instant-assist bot for troubleshooting and onboarding.',
      'Price Checking API: Live cryptocurrency price feeds integrated across the platform.',
      'Mining Software: Custom rig management software for performance monitoring and optimization.',
      'Multi-Coin Support: Bitcoin, Ethereum, Dogecoin, Ravencoin, Kaspa, Firo, and more.'
    ]
  },
  crouton: {
    title: 'Crouton Jones',
    text: 'An adult animated TV show featuring 40+ unique characters, each with their own blockchain identity and chatbot. The project includes a custom website, a Fae-powered animation tool, a custom token, and a DAO-style task manager for decentralized content creation.',
    images: [
      '/images/crouton_jones.png',
      '/images/crouton/site1.jpg','/images/crouton/site2.jpg','/images/crouton/site3.jpg',
      '/images/crouton/broc_animator.jpg','/images/crouton/animator-screenshot1.jpg'
    ],
    bullets: [
      'Blockchain Integration: Custom ERC token deployed and integrated into the show universe.',
      'Animation Tool: Fae animation system used to bring 40+ characters to life with fluid movement.',
      'Custom Website: Central hub with episodes, lore, interactive content, and blockchain features.',
      'Character Chatbots: Individual AI bots per character, each reflecting a distinct personality.',
      'DAO Task Manager: Community-driven content creation with proposal voting and milestone tracking.',
      'Collaborative Design: Backend-focused role in a team delivering a polished final product.'
    ]
  },
  deathlane: {
    title: 'Deathlane',
    text: 'Deathlane is a fast-paced multiplayer racing game built around player choice and replayability. Players can jump into races from a polished main menu, create private custom lobbies, watch the action in spectator mode, and design original courses with an integrated track builder.',
    images: [
      '/images/deathlane/death-banner.png',
      '/images/deathlane/main-menu.jpg',
      '/images/deathlane/custom-lobby.jpg',
      '/images/deathlane/spectator.jpg',
      '/images/deathlane/track-builder.jpg'
    ],
    bullets: [
      'High-Speed Racing: Competitive gameplay designed around quick reactions and intense races.',
      'Custom Lobbies: Players can host and configure private multiplayer matches.',
      'Spectator Mode: Watch active races and follow the action without joining the track.',
      'Track Builder: Create and customize original courses directly inside the game.',
      'Streamlined Main Menu: A polished interface makes it easy to move between game modes and tools.',
      'Replayable Multiplayer: Player-created tracks and configurable matches keep every session fresh.'
    ]
  },
  cryptowizard: {
    title: 'CryptoWizard',
    text: 'CryptoWizard is a Solana token launchpad inspired by platforms like pump.fun. It gives creators a streamlined way to launch tokens while traders can discover and participate in new projects through transparent bonding-curve pricing. The platform also builds long-term utility around referrals, profit staking, and portfolio management.',
    images: [
      '/images/cryptowizard/home.jpg',
      '/images/cryptowizard/create.jpg',
      '/images/cryptowizard/portfolio.jpg'
    ],
    bullets: [
      'Solana Token Launchpad: Create and launch new tokens through a guided, user-friendly workflow.',
      'Bonding Curves: Automated price discovery adjusts token pricing as market participation grows.',
      'Referral System: Users can invite new participants and earn rewards from qualifying platform activity.',
      'Profit Staking: Platform profits can be staked to support a sustainable rewards ecosystem.',
      'Portfolio Dashboard: Track launched assets, holdings, and activity from one central interface.',
      'Integrated Trading Experience: Discover, launch, buy, and manage Solana tokens without leaving the platform.'
    ]
  },
  croutonverse: {
    title: 'Croutonverse',
    text: 'Croutonverse is a Solana NFT minting platform designed to make discovering, purchasing, and owning digital collectibles simple. Its lazy-minting system delays on-chain creation until purchase, reducing upfront costs for creators while preserving a smooth marketplace experience for collectors.',
    images: [
      '/images/croutonverse/home.jpg',
      '/images/croutonverse/collections.jpg',
      '/images/croutonverse/buy.jpg'
    ],
    bullets: [
      'Lazy Minting: NFTs are prepared off-chain and minted on Solana when a collector completes a purchase.',
      'Lower Creator Costs: Collections can be presented without paying the full minting cost for every item upfront.',
      'Collection Discovery: Browse available NFT collections through a visual, marketplace-style interface.',
      'Wallet-Based Purchases: Connect a compatible Solana wallet to purchase and receive collectibles.',
      'On-Chain Ownership: Completed mints are recorded on Solana for transparent, verifiable ownership.',
      'Streamlined Minting Flow: A focused purchase experience guides collectors from discovery through confirmation.'
    ]
  },
  crispyarcade: {
    title: 'Crispy Arcade',
    text: 'Crispy Arcade is the gaming hub of Croutonverse—a connected arcade experience where players can discover multiple games, earn rewards, build their profiles, and collect achievement badges. I created or assisted with several of its games, including Turf Wars, a first-person shooter, and Funk Night, a fast-paced top-down shooter.',
    images: [
      '/images/crispyarcade/home.jpg',
      '/images/crispyarcade/rewards.jpg',
      '/images/crispyarcade/profile.jpg',
      '/images/crispyarcade/turf-wars.jpg',
      '/images/crispyarcade/funk-night.jpg'
    ],
    bullets: [
      'Multi-Game Arcade: A central hub for discovering and launching a growing catalog of games.',
      'Player Rewards: Gameplay and achievements feed into a platform-wide reward system.',
      'Virtual Currency: A connected arcade economy gives players currency to earn and use across the experience.',
      'Profiles & Badges: Persistent player profiles showcase progress, identity, and earned accomplishments.',
      'Turf Wars: A first-person shooter featuring action-focused competitive gameplay.',
      'Funk Night: A fast-paced top-down shooter built around movement, aiming, and surviving intense encounters.',
      'Game Development: Direct creation and collaborative development across multiple titles in the arcade catalog.'
    ]
  }
};

/* === PROJECT POPUP === */
function openPopup(key) {
  var data   = projectData[key];
  if (!data) return;
  var popup  = document.getElementById('popup');
  var logo   = document.getElementById('popup-logo');
  var title  = document.getElementById('popup-title');
  var text   = document.getElementById('popup-text');
  var imgs   = document.getElementById('popup-images');
  var bullets = document.getElementById('popup-bullets');

  title.textContent = data.title;
  text.textContent  = data.text;
  logo.innerHTML    = '';
  imgs.innerHTML    = '';
  bullets.innerHTML = '';

  data.images.forEach(function(src, i) {
    var img = new Image();
    img.src = src; img.alt = data.title;
    if (i === 0) {
      logo.appendChild(img);
    } else {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function(e) {
        e.stopPropagation();
        openLightbox(this.src);
      });
      imgs.appendChild(img);
    }
  });

  data.bullets.forEach(function(b) {
    var li = document.createElement('li');
    li.textContent = b;
    bullets.appendChild(li);
  });

  popup.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  document.getElementById('popup').classList.remove('show');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeLightbox(); closePopup(); }
});

/* === IMAGE LIGHTBOX === */
function openLightbox(src) {
  var lb  = document.getElementById('lightbox');
  var img = document.getElementById('lightbox-img');
  img.src = '';
  lb.classList.add('open');
  // give the scale-in animation a frame to start from
  requestAnimationFrame(function() { img.src = src; });
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

/* === CONTACT FORM === */
var contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = this.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';

    // Replace below with a real email service (e.g. EmailJS, Formspree)
    setTimeout(function() {
      var container = document.getElementById('notification-container');
      container.innerHTML = '<div style="padding:12px 16px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:8px;color:#10b981;font-size:0.9rem;margin-top:10px;"><i class="fas fa-check-circle"></i> Message sent! I\'ll get back to you soon.</div>';
      btn.disabled = false;
      btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
      contactForm.reset();
      setTimeout(function() { container.innerHTML = ''; }, 5000);
    }, 1200);
  });
}

/* === FAQ ACCORDION === */
function toggleFaq(btn) {
  var item = btn.closest('.faq-item');
  var wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(el) { el.classList.remove('open'); });
  if (!wasOpen) item.classList.add('open');
}

/* === SCROLL-REACTIVE SPACE PARTICLES === */
function initSpaceParticles() {
  var canvas = document.getElementById('space-particles');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var particles = [];
  var width = 0;
  var height = 0;
  var lastScrollY = window.scrollY;
  var scrollBoost = 0;
  var scrollDirection = 1;
  var lastTime = performance.now();

  function makeParticle(randomY) {
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + 12,
      size: 0.5 + Math.random() * 1.7,
      speed: 7 + Math.random() * 19,
      alpha: 0.18 + Math.random() * 0.62,
      hue: Math.random() > 0.72 ? 190 : 265
    };
  }

  function resizeParticles() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.min(150, Math.max(55, Math.round(width * height / 10500)));
    particles = Array.from({ length: count }, function() { return makeParticle(true); });
  }

  window.addEventListener('resize', resizeParticles);
  window.addEventListener('scroll', function() {
    var delta = window.scrollY - lastScrollY;
    var distance = Math.abs(delta);
    if (delta !== 0) scrollDirection = delta > 0 ? 1 : -1;
    scrollBoost = Math.min(420, scrollBoost + distance * 2.4);
    lastScrollY = window.scrollY;
  }, { passive: true });

  function drawParticles(now) {
    var dt = Math.min((now - lastTime) / 1000, 0.04);
    lastTime = now;
    scrollBoost *= Math.pow(0.035, dt);
    var boost = reducedMotion ? 0 : scrollBoost;
    ctx.clearRect(0, 0, width, height);

    particles.forEach(function(p, i) {
      var velocity = p.speed + boost * scrollDirection;
      p.y -= velocity * dt;
      if (p.y < -30) particles[i] = p = makeParticle(false);
      if (p.y > height + 30) {
        particles[i] = p = makeParticle(false);
        p.y = -12;
      }
      var streak = 2 + Math.min(34, boost * 0.075) * (0.5 + p.size * 0.3);
      var trailDirection = velocity >= 0 ? 1 : -1;
      var trailEnd = p.y + streak * trailDirection;
      var gradient = ctx.createLinearGradient(p.x, p.y, p.x, trailEnd);
      gradient.addColorStop(0, 'hsla(' + p.hue + ',90%,78%,' + p.alpha + ')');
      gradient.addColorStop(1, 'hsla(' + p.hue + ',90%,65%,0)');
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x, trailEnd);
      ctx.lineWidth = p.size;
      ctx.strokeStyle = gradient;
      ctx.stroke();
    });
    requestAnimationFrame(drawParticles);
  }

  resizeParticles();
  requestAnimationFrame(drawParticles);
}

initSpaceParticles();
