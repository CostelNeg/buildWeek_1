const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];  

    let timer; // Variabile per il timer
    const QUESTION_TIMEOUT = 30000; // Tempo in millisecondi (30 secondi)

    function primaPagina() {
      document.getElementById('consent-form').addEventListener('submit', function (event) {
        event.preventDefault();  // Non fa ricaricare la pagina al invio del form
        var consentCheckbox = document.getElementById('consent-checkbox');

        if (consentCheckbox.checked) {
          document.getElementById('form-container').style.display = 'none';
          document.getElementById('content-container').style.display = 'block';
          displayQuestion();
        } else {
          alert('Devi acconsentire');
        }
      });
    }

    // Elemento div che contiene il quiz
    const quizContainer = document.getElementById('quiz-container');
    // Elemento div per il timer
    const timerContainer = document.getElementById('timer-container');
    // Elemento div per l'indice della domanda
    const questionIndexContainer = document.getElementById('question-index');

    // Indice della domanda
    let currentQuestionIndex = 0;

    // Funzione per visualizzare una domanda
    function displayQuestion() {
      // Ottiene la domanda
      const question = questions[currentQuestionIndex];

      // Genera HTML per visualizzare la domanda e risposte
      let html = `<div>
                          <p>${question.question}</p>`;
      for (let j = 0; j < question.incorrect_answers.length; j++) {
        // Inserisce le risposte errate
        html += `<label><input type="button" onclick="checkAnswer()" name="answer" value="${question.incorrect_answers[j]}"></label><br>`;
      }
      // Aggiunge la risposta corretta
      html += `<label><input type="button" name="answer" onclick="checkAnswer()" value="${question.correct_answer}"></label><br>`;

      // Inserisce l'HTML
      quizContainer.innerHTML = html;

      // Visualizza l'indice della domanda corrente
      questionIndexContainer.innerText = `Domanda ${currentQuestionIndex + 1}/${questions.length}`;

      // Avvia il timer per la domanda corrente
      startTimer();
    }

    // Funzione per avviare il timer
    function startTimer() {
      clearInterval(timer); // Resetta il timer se era già in esecuzione

      // Mostra il timer nel timerContainer
      let timeLeft = QUESTION_TIMEOUT / 1000; // Converti il tempo in secondi
      timerContainer.innerText = `Tempo rimanente: ${timeLeft} secondi`;

      timer = setInterval(() => {
        timeLeft--;
        if (timeLeft >= 0) {
          // Aggiorna il testo del timer
          timerContainer.innerText = `Tempo rimanente: ${timeLeft} secondi`;
        } else {
          // Passa automaticamente alla prossima domanda quando il timer è scaduto
          clearInterval(timer);
          currentQuestionIndex++;
          if (currentQuestionIndex < questions.length) {
            displayQuestion();
          } else {
            // Nasconde il timer e l'indice della domanda quando il quiz è completato
            timerContainer.style.display = 'none';
            questionIndexContainer.style.display = 'none';
            quizContainer.innerHTML = "<h2>Quiz completato!</h2>";
          }
        }
      }, 1000); // Aggiorna ogni secondo
    }

    // Funzione per controllare la risposta, messa all'interno del HTML tramite button
    function checkAnswer() {
      // Resetta il timer ogni volta che viene data una risposta
      startTimer();

      // Passa alla prossima domanda se presente, altrimenti mostra un messaggio di completamento del quiz
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        // Nasconde il timer e l'indice della domanda quando il quiz è completato
        timerContainer.style.display = 'none';
        questionIndexContainer.style.display = 'none';
        quizContainer.innerHTML = "<h2>Quiz completato!</h2>";
      }
    }
