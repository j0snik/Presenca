import React, { useState } from 'react';
import { Heart, Menu, X, Landmark, Users } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenGeneralDonation: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenGeneralDonation }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'quem-somos', label: 'Quem Somos' },
    { id: 'projetos-andamento', label: 'Projetos em Andamento' },
    { id: 'projetos-terminados', label: 'Projetos Concluídos' },
    { id: 'apresente-caso', label: 'Apresente seu Caso' },
    { id: 'fale-conosco', label: 'Fale Conosco & Voluntariado' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
    // Smooth scroll to top of viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="app-header" className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            id="header-logo" 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('quem-somos')}
          >
            <div className="bg-blue-50 p-2.5 rounded-2xl group-hover:bg-blue-100 transition-colors duration-300">
              <Heart className="h-6 w-6 text-blue-600 fill-blue-500/10 group-hover:fill-blue-500/20 group-hover:scale-105 transition-all duration-300" />
            </div>
            <div>
              <span className="block text-lg font-bold text-slate-900 tracking-tight leading-tight">
                Presença que Cura
              </span>
              <span className="block text-[11px] font-bold tracking-widest uppercase text-blue-600">
                Apoio a Acompanhantes
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-xl text-[14px] font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              id="header-donate-btn"
              onClick={onOpenGeneralDonation}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer active:scale-95"
            >
              <Heart className="h-4 w-4 fill-white/20 animate-pulse" />
              <span>Doar Agora</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onOpenGeneralDonation}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl text-sm shadow-sm cursor-pointer mr-1"
              title="Doar Agora"
            >
              <Heart className="h-4 w-4 fill-white/20" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors duration-200 cursor-pointer"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div id="mobile-nav-panel" className="lg:hidden border-t border-slate-200 bg-white shadow-inner animate-in fade-in duration-200">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-btn-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-slate-200">
              <button
                id="mobile-donate-btn"
                onClick={() => {
                  onOpenGeneralDonation();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-full font-medium shadow-sm cursor-pointer"
              >
                <Heart className="h-4 w-4 fill-white/20" />
                <span>Quero Doar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
