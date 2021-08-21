export const updateResults = (results) => {
  document.querySelector("#mistakes").textContent = results.mistakes;
  document.querySelector("#speed").textContent = results.speed;
  document.querySelector("#wpm").textContent = results.worldsProMinute;
};

export const render = (text) => {
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
  document.querySelector("#i_0").classList.add("cursor");
};
