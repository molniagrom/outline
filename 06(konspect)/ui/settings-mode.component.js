import {
  getPointsToLose,
  getPointsToWin,
  setGridSize,
  setPointsToLose,
  setPointsToWin,
  startGame,
} from "../state/data.js";

export function SettingsMode() {
  // debugger
  const element = document.createElement("div");
  element.classList.add("box");
  SettingsMode.render(element);

  return { element };
}

SettingsMode.render = (element) => {
  const gridSizeSelectElement = document.createElement("select");
  gridSizeSelectElement.classList.add("select")
  gridSizeSelectElement.addEventListener("change", () => {
    const selectedValue = gridSizeSelectElement.value;
    setGridSize(selectedValue);
  });

  for (let size = 4; size <= 8; size++) {
    const gridSizeOptionElement = document.createElement("option");
    gridSizeSelectElement.classList.add("option")
    gridSizeOptionElement.value = `${size}x${size}`;
    gridSizeOptionElement.textContent = `${size}x${size}`;
    gridSizeSelectElement.append(gridSizeOptionElement);
  }

  element.append(gridSizeSelectElement);

  const startButtonElement = document.createElement("button");
  startButtonElement.classList.add("button-start")

  startButtonElement.append("START 🚀");

  startButtonElement.addEventListener("click", () => {
    startGame();
  });

  // console.log(element);
  const pointsToWin = PointsToWin();
  const pointsToLose = PointsToLose();

  element.append(startButtonElement, pointsToWin.element, pointsToLose.element);
};

// ..........................................................

export function PointsToWin() {
  const element = document.createElement("div");
  element.classList.add("box-pointsToWin");
  PointsToWin.render(element);

  return { element: element };
}

PointsToWin.render = (element) => {
  const PointsToWinSelectElement = document.createElement("select");
  PointsToWinSelectElement.classList.add("select")

  const pointsToWinCount = getPointsToWin();
  for (let i = 10; i <= 60; i += 10) {
    const PointsToWinOptionElement = document.createElement("option");
    PointsToWinOptionElement.classList.add("option")

    PointsToWinOptionElement.value = i;
    PointsToWinOptionElement.textContent = i;
    if (pointsToWinCount === i) {
      PointsToWinOptionElement.selected = true;
    }
    PointsToWinSelectElement.append(PointsToWinOptionElement);
  }

  PointsToWinSelectElement.addEventListener("change", () => {
    const selectedValue = PointsToWinSelectElement.value;
    setPointsToWin(selectedValue);
  });

  element.append(PointsToWinSelectElement);
};

// ..........................................................

export function PointsToLose() {
  const element = document.createElement("div");
  element.classList.add("box-pointsToLose");
  PointsToLose.render(element);

  return { element: element };
}

PointsToLose.render = (element) => {
  const PointsToLoseSelectElement = document.createElement("select");
  PointsToLoseSelectElement.classList.add("select")

  const pointsToLoseCount = getPointsToLose();
  for (let i = 5; i <= 25; i += 5) {
    const PointsToLoseOptionElement = document.createElement("option");
    PointsToLoseOptionElement.classList.add("option")

    PointsToLoseOptionElement.value = i;
    PointsToLoseOptionElement.textContent = i;
    if (pointsToLoseCount === i) {
      PointsToLoseOptionElement.selected = true;
    }
    PointsToLoseSelectElement.append(PointsToLoseOptionElement);
  }

  PointsToLoseSelectElement.addEventListener("change", () => {
    const selectedValue = PointsToLoseSelectElement.value;
    setPointsToLose(selectedValue);
  });

  element.append(PointsToLoseSelectElement);
};
