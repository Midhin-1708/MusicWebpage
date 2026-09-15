const songs = [
  {
    id: 1,
    title: "Aasa Kooda",
    artist: "Sai Abhyankkar, Preity Mukundan",
    album: "Think Indie",
    duration: "3:33",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
  },
  {
    id: 2,
    title: "Katchi Sera",
    artist: "Sai Abhyankkar",
    album: "Think Indie",
    duration: "3:01",
    cover:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80",
  },
  {
    id: 3,
    title: "Munbe Vaa",
    artist: "Shreya Ghoshal, Naresh Iyer",
    album: "Sillunu Oru Kaadhal",
    duration: "5:59",
    cover:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80",
  },
  {
    id: 4,
    title: "Nenjukkul Peidhidum",
    artist: "Hariharan, Devan Ekambaram, V.V. Prassanna",
    album: "Vaaranam Aayiram",
    duration: "6:09",
    cover:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&q=80",
  },
  {
    id: 5,
    title: "Maruvaarthai",
    artist: "Sid Sriram",
    album: "Enai Noki Paayum Thota",
    duration: "5:56",
    cover:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80",
  },
  {
    id: 6,
    title: "Why This Kolaveri Di",
    artist: "Dhanush, Anirudh Ravichander",
    album: "3",
    duration: "4:03",
    cover:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=400&q=80",
  },
  {
    id: 7,
    title: "Arabic Kuthu",
    artist: "Anirudh Ravichander, Jonita Gandhi",
    album: "Beast",
    duration: "4:39",
    cover:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&q=80",
  },
  {
    id: 8,
    title: "Kaavaalaa",
    artist: "Shilpa Rao, Anirudh Ravichander",
    album: "Jailer",
    duration: "3:10",
    cover:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&q=80",
  },
  {
    id: 9,
    title: "Hukum",
    artist: "Anirudh Ravichander",
    album: "Jailer",
    duration: "3:27",
    cover:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80",
  },
  {
    id: 10,
    title: "Tum Kya Mile",
    artist: "Arijit Singh, Shreya Ghoshal",
    album: "Rocky Aur Rani Kii Prem Kahaani",
    duration: "4:37",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
  },
  {
    id: 11,
    title: "Kesariya",
    artist: "Arijit Singh",
    album: "Brahmāstra",
    duration: "4:28",
    cover:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80",
  },
  {
    id: 12,
    title: "Chaleya",
    artist: "Arijit Singh, Shilpa Rao",
    album: "Jawan",
    duration: "3:20",
    cover:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
  },
  {
    id: 13,
    title: "Heeriye",
    artist: "Jasleen Royal, Arijit Singh",
    album: "Heeriye",
    duration: "3:14",
    cover:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80",
  },
  {
    id: 14,
    title: "Apna Bana Le",
    artist: "Arijit Singh",
    album: "Bhediya",
    duration: "4:21",
    cover:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80",
  },
{
  id: 15,
  title: "O Maahi",
  artist: "Arijit Singh",
  album: "Dunki",
  duration: "3:53",
  cover:
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=400&q=80",
},
  {
    id: 16,
    title: "Samajavaragamana",
    artist: "Sid Sriram",
    album: "Ala Vaikunthapurramuloo",
    duration: "3:39",
    cover:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80",
  },
  {
    id: 17,
    title: "Inkem Inkem Inkem Kaavaale",
    artist: "Sid Sriram",
    album: "Geetha Govindam",
    duration: "4:16",
    cover:
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&q=80",
  },
  {
    id: 18,
    title: "Malare",
    artist: "Vijay Yesudas",
    album: "Premam",
    duration: "5:16",
    cover:
      "https://images.unsplash.com/photo-1499415479124-43c32433a620?w=400&q=80",
  },
  {
    id: 19,
    title: "Pavizha Mazha",
    artist: "K.S. Harisankar",
    album: "Athiran",
    duration: "3:53",
    cover:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=400&q=80",
  },
  {
    id: 20,
    title: "Pasoori",
    artist: "Ali Sethi, Shae Gill",
    album: "Coke Studio",
    duration: "3:44",
    cover:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&q=80",
  },
];

export default songs;

export const categories = [
  { id: 1, name: "Tamil", color: "#1ED760" },
  { id: 2, name: "Hindi", color: "#F97316" },
  { id: 3, name: "Malayalam", color: "#3B82F6" },
  { id: 4, name: "Telugu", color: "#EC4899" },
  { id: 5, name: "Punjabi", color: "#EAB308" },
  { id: 6, name: "Chill", color: "#8B5CF6" },
  { id: 7, name: "Romantic", color: "#F472B6" },
  { id: 8, name: "Party", color: "#EF4444" },
  { id: 9, name: "Workout", color: "#84CC16" },
  { id: 10, name: "Trending", color: "#22D3EE" },
  { id: 11, name: "Indie", color: "#14B8A6" },
  { id: 12, name: "Melody", color: "#64748B" },
];