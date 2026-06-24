import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, Shield, AlertTriangle, Lightbulb, Users, Target, CheckCircle2, DollarSign, Eye, Award
} from 'lucide-react';

export default function AboutUs() {
  const values = [
    {
      icon: <Target className="h-6 w-6 text-blue-600" />,
      title: "Nossa Missão",
      desc: "Promover dignidade, acolhimento e apoio logístico às famílias de pacientes encaminhados para tratamentos especializados em São Paulo."
    },
    {
      icon: <Eye className="h-6 w-6 text-blue-600" />,
      title: "Nossa Visão",
      desc: "Construir um sistema no qual nenhum paciente necessite enfrentar sozinho um procedimento médico de alta complexidade por razões econômicas."
    },
    {
      icon: <Award className="h-6 w-6 text-blue-600" />,
      title: "Princípio Fundamental",
      desc: "A cirurgia pode ser realizada pelo sistema de saúde. A presença da família, muitas vezes, não. O acompanhante é parte essencial da cura."
    }
  ];

  const integrityRules = [
    "Nenhuma campanha arrecadará valores superiores ao orçamento aprovado.",
    "Nenhum fundador ou dirigente será remunerado com recursos das campanhas.",
    "As despesas institucionais e administrativas serão suportadas separadamente pelos fundadores.",
    "As campanhas serão abertas apenas após validação detalhada do caso e definição do orçamento.",
    "As campanhas serão realizadas preferencialmente nos sete dias anteriores ao procedimento médico.",
    "O encerramento da arrecadação ocorrerá automaticamente após o atingimento exato da meta.",
    "Os resultados financeiros detalhados de cada caso serão divulgados de forma pública aos doadores."
  ];

  return (
    <div id="about-us-container" className="space-y-16 font-sans">
      {/* Editorial Introduction */}
      <section className="max-w-4xl mx-auto text-center space-y-6 px-4">
        <h2 className="text-sm font-bold tracking-widest uppercase text-blue-600">A Organização</h2>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Nenhum paciente deve enfrentar uma cirurgia de alta complexidade sozinho
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
          A <strong>Presença que Cura</strong> é uma organização sem fins lucrativos dedicada a viabilizar a presença de familiares e cuidadores junto a pacientes submetidos a tratamentos de alta complexidade na cidade de São Paulo.
        </p>
      </section>

      {/* Grid: Mission, Vision, Principle */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {values.map((v, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="bg-blue-50 w-max p-3 rounded-2xl group-hover:bg-blue-100 transition-colors">
                {v.icon}
              </div>
              <h3 className="text-slate-900 font-bold text-lg">{v.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* The Problem & Context */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-rose-100 border border-rose-200/50 text-rose-800 px-3 py-1 rounded-full text-xs font-semibold w-max uppercase tracking-wider flex items-center space-x-1">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>O Grande Problema</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
              O SUS trata a saúde física. A família acolhe a dor humana.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              O Brasil possui centers hospitalares de excelência altamente concentrados na capital paulista. Milhares de pacientes de regiões vulneráveis do interior ou de outros estados viajam longas distâncias para cirurgias cardíacas pediátricas, transplantes, procedimentos neurológicos e tratamentos oncológicos pelo SUS.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Embora a assistência hospitalar e os exames sejam integralmente cobertos pelo sistema público, a permanência física do familiar é desassistida. Os custos exorbitantes de passagens, hospedagem próxima, alimentação diária e locomoção urbana por semanas pesam como um fardo impossível sobre orçamentos vulneráveis.
            </p>
            <p className="text-blue-700 font-semibold text-sm">
              Para famílias vulneráveis, estes gastos inesperados podem representar vários meses de renda familiar.
            </p>
          </div>
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-2xl font-black text-blue-600">PASSAGENS</span>
              <p className="text-slate-500 text-xs leading-relaxed">Deslocamento rodoviário ou aéreo de longa distância de ida e volta do interior.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-2xl font-black text-blue-600">HOSPEDAGEM</span>
              <p className="text-slate-500 text-xs leading-relaxed">Estadia segura em pensões próximas aos hospitais de referência em São Paulo.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-2xl font-black text-blue-600">ALIMENTAÇÃO</span>
              <p className="text-slate-500 text-xs leading-relaxed">Custeio de refeições diárias para o cuidador durante todo o período do internamento.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-2xl font-black text-blue-600">DESLOCAMENTO</span>
              <p className="text-slate-500 text-xs leading-relaxed">Transporte urbano por metrô, ônibus ou carros por aplicativo entre hospedagem e o hospital.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Operate */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-sm font-bold tracking-widest uppercase text-blue-600">Como Funcionamos</h2>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Duas frentes complementares e coordenadas
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm space-y-6 hover:border-blue-100 transition-all">
            <div className="flex items-center space-x-3.5">
              <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase">Frente 1</span>
                <h3 className="text-slate-900 font-bold text-lg leading-snug">Núcleo de Acolhimento e Validação</h3>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Nossa equipe recebe as solicitações encaminhadas por assistentes sociais, médicos, hospitais ou diretamente pelas famílias. Cada caso passa por análise rigorosa:
            </p>
            <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                <span>Análise de indicação médica legítima</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                <span>Validação socioeconômica familiar detalhada</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                <span>Somente casos com data definida e confirmada</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                <span>Orçamento real elaborado antes da campanha iniciar</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm space-y-6 hover:border-blue-100 transition-all">
            <div className="flex items-center space-x-3.5">
              <div className="bg-blue-50/80 p-3 rounded-2xl text-blue-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase">Frente 2</span>
                <h3 className="text-slate-900 font-bold text-lg leading-snug">Núcleo de Mobilização Solidária</h3>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Uma vez aprovado, iniciamos campanhas públicas rápidas, preferencialmente nos <strong>sete dias que antecedem o procedimento</strong>. Esse curto prazo possui propósitos estratégicos:
            </p>
            <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                <span>Gerar senso de urgência focado na cirurgia agendada</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                <span>Vincular a arrecadação a necessidades imediatas e mensuráveis</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                <span>Permitir que doadores acompanhem o desfecho real de cada caso</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                <span>Parcerias transparentes com plataformas consolidadas</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Value Limit & Operational Model */}
      <section className="bg-blue-950 text-blue-100 py-16 sm:py-20 rounded-3xl max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 mx-4 relative overflow-hidden">
        {/* Abstract shape */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Arrecadação com Valor Estrito e Limitado
            </h2>
            <p className="text-blue-200/90 text-sm sm:text-base leading-relaxed">
              Diferente de iniciativas convencionais, cada campanha nossa possui um orçamento cirurgicamente planejado. Se as despesas estimadas somam <strong>R$ 3.000</strong>, a arrecadação se encerra de maneira automática assim que este valor é atingido.
            </p>
            <p className="text-blue-200/90 text-sm sm:text-base leading-relaxed">
              Não acumulamos capital excedente sob um paciente. Nosso objetivo institucional perpétuo não é maximizar as doações, mas sim cobrir cada necessidade individual com transparência exemplar.
            </p>
            <div className="p-4 bg-blue-900/50 border border-blue-800 rounded-2xl flex items-start space-x-3">
              <DollarSign className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-300 leading-relaxed">
                As despesas operacionais da ONG são custeadas integralmente pelos próprios fundadores e mantenedores. Nenhum centavo arrecadado em campanhas de pacientes é retido pela administração da instituição.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 bg-blue-900/40 border border-blue-800 p-8 rounded-2xl space-y-6">
            <h4 className="font-bold text-white text-md border-b border-blue-800 pb-3">Exemplo de Orçamento de um Caso</h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-300">Passagem Rodoviária Ida/Volta:</span>
                <span className="font-semibold text-white">R$ 900,00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Hospedagem (Pensão 15 dias):</span>
                <span className="font-semibold text-white">R$ 1.200,00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Alimentação Básica:</span>
                <span className="font-semibold text-white">R$ 700,00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Transporte Local (Metrô/Ônibus):</span>
                <span className="font-semibold text-white">R$ 200,00</span>
              </div>
              <div className="border-t border-blue-800 pt-3 flex justify-between font-bold text-base text-blue-400">
                <span>Orçamento Total do Caso:</span>
                <span>R$ 3.000,00</span>
              </div>
            </div>
            <div className="text-center text-xs text-blue-300 bg-blue-900/60 py-2 rounded-xl border border-blue-800">
              A campanha fecha automaticamente em R$ 3.000,00
            </div>
          </div>
        </div>
      </section>

      {/* Compromisso de Integridade */}
      <section className="max-w-4xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-3">
          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold w-max mx-auto uppercase tracking-wider flex items-center space-x-1.5">
            <Shield className="h-4 w-4 text-blue-600" />
            <span>Nossa Ética</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Compromisso de Integridade Permanente
          </h2>
          <p className="text-slate-500 text-sm">
            Nossos sete mandamentos éticos inegociáveis que moldam todas as nossas operações diárias:
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm divide-y divide-slate-100">
          {integrityRules.map((rule, idx) => (
            <div key={idx} className="flex items-start space-x-4 py-4 first:pt-0 last:pb-0">
              <span className="bg-blue-50 text-blue-700 h-7 w-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-slate-600 text-sm leading-relaxed">{rule}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
