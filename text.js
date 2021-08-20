export default class TextPassages {
  constructor() {
    this.databank = 0;
  }
  async fetch() {
    const response = await fetch("https://type.fit/api/quotes");
    this.databank = await response.json();
    // waits until the request completes...
    console.log(this.databank);
  }
  randomText() {
    let randomText =
      this.databank[Math.floor(Math.random() * this.databank.length)];
    let text = randomText.author
      ? `${randomText.text} ${randomText.author}`
      : randomText.author;
    return text;
  }
}

// class Text {
//   constructor() {
//     this.databank = 0;
//     fetch("https://type.fit/api/quotes")
//       .then(function (response) {
//         return response.json();
//       })
//       .then((data) => {
//         this.databank = data;
//         console.log(this.databank);
//       });
//   }

// }

// initialize();

// let maxWordLen = 7;
// let tempText = "";
// for (let i = 0; i < 10; i++) {
//   let length = Math.floor(Math.random() * maxWordLen + 1);
//   tempText += generateLetter(length) + " ";
// }
// return tempText.trimEnd();

// function generateLetter(length) {
//   let result = "";
//   let characters = "abcdefghijklmnopqrstuvwxyz";
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// }
