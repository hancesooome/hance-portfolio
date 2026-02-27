import React from 'react';
import { motion } from 'motion/react';
import { Award, FileCheck, ExternalLink } from 'lucide-react';

const CERTIFICATES = [
  {
    title: 'UI / UX for Beginners',
    issuer: 'Great Learning',
    issued: 'Nov 2024',
    description: 'Successfully completed a free online course in UI/UX for Beginners.',
    url: 'https://www.mygreatlearning.com/certificate/OFPXICSH',
    thumbnail: 'https://domzxwzidventnxpasof.supabase.co/storage/v1/object/public/project-images/greatlearning.jfif',
    icon: FileCheck,
  },
  {
    title: 'Digital Skills: User Experience',
    issuer: 'Accenture',
    issued: 'Nov 2024',
    description: 'User experience (UX) and its impact on business. Foundations of UX design and the design process: design, develop and release. Information architecture and UX techniques to test and develop designs for release.',
    url: 'https://www.futurelearn.com/certificates/tg8aw93',
    thumbnail: 'https://domzxwzidventnxpasof.supabase.co/storage/v1/object/public/project-images/accenture.jfif',
    icon: Award,
  },
  {
    title: 'EF SET English Certificate 88/100 (C2 Proficient)',
    issuer: 'EF SET',
    issued: 'Jun 2022',
    description: 'English proficiency certification at C2 Proficient level.',
    url: 'https://cert.efset.org/mbvfSd',
    thumbnail: 'https://domzxwzidventnxpasof.supabase.co/storage/v1/object/public/project-images/EFSET.png',
    icon: Award,
  },
];

export const Certificates = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-midnight">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
            <span className="text-gradient">Certificates</span>
          </h1>
          <p className="text-warm-gray/50 max-w-2xl text-lg">
            Courses, certifications, and credentials that reflect continuous learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CERTIFICATES.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl flex flex-col gap-6"
              >
                <div className="flex gap-6">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 w-28 h-28 rounded-2xl overflow-hidden bg-white/5 border border-white/10 block relative"
                  >
                    <img
                      src={cert.thumbnail}
                      alt={cert.title}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden absolute inset-0 w-full h-full flex items-center justify-center bg-orange-vibrant/10">
                      <Icon className="text-orange-vibrant" size={32} />
                    </div>
                  </a>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                    <p className="text-xs font-mono text-orange-vibrant uppercase tracking-widest mb-2">
                      {cert.issuer} • {cert.issued}
                    </p>
                    <p className="text-warm-gray/50 text-sm leading-relaxed">{cert.description}</p>
                  </div>
                </div>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-orange-vibrant hover:underline mt-auto"
                >
                  View certificate <ExternalLink size={14} />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
