import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ExternalLink, X, ChevronRight, ChevronLeft } from 'lucide-react';

export type AwardItem = {
  title: string;
  event: string;
  tagline: string;
  date: string;
  thumbnail: string;
  cover: string;
  art: string;
  resultUrl?: string;
  explanation?: string;
  documentationPhotos?: string[];
};

const AWARDS: AwardItem[] = [
  {
    title: 'Digital Arts Open Competition — 2nd Place',
    event: '11th Iligan City Computing Fair',
    tagline: 'More than Computing',
    date: 'September 2013',
    thumbnail: 'https://domzxwzidventnxpasof.supabase.co/storage/v1/object/public/project-images/13thumbnail.png',
    cover: 'https://domzxwzidventnxpasof.supabase.co/storage/v1/object/public/project-images/13cover.jfif',
    art: 'https://domzxwzidventnxpasof.supabase.co/storage/v1/object/public/project-images/13art.jpg',
    resultUrl: 'https://www.facebook.com/photo/?fbid=592925707417892',
    explanation: 'The competition theme “More than Computing” asked us to show how technology reaches beyond the screen. My piece is divided into four panels, each showing a different way computing serves people in the real world: (1) as a tool that makes traditional work easier and more efficient, (2) in solving crimes and supporting justice, (3) in connecting people and communities through social media, and (4) in graphic design and visual communication. Together, the panels highlight that computing is not only about machines—it’s about enabling creativity, connection, and impact in everyday life.',
    documentationPhotos: [
      'https://domzxwzidventnxpasof.supabase.co/storage/v1/object/public/project-images/13photo.jpg',
      'https://domzxwzidventnxpasof.supabase.co/storage/v1/object/public/project-images/13photo2.jpg',
    ],
  },
  {
    title: 'Digital Arts Open Competition — 2nd Place',
    event: '13th Iligan City Computing Fair',
    tagline: 'GAME ON! IT\'S LUCKY YEAR 13',
    date: 'September 2015',
    thumbnail: 'https://domzxwzidventnxpasof.supabase.co/storage/v1/object/public/project-images/15thumbnail.jfif',
    cover: 'https://domzxwzidventnxpasof.supabase.co/storage/v1/object/public/project-images/15cover.jfif',
    art: 'https://domzxwzidventnxpasof.supabase.co/storage/v1/object/public/project-images/15art.jfif',
    explanation: 'The theme “GAME ON! IT’S LUCKY YEAR 13” led me to think about games first—but I wanted a twist. Robotics was advancing quickly, so I imagined 2015 as a moment when you could design and build your own robot right on your computer: pick the parts, colors, and style, then when you’re ready—game on. The piece is about that idea: your robot coming to life from your desk, no factory needed. It’s play and possibility, powered by computing.',
    documentationPhotos: [
      'https://domzxwzidventnxpasof.supabase.co/storage/v1/object/public/project-images/15photo.jpg',
      'https://domzxwzidventnxpasof.supabase.co/storage/v1/object/public/project-images/15photo1.jpg',
      'https://domzxwzidventnxpasof.supabase.co/storage/v1/object/public/project-images/15photo2.jpg',
      'https://domzxwzidventnxpasof.supabase.co/storage/v1/object/public/project-images/15photo3.jpg',
      'https://domzxwzidventnxpasof.supabase.co/storage/v1/object/public/project-images/15photo4.jpg',
    ],
  },
];

const AwardModal = ({ award, onClose }: { award: AwardItem | null; onClose: () => void }) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[] | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openDocumentationGallery = (photos: string[], index: number) => {
    setGalleryImages(photos);
    setGalleryIndex(index);
    setActiveImage(photos[index]);
  };

  const openSingleImage = (src: string) => {
    setGalleryImages(null);
    setGalleryIndex(0);
    setActiveImage(src);
  };

  const closeLightbox = () => {
    setActiveImage(null);
    setGalleryImages(null);
    setGalleryIndex(0);
  };

  const goPrev = () => {
    if (!galleryImages || galleryIndex <= 0) return;
    const nextIndex = galleryIndex - 1;
    setGalleryIndex(nextIndex);
    setActiveImage(galleryImages[nextIndex]);
  };

  const goNext = () => {
    if (!galleryImages || galleryIndex >= galleryImages.length - 1) return;
    const nextIndex = galleryIndex + 1;
    setGalleryIndex(nextIndex);
    setActiveImage(galleryImages[nextIndex]);
  };

  useEffect(() => {
    if (!activeImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage, galleryImages, galleryIndex]);

  if (!award) return null;
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="absolute inset-0 bg-midnight/95"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-midnight border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col"
          style={{ contain: 'layout paint' }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all"
          >
            <X size={24} />
          </button>

          <div className="overflow-y-auto custom-scrollbar">
            <div className="relative w-full aspect-video md:aspect-[21/9]">
              <img
                src={award.cover}
                alt=""
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 md:left-12">
                <span className="text-xs font-mono text-orange-vibrant uppercase tracking-widest mb-2 block">
                  {award.event}
                </span>
                <p className="text-warm-gray/50 text-sm mb-1">{award.tagline} • {award.date}</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">{award.title}</h2>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-8">
              {award.resultUrl && (
                <div className="flex flex-wrap gap-4">
                  <a
                    href={award.resultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-vibrant text-white rounded-full font-medium hover:bg-orange-vibrant/90 transition-all"
                  >
                    Winner results <ExternalLink size={18} />
                  </a>
                </div>
              )}

              <section>
                <h3 className="text-sm font-mono text-warm-gray/30 uppercase tracking-widest mb-4">Competition entry</h3>
                <button
                  type="button"
                  onClick={() => openSingleImage(award.art)}
                  className="block w-full rounded-2xl overflow-hidden border border-white/10 text-left"
                >
                  <img
                    src={award.art}
                    alt="Award entry"
                    decoding="async"
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </button>
              </section>

              {award.explanation && (
                <section>
                  <h3 className="text-sm font-mono text-warm-gray/30 uppercase tracking-widest mb-4">About this piece</h3>
                  <p className="text-warm-gray/60 leading-relaxed">
                    {award.explanation}
                  </p>
                </section>
              )}

              {award.documentationPhotos && award.documentationPhotos.length > 0 && (
                <section>
                  <h3 className="text-sm font-mono text-warm-gray/30 uppercase tracking-widest mb-4">Documentation</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {award.documentationPhotos.map((photo, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => openDocumentationGallery(award.documentationPhotos!, idx)}
                        className="block w-full rounded-2xl overflow-hidden border border-white/10 text-left"
                      >
                        <img
                          src={photo}
                          alt={`Documentation ${idx + 1}`}
                          decoding="async"
                          loading="lazy"
                          className="w-full h-auto object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-midnight/98"
              onClick={closeLightbox}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative max-w-4xl w-full flex items-center gap-2"
            >
              {galleryImages && galleryIndex > 0 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              {galleryImages && galleryIndex < galleryImages.length - 1 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                >
                  <ChevronRight size={24} />
                </button>
              )}
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10"
              >
                <X size={20} />
              </button>
              <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 w-full">
                <img
                  src={activeImage}
                  alt="Preview"
                  decoding="async"
                  className="w-full h-auto max-h-[75vh] object-contain bg-midnight"
                />
              </div>
              {galleryImages && (
                <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-warm-gray/40 font-mono">
                  {galleryIndex + 1} / {galleryImages.length}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export const Awards = () => {
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-midnight">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
            <span className="text-gradient">Awards</span>
          </h1>
          <p className="text-warm-gray/50 max-w-2xl text-lg">
            Recognition and accolades from projects, competitions, and collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {AWARDS.map((award, i) => (
            <motion.button
              key={`${award.event}-${award.date}`}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={() => setSelectedAward(award)}
              className="glass rounded-3xl overflow-hidden text-left group hover:border-orange-vibrant/30 transition-all flex cursor-pointer"
            >
              <div className="w-28 sm:w-32 shrink-0 aspect-square relative">
                <img
                  src={award.thumbnail}
                  alt=""
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trophy className="text-orange-vibrant" size={14} />
                </div>
              </div>
              <div className="p-5 flex flex-col justify-center min-w-0 flex-1">
                <span className="text-[10px] font-mono text-orange-vibrant uppercase tracking-widest">
                  {award.event}
                </span>
                <p className="text-white font-bold text-base mt-1 line-clamp-2">{award.title}</p>
                <p className="text-warm-gray/40 text-xs mt-1">{award.date}</p>
                <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-orange-vibrant group-hover:gap-2 transition-all">
                  View details <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedAward && (
          <AwardModal
            key={`${selectedAward.event}-${selectedAward.date}`}
            award={selectedAward}
            onClose={() => setSelectedAward(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
