const questions = [
    {
        question: "What is the capital of pakistan?",
        options: ["Lahore", "Karachi", "Islamabad", "Multan"],
        correct: "Islamabad",
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: "4",
    },
    {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets","Cascading Style Sheets","Creative Style Sheets", "Colorful Style Sheets"],
        correct: "Cascading Style Sheets",
    },
];

let currentQuestionIndex = 0;
let timerDuration = 10; // seconds
let timerInterval;
let timeout;

function loadQuestion() {
    clearInterval(timerInterval); // Clear previous timer
    clearTimeout(timeout); // Clear timeout for auto next

    if (currentQuestionIndex >= questions.length) {
        document.body.innerHTML = "<h1>Quiz Completed!</h1>";
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => handleAnswer(option);
        optionsContainer.appendChild(button);
    });

    startTimer();
}

function startTimer() {
    let timeLeft = timerDuration;
    document.getElementById("timer").textContent = `Time left: ${timeLeft}`;
    
    // Timer countdown
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time left: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);

    // Auto-move to the next question
    timeout = setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, timerDuration * 1000);
}

function handleAnswer(selectedOption) {
    clearInterval(timerInterval);
    clearTimeout(timeout);

    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correct) {
        alert("Correct Answer!");
    } else {
        alert("Wrong Answer!");
    }

    currentQuestionIndex++;
    loadQuestion();
}

// Load the first question
loadQuestion();