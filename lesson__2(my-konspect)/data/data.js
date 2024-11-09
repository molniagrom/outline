import { refresh } from "../index.js";

export let playlists = [
    {
        id: 1,
        title: 'Hip-Hop Hits',
        tracks: [
            {
                artist: 'Eminem',
                title: 'Rap God',
                isHot: true,
                imageSource: './img/cardImage/trackList/track1.jpeg'
            },
            {
                artist: '50 cent',
                title: 'In da Club',
                isHot: false,
                imageSource: './img/cardImage/trackList/track2.jpeg'
            }
        ]
    },
    {
        id: 2,
        title: 'Rap Hits 1990s',
        tracks: [
            {
                artist: 'Public Enemy',
                title: 'Fight the Power',
                isHot: true,
                imageSource: './img/cardImage/trackList/track3.jpeg'
            }
        ]
    }
]

export const deletePlaylist = (id) => {
    playlists = playlists.filter(p => p.id !== id);
    refresh();
}

