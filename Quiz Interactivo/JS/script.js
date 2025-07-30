
document.addEventListener('DOMContentLoaded', function () {
    // Variables
    let currentQuestion = 1;
    let score = 0;
    const totalQuestions = 3;
    let userAnswers = {};

    // Elementos del DOM
    const nextButtons = {
        1: document.getElementById('next1'),
        2: document.getElementById('next2'),
        3: document.getElementById('finish')
    };
    const prevButtons = {
        2: document.getElementById('prev2'),
        3: document.getElementById('prev3')
    };
    const questionContainers = {
        1: document.getElementById('question1'),
        2: document.getElementById('question2'),
        3: document.getElementById('question3')
    };
    const progressText = document.querySelector('.progress');
    const resultContainer = document.getElementById('result');
    const totalScoreElement = document.getElementById('total-score');
    const messageElement = document.getElementById('message');
    const feedbackElement = document.getElementById('feedback');
    const restartButton = document.getElementById('restart');

    // Mensajes motivadores
    const messages = {
        perfect: {
            text: "¡Felicidades! 🎉 Eres un experto en hábitos saludables. Tus conocimientos te ayudarán a tener una vida más sana y feliz.",
            feedback: "Sigue practicando estos buenos hábitos y comparte lo que sabes con tus amigos y familia."
        },
        good: {
            text: "¡Muy bien hecho! 👍 Tienes buenos conocimientos sobre hábitos saludables, pero aún hay espacio para mejorar.",
            feedback: "Presta atención a las respuestas correctas y sigue aprendiendo sobre cómo cuidar tu salud."
        },
        regular: {
            text: "¡Buen intento! 💪 Sabes algunas cosas importantes, pero hay áreas donde puedes mejorar.",
            feedback: "Revisa las respuestas correctas y considera hablar con tus profesores o padres para aprender más."
        },
        poor: {
            text: "¡Ánimo! 📚 Todos empezamos por algún lado. Ahora tienes la oportunidad de aprender más sobre hábitos saludables.",
            feedback: "Te recomendamos repasar las respuestas correctas y preguntar a tus profesores sobre cómo mejorar tus hábitos."
        }
    };

    // Inicializar quiz
    initQuiz();

    function initQuiz() {
        // Event listeners para las opciones
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', function () {
                const questionNumber = parseInt(this.closest('.question-container').id.replace('question', ''));

                // Deseleccionar otras opciones en la misma pregunta
                this.parentNode.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });

                // Seleccionar esta opción
                this.classList.add('selected');

                // Guardar respuesta del usuario
                userAnswers[questionNumber] = this;

                // Habilitar el botón siguiente
                nextButtons[questionNumber].disabled = false;
            });
        });

        // Event listeners para navegación
        nextButtons[1].addEventListener('click', () => navigateToQuestion(2));
        nextButtons[2].addEventListener('click', () => navigateToQuestion(3));
        nextButtons[3].addEventListener('click', showResults);
        prevButtons[2].addEventListener('click', () => navigateToQuestion(1));
        prevButtons[3].addEventListener('click', () => navigateToQuestion(2));

        // Event listener para reiniciar
        restartButton.addEventListener('click', restartQuiz);
    }

    // Función para navegar entre preguntas
    function navigateToQuestion(questionNumber) {
        // Ocultar pregunta actual y mostrar la siguiente
        questionContainers[currentQuestion].classList.remove('active');
        questionContainers[questionNumber].classList.add('active');
        currentQuestion = questionNumber;

        // Actualizar progreso
        progressText.textContent = `Pregunta ${questionNumber} de ${totalQuestions}`;

        // Restaurar selección si el usuario ya había respondido
        if (userAnswers[questionNumber]) {
            userAnswers[questionNumber].classList.add('selected');
            nextButtons[questionNumber].disabled = false;
        } else {
            nextButtons[questionNumber].disabled = true;
        }
    }

    // Función para mostrar resultados
    function showResults() {
        // Calcular puntaje final
        score = 0;
        for (let i = 1; i <= totalQuestions; i++) {
            if (userAnswers[i] && userAnswers[i].dataset.correct === "true") {
                score += 5;
            }
        }

        // Mostrar retroalimentación visual de respuestas
        for (let i = 1; i <= totalQuestions; i++) {
            const options = questionContainers[i].querySelectorAll('.option');
            options.forEach(option => {
                if (option.dataset.correct === "true") {
                    option.classList.add('correct');
                } else if (option.classList.contains('selected') && option.dataset.correct === "false") {
                    option.classList.add('incorrect');
                }
            });
        }

        // Ocultar última pregunta y mostrar resultados
        questionContainers[currentQuestion].classList.remove('active');
        resultContainer.style.display = 'block';
        totalScoreElement.textContent = score;

        // Mostrar mensaje según puntaje
        let message, feedback;
        if (score === 15) {
            message = messages.perfect.text;
            feedback = messages.perfect.feedback;
        } else if (score >= 10) {
            message = messages.good.text;
            feedback = messages.good.feedback;
        } else if (score >= 5) {
            message = messages.regular.text;
            feedback = messages.regular.feedback;
        } else {
            message = messages.poor.text;
            feedback = messages.poor.feedback;
        }

        messageElement.textContent = message;
        feedbackElement.textContent = feedback;
    }

    // Función para reiniciar el quiz
    function restartQuiz() {
        // Reiniciar variables
        currentQuestion = 1;
        score = 0;
        userAnswers = {};

        // Reiniciar estado de las preguntas
        resultContainer.style.display = 'none';
        questionContainers[2].classList.remove('active');
        questionContainers[3].classList.remove('active');
        questionContainers[1].classList.add('active');

        // Reiniciar selecciones y retroalimentación
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
        });

        // Deshabilitar botones siguientes
        nextButtons[1].disabled = true;
        nextButtons[2].disabled = true;
        nextButtons[3].disabled = true;

        // Reiniciar progreso
        progressText.textContent = `Pregunta 1 de ${totalQuestions}`;
    }
});
