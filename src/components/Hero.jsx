import { motion } from 'framer-motion';
import { Sparkles, Star, Rocket } from 'lucide-react';

export default function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden">
      {/* dreamy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E9D5FF] via-[#FDE2E4] to-[#D1FAE5]" aria-hidden />
      {/* soft glow orbs */}
      <div className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-[#C7D2FE] opacity-40 blur-3xl" aria-hidden />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#FBCFE8] opacity-40 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/40 px-4 py-2 text-sm backdrop-blur-md shadow-sm border border-white/40">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="text-gray-700">Dreamy, soothing & creative</span>
          </div>

          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-800">
            Visualize your dreams beautifully
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            MoodBoardly lets you drag, drop and arrange aesthetic images, quotes and goals into a vision board that inspires you every day.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={onStart}
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#A78BFA] via-[#FDA4AF] to-[#6EE7B7] px-6 py-3 text-white shadow-lg shadow-pink-200/40 hover:shadow-pink-300/60 transition"
            >
              <Rocket className="h-5 w-5" />
              <span>Start Creating</span>
            </button>
            <button className="rounded-full border border-white/60 bg-white/40 px-6 py-3 text-gray-700 backdrop-blur-md hover:bg-white/70 transition">
              Explore Gallery
            </button>
          </div>
        </motion.div>

        {/* sample moodboard preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-12 gap-4"
        >
          <PreviewCard className="sm:col-span-5" color="from-[#C7D2FE] to-[#E9D5FF]" title="Morning Calm" subtitle="soft blues"/>
          <PreviewCard className="sm:col-span-4" color="from-[#FDE2E4] to-[#FBCFE8]" title="Bloom" subtitle="gentle pinks"/>
          <PreviewCard className="sm:col-span-3" color="from-[#D1FAE5] to-[#BAE6FD]" title="Fresh Goals" subtitle="mint & sky"/>
        </motion.div>
      </div>
    </section>
  );
}

function PreviewCard({ className = '', color, title, subtitle }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/40 bg-white/40 backdrop-blur-md shadow-lg ${className}`}>
      <div className={`h-40 bg-gradient-to-br ${color}`} />
      <div className="p-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Star className="h-4 w-4 text-amber-400" />
          <span className="font-medium">{title}</span>
        </div>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
