import React from 'react';
import { motion } from 'motion/react';
import { Mail, Send, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-midnight">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter">Let's <span className="text-gradient">Talk</span></h1>
          <p className="text-warm-gray/50 max-w-md text-lg mb-12">
            Have a project in mind? Or just want to say hi? I'm always open to discussing new opportunities and creative ideas.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-orange-vibrant/10 flex items-center justify-center text-orange-vibrant group-hover:bg-orange-vibrant group-hover:text-white transition-all">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest">Email Me</p>
                <p className="text-xl text-white font-medium">hancedagondon@gmail.com</p>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5">
              <p className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest mb-6">Follow Me</p>
              <div className="flex gap-4">
                <a href="https://x.com/hancesoome" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl glass flex items-center justify-center text-warm-gray/50 hover:text-orange-vibrant hover:border-orange-vibrant/30 transition-all">
                  <Twitter size={20} />
                </a>
                <a href="http://github.com/hancesooome" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl glass flex items-center justify-center text-warm-gray/50 hover:text-orange-vibrant hover:border-orange-vibrant/30 transition-all">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/hancesome/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl glass flex items-center justify-center text-warm-gray/50 hover:text-orange-vibrant hover:border-orange-vibrant/30 transition-all">
                  <Linkedin size={20} />
                </a>
                <a href="https://www.instagram.com/hancesoome/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl glass flex items-center justify-center text-warm-gray/50 hover:text-orange-vibrant hover:border-orange-vibrant/30 transition-all">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-10 rounded-3xl"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest">Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-vibrant/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest">Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-vibrant/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest">Project Type</label>
              <select className="w-full bg-midnight border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-vibrant/50 transition-all">
                <option className="bg-midnight text-white">Graphic Design</option>
                <option className="bg-midnight text-white">Creative Development</option>
                <option className="bg-midnight text-white">CX Consulting</option>
                <option className="bg-midnight text-white">Something Else</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest">Message</label>
              <textarea 
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-vibrant/50 transition-all resize-none"
              />
            </div>

            <button className="w-full py-5 bg-orange-vibrant text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-vibrant/90 transition-all group">
              Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
