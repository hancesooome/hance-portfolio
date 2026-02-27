import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, cn } from '../types';
import { ExternalLink, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { ProjectModal } from '../components/ProjectModal';
import { supabaseService } from '../services/supabaseService';
import { isSupabaseConfigured } from '../lib/supabase';

export const Work = () => {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const categories = ['All', 'Branding', 'Digital Art', 'Logo Design', 'Creative Code', 'Support'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (isSupabaseConfigured) {
          const data = await supabaseService.getProjects();
          setProjects(data);
        } else {
          const response = await fetch('/api/projects');
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  if (loading) return <div className="pt-32 text-center text-warm-gray/50">Loading Works...</div>;

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-midnight">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter">Selected <span className="text-gradient">Works</span></h1>
          <p className="text-warm-gray/50 max-w-2xl text-lg">
            A deep dive into the projects where I've blended artistic vision with technical execution.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all border",
                filter === cat 
                  ? "bg-orange-vibrant border-orange-vibrant text-white" 
                  : "bg-white/5 border-white/10 text-warm-gray/50 hover:border-white/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-6">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                      <ImageIcon className="text-white/20" size={48} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-midnight/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-midnight scale-0 group-hover:scale-100 transition-transform duration-300">
                      <ExternalLink size={24} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono text-orange-vibrant uppercase tracking-widest mb-2 block">{project.category}</span>
                    <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-warm-gray/50 mb-4">{project.description}</p>
                    <div className="flex gap-2">
                      {project.tools.map(tool => (
                        <span key={tool} className="text-[10px] text-warm-gray/30 uppercase tracking-wider">{tool}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
};
