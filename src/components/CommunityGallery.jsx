import { useState } from 'react';
import { Heart } from 'lucide-react';

const SAMPLE = [
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496302662116-35cc4f36df92?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520697222860-6d0d38935d65?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496302662116-35cc4f36df92?q=80&w=1200&auto=format&fit=crop'
];

export default function CommunityGallery() {
  return (
    <section className="px-4 sm:px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Community Gallery</h2>
            <p className="text-gray-600">Get inspired by boards shared by the community.</p>
          </div>
        </div>

        {/* Masonry-like grid using CSS columns */}
        <div className="[column-count:1] sm:[column-count:2] lg:[column-count:3] gap-4 space-y-4">
          {SAMPLE.map((src, i) => (
            <Card key={i} src={src} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ src }) {
  const [likes, setLikes] = useState(Math.floor(Math.random() * 200) + 20);
  const [liked, setLiked] = useState(false);
  return (
    <div className="break-inside-avoid rounded-3xl overflow-hidden relative border border-white/50 bg-white/50 backdrop-blur-md shadow-lg group">
      <img src={src} alt="Board" className="w-full h-auto object-cover transition duration-300 group-hover:scale-[1.02]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
      <button
        onClick={() => { setLiked((v) => !v); setLikes((n) => n + (liked ? -1 : 1)); }}
        className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-gray-700 backdrop-blur-md shadow"
      >
        <Heart className={`h-4 w-4 ${liked ? 'text-rose-500 fill-rose-500' : ''}`} />
        <span className="text-sm">{likes}</span>
      </button>
    </div>
  );
}
