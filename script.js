import StopWatch from "./stopwatch.js";
import { getRandomText } from "./text.js";
import { render, updateResults } from "./view.js";

const sw = new StopWatch();
let currentChar = 0;
let key;
let correct = true;
let speed;
let firstKeyPress = true;
let incorrectCounter = 0;
let done = false;
let text;

restart();

async function restart() {
  text = await getRandomText();
  render(text);
  currentChar = 0;
  correct = true;
  incorrectCounter = 0;
  done = false;
  sw.reset();
  firstKeyPress = true;
}

document.addEventListener("keydown", KeyPress);

function KeyPress(e) {
  // Start the timer when the first key is pressed after text rendering
  if (firstKeyPress) {
    sw.start();
    firstKeyPress = false;
  }
  // In case the last passage was fully typed a key pressed restarts the exercise
  if (done) {
    restart();
    return;
  }
  key = e.key;
  // The shift key by itself doesn't count as pressed key - only in combination with others.
  if (key === "Shift") return;
  // checking if input is correct and assigning classes to the spans
  if (text[currentChar] === key) {
    let element = document.querySelector("#i_" + currentChar);
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
    // advancing in the text until the last element and moving the cursor
    if (currentChar < text.length - 1) {
      currentChar++;
      let nextElement = document.querySelector("#i_" + currentChar);
      nextElement.classList.add("cursor");
      // last character of the text was correctly typed
    } else {
      sw.stop();
      speed = sw.duration;
      // done - set to true - next key press triggers a new text rendering
      done = true;
      summarize();
    }
    // if key doesn't match the respective character the boolean correct is set to false
    //
  } else correct = false;
}

let summarize = () => {
  let wordCount = text.split(" ").length - 1;
  let results = {
    mistakes: incorrectCounter,
    speed,
    worldsPerMinute: Math.round((60 / speed) * wordCount),
  };
  updateResults(results);
};
