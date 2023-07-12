const hintsBlock = document.querySelector('.menu .hints-block');
const hintsList = document.querySelector('.menu .hints');
const noHintsText = document.querySelector('.no-hints-text');
const hintsText = document.querySelector('.hint-text');
hintsBlock.setAttribute('data-type', themes[chosenTopic]);
hintsBlock.addEventListener('click', onHintsBlockClick);

const hintsValue = {
  level1: 3,
  level2: 4,
  level3: 5,
};
function minusHint() {
  hints--;
  if (hints <= 0) {
    setTimeout(function () {
      noHintsText.style.display = 'block';
      hintsText.style.display = 'none';
    }, 300);
  }
  createHints();
}

function createHints() {
  noHintsText.style.display = 'none';
  hintsText.style.display = 'block';
  hintsList.innerHTML = '';
  for (let i = 0; i < hints; i++) {
    let span = document.createElement('span');
    span.className = 'hint-element';
    hintsList.appendChild(span);
  }
}

function showVisualEffect(e) {
  let amount = 50;
  for (let i = 0; i < amount; i++) {
    createParticle(
      e.clientX,
      e.clientY + window.scrollY,
      e.target.dataset.type,
    );
  }
}

function createParticle(x, y, type) {
  const particle = createParticleElement();
  let width, height;
  switch (type) {
    case 'fixic':
    case 'minion':
      setSquareParticleProperties(particle, type);
      break;
    case 'princess':
      setEmodjiParticleProperties(particle);
      break;
    case 'fish':
    case 'paw':
    case 'animal':
    case 'cake':
      setCustomParticleProperties(particle, chosenTopic);
      break;
    case 'car':
      setCircleParticleProperties(particle);
      break;
  }
  setCommonParticleProperties({ type, particle, width, height });
  animateParticle(particle, x, y, type);
}

function removeParticle(e) {
  e.srcElement.effect.target.remove();
}

function getColorHSL(hue, saturation, lightness) {
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function setEmodjiParticleProperties(particle) {
  const emojis = ['🤍', '🧡', '💛', '💚', '🤍', '💜', '❤️'];
  particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
  particle.style.fontSize = `${Math.random() * 24 + 10}px`;
}

function setCustomParticleProperties(particle, type) {
  particle.style.backgroundImage = `url('./images/${type}/hint.png')`;
}

function setCircleParticleProperties(particle) {
  let mainHue = 18;
  let hueRange = 20;
  let randomHue = mainHue + Math.random() * hueRange - hueRange / 2;
  color = `hsl(${randomHue}, 70%, 50%)`;

  particle.style.boxShadow = `0 0 ${Math.floor(
    Math.random() * 10 + 10,
  )}px ${color}`;
  particle.style.background = color;
  particle.style.borderRadius = '50%';
  // width = height = Math.random() * 5 + 15;
}

function setSquareParticleProperties(particle, type) {
  let hue, saturation, lightness;
  switch (type) {
    case 'fixic':
      hue = Math.random() * 50 + 6;
      saturation = Math.random() * 20 + 68;
      lightness = Math.random() * 19.9 + 43.9;
      break;
    case 'minion':
      hue = Math.random() * 60 + 45;
      saturation = 70;
      lightness = 50;
  }
  particle.style.background = getColorHSL(hue, saturation, lightness);
  particle.style.border = '1px solid white';
}

function createParticleElement() {
  const particle = document.createElement('span');
  particle.className = 'particle';
  document.body.appendChild(particle);
  return particle;
}

function setCommonParticleProperties({ type, particle, width, height }) {
  width =
    type === 'car'
      ? Math.random() * 5 + 15
      : Math.floor(Math.random() * 30 + 15);
  height = width;
  particle.style.width = `${width}px`;
  particle.style.height = `${height}px`;
}

function animateParticle(particle, x, y) {
  const destinationX = (Math.random() - 0.5) * 300;
  const destinationY = (Math.random() - 0.5) * 300;
  const rotation = Math.random() * 520;
  const delay = Math.random() * 200;

  const animation = particle.animate(
    [
      {
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
        opacity: 1,
      },
      {
        transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${
          y + destinationY
        }px) rotate(${rotation}deg)`,
        opacity: 0,
      },
    ],
    {
      duration: Math.random() * 1000 + 5000,
      easing: 'cubic-bezier(0, .9, .57, 1)',
      delay: delay,
    },
  );
  animation.onfinish = removeParticle;
}

function onHintsBlockClick(e) {
  console.log('e: ', e);
  const clickedBlock =
    e.target.className === 'hints-block'
      ? e.target
      : e.target.className === 'hint-element'
      ? e.target.parentElement.parentElement
      : e.target.parentElement;
  console.log('clickedBlock: ', clickedBlock);
  if (e.target.children.length > 0) {
    minusHint();
    showVisualEffect(e);
  }
}
