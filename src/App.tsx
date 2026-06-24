import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import SubmitCase from './components/SubmitCase';
import OngoingProjects from './components/OngoingProjects';
import FinishedProjects from './components/FinishedProjects';
import ContactUs from './components/ContactUs';
import DonationModal from './components/DonationModal';

import { Campaign, CaseSubmission, VolunteerSubmission, ContactMessage } from './types';
import { initialCampaigns } from './initialData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('quem-somos');
  
  // Core state synced with localStorage
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem('pqcura_campaigns');
    return saved ? JSON.parse(saved) : initialCampaigns;
  });

  const [caseSubmissions, setCaseSubmissions] = useState<CaseSubmission[]>(() => {
    const saved = localStorage.getItem('pqcura_cases');
    return saved ? JSON.parse(saved) : [];
  });

  const [volunteerSubmissions, setVolunteerSubmissions] = useState<VolunteerSubmission[]>(() => {
    const saved = localStorage.getItem('pqcura_volunteers');
    return saved ? JSON.parse(saved) : [];
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('pqcura_contacts');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal control
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedCampaignForDonation, setSelectedCampaignForDonation] = useState<Campaign | null>(null);

  // Sync state to localStorage on changes
  useEffect(() => {
    localStorage.setItem('pqcura_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('pqcura_cases', JSON.stringify(caseSubmissions));
  }, [caseSubmissions]);

  useEffect(() => {
    localStorage.setItem('pqcura_volunteers', JSON.stringify(volunteerSubmissions));
  }, [volunteerSubmissions]);

  useEffect(() => {
    localStorage.setItem('pqcura_contacts', JSON.stringify(contactMessages));
  }, [contactMessages]);

  // Operations
  const handleOpenGeneralDonation = () => {
    setSelectedCampaignForDonation(null);
    setIsDonationModalOpen(true);
  };

  const handleOpenSpecificDonation = (campaign: Campaign) => {
    setSelectedCampaignForDonation(campaign);
    setIsDonationModalOpen(true);
  };

  const handleDonateSuccess = (campaignId: string | null, amount: number) => {
    if (!campaignId) {
      // General fund donation success, can log or show success
      console.log(`Donated ${amount} to general fund.`);
      return;
    }

    setCampaigns(prevCampaigns => 
      prevCampaigns.map(c => {
        if (c.id === campaignId) {
          const updatedRaised = c.raisedAmount + amount;
          const isCompleted = updatedRaised >= c.targetAmount;
          
          return {
            ...c,
            raisedAmount: Math.min(c.targetAmount, updatedRaised),
            // If campaign is fully funded, mark as completed
            status: isCompleted ? 'completed' : 'active',
            thankYouMessage: isCompleted 
              ? `Muito obrigado a todos os doadores! A meta de custo foi 100% atingida. Nossa família agradece de coração por nos darem dignidade para acompanhar o tratamento de nosso querido ${c.patientName}.`
              : c.thankYouMessage
          };
        }
        return c;
      })
    );
  };

  const handleCaseSubmitted = (newCase: CaseSubmission) => {
    setCaseSubmissions(prev => [newCase, ...prev]);
  };

  const handleVolunteerRegister = (newVolunteer: VolunteerSubmission) => {
    setVolunteerSubmissions(prev => [newVolunteer, ...prev]);
  };

  const handleContactSubmit = (newMessage: ContactMessage) => {
    setContactMessages(prev => [newMessage, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50/30 flex flex-col justify-between font-sans antialiased text-zinc-800">
      
      {/* Universal Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenGeneralDonation={handleOpenGeneralDonation}
      />

      {/* Main Screen Layout Switcher */}
      <main className="flex-grow py-8 sm:py-12">
        {activeTab === 'quem-somos' && (
          <div className="space-y-16 sm:space-y-24">
            {/* Hero welcome screen */}
            <Hero 
              onDonateClick={() => setActiveTab('projetos-andamento')} 
              onApplyClick={() => setActiveTab('apresente-caso')} 
            />
            {/* Extended editorial About Us segment */}
            <div className="max-w-7xl mx-auto">
              <AboutUs />
            </div>
          </div>
        )}

        {activeTab === 'projetos-andamento' && (
          <div className="max-w-7xl mx-auto">
            <OngoingProjects 
              campaigns={campaigns} 
              onDonateClick={handleOpenSpecificDonation}
            />
          </div>
        )}

        {activeTab === 'projetos-terminados' && (
          <div className="max-w-7xl mx-auto">
            <FinishedProjects 
              campaigns={campaigns} 
            />
          </div>
        )}

        {activeTab === 'apresente-caso' && (
          <div className="max-w-7xl mx-auto">
            <SubmitCase 
              onCaseSubmitted={handleCaseSubmitted}
              existingSubmissions={caseSubmissions}
            />
          </div>
        )}

        {activeTab === 'fale-conosco' && (
          <div className="max-w-7xl mx-auto">
            <ContactUs 
              onVolunteerRegister={handleVolunteerRegister}
              onContactSubmit={handleContactSubmit}
              existingVolunteers={volunteerSubmissions}
            />
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Interactive Checkout/Donation Modal */}
      <DonationModal 
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        campaign={selectedCampaignForDonation}
        onDonateSuccess={handleDonateSuccess}
      />

    </div>
  );
}
