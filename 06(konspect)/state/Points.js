import { getPoints, subscribe } from "./data.js";

export function Points() {
  const element = document.createElement("div");

  subscribe(() => {
    Points.render(element);
  });

  Points.render(element);
  return { element };
}

Points.render = (element) => {
  const points = getPoints();

  element.innerText = "";

  let pointsAsString = "";

  for (let characker in points) {
    pointsAsString += `${characker}: ${points[characker]}`;
  }

  element.append(pointsAsString)
};
