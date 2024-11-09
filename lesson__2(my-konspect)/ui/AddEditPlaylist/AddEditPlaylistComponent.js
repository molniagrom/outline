import { liba } from "../../shared/liba.js";

export function AddEditPlaylistComponent() {
  const element = liba.create("dialog");

  element.innerHTML = `
     <p>Greetings, one and all!</p>
  <form method="dialog">
    <button>OK</button>
  </form>
    `;

  element.open = true;

  return element;
}
