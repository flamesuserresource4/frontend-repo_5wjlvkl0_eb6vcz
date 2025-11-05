import { useState } from 'react';
import Hero from './components/Hero';
import Workspace from './components/Workspace';
import CommunityGallery from './components/CommunityGallery';
import Profile from './components/Profile';
import { Home, Palette, Image as ImageIcon, User, Plus } from 'lucide-react';

export default function App() {
  const [tab, setTab] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F7FF] via-[#FDE2E4] to-[#E0F2FE] text-gray-800">
      <TopNav tab={tab} onChange={setTab} />

      {tab === 'home' && <Hero onStart={() => setTab('workspace')} />}
      {tab === 'workspace' && <Workspace />}
      {tab === 'community' && <CommunityGallery />}
      {tab === 'profile' && <Profile />}

      {/* Floating New Board Action */}
      <button
        onClick={() => setTab('workspace')}
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#A78BFA] via-[#FBCFE8] to-[#6EE7B7] px-5 py-3 text-white shadow-xl hover:shadow-2xl transition"
      >
        <Plus className="h-5 w-5" />
        <span>New Board</span>
      </button>

      <Footer />
    </div>
  );
}

function TopNav({ tab, onChange }) {
  const items = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'workspace', label: 'Workspace', icon: Palette },
    { key: 'community', label: 'Community', icon: ImageIcon },
    { key: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-20">
      <div className="backdrop-blur-xl bg-white/60 border-b border-white/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#C7D2FE] to-[#FBCFE8]" />
            <span className="font-semibold tracking-wide">MoodBoardly</span>
          </div>
          <nav className="flex items-center gap-2">
            {items.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => onChange(key)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 border transition ${
                  tab === key
                    ? 'bg-white shadow border-white/80'
                    : 'bg-white/40 border-white/60 hover:bg-white/70'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t border-white/70 bg-white/40 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 text-sm text-gray-600 flex items-center justify-between">
        <p>© {new Date().getFullYear()} MoodBoardly</p>
        <p>Made with calm vibes and pastel dreams</p>
      </div>
    </footer>
  );
}
