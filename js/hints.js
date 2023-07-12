const hintsValue = {
  level1: 3,
  level2: 4,
  level3: 5,
};
function minusHint() {
  hints--;
  if (hints <= 0) {
    setTimeout(function () {
      // Змінити текст кнопки
    }, 300);
  }
  createHints();
}

function createHints() {
  let hintsBlock = document.querySelector('.menu .hints');
  hintsBlock.innerHTML = '';
  for (let i = 0; i < hints; i++) {
    let span = document.createElement('span');
    span.className = 'hint-element';
    hintsBlock.appendChild(span);
  }
}

function showVisualEffect(e) {
  let amount = 50;
  for (let i = 0; i < amount; i++) {
    createparticle(
      e.clientX,
      e.clientY + window.scrollY,
      e.target.dataset.type,
    );
  }
}

function setCommonParticleProperties(particle, width, height) {
  width = Math.floor(Math.random() * 30 + 15);
  height = width;
  destinationX = (Math.random() - 0.5) * 300;
  destinationY = (Math.random() - 0.5) * 300;
  rotation = Math.random() * 520;
  delay = Math.random() * 200;

  particle.style.width = `${width}px`;
  particle.style.height = `${height}px`;
}

function createparticle(x, y, type) {
  const particle = document.createElement('span');
  particle.className = 'particle';
  document.body.appendChild(particle);
  // let width, height, destinationX, destinationY, rotation, delay, color;
  let width = Math.floor(Math.random() * 30 + 15);
  let height = width;
  let destinationX = (Math.random() - 0.5) * 300;
  let destinationY = (Math.random() - 0.5) * 300;
  let rotation = Math.random() * 520;
  let delay = Math.random() * 200;

  switch (type) {
    case 'fixic':
      particle.style.background = getRandomColorHSL();
      particle.style.border = '1px solid white';
      break;
    case 'princess':
      setPrincessParticleProperties(particle);
      // width = height = 'auto';
      break;
    case 'fish':
    case 'paw':
    case 'animal':
    case 'cake':
      setCustomParticleProperties(particle, chosenTopic);
      break;
    case 'car':
      setCarParticleProperties(particle);
      // let mainHue = 18;
      // let hueRange = 20; // Adjust this value to control the range around the main hue
      // color = `hsl(${
      //   mainHue + Math.random() * hueRange - hueRange / 2
      // }, 70%, 50%)`;

      // particle.style.boxShadow = `0 0 ${Math.floor(
      //   Math.random() * 10 + 10,
      // )}px ${color}`;
      // particle.style.background = color;
      // particle.style.borderRadius = '50%';
      width = height = Math.random() * 5 + 15;
      break;
    case 'minion':
      setMinionParticleProperties(particle);
      // const randomYellowHue = Math.random() * 60 + 45; // Adjusted range for yellow hues
      // color = `hsl(${randomYellowHue}, 70%, 50%)`;
      // particle.style.background = color;
      // particle.style.border = '1px solid white';

      break;
  }

  particle.style.width = `${width}px`;
  particle.style.height = `${height}px`;

  // setCommonParticleProperties(particle, width, height);
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

function removeParticle(e) {
  e.srcElement.effect.target.remove();
}

function getRandomColorHSL() {
  // Generate random values within a specific range around the target color
  const hue = Math.random() * 50 + 6; // Range: 6-56
  const saturation = Math.random() * 20 + 68; // Range: 68-88
  const lightness = Math.random() * 19.9 + 43.9; // Range: 43.9-63.9
  // Convert the random HSL values to a CSS string
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function setPrincessParticleProperties(particle) {
  const emojis = ['🤍', '🧡', '💛', '💚', '🤍', '💜', '❤️'];
  particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
  particle.style.fontSize = `${Math.random() * 24 + 10}px`;
}

function setCustomParticleProperties(particle, type) {
  particle.style.backgroundImage = `url('./images/${type}/hint.png')`;
}

function setCarParticleProperties(particle) {
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

function setMinionParticleProperties(particle) {
  const randomYellowHue = Math.random() * 60 + 45;
  color = `hsl(${randomYellowHue}, 70%, 50%)`;
  particle.style.background = color;
  particle.style.border = '1px solid white';
}
