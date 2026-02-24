import { Project, Testimonial, Skill, Service } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'UTP Beyond Borders Visuals',
    category: 'Branding',
    role: 'Graphic Designer',
    tools: ['Photoshop', 'Illustrator', 'Figma'],
    description: 'Developing high-impact visual identities and marketing materials for UTP Beyond Borders.',
    image: 'https://picsum.photos/seed/utp/800/600',
  },
  {
    id: '2',
    title: 'Target USA Support Excellence',
    category: 'Support',
    role: 'Customer Service Representative',
    tools: ['247.ai', 'CRM', 'Communication'],
    description: 'Providing top-tier customer support for Target USA account at 247.ai Philippines.',
    image: 'https://picsum.photos/seed/target/800/600',
  },
  {
    id: '3',
    title: 'Coles Australia CX Strategy',
    category: 'Support',
    role: 'Customer Service Representative',
    tools: ['Probegroup', 'Conflict Resolution', 'CX'],
    description: 'Managing customer experiences for Coles Australia account at Probegroup Philippines.',
    image: 'https://picsum.photos/seed/coles/800/600',
  },
  {
    id: '4',
    title: 'VibeCanvas Engine',
    category: 'Creative Code',
    role: 'Creative Technologist',
    tools: ['React', 'Three.js', 'GLSL'],
    description: 'An interactive generative art engine that responds to ambient sound.',
    image: 'https://picsum.photos/seed/vibe/800/600',
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Team Lead',
    role: '247.ai Philippines',
    quote: 'Hance consistently delivers exceptional support with a focus on customer satisfaction and technical clarity.'
  },
  {
    id: '2',
    name: 'Creative Director',
    role: 'UTP Beyond Borders',
    quote: 'A versatile designer who understands how to blend brand identity with modern digital trends.'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Graphic Design', level: 95, category: 'Design' },
  { name: 'Adobe Suite', level: 90, category: 'Design' },
  { name: 'Figma', level: 85, category: 'Design' },
  { name: 'Customer Experience', level: 98, category: 'Soft' },
  { name: 'Conflict Resolution', level: 95, category: 'Soft' },
  { name: 'Communication', level: 96, category: 'Soft' },
  { name: 'React', level: 80, category: 'Tech' },
  { name: 'Tailwind CSS', level: 85, category: 'Tech' },
  { name: 'JavaScript', level: 75, category: 'Tech' }
];

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Graphic Design',
    description: 'Crafting visual identities that resonate with your audience.',
    deliverables: ['Branding Packages', 'Social Media Kits', 'Logo Systems'],
    timeline: '2-4 weeks',
    price: 'Starting at $500',
    icon: 'Palette'
  },
  {
    id: '2',
    title: 'Customer Experience',
    description: 'Optimizing support systems for maximum human impact.',
    deliverables: ['Support Strategy', 'Tone-of-Voice', 'Client Journey'],
    timeline: 'Project-based',
    price: 'Starting at $300',
    icon: 'Users'
  },
  {
    id: '3',
    title: 'Creative Development',
    description: 'Building interactive experiences that bridge art and code.',
    deliverables: ['Interactive UI', 'Motion Design', 'Web Builds'],
    timeline: '4-8 weeks',
    price: 'Starting at $1,000',
    icon: 'Code'
  }
];

