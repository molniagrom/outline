import { playlists as a } from "./data/data.js";
import { AddEditPlaylistComponent } from "./ui/AddEditPlaylist/AddEditPlaylistComponent.js";
import { PlaylistsComponent } from "./ui/Playlists/PlaylistsComponent.js";

// DATA

// RENDER
const root = document.getElementById("root");

export function refresh() {
  root.innerHTML = "";

  const playlistsElement = PlaylistsComponent(a);
  const AddEditPlaylistElement = AddEditPlaylistComponent();
  root.append(playlistsElement, AddEditPlaylistElement);
}

refresh();

// setInterval(refresh, 5000);