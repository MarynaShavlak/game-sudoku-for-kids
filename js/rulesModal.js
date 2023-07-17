const cloudOpenModal = document.querySelector('.cloud-rules');
const catOpenModal = document.querySelector('.cat-rules');
const rulesTitle = document.querySelector('#rules');
const rulesModal = document.querySelector('.rules-modal');
const rulesCloseIcon = document.querySelector('.rules-close-icon');

function openRules() {
  rulesModal.classList.add('modal--isActive');
}

function closeRulesModal() {
  rulesModal.classList.remove('modal--isActive');
}

document.addEventListener('click', event => {
  if (event.target.matches('.cloud-rules, .cat-rules, #rules')) {
    openModal(rulesModal);
  } else if (event.target.matches('.rules-close-icon')) {
    closeRulesModal();
  }
});

modalOverlays.forEach(overlay => {
  overlay.addEventListener('click', closeStatisticsModal);
  overlay.addEventListener('click', closeRulesModal);
});
