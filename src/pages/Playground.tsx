import React from 'react';
import { motion } from 'motion/react';
import { MousePointer2, Sparkles, Zap, Waves } from 'lucide-react';

export const Playground = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-midnight overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter">The <span className="text-gradient">Playground</span></h1>
          <p className="text-warm-gray/50 max-w-2xl text-lg">
            Experimental coding projects, interactive demos, and digital sketches. This is where I push the boundaries of the web.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Demo 1: Interactive Gradient */}
          <PlaygroundCard 
            title="Liquid Cursor"
            description="A custom shader-based background that reacts to your mouse movements."
            icon={<MousePointer2 className="text-orange-vibrant" />}
          >
            <div className="relative w-full h-full bg-midnight overflow-hidden rounded-2xl">
              <motion.div 
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                className="absolute w-40 h-40 bg-orange-vibrant/40 blur-[80px] rounded-full"
                animate={{
                  x: [0, 100, -50, 0],
                  y: [0, -50, 100, 0],
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-xs">
                MOVE YOUR MOUSE
              </div>
            </div>
          </PlaygroundCard>

          {/* Demo 2: Generative Art */}
          <PlaygroundCard 
            title="Noise Particles"
            description="Perlin noise driven particle system built with Canvas API."
            icon={<Sparkles className="text-orange-vibrant" />}
          >
            <div className="w-full h-full bg-midnight/50 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="grid grid-cols-8 gap-2">
                {Array.from({ length: 64 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                    className="w-2 h-2 bg-orange-vibrant rounded-full"
                  />
                ))}
              </div>
            </div>
          </PlaygroundCard>

          {/* Demo 3: Motion UI */}
          <PlaygroundCard 
            title="Magnetic Buttons"
            description="UI elements that exert a gravitational pull on the cursor."
            icon={<Zap className="text-lilac" />}
          >
            <div className="w-full h-full flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1, x: 5, y: -5 }}
                className="px-6 py-3 glass rounded-xl text-white font-medium"
              >
                Hover Me
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, x: -5, y: 5 }}
                className="px-6 py-3 bg-orange-vibrant/20 border border-orange-vibrant/30 rounded-xl text-orange-vibrant font-medium"
              >
                Pull
              </motion.button>
            </div>
          </PlaygroundCard>

          {/* Demo 4: Scroll Effects */}
          <PlaygroundCard 
            title="Wave Distortion"
            description="SVG filters applied to text to create a liquid ripple effect."
            icon={<Waves className="text-white" />}
          >
            <div className="w-full h-full flex items-center justify-center">
              <motion.h3 
                animate={{ 
                  skewX: [0, 10, -10, 0],
                  filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-4xl font-bold text-white tracking-widest"
              >
                LIQUID
              </motion.h3>
            </div>
          </PlaygroundCard>
        </div>
      </div>
    </div>
  );
};

const PlaygroundCard = ({ title, description, icon, children }: { title: string, description: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <div className="glass p-8 rounded-3xl flex flex-col h-[400px]">
    <div className="flex items-center gap-4 mb-4">
      {icon}
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-warm-gray/50 text-sm mb-8">{description}</p>
    <div className="flex-1 min-h-0">
      {children}
    </div>
  </div>
);
