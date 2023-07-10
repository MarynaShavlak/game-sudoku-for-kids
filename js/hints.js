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

function pop(e) {
  let amount = 30;
  switch (e.target.dataset.type) {
    case 'car':
    case 'line':
      amount = 80;
      break;
  }
  // Quick check if user clicked the button using a keyboard
  if (e.clientX === 0 && e.clientY === 0) {
    const bbox = e.target.getBoundingClientRect();
    const x = bbox.left + bbox.width / 2;
    const y = bbox.top + bbox.height / 2;
    for (let i = 0; i < 30; i++) {
      // We call the function createparticle 30 times
      // We pass the coordinates of the button for x & y values
      createparticle(x, y, e.target.dataset.type);
    }
  } else {
    for (let i = 0; i < amount; i++) {
      createparticle(
        e.clientX,
        e.clientY + window.scrollY,
        e.target.dataset.type,
      );
    }
  }
}
function createparticle(x, y, type) {
  const particle = document.createElement('span');
  particle.className = 'particle';
  document.body.appendChild(particle);
  let width = Math.floor(Math.random() * 30 + 15);
  let height = width;
  let destinationX = (Math.random() - 0.5) * 300;
  let destinationY = (Math.random() - 0.5) * 300;
  let rotation = Math.random() * 520;
  let delay = Math.random() * 200;
  let color;
  switch (type) {
    case 'fixic':
      particle.style.background = getRandomColorHSL();
      particle.style.border = '1px solid white';
      break;
    case 'princess':
      particle.innerHTML = ['🤍', '🧡', '💛', '💚', '🤍', '💜', '❤️'][
        Math.floor(Math.random() * 7)
      ];
      particle.style.fontSize = `${Math.random() * 24 + 10}px`;
      width = height = 'auto';
      break;
    case 'fish':
    case 'paw':
    case 'animal':
    case 'cake':
      particle.style.backgroundImage = `url('./images/${chosenTopic}/hint.png')`;
      break;
    case 'car':
      let mainHue = 18;
      let hueRange = 20; // Adjust this value to control the range around the main hue
      color = `hsl(${
        mainHue + Math.random() * hueRange - hueRange / 2
      }, 70%, 50%)`;

      particle.style.boxShadow = `0 0 ${Math.floor(
        Math.random() * 10 + 10,
      )}px ${color}`;
      particle.style.background = color;
      particle.style.borderRadius = '50%';
      width = height = Math.random() * 5 + 15;
      break;
    case 'minion':
      const randomYellowHue = Math.random() * 60 + 45; // Adjusted range for yellow hues
      color = `hsl(${randomYellowHue}, 70%, 50%)`;
      particle.style.background = color;
      particle.style.border = '1px solid white';

      break;
  }

  particle.style.width = `${width}px`;
  particle.style.height = `${height}px`;
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

// if (document.body.animate) {
//   document
//     .querySelectorAll('button')
//     .forEach(button => button.addEventListener('click', pop));
// }

function getRandomColorHSL() {
  // Generate random values within a specific range around the target color
  const hue = Math.random() * 50 + 6; // Range: 6-56
  const saturation = Math.random() * 20 + 68; // Range: 68-88
  const lightness = Math.random() * 19.9 + 43.9; // Range: 43.9-63.9
  // Convert the random HSL values to a CSS string
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
