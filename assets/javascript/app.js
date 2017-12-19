
var panel = $('#quiz-area');
var countStartNumber = 30;

//CLICK EVENTS

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});


//Question set

var questions = [{
  question: "In the opening scene of the movie frozen men are seen cutting what?",
  answers: ["Fish", "Ice", "Trees", "Bread"],
  correctAnswer: "Ice",
  image:"assets/images/q1.png"
}, {
  question: "Where is Elsa seen when she first appears in the movie?",
  answers: ["In a sleigh", "On a horse", "In bed", "Feeding Reindeer"],
  correctAnswer: "In bed",
  image:"assets/images/q2.gif"
}, {
  question: "What color hair does Elsa have?",
  answers: ["Red", "Black", "Blonde", "Brown"],
  correctAnswer: "Blonde",
  image:"assets/images/q3.jpg"
}, {
  question: "Anna gets Elsa out to play by asking her to build what?",
  answers: ["A sand castle", "A snowman", "A pillow fort", "An igloo"],
  correctAnswer: "A snowman",
  image:"assets/images/q4.jpg"
}, {
  question: "While playing, Anna is injured in a fall, to whom do her parents take her for help?",
  answers: ["Trolls", "A doctor", "A witch", "A wizard"],
  correctAnswer: "Trolls",
  image:"assets/images/q5.jpg"
}, {
  question: "What is the name of the Kingdom where Elsa and Anna live?",
  answers: ["Arendelle", "Wolfenden", "Snowdonia", "Fardinia"],
  correctAnswer: "Arendelle",
  image:"assets/images/q6.jpg"
}, {
  question: "The gates of the Kingdom have been closed since Anna had her accident, but now several years later they are to be opened once again, but what is the occasion?",
  answers: ["Elsa's Coronation", "Anna's Birthday", "Anna's Wedding", "The Summer Ball"],
  correctAnswer: "Elsa's Coronation",
  image:"assets/images/q7.png"
}, {
  question: "At the party afterwards, the two girls are talking and they smell their favorite food, what food is it?",
  answers: ["Pineapple", "Chocolate", "Cake", "Pizza"],
  correctAnswer: "Chocolate",
  image:"assets/images/q8.jpg"
}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,

  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },

  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },

  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },

  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};