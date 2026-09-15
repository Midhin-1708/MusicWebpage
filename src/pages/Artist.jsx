import { useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import artists from "../data/artists";
import songs from "../data/songs";
import albums from "../data/albums";
import SongRow from "../components/SongRow";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";
import SectionTitle from "../components/SectionTitle";
import { usePlayer } from "../context/PlayerContext";

export default function Artist() {
  const { id } = useParams();
  const artist = artists.find((a) => String(a.id) === id) || artists[0];
  const { playSong } = usePlayer();
  const [following, setFollowing] = useState(false);

  const popularSongs = songs
    .filter((s) => s.artist === artist.name)
    .concat(songs.slice(0, 5))
    .slice(0, 5);

  const artistAlbums = albums.filter((al) => al.artist === artist.name).length
    ? albums.filter((al) => al.artist === artist.name)
    : albums.slice(0, 3);

  const related = artists.filter((a) => a.id !== artist.id).slice(0, 6);

  return (
    <div className="max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-6"
      >
        <img src={artist.banner} alt={artist.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 sm:p-10 flex items-end gap-5">
          <motion.img
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            src={artist.image}
            alt={artist.name}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-base shadow-2xl"
          />
          <div>
            <p className="text-xs uppercase tracking-wider text-accent mb-1">Verified Artist</p>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">{artist.name}</h1>
            <p className="text-neutral-400 text-sm mt-1">{artist.listeners} monthly listeners</p>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center gap-4 mb-10 px-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => playSong(popularSongs[0], popularSongs)}
          className="w-14 h-14 rounded-full bg-accent text-black flex items-center justify-center shadow-glow"
        >
          <FiPlay size={22} className="ml-1" />
        </motion.button>
        <motion.button
          onClick={() => setFollowing((f) => !f)}
          whileTap={{ scale: 0.95 }}
          className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
            following
              ? "bg-accent text-black border-accent shadow-glowsm"
              : "border-neutral-600 text-white hover:border-white"
          }`}
        >
          {following ? "Following" : "Follow"}
        </motion.button>
      </div>

      <section className="mb-10">
        <SectionTitle title="Popular" />
        <div className="space-y-0.5">
          {popularSongs.map((song, i) => (
            <SongRow key={song.id + "-" + i} song={song} index={i + 1} list={popularSongs} showAlbum={false} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <SectionTitle title="Albums" />
        <div className="flex gap-4 overflow-x-auto pb-2">
          {artistAlbums.map((al) => (
            <AlbumCard key={al.id} album={al} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <SectionTitle title="Singles" />
        <div className="flex gap-4 overflow-x-auto pb-2">
          {songs.slice(0, 4).map((s) => (
            <AlbumCard key={"single-" + s.id} album={{ id: s.id, title: s.title, artist: artist.name, year: 2026, cover: s.cover }} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <SectionTitle title="Fans also like" />
        <div className="flex gap-4 overflow-x-auto pb-2">
          {related.map((a) => (
            <ArtistCard key={a.id} artist={a} />
          ))}
        </div>
      </section>
    </div>
  );
}
