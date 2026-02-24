import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Briefcase, Wrench, Target, Layers, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { Project, cn } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-midnight/90 backdrop-blur-xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-midnight border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="absolute top-6 right-6 z-10">
            <button 
              onClick={onClose}
              className="w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <div className="overflow-y-auto custom-scrollbar">
            {/* Hero Image */}
            <div className="relative w-full aspect-video md:aspect-[21/9]">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                  <ImageIcon className="text-white/20" size={64} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 md:left-12">
                <span className="text-xs font-mono text-orange-vibrant uppercase tracking-widest mb-2 block">{project.category}</span>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">{project.title}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                {/* Overview */}
                <section>
                  <h3 className="text-sm font-mono text-warm-gray/30 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Layers size={14} /> Overview
                  </h3>
                  <p className="text-xl text-white/80 leading-relaxed">
                    {project.description}
                  </p>
                </section>

                {/* Detailed Sections */}
                {project.problem && (
                  <section>
                    <h3 className="text-sm font-mono text-warm-gray/30 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Target size={14} /> The Problem
                    </h3>
                    <p className="text-warm-gray/60 leading-relaxed">
                      {project.problem}
                    </p>
                  </section>
                )}

                {project.process && (
                  <section>
                    <h3 className="text-sm font-mono text-warm-gray/30 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Briefcase size={14} /> The Process
                    </h3>
                    <p className="text-warm-gray/60 leading-relaxed">
                      {project.process}
                    </p>
                  </section>
                )}

                {project.outcome && (
                  <section>
                    <h3 className="text-sm font-mono text-warm-gray/30 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <CheckCircle2 size={14} /> The Outcome
                    </h3>
                    <p className="text-warm-gray/60 leading-relaxed">
                      {project.outcome}
                    </p>
                  </section>
                )}
              </div>

              {/* Sidebar Info */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest mb-4">Role</h4>
                  <p className="text-white font-medium">{project.role}</p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Wrench size={14} /> Tools Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map(tool => (
                      <span key={tool} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-warm-gray/50">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <button className="w-full py-4 bg-orange-vibrant text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-vibrant/90 transition-all">
                    Live Project <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
