import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Upload, Database } from 'lucide-react';
import { Project, cn } from '../types';
import { supabaseService } from '../services/supabaseService';
import { isSupabaseConfigured, effectiveSupabaseUrl, effectiveSupabaseKey } from '../lib/supabase';

export const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toolsInput, setToolsInput] = useState('');
  const [editForm, setEditForm] = useState<Partial<Project>>({
    title: '',
    category: 'Branding',
    role: '',
    tools: [],
    description: '',
    image: '',
    problem: '',
    process: '',
    outcome: ''
  });
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("Supabase Config Check:", {
      url: !!import.meta.env.VITE_SUPABASE_URL,
      key: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
      pubKey: !!import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
    });
    fetchProjects();
  }, []);

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

  const handleEdit = (project: Project) => {
    setEditForm(project);
    setToolsInput(project.tools.join(', '));
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setEditForm({
      title: '',
      category: 'Branding',
      role: '',
      tools: [],
      description: '',
      image: '', // Start with empty image
      problem: '',
      process: '',
      outcome: ''
    });
    setToolsInput('');
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const tools = toolsInput.split(',').map(t => t.trim()).filter(t => t !== '');
      const projectData = { ...editForm, tools } as Omit<Project, 'id'>;
      
      console.log('Saving project data:', projectData);

      if (isSupabaseConfigured) {
        if (editForm.id) {
          console.log('Updating existing project:', editForm.id);
          await supabaseService.updateProject(editForm.id, projectData);
        } else {
          console.log('Adding new project');
          await supabaseService.addProject(projectData);
        }
      } else {
        const method = editForm.id ? 'PUT' : 'POST';
        const url = editForm.id ? `/api/projects/${editForm.id}` : '/api/projects';
        
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        });
        
        if (!response.ok) throw new Error("Failed to save via API");
      }
      
      setIsModalOpen(false);
      fetchProjects();
    } catch (error) {
      console.error("Failed to save project", error);
      alert("Failed to save project. Check console for details. Make sure your Supabase table 'projects' and bucket 'project-images' are set up.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      if (isSupabaseConfigured) {
        await supabaseService.deleteProject(id);
      } else {
        const response = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error("Failed to delete via API");
      }
      fetchProjects();
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      let imageUrl = '';
      if (isSupabaseConfigured) {
        imageUrl = await supabaseService.uploadImage(file);
      } else {
        const formData = new FormData();
        formData.append('image', file);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        imageUrl = data.url;
      }
      
      if (imageUrl) {
        setEditForm({ ...editForm, image: imageUrl });
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Check console for details. Make sure your Supabase bucket 'project-images' is public.");
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) return <div className="pt-32 text-center text-warm-gray/50">Loading Dashboard...</div>;

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-midnight">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">Project <span className="text-gradient">Manager</span></h1>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono">
                <span className="text-warm-gray/50">URL:</span>
                <span className={effectiveSupabaseUrl !== 'https://placeholder.supabase.co' ? "text-emerald-400" : "text-rose-400"}>
                  {effectiveSupabaseUrl !== 'https://placeholder.supabase.co' ? "LOADED" : "MISSING"}
                </span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono">
                <span className="text-warm-gray/50">KEY:</span>
                <span className={effectiveSupabaseKey !== 'placeholder' ? "text-emerald-400" : "text-rose-400"}>
                  {effectiveSupabaseKey !== 'placeholder' ? "LOADED" : "MISSING"}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-6 py-3 bg-orange-vibrant text-white rounded-full font-bold hover:bg-orange-vibrant/90 transition-all"
          >
            <Plus size={20} /> Add Project
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              layout
              className="glass p-6 rounded-3xl flex flex-col md:flex-row gap-6 items-start md:items-center"
            >
              <div className="w-full md:w-32 aspect-video rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="text-white/20" />
                )}
              </div>

              <div className="flex-1">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <span className="text-[10px] uppercase tracking-widest text-orange-vibrant font-mono">{project.category}</span>
                  </div>
                  <p className="text-sm text-warm-gray/50 mb-2">{project.role}</p>
                  <p className="text-xs text-warm-gray/30 line-clamp-1">{project.description}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => handleEdit(project)} className="p-3 bg-white/5 text-white/50 rounded-xl hover:bg-white/10 transition-all">
                  <Edit2 size={20} />
                </button>
                <button onClick={() => handleDelete(project.id)} className="p-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500/30 transition-all">
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-midnight/90 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-2xl bg-midnight border border-white/10 rounded-3xl p-8 max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">{editForm.id ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-warm-gray/50 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest">Title</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-vibrant/50 transition-all"
                    value={editForm.title || ''}
                    onChange={e => setEditForm({...editForm, title: e.target.value})}
                    placeholder="Project Title"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest">Category</label>
                  <select 
                    className="w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-vibrant/50 transition-all"
                    value={editForm.category || 'Branding'}
                    onChange={e => setEditForm({...editForm, category: e.target.value as any})}
                  >
                    <option className="bg-midnight text-white" value="Branding">Branding</option>
                    <option className="bg-midnight text-white" value="Digital Art">Digital Art</option>
                    <option className="bg-midnight text-white" value="UI/UX">UI/UX</option>
                    <option className="bg-midnight text-white" value="Creative Code">Creative Code</option>
                    <option className="bg-midnight text-white" value="Support">Support</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest">Role</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-vibrant/50 transition-all"
                    value={editForm.role || ''}
                    onChange={e => setEditForm({...editForm, role: e.target.value})}
                    placeholder="Your Role"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest">Image</label>
                  <div className="flex flex-col gap-4">
                    {editForm.image && (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10">
                        <img src={editForm.image} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          onClick={() => setEditForm({...editForm, image: ''})}
                          className="absolute top-2 right-2 p-1 bg-midnight/80 text-white rounded-full hover:bg-midnight transition-all"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                    <div className="flex gap-4">
                      <input 
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-vibrant/50 transition-all"
                        value={editForm.image || ''}
                        onChange={e => setEditForm({...editForm, image: e.target.value})}
                        placeholder="URL or Upload"
                      />
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                        accept="image/*"
                      />
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="px-4 bg-white/5 border border-white/10 rounded-xl text-warm-gray/50 hover:text-white hover:border-white/20 transition-all flex items-center gap-2"
                      >
                        {isUploading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Upload size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest">Tools (comma separated)</label>
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-vibrant/50 transition-all"
                  value={toolsInput}
                  onChange={e => setToolsInput(e.target.value)}
                  placeholder="Photoshop, Figma, React"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest">Short Description</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-vibrant/50 transition-all resize-none"
                  rows={3}
                  value={editForm.description || ''}
                  onChange={e => setEditForm({...editForm, description: e.target.value})}
                  placeholder="Brief overview..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest">The Problem</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-vibrant/50 transition-all resize-none"
                  rows={3}
                  value={editForm.problem || ''}
                  onChange={e => setEditForm({...editForm, problem: e.target.value})}
                  placeholder="What challenge did you solve?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest">The Process</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-vibrant/50 transition-all resize-none"
                  rows={3}
                  value={editForm.process || ''}
                  onChange={e => setEditForm({...editForm, process: e.target.value})}
                  placeholder="How did you build it?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest">The Outcome</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-vibrant/50 transition-all resize-none"
                  rows={3}
                  value={editForm.outcome || ''}
                  onChange={e => setEditForm({...editForm, outcome: e.target.value})}
                  placeholder="What was the result?"
                />
              </div>

              <button 
                onClick={handleSave}
                className="w-full py-4 bg-orange-vibrant text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-vibrant/90 transition-all"
              >
                <Save size={20} /> Save Project
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
