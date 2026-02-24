import { supabase } from '../lib/supabase';
import { Project } from '../types';

export const supabaseService = {
  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('title');
    
    if (error) throw error;
    
    return (data || []).map(p => ({
      ...p,
      tools: typeof p.tools === 'string' ? JSON.parse(p.tools) : p.tools
    })) as Project[];
  },

  async addProject(project: Omit<Project, 'id'>): Promise<string> {
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        ...project,
        tools: JSON.stringify(project.tools)
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data.id;
  },

  async updateProject(id: string, project: Partial<Project>): Promise<void> {
    const updateData = { ...project };
    if (project.tools) {
      updateData.tools = JSON.stringify(project.tools) as any;
    }

    const { error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id);
    
    if (error) throw error;
  },

  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async uploadImage(file: File): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = `${fileName}`; // Upload to root of bucket for simplicity

      console.log('Attempting upload to Supabase storage:', { filePath, bucket: 'project-images' });

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Supabase upload error details:', uploadError);
        throw uploadError;
      }

      console.log('Upload successful:', uploadData);

      const { data } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      console.log('Generated public URL:', data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error('Detailed upload error:', error);
      throw error;
    }
  }
};
