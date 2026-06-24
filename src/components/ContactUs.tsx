import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, Phone, MapPin, Send, Heart, Users, CheckCircle2, ShieldAlert, Award
} from 'lucide-react';
import { VolunteerSubmission, ContactMessage } from '../types';

interface ContactUsProps {
  onVolunteerRegister: (newVolunteer: VolunteerSubmission) => void;
  onContactSubmit: (newMessage: ContactMessage) => void;
  existingVolunteers: VolunteerSubmission[];
}

export default function ContactUs({ onVolunteerRegister, onContactSubmit, existingVolunteers }: ContactUsProps) {
  // Tabs for subforms: Contact or Volunteer
  const [activeForm, setActiveForm] = useState<'contact' | 'volunteer'>('volunteer');

  // Contact Form State
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Volunteer Form State
  const [volunteerData, setVolunteerData] = useState({
    fullName: '',
    email: '',
    phone: '',
    availability: 'Finais de Semana',
    message: '',
  });
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [volunteerSuccess, setVolunteerSuccess] = useState(false);

  const areasOfInterest = [
    { id: 'visitas', label: 'Acolhimento & Visitas', desc: 'Prestar apoio emocional e visitar familiares nos alojamentos.' },
    { id: 'transp', label: 'Logística & Transporte', desc: 'Auxiliar na recepção de familiares na rodoviária e trânsito local.' },
    { id: 'admin', label: 'Apoio Administrativo', desc: 'Auxiliar na triagem de casos, contatos e organização interna.' },
    { id: 'hospedagem', label: 'Hospedagem Solidária', desc: 'Auxiliar na mediação de vagas em pensões e alojamentos de apoio.' },
  ];

  const handleAreaToggle = (areaId: string) => {
    setSelectedAreas(prev => 
      prev.includes(areaId) ? prev.filter(x => x !== areaId) : [...prev, areaId]
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
      alert('Por favor, preencha todos os campos obrigatórios do formulário de contato.');
      return;
    }

    const newMsg: ContactMessage = {
      id: 'msg_' + Date.now(),
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      subject: contactData.subject,
      message: contactData.message,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onContactSubmit(newMsg);
    setContactSuccess(true);
    setContactData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setContactSuccess(false), 5000);
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerData.fullName || !volunteerData.email || !volunteerData.phone) {
      alert('Por favor, preencha todos os dados cadastrais obrigatórios.');
      return;
    }
    if (selectedAreas.length === 0) {
      alert('Por favor, selecione ao menos uma área de interesse para o voluntariado.');
      return;
    }

    const newVol: VolunteerSubmission = {
      id: 'vol_' + Date.now(),
      fullName: volunteerData.fullName,
      email: volunteerData.email,
      phone: volunteerData.phone,
      areasOfInterest: selectedAreas.map(id => areasOfInterest.find(a => a.id === id)?.label || id),
      availability: volunteerData.availability,
      message: volunteerData.message,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onVolunteerRegister(newVol);
    setVolunteerSuccess(true);
    setVolunteerData({ fullName: '', email: '', phone: '', availability: 'Finais de Semana', message: '' });
    setSelectedAreas([]);
    setTimeout(() => setVolunteerSuccess(false), 5000);
  };

  return (
    <div id="contact-us-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 font-sans">
      {/* Intro Header */}
      <section className="text-center space-y-4 max-w-2xl mx-auto px-4">
        <span className="text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full">
          Fale Conosco & Voluntariado
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Faça Parte da Nossa Rede de Amparo
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Seja doando seu tempo, esclarecendo suas dúvidas de funcionamento, ou trazendo ideias e parcerias, nossa organização está de braços abertos para ouvi-lo.
        </p>
      </section>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: NGO Contact Info */}
        <div className="lg:col-span-5 space-y-8 bg-slate-50 p-8 rounded-3xl border border-slate-200">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">Associação Presença que Cura</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Dúvidas sobre o cadastramento de casos, a segurança das doações ou quer propor convênios com alojamentos locais em São Paulo? Fale com a gente!
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-2xl text-blue-600 shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Nossa Sede Operacional</h4>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                  Rua Augusta, 1200, Consolação<br />
                  São Paulo - SP, CEP 01304-001<br />
                  <span className="text-blue-700 font-semibold text-[11px] block mt-1">Próximo aos maiores hospitais de referência</span>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-2xl text-blue-600 shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Contatos por E-mail</h4>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Geral: <a href="mailto:contato@presencaquecura.org" className="text-blue-600 font-semibold hover:underline">contato@presencaquecura.org</a><br />
                  Voluntariado: <a href="mailto:voluntarios@presencaquecura.org" className="text-blue-600 font-semibold hover:underline">voluntarios@presencaquecura.org</a>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-2xl text-blue-600 shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">WhatsApp de Atendimento</h4>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Atendimento: <span className="font-semibold text-slate-800">+55 (11) 98765-4321</span><br />
                  <span className="text-[11px] text-slate-400">Segunda a Sexta, das 9h às 18h</span>
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-xs text-blue-800 leading-relaxed flex items-start space-x-2.5">
            <Award className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Nota sobre voluntariado:</strong> Cuidadores em São Paulo muitas vezes enfrentam isolamento severo. Seu voluntariado pode transformar o dia de alguém através de uma escuta ativa ou suporte de translado!
            </span>
          </div>
        </div>

        {/* Right Column: Dynamic Form Switcher */}
        <div className="lg:col-span-7 space-y-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          {/* Tabs header switcher */}
          <div className="flex border-b border-slate-100 pb-4 justify-center sm:justify-start space-x-2">
            <button
              onClick={() => setActiveForm('volunteer')}
              className={`px-4.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeForm === 'volunteer' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Quero ser Voluntário(a)</span>
            </button>
            <button
              onClick={() => setActiveForm('contact')}
              className={`px-4.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeForm === 'contact' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Enviar Mensagem</span>
            </button>
          </div>

          {/* Form 1: Seja Voluntário */}
          {activeForm === 'volunteer' && (
            <form onSubmit={handleVolunteerSubmit} className="space-y-6">
              {volunteerSuccess && (
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-blue-800 text-sm font-semibold flex items-center space-x-2 animate-in fade-in">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  <span>Seu cadastro de voluntário foi registrado! Entraremos em contato via WhatsApp em breve.</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Nome Completo *</label>
                  <input 
                    type="text" 
                    required
                    value={volunteerData.fullName}
                    onChange={(e) => setVolunteerData(p => ({ ...p, fullName: e.target.value }))}
                    placeholder="Ex: Luísa Santos Oliveira"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">E-mail de Contato *</label>
                    <input 
                      type="email" 
                      required
                      value={volunteerData.email}
                      onChange={(e) => setVolunteerData(p => ({ ...p, email: e.target.value }))}
                      placeholder="Ex: luisa.santos@gmail.com"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">WhatsApp / Celular *</label>
                    <input 
                      type="tel" 
                      required
                      value={volunteerData.phone}
                      onChange={(e) => setVolunteerData(p => ({ ...p, phone: e.target.value }))}
                      placeholder="Ex: (11) 98888-8888"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Áreas de Interesse (Selecione ao menos uma) *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {areasOfInterest.map(area => {
                      const isSelected = selectedAreas.includes(area.id);
                      return (
                        <div 
                          key={area.id}
                          onClick={() => handleAreaToggle(area.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer text-left transition-all ${
                            isSelected 
                              ? 'bg-blue-50/50 border-blue-400 shadow-sm' 
                              : 'bg-slate-50 border-slate-200/60 hover:bg-slate-100/40'
                          }`}
                        >
                          <span className="block text-xs sm:text-sm font-bold text-slate-950">{area.label}</span>
                          <span className="block text-[10px] text-slate-500 mt-0.5 leading-snug">{area.desc}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Disponibilidade de Horário *</label>
                    <select 
                      value={volunteerData.availability}
                      onChange={(e) => setVolunteerData(p => ({ ...p, availability: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    >
                      <option value="Finais de Semana">Finais de Semana (Sáb/Dom)</option>
                      <option value="Período da Manhã">Período da Manhã (Seg a Sex)</option>
                      <option value="Período da Tarde">Período da Tarde (Seg a Sex)</option>
                      <option value="Flexível / Sob Demanda">Flexível / Sob Demanda</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Mensagem ou apresentação pessoal (Opcional)</label>
                  <textarea 
                    rows={3}
                    value={volunteerData.message}
                    onChange={(e) => setVolunteerData(p => ({ ...p, message: e.target.value }))}
                    placeholder="Nos conte brevemente por que gostaria de se juntar ao nosso time de voluntários."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-none text-slate-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-full font-bold text-sm shadow hover:shadow-lg transition-all cursor-pointer"
              >
                <Heart className="h-4 w-4 fill-white/20" />
                <span>Enviar Cadastro de Voluntário</span>
              </button>
            </form>
          )}

          {/* Form 2: Fale Conosco Mensagem */}
          {activeForm === 'contact' && (
            <form onSubmit={handleContactSubmit} className="space-y-6">
              {contactSuccess && (
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-blue-800 text-sm font-semibold flex items-center space-x-2 animate-in fade-in">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  <span>Sua mensagem foi enviada com sucesso! Responderemos em até 24 horas.</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Seu Nome *</label>
                  <input 
                    type="text" 
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData(p => ({ ...p, name: e.target.value }))}
                    placeholder="Ex: Roberto Carlos Oliveira"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">E-mail *</label>
                    <input 
                      type="email" 
                      required
                      value={contactData.email}
                      onChange={(e) => setContactData(p => ({ ...p, email: e.target.value }))}
                      placeholder="Ex: roberto@exemplo.com"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">WhatsApp (Opcional)</label>
                    <input 
                      type="tel" 
                      value={contactData.phone}
                      onChange={(e) => setContactData(p => ({ ...p, phone: e.target.value }))}
                      placeholder="Ex: (11) 97777-7777"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Assunto da Mensagem *</label>
                  <input 
                    type="text" 
                    required
                    value={contactData.subject}
                    onChange={(e) => setContactData(p => ({ ...p, subject: e.target.value }))}
                    placeholder="Ex: Dúvidas sobre Doações de Empresas / Parcerias"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Sua Mensagem *</label>
                  <textarea 
                    required
                    rows={4}
                    value={contactData.message}
                    onChange={(e) => setContactData(p => ({ ...p, message: e.target.value }))}
                    placeholder="Escreva sua mensagem com detalhes de como podemos te ajudar."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-none text-slate-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-full font-bold text-sm shadow hover:shadow-lg transition-all cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Volunteer Active Feed */}
      {existingVolunteers.length > 0 && (
        <section className="mt-16 space-y-4">
          <h3 className="text-slate-900 font-bold text-lg flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span>Voluntários Inscritos Nesta Sessão</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {existingVolunteers.map((vol) => (
              <div key={vol.id} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{vol.fullName}</h4>
                    <span className="text-[10px] font-medium text-blue-600 uppercase tracking-wider">Disponibilidade: {vol.availability}</span>
                  </div>
                  <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-100">
                    Inscrito(a)
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {vol.areasOfInterest.map((area, index) => (
                    <span key={index} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {area}
                    </span>
                  ))}
                </div>
                {vol.message && (
                  <p className="text-xs text-slate-500 leading-relaxed italic border-t border-slate-50 pt-2 mt-1">
                    "{vol.message}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
