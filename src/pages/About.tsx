import React from 'react';
import { motion } from 'motion/react';

export const About = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-midnight">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter">About <span className="text-gradient">Hance</span></h1>
            <p className="text-xl text-white/80 leading-relaxed mb-6">
              I'm Hance Dagondon, a multi-disciplinary creator living at the intersection of design, code, and human connection.
            </p>
            <p className="text-warm-gray/50 leading-relaxed mb-8">
              My journey is defined by versatility. As a Graphic Designer at <strong>UTP Beyond Borders</strong>, I craft visual stories that resonate. In the realm of customer experience, I've supported major global brands like <strong>Target USA</strong> (via 247.ai) and <strong>Coles Australia</strong> (via Probegroup).
            </p>
            <p className="text-warm-gray/50 leading-relaxed mb-8">
              I believe that the best digital products aren't just built with code or designed with pixels—they're nurtured with empathy. My background in high-stakes customer service allows me to anticipate user needs before they even happen.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden glass">
              {/* Note: Replace this with Hance's actual uploaded photo */}
              <img 
                src="https://domzxwzidventnxpasof.supabase.co/storage/v1/object/public/project-images/hance.jpg" 
                alt="Hance Dagondon" 
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Abstract Overlays */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-vibrant/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-vibrant/10 blur-3xl rounded-full" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AboutCard 
            title="Graphic Design" 
            content="Specializing in branding and digital assets at UTP Beyond Borders, where I bring creative visions to life." 
          />
          <AboutCard 
            title="Customer Support" 
            content="Extensive experience handling Target USA and Coles Australia accounts, mastering the art of communication." 
          />
          <AboutCard 
            title="Creative Tech" 
            content="Exploring the boundaries of the web through 'Vibe Coding'—where software feels as good as it looks." 
          />
          <AboutCard 
            title="Human Empathy" 
            content="In a world of automation, I bring a human-first mindset to every pixel and every support ticket." 
          />
        </div>
      </div>
    </div>
  );
};

const AboutCard = ({ title, content }: { title: string, content: string }) => (
  <div className="glass p-8 rounded-3xl">
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-warm-gray/50 text-sm leading-relaxed">{content}</p>
  </div>
);
