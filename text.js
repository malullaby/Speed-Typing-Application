const API_URL = "https://api.quotable.io/random";

export function getRandomText() {
  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => `${data.content} ${data.author}`);
}
