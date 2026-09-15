import { motion } from "framer-motion";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import MusicCard from "../components/MusicCard";
import PlaylistCard from "../components/PlaylistCard";
import ArtistCard from "../components/ArtistCard";
import AlbumCard from "../components/AlbumCard";
import PodcastCard from "../components/PodcastCard";
import songs, { categories } from "../data/songs";
import artists from "../data/artists";
import playlists from "../data/playlists";
import albums from "../data/albums";
import podcasts from "../data/podcasts";

function Row({ children }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
      {children}
    </div>
  );
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function Home() {
  const recommended = songs.slice(0, 8);
  const recentlyPlayed = [...songs].reverse().slice(0, 8);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="max-w-[1600px] mx-auto"
    >
      <Hero />

      <section className="mb-10">
        <SectionTitle title="Recommended for you" subtitle="Based on your recent listening" action="Show all" />
        <Row>
          {recommended.map((s) => (
            <MusicCard key={s.id} song={s} />
          ))}
        </Row>
      </section>

      <section className="mb-10">
        <SectionTitle title="Recently Played" action="Show all" />
        <Row>
          {recentlyPlayed.map((s) => (
            <MusicCard key={s.id} song={s} />
          ))}
        </Row>
      </section>

      <section className="mb-10">
        <SectionTitle title="Trending Playlists" subtitle="What everyone's streaming this week" action="Show all" />
        <Row>
          {playlists.map((p) => (
            <PlaylistCard key={p.id} playlist={p} />
          ))}
        </Row>
      </section>

      <section className="mb-10">
        <SectionTitle title="Popular Artists" action="Show all" />
        <Row>
          {artists.map((a) => (
            <ArtistCard key={a.id} artist={a} />
          ))}
        </Row>
      </section>

      <section className="mb-10">
        <SectionTitle title="Featured Albums" action="Show all" />
        <Row>
          {albums.map((al) => (
            <AlbumCard key={al.id} album={al} />
          ))}
        </Row>
      </section>

      <section className="mb-10">
        <SectionTitle title="Podcasts" subtitle="Conversations from the artists you love" action="Show all" />
        <Row>
          {podcasts.map((p) => (
            <PodcastCard key={p.id} podcast={p} />
          ))}
        </Row>
      </section>

      <section className="mb-10">
        <SectionTitle title="Moods & Genres" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((c) => (
            <motion.div
              key={c.id}
              whileHover={{ y: -4 }}
              className="relative h-24 rounded-xl overflow-hidden flex items-end p-4 cursor-pointer"
              style={{ backgroundColor: c.color + "22" }}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `linear-gradient(135deg, ${c.color}55, transparent)`,
                }}
              />
              <span className="relative text-sm font-semibold text-white">{c.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl bg-card overflow-hidden px-6 sm:px-10 py-12 text-center"
        >
          <div className="absolute inset-0 bg-radial-fade" />
          <h3 className="relative text-2xl sm:text-3xl font-bold mb-3">
            Never miss a drop.
          </h3>
          <p className="relative text-neutral-400 max-w-md mx-auto mb-6 text-sm">
            Get new releases, curated playlists and artist updates straight
            to your inbox every Friday.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 bg-base text-sm text-white placeholder-neutral-500 rounded-full px-5 py-3 outline-none focus:ring-1 focus:ring-accent"
            />
            <button className="bg-accent text-black text-sm font-semibold rounded-full px-6 py-3 shadow-glowsm">
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>

      <footer className="border-t border-neutral-900 pt-8 pb-4 text-sm text-neutral-500">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          <div>
            <p className="text-white font-semibold mb-3">Company</p>
            <ul className="space-y-2">
              <li>About</li>
              <li>Jobs</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-3">Communities</p>
            <ul className="space-y-2">
              <li>For Artists</li>
              <li>Developers</li>
              <li>Advertising</li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-3">Useful Links</p>
            <ul className="space-y-2">
              <li>Support</li>
              <li>Web Player</li>
              <li>Free Mobile App</li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-3">WeMusic</p>
            <ul className="space-y-2">
              <li>Legal</li>
              <li>Privacy Center</li>
              <li>Cookies</li>
            </ul>
          </div>
        </div>
        <p>© 2026 WeMusic. Music Brings Us Together.</p>
      </footer>
    </motion.div>
  );
}
