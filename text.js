const API_URL = "http://api.quotable.io/random";

export function getRandomText() {
  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => `${data.content} ${data.author}`);
}
