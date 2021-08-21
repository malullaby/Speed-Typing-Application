export const updateResults = (results) => {
  document.querySelector("#mistakes").textContent = results.mistakes;
  document.querySelector("#speed").textContent = results.speed;
  document.querySelector("#wpm").textContent = results.worldsPerMinute;
};

export const render = (text) => {
  const parent = document.querySelector("#text");
  parent.innerHTML = "";
  text.split("").forEach((char, i) => {
    let child = document.createElement("span");
    child.textContent = char;
    child.id = "i_" + i;
    parent.appendChild(child);
  });
  document.querySelector("#i_0").classList.add("cursor");
};
