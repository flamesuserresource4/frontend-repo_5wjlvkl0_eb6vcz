import { useCallback, useMemo, useRef, useState } from 'react';
import { Image as ImageIcon, Quote, Target, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

const PALETTE_ITEMS = [
  { type: 'image', label: 'Aesthetic Image', icon: ImageIcon, color: 'from-[#BAE6FD] to-[#E9D5FF]' },
  { type: 'quote', label: 'Quote Card', icon: Quote, color: 'from-[#FBCFE8] to-[#FDE2E4]' },
  { type: 'goal', label: 'Goal Sticky', icon: Target, color: 'from-[#D1FAE5] to-[#C7F9CC]' },
];

export default function Workspace() {
  const canvasRef = useRef(null);
  const [items, setItems] = useState([]);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    let payload;
    try { payload = JSON.parse(data); } catch { return; }
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (payload.itemId) {
      setItems((prev) => prev.map((it) => it.id === payload.itemId ? { ...it, x, y } : it));
    } else if (payload.paletteType) {
      const id = `itm_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
      const base = defaultContentFor(payload.paletteType);
      setItems((prev) => [...prev, { id, type: payload.paletteType, x, y, ...base }]);
    }
  }, []);

  const onDragOver = useCallback((e) => e.preventDefault(), []);

  const handleItemDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ itemId: id }));
  };

  return (
    <section className="relative px-4 sm:px-6 py-8">
      <div className="mx-auto max-w-6xl grid grid-cols-12 gap-6">
        {/* Palette */}
        <aside className="col-span-12 md:col-span-3 space-y-4">
          <div className="rounded-3xl border border-white/40 bg-white/50 backdrop-blur-md shadow-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-3">Palette</h3>
            <div className="space-y-3">
              {PALETTE_ITEMS.map(({ type, label, icon: Icon, color }) => (
                <div
                  key={type}
                  className="group flex items-center gap-3 rounded-2xl border border-white/50 bg-white/50 p-3 shadow-sm hover:shadow-md cursor-grab"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', JSON.stringify({ paletteType: type }))}
                  title="Drag onto the canvas"
                >
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${color} grid place-items-center`}>
                    <Icon className="h-5 w-5 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-700">{label}</p>
                    <p className="text-xs text-gray-500">Drag & drop</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI suggestions */}
          <div className="rounded-3xl border border-white/40 bg-white/50 backdrop-blur-md shadow-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Wand2 className="h-4 w-4 text-purple-500"/>
              <h3 className="font-semibold text-gray-700">AI Suggestions</h3>
            </div>
            <div className="space-y-2">
              <Suggestion text="Add a pastel sunrise photo"/>
              <Suggestion text="Quote: ‘Small steps, big dreams.’"/>
              <Suggestion text="Goal: 10 minutes of journaling daily"/>
            </div>
            <button className="mt-3 w-full rounded-xl bg-gradient-to-r from-[#A78BFA] to-[#FBCFE8] text-white py-2 shadow hover:brightness-105 transition">
              Get ideas
            </button>
          </div>
        </aside>

        {/* Canvas */}
        <div className="col-span-12 md:col-span-9">
          <div className="rounded-3xl border border-white/50 bg-white/40 backdrop-blur-xl shadow-xl p-3">
            <div
              ref={canvasRef}
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="relative h-[560px] rounded-2xl bg-[radial-gradient(circle_at_20%_20%,#FDE2E4_0%,transparent_40%),radial-gradient(circle_at_80%_60%,#D1FAE5_0%,transparent_40%)]"
            >
              {/* subtle grid */}
              <GridPattern />
              {items.map((it) => (
                <CanvasItem
                  key={it.id}
                  item={it}
                  onDragStart={(e) => handleItemDragStart(e, it.id)}
                />
              ))}
              {items.length === 0 && (
                <div className="absolute inset-0 grid place-items-center text-gray-500">
                  <p>Drag items from the left to start your board</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function defaultContentFor(type) {
  if (type === 'image') return { content: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop' };
  if (type === 'quote') return { content: 'Create a life you can’t wait to wake up to.' };
  if (type === 'goal') return { content: 'Practice mindfulness 5 min/day' };
  return { content: '' };
}

function GridPattern() {
  const rows = useMemo(() => Array.from({ length: 14 }), []);
  const cols = useMemo(() => Array.from({ length: 24 }), []);
  return (
    <div className="absolute inset-0 opacity-[0.18]">
      {rows.map((_, r) => (
        <div key={r} className="absolute left-0 right-0 border-t border-gray-400/40" style={{ top: r * 40 }} />
      ))}
      {cols.map((_, c) => (
        <div key={c} className="absolute top-0 bottom-0 border-l border-gray-400/40" style={{ left: c * 40 }} />
      ))}
    </div>
  );
}

function CanvasItem({ item, onDragStart }) {
  if (item.type === 'image') {
    return (
      <motion.div
        className="absolute w-44 h-44 rounded-2xl overflow-hidden shadow-lg cursor-grab"
        style={{ left: item.x - 88, top: item.y - 88 }}
        draggable
        onDragStart={onDragStart}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <img src={item.content} alt="Mood tile" className="h-full w-full object-cover" />
      </motion.div>
    );
  }
  if (item.type === 'quote') {
    return (
      <motion.div
        className="absolute w-60 rounded-2xl p-4 bg-white/70 backdrop-blur-md border border-white/60 shadow-xl cursor-grab"
        style={{ left: item.x - 120, top: item.y - 60 }}
        draggable
        onDragStart={onDragStart}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <blockquote className="text-gray-700 italic">“{item.content}”</blockquote>
      </motion.div>
    );
  }
  // goal
  return (
    <motion.div
      className="absolute w-48 rounded-2xl p-3 bg-gradient-to-br from-[#D1FAE5] to-[#BAE6FD] text-gray-800 shadow-lg cursor-grab"
      style={{ left: item.x - 96, top: item.y - 48 }}
      draggable
      onDragStart={onDragStart}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="font-semibold">Goal</p>
      <p className="text-sm opacity-80">{item.content}</p>
    </motion.div>
  );
}

function Suggestion({ text }) {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-white/60 p-3 border border-white/60">
      <div className="mt-0.5 h-2 w-2 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#FBCFE8]" />
      <p className="text-sm text-gray-700">{text}</p>
    </div>
  );
}
