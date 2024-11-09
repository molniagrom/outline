import { resetGameStatus } from "../state/data.js";

export function WinMode() {
  const element = document.createElement("div");
  element.classList.add("win-container")
  WinMode.render(element);

  return { element };
}

WinMode.render = (element) => {
  const p = document.createElement("p");
  p.append("YOU WIN");
  element.append(p);

  const playAgainButtonElement = document.createElement("button");
  playAgainButtonElement.append("PLAY AGAIN 🚀");
  element.append(playAgainButtonElement);

  playAgainButtonElement.addEventListener("click", () => {
    resetGameStatus(); // status is reset via status
  });
};
