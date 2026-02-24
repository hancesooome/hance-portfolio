import React from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { Palette, Code, Users, CheckCircle2 } from 'lucide-react';

const icons: Record<string, any> = {
  Palette,
  Code,
  Users
};

export const Services = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-midnight">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter">My <span className="text-gradient">Services</span></h1>
          <p className="text-warm-gray/50 max-w-2xl mx-auto text-lg">
            I offer a unique blend of creative and technical services designed to help you build better products and stronger brands.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-3xl flex flex-col"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-orange-vibrant mb-8">
                  <Icon size={32} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-warm-gray/50 mb-8 flex-1">{service.description}</p>
                
                <div className="space-y-4 mb-10">
                  <p className="text-xs font-mono text-warm-gray/30 uppercase tracking-widest">Deliverables</p>
                  {service.deliverables.map(item => (
                    <div key={item} className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 size={16} className="text-orange-vibrant" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-mono text-warm-gray/30 uppercase tracking-widest">Timeline</p>
                    <p className="text-white font-medium">{service.timeline}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-warm-gray/30 uppercase tracking-widest">Investment</p>
                    <p className="text-orange-vibrant font-bold">{service.price}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
