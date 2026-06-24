import React from 'react';
import { Heart, Mail, Phone, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="bg-slate-900 text-slate-300 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleLinkClick('quem-somos')}>
              <div className="bg-blue-500/10 p-2 rounded-xl">
                <Heart className="h-5 w-5 text-blue-400 fill-blue-400/10" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Presença que Cura
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Organização sem fins lucrativos dedicada a garantir que nenhum paciente enfrente cirurgias e tratamentos de alta complexidade sozinho por falta de recursos financeiros da família na cidade de São Paulo.
            </p>
            <div className="flex items-center space-x-2 text-xs text-blue-400 font-medium bg-blue-950/40 border border-blue-900/50 px-3 py-1.5 rounded-lg w-max">
              <ShieldCheck className="h-4 w-4" />
              <span>Transparência 100% Auditada</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6">Explorar</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('quem-somos')}
                  className="hover:text-blue-400 transition-colors duration-200 cursor-pointer flex items-center group"
                >
                  Quem Somos
                  <ArrowUpRight className="h-3.5 w-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('projetos-andamento')}
                  className="hover:text-blue-400 transition-colors duration-200 cursor-pointer flex items-center group"
                >
                  Projetos em Andamento
                  <ArrowUpRight className="h-3.5 w-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('projetos-terminados')}
                  className="hover:text-blue-400 transition-colors duration-200 cursor-pointer flex items-center group"
                >
                  Projetos Concluídos
                  <ArrowUpRight className="h-3.5 w-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('apresente-caso')}
                  className="hover:text-blue-400 transition-colors duration-200 cursor-pointer flex items-center group"
                >
                  Apresente seu Caso
                  <ArrowUpRight className="h-3.5 w-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('fale-conosco')}
                  className="hover:text-blue-400 transition-colors duration-200 cursor-pointer flex items-center group"
                >
                  Fale Conosco & Voluntários
                  <ArrowUpRight className="h-3.5 w-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </li>
            </ul>
          </div>

          {/* Our Compromise */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6">Nosso Compromisso</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start space-x-2">
                <span className="text-blue-400 font-bold mr-1">•</span>
                <span>Nenhum percentual das campanhas é retido pela ONG.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-400 font-bold mr-1">•</span>
                <span>Arrecadação estritamente limitada ao orçamento de cada caso.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-400 font-bold mr-1">•</span>
                <span>Fundadores e diretores não são remunerados com recursos das doações.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-400 font-bold mr-1">•</span>
                <span>Despesas operacionais custeadas separadamente pelos fundadores.</span>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">Sede & Contato</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-slate-400">
                <MapPin className="h-5 w-5 text-blue-400 shrink-0" />
                <span>
                  São Paulo - SP, Brasil<br />
                  <span className="text-xs text-slate-500">Atendimento junto aos hospitais de referência do SUS</span>
                </span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <Mail className="h-5 w-5 text-blue-400 shrink-0" />
                <a href="mailto:contato@presencaquecura.org" className="hover:text-blue-400 transition-colors">
                  contato@presencaquecura.org
                </a>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <Phone className="h-5 w-5 text-blue-400 shrink-0" />
                <span>+55 (11) 98765-4321</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 text-center md:flex md:justify-between md:items-center text-xs text-slate-500">
          <p>
            &copy; {currentYear} Associação Presença que Cura. Todos os direitos reservados. CNPJ: 12.345.678/0001-99
          </p>
          <p className="mt-2 md:mt-0">
            Organização da Sociedade Civil (OSC) sem fins lucrativos.
          </p>
        </div>
      </div>
    </footer>
  );
}
