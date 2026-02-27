import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Palette, Code, Users, MousePointer2, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TESTIMONIALS, SKILLS } from '../constants';
import { Project, cn } from '../types';
import { ProjectModal } from '../components/ProjectModal';
import { supabaseService } from '../services/supabaseService';
import { isSupabaseConfigured } from '../lib/supabase';

export const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="bg-gradient-mesh min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen lg:h-screen flex items-center px-6 overflow-hidden pt-16 md:pt-24 lg:pt-0">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-orange-vibrant/10 border border-orange-vibrant/20 text-orange-vibrant text-xs font-mono mb-6">
              DESIGNER • SUPPORT • VIBE CODER
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-[0.9] tracking-tighter mb-8">
              I design experiences, <span className="text-gradient">code interactions</span>, and support people.
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link to="/work" className="px-8 py-4 bg-orange-vibrant text-white rounded-full font-medium hover:bg-orange-vibrant/90 transition-all flex items-center group">
                View Work <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
              <Link to="/contact" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-all">
                Contact Me
              </Link>
            </div>
          </motion.div>

          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full aspect-square"
            >
              {/* Abstract Animated Shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-vibrant/20 to-orange-vibrant/20 rounded-full blur-3xl animate-pulse" />
              <motion.div 
                animate={{ 
                  rotate: 360,
                  borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 60% 40% 50%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-10 border-2 border-orange-vibrant/30 backdrop-blur-sm"
              />
              <motion.div 
                animate={{ 
                  rotate: -360,
                  borderRadius: ["60% 40% 30% 70% / 50% 60% 40% 50%", "40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 60% 40% 50%"]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-20 border-2 border-orange-vibrant/20"
              />
              
              {/* Floating UI Fragments */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 glass p-4 rounded-2xl shadow-2xl"
              >
                <div className="w-12 h-2 bg-orange-vibrant/40 rounded-full mb-2" />
                <div className="w-8 h-2 bg-white/20 rounded-full" />
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-0 glass p-4 rounded-2xl shadow-2xl"
              >
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-warm-gray/40">Scroll</span>
          <div className="relative h-14 w-6 rounded-full border border-white/10 bg-white/5 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 rounded-full bg-gradient-to-b from-orange-vibrant to-orange-vibrant/40"
            />
          </div>
        </motion.div>
      </section>

      {/* Identity Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <IdentityBlock 
              icon={<Palette className="text-orange-vibrant" size={32} />}
              title="Graphic Designer"
              description="Visual identity and branding for UTP Beyond Borders, focusing on impactful digital storytelling."
            />
            <IdentityBlock 
              icon={<Users className="text-orange-vibrant" size={32} />}
              title="Customer Service Pro"
              description="Expert support for Target USA (247.ai) and Coles Australia (Probegroup), delivering human-centric solutions."
            />
            <IdentityBlock 
              icon={<Code className="text-orange-vibrant" size={32} />}
              title="Vibe Coder"
              description="Creative coding and interactive UI that bridges the gap between design and technical execution."
            />
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Featured Work</h2>
              <p className="text-warm-gray/50 max-w-md">A selection of projects that showcase the intersection of my disciplines.</p>
            </div>
            <Link to="/work" className="text-orange-vibrant font-medium hover:underline hidden md:block">View all projects</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.slice(0, 4).map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Snapshot */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Skills & Expertise</h2>
            <div className="space-y-8">
              {['Design', 'Tech', 'Soft'].map((cat) => (
                <div key={cat}>
                  <h4 className="text-xs uppercase tracking-widest text-orange-vibrant font-mono mb-4">{cat}</h4>
                  <div className="space-y-4">
                    {SKILLS.filter(s => s.category === cat).slice(0, 3).map(skill => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-white font-medium">{skill.name}</span>
                          <span className="text-warm-gray/50">{skill.level}%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={cn(
                              "h-full rounded-full bg-orange-vibrant"
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:pl-10">
            <div className="glass p-10 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <MousePointer2 size={120} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">The Hybrid Advantage</h3>
              <p className="text-warm-gray/60 leading-relaxed mb-6">
                I believe that the best digital products aren't just built with code or designed with pixels—they're nurtured with empathy. 
              </p>
              <p className="text-warm-gray/60 leading-relaxed">
                My background in customer service allows me to anticipate user needs and frustrations before they even happen, while my technical and artistic skills give me the tools to build elegant solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-16 text-center">Kind Words</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl flex flex-col justify-between"
              >
                <p className="text-lg text-white/80 italic mb-8">"{t.quote}"</p>
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-orange-vibrant text-sm">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-10"
          >
            Let’s build something <span className="text-gradient">meaningful</span>.
          </motion.h2>
          <Link to="/contact" className="px-10 py-5 bg-orange-vibrant text-white rounded-full font-bold text-lg hover:bg-orange-vibrant/90 transition-all inline-block">
            Start a Project
          </Link>
        </div>
      </section>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
};

const IdentityBlock = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass p-8 rounded-3xl group transition-all hover:border-orange-vibrant/30"
  >
    <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-warm-gray/50 leading-relaxed">{description}</p>
    <div className="mt-6 w-10 h-1 bg-white/5 group-hover:w-full group-hover:bg-orange-vibrant transition-all duration-500 rounded-full" />
  </motion.div>
);

const ProjectCard = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void; key?: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    onClick={onClick}
    className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer"
  >
    {project.image ? (
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
    ) : (
      <div className="w-full h-full bg-white/5 flex items-center justify-center">
        <ImageIcon className="text-white/20" size={48} />
      </div>
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
      <span className="text-xs font-mono text-orange-vibrant mb-2 uppercase tracking-widest">{project.category}</span>
      <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-warm-gray/70 text-sm mb-6 line-clamp-2">{project.description}</p>
      <div className="flex gap-2">
        {project.tools.slice(0, 3).map((tool: string) => (
          <span key={tool} className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-white/70 uppercase">{tool}</span>
        ))}
      </div>
    </div>
  </motion.div>
);
