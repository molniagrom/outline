import { resetGameStatus } from "../state/data.js";

export function LoseMode() {
  const element = document.createElement("div");
  element.classList.add("lose-container")

  LoseMode.render(element);

  return { element };
}

LoseMode.render = (element) => {
  const p = document.createElement("p");
  p.append("GOOGLE WIN");
  element.append(p);

  const playAgainButtonElement = document.createElement("button");
  playAgainButtonElement.append("PLAY AGAIN 🚀");

  element.append(playAgainButtonElement);

  playAgainButtonElement.addEventListener("click", () => {
    resetGameStatus(); // status is reset via status
  });
};
