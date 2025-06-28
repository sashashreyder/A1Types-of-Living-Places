const data = [
  {
    word: 'cozy',
    prompt: 'We found a ___ little house in the village.',
    answer: 'cozy',
    hint: 'уютный'
  },
  {
    word: 'houseboat',
    prompt: 'They live on a ___ on the river.',
    answer: 'houseboat',
    hint: 'плавучий дом'
  },
  {
    word: 'move',
    prompt: 'They want to ___ to a quieter place.',
    answer: 'move',
    hint: 'переезжать'
  },
  {
    word: 'island',
    prompt: 'He owns a small ___ in the Pacific.',
    answer: 'island',
    hint: 'остров'
  },
  {
    word: 'cramped',
    prompt: 'The apartment was small and ___.',
    answer: 'cramped',
    hint: 'тесный'
  },
  {
    word: 'cabin',
    prompt: 'We stayed in a wooden ___ in the forest.',
    answer: 'cabin',
    hint: 'хижина'
  },
  {
    word: 'rent',
    prompt: 'They ___ a small house by the forest.',
    answer: 'rent',
    hint: 'снимать, арендовать'
  },
  {
    word: 'sunny',
    prompt: 'The living room is bright and ___.',
    answer: 'sunny',
    hint: 'солнечный'
  },
  {
    word: 'treehouse',
    prompt: 'The kids built a ___ in the backyard.',
    answer: 'treehouse',
    hint: 'домик на дереве'
  },
  {
    word: 'seclude',
    prompt: 'He wants to ___ himself in a quiet place.',
    answer: 'seclude',
    hint: 'уединяться'
  }
];




let current = 0;
let score   = 0;

const container = document.querySelector('.card-container');

/* ---------- RENDER CARD ---------- */
function renderCard(idx) {
  const { prompt, hint } = data[idx];

  container.innerHTML = `
    <div class="card">
      <h2>${idx + 1}/${data.length}</h2>
      <p>${prompt}</p>

      <div class="input-wrap">
        <input type="text" id="answerInput" placeholder="Type your answer" />
        <span class="qmark" data-tip="${hint}">?</span>
      </div>

      <div class="button-row">
        <button id="submitBtn" class="btn">Submit</button>
        <button id="nextBtn" class="btn next">→</button>
      </div>

      <p class="feedback" id="feedback"></p>
    </div>`;

  // focus removed to prevent page jump
  // document.getElementById('answerInput').focus();

  document.getElementById('submitBtn').addEventListener('click', checkAnswer);
  document.getElementById('nextBtn').addEventListener('click', nextCard);

  // Mobile tooltip toggle
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    const qmark = document.querySelector('.qmark');
    qmark.addEventListener('click', e => {
      document.querySelectorAll('.qmark').forEach(t => {
        if (t !== e.target) t.classList.remove('active');
      });
      qmark.classList.toggle('active');
    });
  }
}

/* ---------- CHECK ---------- */
function checkAnswer() {
  const inp = document.getElementById('answerInput');
  const fb  = document.getElementById('feedback');
  if (!inp || fb.textContent) return; // prevent double scoring

  const user    = inp.value.trim().toLowerCase();
  const correct = data[current].answer.toLowerCase();

  fb.textContent = user === correct ? '✓ Correct!' : `✗ ${correct}`;
  fb.className   = 'feedback ' + (user === correct ? 'correct' : 'incorrect');
  if (user === correct) score++;

  document.getElementById('nextBtn').classList.add('show');
}

/* ---------- RESULT ---------- */
function showResult() {
  const msg =
    score <= 5 ? '😅 Try again!' :
    score <= 7 ? '👍 Not bad — you can do better!' :
    score <= 9 ? '✅ Well done!' :
                 '🌟 You\'re a pro!';

  container.innerHTML = `
    <div class="card result-card">
      <img src="mascot-result-unscreen.gif" alt="Mascot" class="mascot-gif" />
      <h2>${msg}</h2>
      <p>You got&nbsp;<strong>${score}</strong>&nbsp;out of&nbsp;<strong>${data.length}</strong>&nbsp;correct.</p>
      <button id="restartBtn" class="btn">🔁 Try Again</button>
    </div>`;

  document.getElementById('restartBtn').addEventListener('click', () => {
    current = 0;
    score   = 0;
    renderCard(current);
  });
}

/* ---------- NEXT ---------- */
function nextCard() {
  current++;
  current < data.length ? renderCard(current) : showResult();
}

/* ---------- ENTER KEY ---------- */
container.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkAnswer();
});

/* ---------- INIT ---------- */
renderCard(current);













