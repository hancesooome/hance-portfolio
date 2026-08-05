import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../portfolio.db');
const db = new Database(dbPath);

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    role TEXT NOT NULL,
    tools TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    problem TEXT,
    process TEXT,
    outcome TEXT
  )
`);

// Migration: add sort_order column for drag-to-reorder support
const columns = db.prepare("PRAGMA table_info(projects)").all() as { name: string }[];
const hasSortOrder = columns.some((c) => c.name === 'sort_order');
if (!hasSortOrder) {
  db.exec("ALTER TABLE projects ADD COLUMN sort_order INTEGER");
  // Backfill existing rows with a stable order based on rowid
  const rows = db.prepare("SELECT id FROM projects ORDER BY rowid").all() as { id: string }[];
  const setOrder = db.prepare("UPDATE projects SET sort_order = ? WHERE id = ?");
  rows.forEach((row, index) => setOrder.run(index, row.id));
}


// Seed initial data if empty
const count = db.prepare("SELECT COUNT(*) as count FROM projects").get() as { count: number };
if (count.count === 0) {
  const initialProjects = [
    {
      id: '1',
      title: 'UTP Beyond Borders Visuals',
      category: 'Branding',
      role: 'Graphic Designer',
      tools: JSON.stringify(['Photoshop', 'Illustrator', 'Figma']),
      description: 'Developing high-impact visual identities and marketing materials for UTP Beyond Borders.',
      image: 'https://picsum.photos/seed/utp/800/600',
      sort_order: 0,
    },
    {
      id: '2',
      title: 'Target USA Support Excellence',
      category: 'Support',
      role: 'Customer Service Representative',
      tools: JSON.stringify(['247.ai', 'CRM', 'Communication']),
      description: 'Providing top-tier customer support for Target USA account at 247.ai Philippines.',
      image: 'https://picsum.photos/seed/target/800/600',
      sort_order: 1,
    },
    {
      id: '3',
      title: 'Coles Australia CX Strategy',
      category: 'Support',
      role: 'Customer Service Representative',
      tools: JSON.stringify(['Probegroup', 'Conflict Resolution', 'CX']),
      description: 'Managing customer experiences for Coles Australia account at Probegroup Philippines.',
      image: 'https://picsum.photos/seed/coles/800/600',
      sort_order: 2,
    },
    {
      id: '4',
      title: 'VibeCanvas Engine',
      category: 'Creative Code',
      role: 'Creative Technologist',
      tools: JSON.stringify(['React', 'Three.js', 'GLSL']),
      description: 'An interactive generative art engine that responds to ambient sound.',
      image: 'https://picsum.photos/seed/vibe/800/600',
      sort_order: 3,
    }
  ];

  const insert = db.prepare(`
    INSERT INTO projects (id, title, category, role, tools, description, image, sort_order)
    VALUES (@id, @title, @category, @role, @tools, @description, @image, @sort_order)
  `);

  for (const project of initialProjects) {
    insert.run(project);
  }

}

export default db;
