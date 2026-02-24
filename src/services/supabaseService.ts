import { supabase } from '../lib/supabase';
import { Project } from '../types';

export const supabaseService = {
  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('title');
    
    if (error) throw error;
    
    return (data || []).map((p: any) => ({
      ...p,
      tools: typeof p.tools === 'string' ? JSON.parse(p.tools) : p.tools,
      galleryImages: p.gallery_images
        ? (typeof p.gallery_images === 'string' ? JSON.parse(p.gallery_images) : p.gallery_images)
        : []
    })) as Project[];
  },

  async addProject(project: Omit<Project, 'id'>): Promise<string> {
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        title: project.title,
        category: project.category,
        role: project.role,
        tools: JSON.stringify(project.tools),
        description: project.description,
        image: project.image,
        problem: project.problem,
        process: project.process,
        outcome: project.outcome,
        link: project.link,
        gallery_images: project.galleryImages && project.galleryImages.length
          ? JSON.stringify(project.galleryImages)
          : null
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data.id;
  },

  async updateProject(id: string, project: Partial<Project>): Promise<void> {
    const updateData: any = { ...project };
    if (project.tools) {
      updateData.tools = JSON.stringify(project.tools);
    }
    if (project.galleryImages) {
      updateData.gallery_images = JSON.stringify(project.galleryImages);
      delete updateData.galleryImages;
    }

    const { error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id);
    
    if (error) throw error;
  },

  async deleteProject(id: string, imageUrl?: string): Promise<void> {
    if (imageUrl) {
      try {
        const match = imageUrl.match(/\/storage\/v1\/object\/public\/project-images\/(.+)$/);
        if (match && match[1]) {
          const filePath = match[1];
          const { error: storageError } = await supabase
            .storage
            .from('project-images')
            .remove([filePath]);

          if (storageError) {
            console.error('Failed to delete image from storage', storageError);
          }
        }
      } catch (e) {
        console.error('Error parsing image URL for deletion', e);
      }
    }

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
