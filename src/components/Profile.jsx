import { useState } from 'react';
import { User, Image as ImageIcon } from 'lucide-react';

export default function Profile() {
  const [name, setName] = useState('Ava Dreamer');
  const [bio, setBio] = useState('Designing a life that feels like art.');

  const boards = [
    'https://images.unsplash.com/photo-1520697222860-6d0d38935d65?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1496302662116-35cc4f36df92?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1200&auto=format&fit=crop'
  ];

  return (
    <section className="px-4 sm:px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl border border-white/50 bg-white/50 backdrop-blur-md shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#BAE6FD] to-[#E9D5FF] grid place-items-center">
              <User className="h-8 w-8 text-gray-700" />
            </div>
            <div className="flex-1 grid gap-2 sm:grid-cols-2">
              <input
                className="rounded-xl border border-white/60 bg-white/70 px-3 py-2 text-gray-700 shadow-sm focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="rounded-xl border border-white/60 bg-white/70 px-3 py-2 text-gray-700 shadow-sm focus:outline-none"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-700">Your Moodboards</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {boards.map((b, i) => (
              <div key={i} className="rounded-3xl overflow-hidden border border-white/50 bg-white/50 backdrop-blur-md shadow">
                <img src={b} alt="Board" className="w-full h-48 object-cover" />
                <div className="p-3 flex items-center justify-between text-gray-700">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    <span>Dream Board {i + 1}</span>
                  </div>
                  <button className="text-sm rounded-full px-3 py-1 bg-white/70 border border-white/60 hover:bg-white">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
