// ========== DOM Elements ==========
const quizForm = document.getElementById('quiz-form');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');

// ========== Quiz Data ==========
const questions = [
    {
        text: "1. Come ti senti prevalentemente durante la tua giornata?",
        options: [
            { value: "A", text: "Tranquillo/a, in pace con ciò che mi circonda" },
            { value: "B", text: "Pieno/a di energie, ottimista, determinato/a, con una gran voglia di fare" },
            { value: "C", text: "Sensibile, empatico/a, sento molto ogni variazione emotiva mia e altrui" },
            { value: "D", text: "Un po’ ansioso/a, con molti pensieri" },
        ],
    },
    {
        text: "2. Cosa fai quando vuoi rilassarti?",
        options: [
            { value: "A", text: "Leggo, medito, attività riflessive" },
            { value: "B", text: "Esco con gli amici, faccio sport, tenermi attivo/a mi dà una nuova carica" },
            { value: "C", text: "Ascolto musica o scrivo, attività che mi aiutano a esprimermi" },
            { value: "D", text: "Dormo, in generale sto da solo per ricaricarmi" },
        ],
    },
    {
        text: "3. Quale frase ti rappresenta di più?",
        options: [
            { value: "A", text: "“Tutto passa e si gestisce.”" },
            { value: "B", text: "“La vita è un’avventura!”" },
            { value: "C", text: "“Le emozioni sono la mia bussola.”" },
            { value: "D", text: "“Ho un sacco di cose a cui pensare!”" },
        ],
    },
    {
        text: "4. Quando affronti una difficoltà, qual è la tua prima reazione?",
        options: [
            { value: "A", text: "Tendo ad analizzare la situazione e mi prendo un momento per riflettere" },
            { value: "B", text: "Mi attivo per cercare subito una soluzione pratica e superarla" },
            { value: "C", text: "Mi confronto con qualcuno/a di mia fiducia" },
            { value: "D", text: "Tendo a sentirmi sopraffatto/a e ho bisogno di un attimo per mettere in ordine le idee" },
        ],
    },
    {
        text: "5. Come ti descriverebbero gli altri?",
        options: [
            { value: "A", text: "Calmo/a, equilibrato/a, affidabile" },
            { value: "B", text: "Allegro/a, determinato/a, pieno di vita" },
            { value: "C", text: "Profondo/a, empatico/a, sensibile" },
            { value: "D", text: "Introverso/a, pensieroso/a, ansioso/a" },
        ],
    },
    {
        text: "6. Se fossi un paesaggio, saresti:",
        options: [
            { value: "A", text: "Un mare calmo" },
            { value: "B", text: "Un vulcano attivo" },
            { value: "C", text: "Un prato in alta montagna" },
            { value: "D", text: "Un bosco sotto la pioggia" },
        ],
    },
    {
        text: "7. Quale colore ti attira di più, istintivamente?",
        options: [
            { value: "A", text: "Blu" },
            { value: "B", text: "Giallo" },
            { value: "C", text: "Lilla" },
            { value: "D", text: "Arancione" },
        ],
    },
];

const results = {
    A: {
        color: "Blu",
        title: "Blu (Il Sereno)",
        description: "Sei una persona calma, riflessiva e pacata. Il tuo equilibrio interiore è la tua forza principale. Affronti le sfide della vita con tranquillità e saggezza, trovando sempre il modo di mantenere la pace interiore anche nelle situazioni più complesse.",
        traits: "Calmo, Riflessivo, Equilibrato, Saggio, Pacifico",
        css: "blu"
    },
    B: {
        color: "Giallo",
        title: "Giallo (Il Solare)",
        description: "Sei solare, ottimista e pieno di energia positiva. Porti luce ovunque vai e la tua presenza illumina la giornata di chi ti circonda. La tua vitalità e il tuo entusiasmo sono contagiosi e ispirano gli altri a dare il meglio di sé.",
        traits: "Energico, Ottimista, Entusiasta, Motivante, Vitale",
        css: "giallo"
    },
    C: {
        color: "Lilla",
        title: "Lilla (Il Sensibile)",
        description: "Sei profondo, sensibile e creativo. Le emozioni sono la tua bussola e ti guidano nelle decisioni più importanti. Hai una capacità straordinaria di comprendere gli altri e di creare connessioni autentiche e significative.",
        traits: "Empatico, Creativo, Intuitivo, Profondo, Artistico",
        css: "lilla"
    },
    D: {
        color: "Arancione",
        title: "Arancione (Il Pensieroso)",
        description: "Sei spesso sopraffatto dallo stress, ma hai una grande capacità di introspezione. La tua mente attiva ti permette di analizzare le situazioni in profondità e di trovare soluzioni creative ai problemi più complessi.",
        traits: "Analitico, Introspettivo, Pensieroso, Creativo, Profondo",
        css: "arancione"
    }
};

// ========== Render Quiz ==========
function renderQuiz() {
    quizForm.innerHTML = '';
    questions.forEach((q, idx) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'question-block';
        qDiv.innerHTML = `
            <div class="question"><strong>${q.text}</strong></div>
            <div class="options">
                ${q.options.map((opt, oi) => `
                    <label class="option-label">
                        <input type="radio" name="q${idx}" value="${opt.value}" required>
                        ${opt.text}
                    </label>
                `).join('')}
            </div>
        `;
        quizForm.appendChild(qDiv);
    });

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Mostra il risultato';
    quizForm.appendChild(submitBtn);
}
renderQuiz();

// ========== Handle Option Highlight ==========
quizForm.addEventListener('change', (e) => {
    if (e.target.type === 'radio') {
        const group = e.target.name;
        document.querySelectorAll(`input[name="${group}"]`).forEach(inp => {
            inp.parentElement.classList.remove('selected');
        });
        e.target.parentElement.classList.add('selected');
    }
});

// ========== Handle Submit ==========
quizForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const answers = [];
    for (let i = 0; i < questions.length; i++) {
        const val = quizForm.querySelector(`input[name="q${i}"]:checked`);
        if (!val) {
            alert("Rispondi a tutte le domande!");
            return;
        }
        answers.push(val.value);
    }
    showResult(answers);
});

// ========== Calculate and Show Result ==========
function showResult(answers) {
    // Conta le risposte per lettera
    const counts = {A:0, B:0, C:0, D:0};
    answers.forEach(a => { counts[a]++; });
    // Trova la lettera con il maggior numero di risposte
    let max = 0, resultKey = "A";
    for (let key of ['A','B','C','D']) {
        if (counts[key] > max) {
            max = counts[key];
            resultKey = key;
        }
    }
    // Render result
    const res = results[resultKey];
    resultDiv.innerHTML = `
        <div class="color-title" style="color:var(--${res.css})">${res.title}</div>
        <div class="desc">${res.description}</div>
        <div class="traits"><strong>Tratti distintivi:</strong> ${res.traits}</div>
        <div style="margin-top:1.2rem;">
            <button onclick="window.location.reload()" style="background:var(--${res.css});color:white;padding:0.5rem 1.4rem;border:none;border-radius:1.5rem;font-size:1.07rem;cursor:pointer;box-shadow:0 2px 10px 0 rgba(0,0,0,0.06);">Ricomincia il test</button>
        </div>
    `;
    resultDiv.className = `result ${res.css}`;
    resultDiv.classList.remove('hidden');
    quizForm.classList.add('hidden');
    restartBtn.classList.add('hidden');
}

// ========== Restart Quiz ==========
restartBtn.addEventListener('click', () => {
    renderQuiz();
    resultDiv.classList.add('hidden');
    quizForm.classList.remove('hidden');
    restartBtn.classList.add('hidden');
});