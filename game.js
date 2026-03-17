'use strict';

const STATE = {
  playerName: '',
  format: 'vn',
  currentScene: null,
  typing: false,
  waitingClick: false,
};

const CHARS = {
  narrator: { name: '',       sprite: null     },
  selene:   { name: 'Fatiha', sprite: 'selene' },
  pip:      { name: 'Leo',    sprite: 'pip'    },
  umbra:    { name: 'Milk',   sprite: 'umbra'  },
  player:   { name: '',       sprite: null     },  // no image for player
};

const SCENES = {
  bedroom:  { label: 'Ta chambre',              url: 'assets/bedroom.jpg'              },
  alley:    { label: 'La ruelle',               url: 'assets/ruelle.png'               },
  forest:   { label: 'La forêt violette',        url: 'assets/foret_violette.png'       },
  kingdom:  { label: 'Le Royaume Étoilé',        url: 'assets/royaume_etoile.png'       },
  tower:    { label: 'La Tour des Rêves',        url: 'assets/tour_reve.png'            },
  market:   { label: 'Le Marché des Murmures',   url: 'assets/marche_murmure.png'       },
  lake:     { label: 'Le Lac Miroir',            url: 'assets/lac_miroir.png'           },
  envelope: { label: 'La Vérité',               url: 'assets/interieur_du_royaum.png'  },
  farewell: { label: 'Les Adieux',              url: 'assets/adieux.png'               },
};

function buildStory(name) {
  return [
    { id:'intro_1',      scene:'bedroom',  char:'narrator', text:`Il est minuit passé, ${name}. La ville dort. Mais toi, tu ne peux pas fermer les yeux.` },
    { id:'intro_2',      scene:'bedroom',  char:'narrator', text:'Une mélodie étrange filtre par ta fenêtre ouverte… douce, mystérieuse, comme un appel.' },
    { id:'intro_3',      scene:'bedroom',  char:'narrator', text:'Tu te lèves. Sur le rebord de ta fenêtre — un chat. Blanc comme la neige, un œil bleu, un œil doré.' },
    { id:'selene_1',     scene:'bedroom',  char:'selene',   text:`Enfin. Je t'attendais depuis la pleine lune, ${name}.` },
    {
      id:'choice_react', scene:'bedroom', char:'player', text:'Ton cœur s\'emballe. Que faire ?',
      choices:[
        { text:'😶  Rester silencieux·se et écouter', next:'react_silent' },
        { text:'💬  Lui demander qui il est',          next:'react_ask'    },
        { text:'🏃  Reculer, surpris·e',               next:'react_back'   },
      ],
    },
    { id:'react_silent',    scene:'bedroom', char:'selene', text:'Bien. Les curieux silencieux sont les plus sages.', next:'selene_explain' },
    { id:'react_ask',       scene:'bedroom', char:'selene', text:'Mon nom ? Je suis le gardien des rêves perdus.', next:'selene_explain' },
    { id:'react_back',      scene:'bedroom', char:'selene', text:`N'aie pas peur, ${name}. Je ne mords pas… souvent.`, next:'selene_explain' },
    { id:'selene_explain',  scene:'bedroom', char:'selene', text:`Il existe un monde parallèle, ${name}. Le Royaume des Chats Étoilés. Quelqu'un t'a envoyé un message… mais il a été volé.` },
    { id:'selene_explain2', scene:'bedroom', char:'selene', text:'Si tu veux le retrouver, suis-moi.' },
    {
      id:'choice_follow', scene:'bedroom', char:'player', text:'Que fais-tu ?',
      choices:[
        { text:'🌙  La suivre sans hésiter',        next:'follow_yes'     },
        { text:'💭  Demander des détails d\'abord', next:'follow_details' },
      ],
    },
    { id:'follow_details', scene:'bedroom', char:'selene', text:'Le message vient de quelqu\'un qui t\'aime en secret. C\'est tout ce que je peux dire.', next:'follow_yes' },
    { id:'follow_yes',     scene:'bedroom', char:'narrator', text:'Tu suis Fatiha dans la ruelle. La lune est pleine et énorme, presque trop proche.' },
    { id:'portal_1',  scene:'alley',  char:'selene',   text:'Ce vieux miroir abandonné… dans le reflet, tu vois une forêt violette.' },
    { id:'portal_2',  scene:'alley',  char:'selene',   text:'Le portail n\'est ouvert que si tu dis quelque chose de vrai à voix haute.' },
    {
      id:'choice_truth', scene:'alley', char:'player', text:'Tu prends une grande inspiration…',
      choices:[
        { text:'💛  « J\'ai peur d\'être seul·e »',   next:'truth_alone' },
        { text:'🌸  « Je mérite d\'être aimé·e »',    next:'truth_love'  },
        { text:'✨  « Je crois encore à la magie »',   next:'truth_magic' },
      ],
    },
    { id:'truth_alone',  scene:'alley',  char:'narrator', text:'Ta voix tremble. Mais les mots sortent. Le miroir s\'illumine de doré.', next:'portal_cross' },
    { id:'truth_love',   scene:'alley',  char:'narrator', text:'Ces mots résonnent dans ta poitrine. Le miroir explose en éclats de lumière rose.', next:'portal_cross' },
    { id:'truth_magic',  scene:'alley',  char:'narrator', text:'Un sourire monte à tes lèvres. Le miroir scintille comme un ciel étoilé.', next:'portal_cross' },
    { id:'portal_cross', scene:'forest', char:'narrator', text:'Tu traverses le miroir. Froid. Chaleur. Légèreté. Et puis… de l\'herbe bleue sous tes pieds.' },
    { id:'kingdom_1',    scene:'kingdom',char:'narrator', text:'Le ciel est indigo. Des étoiles bougent comme si elles respiraient. Des chats de toutes les couleurs errent entre des maisons en cristal.' },
    { id:'pip_arrives',  scene:'kingdom',char:'pip',      text:'Oh ! Un humain ! C\'est rare ! Viens, viens !' },
    { id:'pip_info',     scene:'kingdom',char:'pip',      text:'Le voleur du message s\'appelle Milk. Un chat d\'ombre. Il collectionne les sentiments volés.' },
    { id:'selene_paths', scene:'kingdom',char:'selene',   text:'Il y a trois endroits : La Tour des Rêves, le Marché des Murmures, ou le Lac Miroir.' },
    {
      id:'choice_path', scene:'kingdom', char:'player', text:'Où aller ?',
      choices:[
        { text:'🗼  La Tour des Rêves',      next:'path_tower'  },
        { text:'🏮  Le Marché des Murmures', next:'path_market' },
        { text:'🌊  Le Lac Miroir',           next:'path_lake'   },
      ],
    },
    { id:'path_tower',   scene:'tower', char:'narrator', text:'La tour monte jusqu\'aux nuages en verre fumé. Tout autour flottent des bulles — dans chaque bulle, un rêve.' },
    { id:'tower_2',      scene:'tower', char:'narrator', text:'Tu en touches une. Deux personnes sous un cerisier, se tenant la main. Tu sens que c\'est pour toi.' },
    { id:'tower_selene', scene:'tower', char:'selene',   text:'Les rêves ici appartiennent à ceux qui osent les voir.' },
    { id:'tower_umbra',  scene:'tower', char:'umbra',    text:'Je ne vole pas les messages. Je les garde. Parce que personne ne mérite d\'être ignoré.' },
    { id:'tower_umbra2', scene:'tower', char:'umbra',    text:'Mais toi… tu es venu·e le chercher.' },
    {
      id:'choice_tower', scene:'tower', char:'player', text:'Comment lui répondre ?',
      choices:[
        { text:'💬  « Pourquoi garder les messages ? »', next:'tower_ask'   },
        { text:'🤝  « Ce message m\'appartient. »',      next:'tower_claim' },
      ],
    },
    { id:'tower_ask',   scene:'tower', char:'umbra', text:'Les mots non dits deviennent tristes. Je les gardais en attendant la bonne personne.', next:'tower_give' },
    { id:'tower_claim', scene:'tower', char:'umbra', text:'Tu l\'as mérité en venant le chercher jusqu\'ici.', next:'tower_give' },
    { id:'tower_give',  scene:'tower', char:'umbra', text:'Tu as le bon cœur pour le lire.', next:'got_envelope' },
    { id:'path_market',  scene:'market', char:'narrator', text:'Le marché : lampions colorés, bocaux de "premiers fous rires", boîtes de "silences confortables".' },
    { id:'market_pip',   scene:'market', char:'pip',      text:'Milk est là ! Derrière le stand de souvenirs lumineux !' },
    { id:'market_umbra', scene:'market', char:'umbra',    text:'Je savais que tu viendrais. Les curieux finissent toujours au marché.' },
    { id:'market_deal',  scene:'market', char:'umbra',    text:'Pour le message : donne-moi un souvenir heureux. Une seconde de bonheur.' },
    {
      id:'choice_memory', scene:'market', char:'player', text:'Quel souvenir offrir ?',
      choices:[
        { text:'🌅  Un coucher de soleil inoubliable',         next:'memory_give' },
        { text:'😂  Un fou rire qu\'on ne peut pas expliquer', next:'memory_give' },
        { text:'🤗  Être compris·e par quelqu\'un',            next:'memory_give' },
      ],
    },
    { id:'memory_give',  scene:'market', char:'narrator', text:'Tu fermes les yeux. Une lumière chaude sort de ta main et flotte vers Milk. Il la reçoit les yeux fermés.' },
    { id:'market_thanks',scene:'market', char:'umbra',    text:'Merci. C\'est exactement ce dont j\'avais besoin.', next:'got_envelope' },
    { id:'path_lake',   scene:'lake', char:'narrator', text:'Le lac est au-delà d\'une forêt de cerisiers lumineux. L\'eau est noire comme l\'encre. Les pétales restent suspendus dans l\'air.' },
    { id:'lake_umbra',  scene:'lake', char:'umbra',    text:'Je t\'entendais approcher depuis la forêt. Tu marches comme quelqu\'un qui cherche quelque chose de précieux.' },
    { id:'lake_reflect',scene:'lake', char:'umbra',    text:'Pose-toi. Regarde ton reflet.' },
    { id:'lake_vision', scene:'lake', char:'narrator', text:'Dans ton reflet : tu te vois entouré·e de lumière. Et une main qui tient la tienne, floue, mais là.' },
    { id:'lake_umbra2', scene:'lake', char:'umbra',    text:'Ce message vient de quelqu\'un qui voit cette lumière en toi. Tous les jours.', next:'got_envelope' },
    { id:'got_envelope', scene:'envelope', char:'narrator', text:`Tu tiens l'enveloppe entre tes mains, ${name}. Elle est chaude. Elle pulse, comme un cœur.` },
    { id:'pip_excited',  scene:'envelope', char:'pip',      text:'Ouvre-la ! Ouvre-la !' },
    { id:'selene_gentle',scene:'envelope', char:'selene',   text:'Prends ton temps. Les belles choses ne se lisent pas en courant.' },
    { id:'open_envelope',scene:'envelope', char:'narrator', text:'Tu l\'ouvres. L\'encre est couleur de clair de lune.' },
    { id:'letter_1',     scene:'envelope', char:'narrator', text:`« Il y a des jours où je te regarde faire les choses les plus simples et je trouve ça extraordinaire.` },
    { id:'letter_2',     scene:'envelope', char:'narrator', text:`Tu ris d'une façon qui rend le monde moins lourd. Tu penses à des choses que personne d'autre ne remarquerait.` },
    { id:'letter_3',     scene:'envelope', char:'narrator', text:`Et moi, je remarque tout ça. Je remarque toi. Depuis longtemps. Je voulais juste que tu le saches. »` },
    {
      id:'choice_letter', scene:'envelope', char:'player', text:`Tu relèves les yeux, ${name}. Ils sont brillants.`,
      choices:[
        { text:'💌  « Qui l\'a écrit ? »',         next:'letter_who'   },
        { text:'💛  « Je sais déjà qui c\'est. »', next:'letter_know'  },
        { text:'🌙  Sourire sans rien dire',        next:'letter_smile' },
      ],
    },
    { id:'letter_who',   scene:'envelope', char:'selene',  text:'Cherche quelqu\'un qui te regarde comme si tu étais la réponse à une question qu\'il n\'a pas encore posée.', next:'farewell_start' },
    { id:'letter_know',  scene:'envelope', char:'narrator', text:'Tu souris. Certaines certitudes sont trop douces pour être dites.', next:'farewell_start' },
    { id:'letter_smile', scene:'envelope', char:'selene',   text:'Un sourire comme ça vaut mille mots.', next:'farewell_start' },
    { id:'farewell_start',scene:'farewell',char:'narrator', text:'Fatiha te guide vers un nouveau miroir. Tous les chats sont là. Même Milk, à distance, te fait un petit signe.' },
    { id:'pip_goodbye',   scene:'farewell',char:'pip',      text:'Est-ce qu\'on se reverra ?' },
    {
      id:'choice_goodbye', scene:'farewell', char:'player', text:'',
      choices:[
        { text:'🌙  « Chaque nuit de pleine lune, peut-être. »', next:'bye_moon'  },
        { text:'💛  « Si tu viens me rendre visite en rêve. »',  next:'bye_dream' },
      ],
    },
    { id:'bye_moon',     scene:'farewell', char:'pip',    text:'Promis ! Je serai là !', next:'selene_final' },
    { id:'bye_dream',    scene:'farewell', char:'pip',    text:'Les rêves humains sentent le caramel chaud et les livres ouverts.', next:'selene_final' },
    { id:'selene_final', scene:'farewell', char:'selene', text:`${name}. Tu es venu·e ici pour un message. Mais ce que tu as vraiment trouvé… c'est la preuve que tu mérites d'être cherché·e.` },
    { id:'return',       scene:'farewell', char:'narrator',text:'Tu traverses le miroir. La chambre. Le lit. Dans ta main, l\'enveloppe est toujours là. Réelle. Chaude.' },
    { id:'ending',       scene:'farewell', char:'narrator',text:'', isEnding:true },
  ];
}

/* ══════════════════════════════════════════════
   CHARACTER IMAGES
   → Replace paths with your own: 'characters/fatiha.png'
══════════════════════════════════════════════ */
const CHAR_IMAGES = {
  selene: 'characters/selene.png',
  pip:    'characters/leo.png',
  umbra:  'characters/milk.png',
  // player: no image
};

const CHAR_GLOWS = {
  selene: 'rgba(184,154,255,0.5)',
  pip:    'rgba(255,154,74,0.45)',
  umbra:  'rgba(100,40,180,0.5)',
};

function buildSprite(spriteKey) {
  if (!spriteKey) return '';
  const src  = CHAR_IMAGES[spriteKey];
  const glow = CHAR_GLOWS[spriteKey] || 'rgba(255,255,255,0.2)';
  if (!src) return '';
  return `
    <div class="sprite-wrap" data-char="${spriteKey}">
      <div class="sprite-glow" style="background:radial-gradient(ellipse at 50% 85%,${glow} 0%,transparent 65%)"></div>
      <img class="sprite-img sprite-${spriteKey}" src="${src}" alt="${spriteKey}" draggable="false" />
    </div>`;
}

/* ══════════════════════════════════════════════
   ENGINE
══════════════════════════════════════════════ */
let STORY = [];
let currentNode = null;
const EL = {};

function $(id){ return document.getElementById(id); }

function initEL(fmt) {
  if (fmt === 'vn') {
    EL.bg = $('vn-bg'); EL.char = $('vn-char'); EL.speaker = $('vn-speaker');
    EL.text = $('vn-text'); EL.choices = $('vn-choices'); EL.next = $('vn-next'); EL.loc = null;
  } else if (fmt === 'cin') {
    EL.bg = $('cin-bg'); EL.char = $('cin-char'); EL.speaker = $('cin-speaker');
    EL.text = $('cin-text'); EL.choices = $('cin-choices'); EL.next = $('cin-next'); EL.loc = null;
  } else {
    EL.bg = null; EL.char = $('spl-char'); EL.speaker = $('spl-speaker');
    EL.text = $('spl-text'); EL.choices = $('spl-choices'); EL.next = $('spl-next'); EL.loc = $('spl-location');
  }
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
}

let fadeEl = null;
function ensureFade() {
  if (fadeEl) return;
  fadeEl = document.createElement('div');
  fadeEl.className = 'scene-fade';
  document.body.appendChild(fadeEl);
}
function doSceneFade(cb) {
  ensureFade();
  fadeEl.classList.add('show');
  setTimeout(() => { cb(); setTimeout(() => fadeEl.classList.remove('show'), 50); }, 350);
}

let typeTimer = null;
function typewrite(el, text, onDone) {
  if (!el) return;
  STATE.typing = true;
  el.innerHTML = '';
  let i = 0;
  clearInterval(typeTimer);
  if (!text) { STATE.typing = false; if (onDone) onDone(); return; }
  typeTimer = setInterval(() => {
    if (i < text.length) { el.textContent = text.slice(0, ++i); }
    else { clearInterval(typeTimer); STATE.typing = false; if (onDone) onDone(); }
  }, 24);
}
function skipType(el, text) {
  clearInterval(typeTimer); STATE.typing = false; if (el) el.textContent = text;
}

function renderChar(charKey) {
  if (!EL.char) return;
  const ch = CHARS[charKey];
  if (!ch || !ch.sprite) { EL.char.innerHTML = ''; return; }
  EL.char.innerHTML = buildSprite(ch.sprite);
}

function renderBg(sceneKey) {
  const sc = SCENES[sceneKey];
  if (!sc) return;
  const url = sc.url;
  if ((STATE.format === 'vn' || STATE.format === 'cin') && EL.bg) {
    EL.bg.style.backgroundImage = `url('${url}')`;
  }
  if (STATE.format === 'split') {
    const left = document.querySelector('.spl-left');
    if (left) left.style.backgroundImage = `url('${url}')`;
  }
  if (EL.loc) EL.loc.textContent = sc.label || '';
}

function findNode(id) { return STORY.find(n => n.id === id) || null; }

function renderChoices(choices) {
  if (!EL.choices) return;
  EL.choices.innerHTML = '';
  choices.forEach(ch => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = ch.text;
    btn.addEventListener('click', e => { e.stopPropagation(); const next = findNode(ch.next); if (next) goToNode(next); });
    EL.choices.appendChild(btn);
  });
}

function goToNode(node) {
  if (!node) return;
  const sceneChanged = !currentNode || currentNode.scene !== node.scene;
  if (sceneChanged) { doSceneFade(() => { currentNode = node; _applyNode(node); }); }
  else { currentNode = node; _applyNode(node); }
}

function _applyNode(node) {
  if (node.isEnding) { showEnding(); return; }
  renderBg(node.scene);
  renderChar(node.char);
  const ch = CHARS[node.char] || {};
  const name = node.char === 'player' ? STATE.playerName : (ch.name || '');
  if (EL.speaker) EL.speaker.textContent = name;
  const hasChoices = node.choices && node.choices.length > 0;
  if (EL.choices) EL.choices.innerHTML = '';
  if (EL.next) EL.next.style.display = hasChoices ? 'none' : 'block';
  STATE.waitingClick = false;
  typewrite(EL.text, node.text, () => {
    if (hasChoices) { if (EL.next) EL.next.style.display = 'none'; renderChoices(node.choices); }
    else { STATE.waitingClick = true; }
  });
}

function advanceStory() {
  if (STATE.typing) {
    skipType(EL.text, currentNode.text);
    if (currentNode.choices) { if (EL.next) EL.next.style.display = 'none'; renderChoices(currentNode.choices); }
    else { STATE.waitingClick = true; }
    return;
  }
  if (!STATE.waitingClick) return;
  STATE.waitingClick = false;
  let next = null;
  if (currentNode.next) { next = findNode(currentNode.next); }
  else { const idx = STORY.indexOf(currentNode); if (idx >= 0 && idx < STORY.length - 1) next = STORY[idx + 1]; }
  if (next) goToNode(next);
}

function showEnding() {
  doSceneFade(() => {
    $('end-quote').textContent = `"${STATE.playerName}, quelqu'un a pensé à toi assez fort pour envoyer un message à travers les étoiles."`;
    $('end-body').textContent = "Et si tu entends ronronner cette nuit… c'est Leo qui passe te dire bonjour. 🐾";
    showScreen('screen-end');
  });
}

function startGame() {
  STORY = buildStory(STATE.playerName);
  document.querySelectorAll('.layout').forEach(l => l.style.display = 'none');
  const id  = STATE.format === 'vn' ? 'layout-vn' : STATE.format === 'cin' ? 'layout-cin' : 'layout-split';
  const lay = $(id);
  if (lay) lay.style.display = STATE.format === 'split' ? 'flex' : 'block';
  initEL(STATE.format);
  const zone = STATE.format === 'vn' ? $('layout-vn') : STATE.format === 'cin' ? $('layout-cin') : $('spl-right');
  if (zone) zone.addEventListener('click', () => advanceStory());
  showScreen('screen-game');
  goToNode(STORY[0]);
}

document.addEventListener('DOMContentLoaded', () => {
  const btnName   = $('btn-start-name');
  const inputName = $('player-name');
  btnName.addEventListener('click', () => {
    const val = inputName.value.trim();
    if (!val) { inputName.style.borderColor = '#ff6b8a'; inputName.focus(); return; }
    inputName.style.borderColor = '';
    STATE.playerName  = val;
    CHARS.player.name = val;
    showScreen('screen-format');
  });
  inputName.addEventListener('keydown', e => { if (e.key === 'Enter') btnName.click(); });
  document.querySelectorAll('.format-btn').forEach(btn => {
    btn.addEventListener('click', () => { STATE.format = btn.dataset.format; startGame(); });
  });
  $('btn-replay').addEventListener('click', () => {
    STATE.currentScene = null; showScreen('screen-name'); inputName.value = '';
  });
  document.addEventListener('keydown', e => {
    if ((e.code === 'Space' || e.code === 'Enter') && $('screen-game').classList.contains('active')) {
      e.preventDefault(); advanceStory();
    }
  });
});
