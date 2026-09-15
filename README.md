# WeMusic

Premium music streaming website UI. React + Vite + Tailwind CSS + Framer Motion + React Router + React Icons.

Tagline: **Music Brings Us Together.**

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## What's included

- Cinematic intro loader (rotating vinyl, equalizer bars, logo/tagline reveal)
- Sticky desktop sidebar + collapsible mobile sidebar
- Sticky top navigation with search
- Fixed bottom music player (shuffle, prev/play/next, repeat, progress + volume sliders, rotating artwork while playing)
- Home page: hero, recommended, recently played, trending playlists, popular artists, featured albums, podcasts, mood/genre grid, newsletter CTA, footer
- Playlist page with gradient header and song table
- Artist profile page with banner, follow button, popular songs, albums, singles, related artists
- Search page with live client-side filtering over songs/artists/albums/playlists
- Liked Songs page
- 404 page
- Global player state via React Context so play/pause/queue stay in sync across every page
- Framer Motion throughout: page transitions, staggered reveals, hover lift/scale, sidebar active indicator, button glow
- Fully responsive from 320px up to ultra-wide, hidden scrollbar with working scroll, no horizontal overflow

## Structure

```
src/
 ├── assets/
 ├── components/   # IntroLoader, Sidebar, Topbar, Hero, MusicCard, PlaylistCard,
 │                  ArtistCard, AlbumCard, PodcastCard, SongRow, SearchBar, Player,
 │                  SectionTitle, ScrollToTop
 ├── pages/        # Home, Playlist, Artist, Search, Liked, NotFound
 ├── data/         # songs.js, artists.js, playlists.js, albums.js, podcasts.js
 ├── context/      # PlayerContext.jsx (global play/pause/queue state)
 ├── layouts/      # MainLayout.jsx
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

## Notes

- All cover art / photos are royalty-free Unsplash images loaded by URL — swap in your own assets in `src/assets` and update the paths in `src/data/*.js` whenever you're ready.
- The player is UI-only (no real audio element wired up) — drop an `<audio>` tag and hook it into `PlayerContext` if you want actual playback.
