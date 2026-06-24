import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, MapPin, Calendar, Building, HelpCircle, Users, CheckCircle2, AlertCircle, Info 
} from 'lucide-react';
import { Campaign } from '../types';

interface OngoingProjectsProps {
  campaigns: Campaign[];
  onDonateClick: (campaign: Campaign) => void;
}

export default function OngoingProjects({ campaigns, onDonateClick }: OngoingProjectsProps) {
  const activeCampaigns = campaigns.filter(c => c.status === 'active');

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div id="ongoing-projects-container" className="space-y-12 font-sans">
      {/* Intro Header */}
      <section className="text-center space-y-4 px-4">
        <span className="text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full">
          Mobilização Solidária
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Campanhas Ativas de Arrecadação
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
          Cada caso abaixo representa uma família vinda de longe para cirurgias complexas. Apoie com hospedagem, alimentação e passagens. 
          <strong className="text-blue-700 block mt-1">Nenhuma campanha arrecada além de sua meta estipulada. Ao atingir 100%, ela é encerrada.</strong>
        </p>
      </section>

      {/* Grid of Active Projects */}
      {activeCampaigns.length === 0 ? (
        <div className="bg-slate-50 text-center py-12 px-6 rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-500 text-base">Nenhuma campanha ativa no momento. Todas as metas foram atingidas!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeCampaigns.map((camp) => {
            const percent = Math.min(100, Math.round((camp.raisedAmount / camp.targetAmount) * 100));
            const isCompleted = camp.raisedAmount >= camp.targetAmount;

            return (
              <motion.div 
                key={camp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Image & Overlay tags */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={camp.photoUrl} 
                    alt={camp.patientName} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
                  
                  {/* Origin Tag */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-bold text-slate-900 shadow flex items-center space-x-1">
                    <MapPin className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    <span>{camp.patientOrigin}</span>
                  </div>

                  {/* Age Tag */}
                  <div className="absolute top-4 right-4 bg-slate-900/85 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow">
                    <span>{camp.patientAge} anos</span>
                  </div>

                  {/* Patient / Companion Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-blue-300">Paciente</span>
                    <h3 className="text-lg font-bold truncate leading-tight">{camp.patientName}</h3>
                    <p className="text-xs text-slate-200 mt-0.5">
                      Acompanhante: <strong className="text-white">{camp.companionName}</strong> ({camp.companionRelationship})
                    </p>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  {/* Clinical & Hosp info */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2 text-xs font-medium text-slate-600">
                      <Building className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{camp.hospitalName}</span>
                    </div>
                    <div className="flex items-start space-x-2 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{camp.procedureType}</span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mt-1">
                      {camp.story}
                    </p>
                  </div>

                  {/* Budget breakdown block */}
                  <div className="bg-slate-50 rounded-2xl p-4 space-y-2.5 border border-slate-200">
                    <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">Orçamento Detalhado do Caso</span>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-slate-600 font-medium">
                      <div className="flex justify-between">
                        <span>Passagens:</span>
                        <span className="text-slate-900 font-bold">{formatCurrency(camp.budgetBreakdown.transport)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hospedagem:</span>
                        <span className="text-slate-900 font-bold">{formatCurrency(camp.budgetBreakdown.lodging)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Alimentação:</span>
                        <span className="text-slate-900 font-bold">{formatCurrency(camp.budgetBreakdown.food)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transp. local:</span>
                        <span className="text-slate-900 font-bold">{formatCurrency(camp.budgetBreakdown.localTransit)}</span>
                      </div>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between text-xs font-bold text-blue-700">
                      <span>Total Estimado:</span>
                      <span>{formatCurrency(camp.targetAmount)}</span>
                    </div>
                  </div>

                  {/* Progress & Target numbers */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">Arrecadado</span>
                        <span className="text-lg font-black text-blue-700">{formatCurrency(camp.raisedAmount)}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">Progresso</span>
                        <span className="text-sm font-bold text-slate-800">{percent}%</span>
                      </div>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-blue-600' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>

                    {/* Timeline & urgency banner */}
                    <div className="flex justify-between items-center text-xs pt-1">
                      <div className="flex items-center space-x-1 text-slate-500">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Cirurgia: {new Date(camp.procedureDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                      {!isCompleted ? (
                        <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-md text-[11px] animate-pulse">
                          Faltam {camp.daysLeft} dias
                        </span>
                      ) : (
                        <span className="text-blue-700 font-bold bg-blue-50 px-2.5 py-0.5 rounded-md text-[11px] flex items-center space-x-1">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Atingido!</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action donation button */}
                  {isCompleted ? (
                    <div className="bg-blue-50 border border-blue-100 py-3 rounded-xl text-center text-xs font-bold text-blue-800 flex items-center justify-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                      <span>Arrecadação Concluída • Meta Atingida!</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onDonateClick(camp)}
                      className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-full font-bold text-sm shadow hover:shadow-lg transition-all cursor-pointer active:scale-95"
                    >
                      <Heart className="h-4 w-4 fill-white/20" />
                      <span>Doar para este Caso</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Trust & Transparency Guarantee Banner */}
      <section className="max-w-4xl mx-auto px-4 py-6 bg-slate-50 border border-slate-200 rounded-3xl flex items-start space-x-4">
        <Info className="h-5.5 w-5.5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-1">
          <h4 className="font-bold text-slate-900">Garantia de Destinação Integral:</h4>
          <p>
            Cada caso é independente e possui seu próprio fundo. A totalidade das doações é entregue em forma de passagens emitidas, pagamentos aos alojamentos locais credenciados e vale-alimentação nominal para o acompanhante. Não há desvio ou fracionamento de recursos.
          </p>
        </div>
      </section>
    </div>
  );
}
