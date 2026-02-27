import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Project {
  id: string;
  title: string;
  category: 'Branding' | 'Digital Art' | 'Logo Design' | 'Creative Code' | 'Support';
  role: string;
  tools: string[];
  description: string;
  image: string;
  galleryImages?: string[];
  outcome?: string;
  process?: string;
  problem?: string;
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'Design' | 'Tech' | 'Soft';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  timeline: string;
  price: string;
  icon: string;
}
