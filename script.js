import StopWatch from "./stopwatch.js";

const sw = new StopWatch();
let texts;
fetch("https://type.fit/api/quotes")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    texts = data;
    initialize();
  });

function generateLetter(length) {
  let result = "";
  let characters = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateText(length) {
  // let maxWordLen = 7;
  // let tempText = "";
  // for (let i = 0; i < 10; i++) {
  //   let length = Math.floor(Math.random() * maxWordLen + 1);
  //   tempText += generateLetter(length) + " ";
  // }
  // return tempText.trimEnd();
  let randomText = texts[Math.floor(Math.random() * texts.length)];
  let text = randomText.author
    ? `${randomText.text} ${randomText.author}`
    : randomText.author;
  return text;
}

let current = 0;
let length = 50;
// let wordLength = 9;
let text;
let key;
let correct = true;
let speed;
let firstKeyPress = true;
let incorrectCounter = 0;
let done = false;

function populateText(text) {
  const parent = document.querySelector("#text");
  parent.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    let child = document.createElement("span");
    text[i] !== " ";
    // child.textContent = text[i] !== " " ? text[i] : "␣";
    child.textContent = text[i];

    child.id = "i_" + i;
    parent.appendChild(child);
  }
}

function isCorrect(char, target) {
  return char === target;
}

function initialize() {
  text = generateText(length);
  populateText(text);
  document.querySelector("#i_0").classList.add("cursor");
  current = 0;
  correct = true;
  incorrectCounter = 0;
  done = false;
  sw.reset();
  firstKeyPress = true;
  // document.querySelector("#results").textContent = "";
}

// initialize();

document.addEventListener("keydown", KeyPress);

function KeyPress(e) {
  key = e.key;
  if (key === "Shift") return;
  if (firstKeyPress) {
    sw.start();
    firstKeyPress = false;
  }
  if (done) {
    initialize();
  }

  if (isCorrect(text[current], key)) {
    let element = document.querySelector("#i_" + current);
    element.classList.remove("cursor");
    if (correct) {
      if (element.textContent === " ") element.classList.add("correct_space");
      else element.classList.add("correct");
    } else {
      incorrectCounter++;
      if (element.textContent === " ") element.classList.add("incorrect_space");
      else element.classList.add("incorrect");
    }
    correct = true;
    if (current < text.length - 1) {
      current++;
      let nextElement = document.querySelector("#i_" + current);
      nextElement.classList.add("cursor");
    } else {
      sw.stop();
      speed = sw.duration;
      done = true;
      summarize();
    }
  } else correct = false;
}

let summarize = () => {
  //number of words
  let count = text.split(" ").length - 1;
  // words per minute
  let x = 60 / speed;
  let results = {
    mistakes: incorrectCounter,
    speed,
    worldsProMinute: Math.round(x * count),
  };
  updateResults(results);
};

const updateResults = (results) => {
  document.querySelector("#mistakes").textContent = results.mistakes;
  document.querySelector("#speed").textContent = results.speed;
  document.querySelector("#wpm").textContent = results.worldsProMinute;
};
