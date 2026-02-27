import React from 'react';
import { motion } from 'motion/react';
import { Award, Trophy } from 'lucide-react';

export const Awards = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-midnight">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
            <span className="text-gradient">Awards</span>
          </h1>
          <p className="text-warm-gray/50 max-w-2xl text-lg">
            Recognition and accolades from projects, competitions, and collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Placeholder – replace with your awards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-8 rounded-3xl flex gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-orange-vibrant/10 flex items-center justify-center shrink-0">
              <Award className="text-orange-vibrant" size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Award name</h3>
              <p className="text-xs font-mono text-orange-vibrant uppercase tracking-widest mb-2">Year • Organization</p>
              <p className="text-warm-gray/50 text-sm">Short description of what this award was for.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-8 rounded-3xl flex gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-orange-vibrant/10 flex items-center justify-center shrink-0">
              <Trophy className="text-orange-vibrant" size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Another award</h3>
              <p className="text-xs font-mono text-orange-vibrant uppercase tracking-widest mb-2">Year • Organization</p>
              <p className="text-warm-gray/50 text-sm">Add your real awards here.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
