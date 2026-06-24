import React from 'react';
import { motion } from 'motion/react';
import { Heart, FileText, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onDonateClick: () => void;
  onApplyClick: () => void;
}

export default function Hero({ onDonateClick, onApplyClick }: HeroProps) {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white py-16 sm:py-24">
      {/* Decorative background vectors */}
      <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4 transform opacity-20">
        <div className="h-[500px] w-[500px] rounded-full bg-blue-200 blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 -z-10 -translate-x-1/4 translate-y-1/4 transform opacity-20">
        <div className="h-[400px] w-[400px] rounded-full bg-blue-100 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Banner tag */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-blue-100/70 border border-blue-200/50 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-blue-800"
            >
              <HeartHandshake className="h-3.5 w-3.5 text-blue-600" />
              <span>Associação Presença que Cura • São Paulo</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-none"
              >
                Nenhum paciente <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  deve enfrentar uma cirurgia sozinho.
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0"
              >
                "A cirurgia pode ser realizada pelo sistema de saúde. A presença da família, muitas vezes, não."
              </motion.p>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Viabilizamos hospedagem, alimentação e passagens para familiares de pacientes carentes transferidos para cirurgias cardíacas pediátricas, oncológicas e transplantes nos principais hospitais públicos de São Paulo.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                id="hero-primary-donate-btn"
                onClick={onDonateClick}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
              >
                <Heart className="h-5 w-5 fill-white/20" />
                <span>Apoiar uma Campanha</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                id="hero-secondary-apply-btn"
                onClick={onApplyClick}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 cursor-pointer active:scale-95"
              >
                <FileText className="h-5 w-5 text-slate-600" />
                <span>Solicitar Apoio</span>
              </button>
            </motion.div>

            {/* Trust factors */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-6 pt-6 text-xs text-slate-500 font-medium"
            >
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <span>100% repassado aos casos</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <span>Metas limitadas ao orçamento</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <span>Transparência auditada</span>
              </div>
            </motion.div>
          </div>

          {/* Emotional Graphic/Image Showcase */}
          <div className="lg:col-span-5 mt-12 lg:mt-0 relative flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-md sm:max-w-lg aspect-square sm:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop" 
                alt="Apoio humano hospitalar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
              
              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-white/40">
                <div className="flex items-start space-x-3.5">
                  <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600">
                    <Heart className="h-5 w-5 fill-blue-600/10" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm leading-snug">Metas que salvam laços</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-normal">
                      Cada real arrecadado viabiliza um dia a mais que a mãe, o pai ou o cônjuge passa cuidando de quem mais ama.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
