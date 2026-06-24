import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, User, Home, Shield, Calendar, Phone, Mail, CheckCircle2, 
  MapPin, HelpCircle, Heart, ArrowRight, ArrowLeft, UploadCloud, HeartHandshake
} from 'lucide-react';
import { CaseSubmission } from '../types';

interface SubmitCaseProps {
  onCaseSubmitted: (newCase: CaseSubmission) => void;
  existingSubmissions: CaseSubmission[];
}

export default function SubmitCase({ onCaseSubmitted, existingSubmissions }: SubmitCaseProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    companionName: '',
    companionRelationship: 'Mãe',
    email: '',
    phone: '',
    hospitalName: '',
    procedureType: '',
    procedureDate: '',
    originCity: '',
    originState: 'SP',
    story: '',
    needTransport: true,
    needLodging: true,
    needFood: true,
    needLocalTransit: true,
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState('');

  const statesList = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleNext = () => {
    // Basic validation per step
    if (step === 1) {
      if (!formData.patientName || !formData.patientAge || !formData.originCity || !formData.hospitalName || !formData.procedureType || !formData.procedureDate) {
        alert('Por favor, preencha todos os campos obrigatórios do paciente e cirurgia.');
        return;
      }
    } else if (step === 2) {
      if (!formData.companionName || !formData.companionRelationship || !formData.email || !formData.phone || !formData.story) {
        alert('Por favor, preencha todos os campos do acompanhante e conte brevemente sua história.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSubmission: CaseSubmission = {
      id: 'case_' + Date.now(),
      patientName: formData.patientName,
      patientAge: Number(formData.patientAge),
      companionName: formData.companionName,
      companionRelationship: formData.companionRelationship,
      email: formData.email,
      phone: formData.phone,
      hospitalName: formData.hospitalName,
      procedureType: formData.procedureType,
      procedureDate: formData.procedureDate,
      originCity: formData.originCity,
      originState: formData.originState,
      story: formData.story,
      budgetNeeds: {
        transport: formData.needTransport,
        lodging: formData.needLodging,
        food: formData.needFood,
        localTransit: formData.needLocalTransit,
      },
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    onCaseSubmitted(newSubmission);
    setLastSubmittedId(newSubmission.id);
    setIsSuccess(true);
  };

  const resetForm = () => {
    setFormData({
      patientName: '',
      patientAge: '',
      companionName: '',
      companionRelationship: 'Mãe',
      email: '',
      phone: '',
      hospitalName: '',
      procedureType: '',
      procedureDate: '',
      originCity: '',
      originState: 'SP',
      story: '',
      needTransport: true,
      needLodging: true,
      needFood: true,
      needLocalTransit: true,
    });
    setStep(1);
    setIsSuccess(false);
  };

  return (
    <div id="submit-case-container" className="max-w-4xl mx-auto px-4 font-sans">
      {/* Intro Header */}
      <section className="text-center space-y-4 mb-10">
        <span className="text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full">
          Núcleo de Acolhimento
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Apresente seu Caso de Apoio
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
          Se você é acompanhante, familiar, médico ou assistente social e precisa de suporte logístico para um procedimento cirúrgico já agendado em São Paulo, preencha os dados abaixo para darmos início ao processo de validação documental.
        </p>
      </section>

      {/* Validation Requirements Info Box */}
      {!isSuccess && step === 1 && (
        <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl mb-8 flex items-start space-x-3.5">
          <Shield className="h-5.5 w-5.5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-blue-800 space-y-1">
            <h4 className="font-bold">Requisitos Cruciais para Aprovação:</h4>
            <p className="leading-relaxed">
              1. O paciente deve possuir <strong>procedimento cirúrgico ou tratamento complexo efetivamente agendado</strong> com data definida.<br />
              2. Deve ser comprovada a <strong>vulnerabilidade socioeconômica</strong> da família acompanhante.<br />
              3. O caso passará por análise de nossa assistência social em até 48 horas úteis.
            </p>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {isSuccess ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-slate-200 p-8 sm:p-12 rounded-3xl shadow-sm text-center space-y-6"
        >
          <div className="bg-blue-50 p-4 rounded-full w-max mx-auto text-blue-600">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Caso Recebido com Sucesso!</h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Nossa equipe de assistentes sociais foi notificada e já iniciou a validação cadastral e o contato com a instituição médica.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl max-w-lg mx-auto text-left border border-slate-200 space-y-4">
            <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Acompanhamento do Pedido</h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Protocolo:</span>
                <span className="font-mono font-bold text-slate-900">{lastSubmittedId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Paciente:</span>
                <span className="font-medium text-slate-900">{formData.patientName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Status do Processo:</span>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 animate-pulse">
                  <span>●</span>
                  <span>Em Análise Documental</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Previsão de Retorno:</span>
                <span className="font-medium text-slate-900">Até 24 horas</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Enviamos uma confirmação detalhada para o e-mail <strong>{formData.email}</strong> com as próximas instruções de envio de documentos (laudo, comprovante de agendamento e renda).
          </p>

          <div className="pt-4 flex justify-center space-x-4">
            <button
              onClick={resetForm}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium text-sm transition-colors cursor-pointer shadow hover:shadow-md"
            >
              Cadastrar Outro Caso
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-10">
          {/* Progress indicators */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center space-x-2">
              <span className={`h-8 w-8 rounded-full text-xs font-bold flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-450'}`}>1</span>
              <span className={`text-xs font-bold ${step >= 1 ? 'text-slate-900' : 'text-slate-450'}`}>Paciente e Procedimento</span>
            </div>
            <div className="h-0.5 w-10 bg-slate-250"></div>
            <div className="flex items-center space-x-2">
              <span className={`h-8 w-8 rounded-full text-xs font-bold flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-450'}`}>2</span>
              <span className={`text-xs font-bold ${step >= 2 ? 'text-slate-900' : 'text-slate-450'}`}>Cuidador e História</span>
            </div>
            <div className="h-0.5 w-10 bg-slate-250"></div>
            <div className="flex items-center space-x-2">
              <span className={`h-8 w-8 rounded-full text-xs font-bold flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-450'}`}>3</span>
              <span className={`text-xs font-bold ${step >= 3 ? 'text-slate-900' : 'text-slate-450'}`}>Custos Necessários</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <h3 className="text-slate-900 font-bold text-lg border-b border-slate-100 pb-2 flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <span>Dados do Paciente e Tratamento</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Nome Completo do Paciente *</label>
                    <input 
                      type="text" 
                      name="patientName"
                      required
                      value={formData.patientName}
                      onChange={handleInputChange}
                      placeholder="Ex: João da Silva Santos"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Idade do Paciente *</label>
                    <input 
                      type="number" 
                      name="patientAge"
                      required
                      value={formData.patientAge}
                      onChange={handleInputChange}
                      placeholder="Ex: 8"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Cidade de Origem *</label>
                    <input 
                      type="text" 
                      name="originCity"
                      required
                      value={formData.originCity}
                      onChange={handleInputChange}
                      placeholder="Ex: Montes Claros"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Estado de Origem *</label>
                    <select 
                      name="originState"
                      value={formData.originState}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    >
                      {statesList.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Hospital de Referência em São Paulo *</label>
                  <input 
                    type="text" 
                    name="hospitalName"
                    required
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    placeholder="Ex: InCor, Hospital das Clínicas, ICESP, AC Camargo"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Tipo de Procedimento / Cirurgia *</label>
                    <input 
                      type="text" 
                      name="procedureType"
                      required
                      value={formData.procedureType}
                      onChange={handleInputChange}
                      placeholder="Ex: Cirurgia Cardíaca Pediátrica"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Data Agendada da Cirurgia *</label>
                    <input 
                      type="date" 
                      name="procedureDate"
                      required
                      value={formData.procedureDate}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium text-sm shadow transition-colors cursor-pointer"
                  >
                    <span>Avançar</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <h3 className="text-slate-900 font-bold text-lg border-b border-slate-100 pb-2 flex items-center space-x-2">
                  <HeartHandshake className="h-5 w-5 text-blue-600" />
                  <span>Dados do Acompanhante / Familiar</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Nome do Acompanhante Responsável *</label>
                    <input 
                      type="text" 
                      name="companionName"
                      required
                      value={formData.companionName}
                      onChange={handleInputChange}
                      placeholder="Ex: Maria de Lourdes Silva"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Grau de Parentesco *</label>
                    <select 
                      name="companionRelationship"
                      value={formData.companionRelationship}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    >
                      <option value="Mãe">Mãe</option>
                      <option value="Pai">Pai</option>
                      <option value="Cônjuge">Cônjuge</option>
                      <option value="Filho(a)">Filho(a)</option>
                      <option value="Irmão/Irmã">Irmão/Irmã</option>
                      <option value="Tio/Tia">Tio/Tia</option>
                      <option value="Outro">Outro parente/Cuidador</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">E-mail para Contato *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Ex: maria.lourdes@gmail.com"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">WhatsApp / Telefone *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Ex: (87) 99999-9999"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Breve relato sobre a história e necessidade *</label>
                  <textarea 
                    name="story"
                    required
                    rows={4}
                    value={formData.story}
                    onChange={handleInputChange}
                    placeholder="Nos conte sobre as dificuldades enfrentadas, a origem da família, e o porquê de precisar do auxílio para permanência física em São Paulo."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-none text-slate-700"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center space-x-2 border border-slate-200 text-slate-600 hover:bg-slate-50 px-6 py-2.5 rounded-full font-medium text-sm transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Voltar</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium text-sm shadow transition-colors cursor-pointer"
                  >
                    <span>Avançar</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-slate-900 font-bold text-lg border-b border-slate-100 pb-2 flex items-center space-x-2">
                  <Home className="h-5 w-5 text-blue-600" />
                  <span>Selecione os Recursos Necessários</span>
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed">
                  Para estimar o orçamento do seu caso, selecione quais dos seguintes itens você NÃO tem recursos para cobrir por conta própria:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-start space-x-3 p-4 bg-slate-50 border border-slate-200/60 rounded-2xl cursor-pointer hover:bg-blue-50/20 hover:border-blue-250 transition-all">
                    <input 
                      type="checkbox" 
                      name="needTransport"
                      checked={formData.needTransport}
                      onChange={handleCheckboxChange}
                      className="mt-1 accent-blue-600 h-4 w-4"
                    />
                    <div>
                      <span className="block text-sm font-bold text-slate-900">Transporte / Passagens</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Passagens de ônibus/avião da cidade de origem até São Paulo.</span>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 bg-slate-50 border border-slate-200/60 rounded-2xl cursor-pointer hover:bg-blue-50/20 hover:border-blue-250 transition-all">
                    <input 
                      type="checkbox" 
                      name="needLodging"
                      checked={formData.needLodging}
                      onChange={handleCheckboxChange}
                      className="mt-1 accent-blue-600 h-4 w-4"
                    />
                    <div>
                      <span className="block text-sm font-bold text-slate-900">Hospedagem</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Estadia em pensão, hotel social ou hospedaria parceira da ONG próxima ao hospital.</span>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 bg-slate-50 border border-slate-200/60 rounded-2xl cursor-pointer hover:bg-blue-50/20 hover:border-blue-250 transition-all">
                    <input 
                      type="checkbox" 
                      name="needFood"
                      checked={formData.needFood}
                      onChange={handleCheckboxChange}
                      className="mt-1 accent-blue-600 h-4 w-4"
                    />
                    <div>
                      <span className="block text-sm font-bold text-slate-900">Alimentação</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Almoço, jantar e lanches diários para o acompanhante durante o período.</span>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 bg-slate-50 border border-slate-200/60 rounded-2xl cursor-pointer hover:bg-blue-50/20 hover:border-blue-250 transition-all">
                    <input 
                      type="checkbox" 
                      name="needLocalTransit"
                      checked={formData.needLocalTransit}
                      onChange={handleCheckboxChange}
                      className="mt-1 accent-blue-600 h-4 w-4"
                    />
                    <div>
                      <span className="block text-sm font-bold text-slate-900">Deslocamento Urbano</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Bilhetes de metrô/ônibus para trânsito diário entre hospital e alojamento.</span>
                    </div>
                  </label>
                </div>

                {/* Simulated file upload */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Comprovante de Agendamento da Cirurgia (Opcional)</label>
                  <div className="border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-100/50 transition-colors">
                    <UploadCloud className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <span className="block text-sm font-semibold text-slate-700">Arraste ou selecione o arquivo do laudo/agendamento</span>
                    <span className="block text-xs text-slate-400 mt-1">Formatos aceitos: PDF, JPEG, PNG (Max 5MB)</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center space-x-2 border border-slate-200 text-slate-600 hover:bg-slate-50 px-6 py-2.5 rounded-full font-medium text-sm transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Voltar</span>
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-sm shadow transition-colors cursor-pointer"
                  >
                    <span>Enviar Caso para Análise</span>
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      )}

      {/* History of Submitted Cases Tracker */}
      {existingSubmissions.length > 0 && (
        <section className="mt-16 space-y-4">
          <h3 className="text-slate-900 font-bold text-lg">Seus Casos Cadastrados nesta Sessão</h3>
          <div className="grid grid-cols-1 gap-4">
            {existingSubmissions.map((sub) => (
              <div key={sub.id} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-slate-900 text-sm">{sub.patientName} ({sub.patientAge} anos)</h4>
                    <span className="text-xs text-slate-450 font-mono">#{sub.id}</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Origem: <strong>{sub.originCity} - {sub.originState}</strong> • Hospital: <strong>{sub.hospitalName}</strong>
                  </p>
                  <p className="text-xs text-slate-450">
                    Cadastrado em: {sub.createdAt} • Acompanhante: {sub.companionName} ({sub.companionRelationship})
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center space-x-1.5 bg-amber-50 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-250">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse"></span>
                    <span>Em Análise Documental</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
