// Отвечает за компонент списка плейлистов.
// Содержит функцию "PlaylistsComponent", которая создает элемент списка плейлистов и добавляет компоненты каждого отдельного плейлиста.

import { PlaylistComponent } from "./Playlist/PlaylistComponent.js";

// components
export function PlaylistsComponent(inputPlaylists) {
    const element = document.createElement('div');

    for (let i = 0; i < inputPlaylists.length; i++) {
        const playlist = inputPlaylists[i];
        element.append(PlaylistComponent(playlist));
    }

    return element;
}
