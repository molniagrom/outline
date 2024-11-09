export function GoogleImg() {
  const element = document.createElement("span");
  const imgElement = document.createElement("img");
  imgElement.src = "./google.jpg";
  imgElement.alt = "Google Image";

  imgElement.style.width = "80%";
  imgElement.style.height = "80%";

  element.append(imgElement);

  return { element };
}
