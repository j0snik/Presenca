import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle, Landmark, ShieldCheck, MessageCircleHeart, Users, FileText, Sparkles
} from 'lucide-react';
import { Campaign } from '../types';

interface FinishedProjectsProps {
  campaigns: Campaign[];
}

export default function FinishedProjects({ campaigns }: FinishedProjectsProps) {
  const completedCampaigns = campaigns.filter(c => c.status === 'completed');

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div id="finished-projects-container" className="space-y-12 font-sans">
      {/* Intro Header */}
      <section className="text-center space-y-4 px-4">
        <span className="text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full">
          Metas Alcançadas
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Histórias de Sucesso e Agradecimento
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
          Obrigado a cada um de nossos apoiadores. Aqui estão as campanhas que atingiram suas metas financeiras limite, viabilizando o acolhimento seguro aos familiares durante as cirurgias de seus entes queridos.
        </p>
      </section>

      {/* Grid of Completed Projects */}
      {completedCampaigns.length === 0 ? (
        <div className="bg-slate-50 text-center py-12 px-6 rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-500 text-base">Nenhum caso concluído registrado ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {completedCampaigns.map((camp) => (
            <motion.div 
              key={camp.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-8 space-y-6 relative overflow-hidden"
            >
              {/* Success Badge */}
              <div className="absolute top-4 right-4 bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-sm">
                <CheckCircle className="h-3.5 w-3.5 text-blue-600 fill-white" />
                <span>Meta Atingida</span>
              </div>

              {/* Patient header */}
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center border-b border-slate-100 pb-5">
                <div className="h-20 w-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 shadow-inner">
                  <img 
                    src={camp.photoUrl} 
                    alt={camp.patientName} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Paciente Cirúrgico</span>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">{camp.patientName}</h3>
                  <p className="text-xs text-slate-500">
                    Origem: <strong>{camp.patientOrigin}</strong> • Hospital: <span className="font-medium text-blue-700">{camp.hospitalName}</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    Acompanhante: <strong>{camp.companionName}</strong> ({camp.companionRelationship})
                  </p>
                </div>
              </div>

              {/* Impact / Financial summary block */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50/50 border border-blue-100/50 p-4 rounded-2xl">
                  <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">Total Arrecadado</span>
                  <span className="block text-base font-black text-blue-700 mt-1">{formatCurrency(camp.targetAmount)}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl col-span-1">
                  <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">Campanha Ativa</span>
                  <span className="block text-sm font-bold text-slate-800 mt-1">7 Dias</span>
                </div>
                <div className="bg-blue-50/40 border border-blue-100/40 p-4 rounded-2xl col-span-2 sm:col-span-1">
                  <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">Auditoria</span>
                  <span className="block text-xs font-extrabold text-blue-850 uppercase mt-1.5 flex items-center justify-center space-x-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                    <span>Transparente</span>
                  </span>
                </div>
              </div>

              {/* Exact Cost Audit Breakdown */}
              <div className="bg-slate-50 rounded-2xl p-4.5 space-y-3 border border-slate-200">
                <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center space-x-1">
                  <FileText className="h-3.5 w-3.5 text-blue-600" />
                  <span>Detalhamento Real das Despesas Custeadas</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-600 font-medium">
                  <div className="flex justify-between border-b border-dashed border-slate-200/60 pb-1">
                    <span>Passagens de Ônibus:</span>
                    <span className="text-slate-900 font-bold">{formatCurrency(camp.budgetBreakdown.transport)}</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-slate-200/60 pb-1">
                    <span>Hospedagem em Pensão:</span>
                    <span className="text-slate-900 font-bold">{formatCurrency(camp.budgetBreakdown.lodging)}</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-slate-200/60 pb-1">
                    <span>Alimentação Provedora:</span>
                    <span className="text-slate-900 font-bold">{formatCurrency(camp.budgetBreakdown.food)}</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-slate-200/60 pb-1">
                    <span>Deslocamento Metrô/Táxi:</span>
                    <span className="text-slate-900 font-bold">{formatCurrency(camp.budgetBreakdown.localTransit)}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-400 text-center font-bold">
                  * 100% DESTA RECONCILIAÇÃO FOI PAGA DIRETAMENTE AOS FORNECEDORES DE PRODUTOS E SERVIÇOS.
                </div>
              </div>

              {/* Heartwarming Letter of Appreciation */}
              {camp.thankYouMessage && (
                <div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-5 space-y-3 relative">
                  <MessageCircleHeart className="h-5 w-5 text-blue-600 absolute top-4 left-4" />
                  <div className="pl-7 space-y-1.5">
                    <span className="text-xs font-bold text-blue-850 uppercase tracking-wide flex items-center space-x-1">
                      <span>Carta de Agradecimento de {camp.companionName}</span>
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                      "{camp.thankYouMessage}"
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Callout of Integrity and Solidarity */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl max-w-5xl mx-auto px-6 py-8 mx-4 text-center space-y-4 shadow-xl">
        <Sparkles className="h-7 w-7 text-blue-200 mx-auto animate-bounce" />
        <h3 className="text-lg font-bold">A Presença gera Vida. A Cura vem da União.</h3>
        <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-2xl mx-auto">
          Ao financiarmos a hospedagem e alimentação dignas para o acompanhante, reduzimos o estresse emocional no leito e damos segurança para que a recuperação do paciente ocorra de forma plena e humanizada. Obrigado por ser parte dessa cura!
        </p>
      </section>
    </div>
  );
}
