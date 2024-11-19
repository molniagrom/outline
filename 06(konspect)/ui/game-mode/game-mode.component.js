import { Points } from "../../state/Points.js";
import { Grid } from "./grid.component.js";

export function GameMode() {
  const element = document.createElement("div");

  element.classList.add("greed-box");

  const localStste = {
    childrenCleanUps: [],
  };

  GameMode.render(element, localStste);

  return { element, cleanup: () => {
      localStste.childrenCleanUps.forEach((cc) => cc());
    },
  };
}

GameMode.render = (element, localStste) => {
  const gridComponentInstance = Grid();
  const pointsInstanse = Points();
  localStste.childrenCleanUps.push(gridComponentInstance.cleanup);
//   localStste.childrenCleanUps.push(pointsInstanse.cleanup);

  element.append(gridComponentInstance.element, pointsInstanse.element);
};
