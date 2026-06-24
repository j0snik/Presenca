import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  X, Heart, CreditCard, ShieldCheck, CheckCircle2, Copy, 
  Clock, Landmark, Sparkles, Check, ChevronRight, HelpCircle
} from 'lucide-react';
import { Campaign } from '../types';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign | null; // If null, general fund donation
  onDonateSuccess: (campaignId: string | null, amount: number) => void;
}

export default function DonationModal({ isOpen, onClose, campaign, onDonateSuccess }: DonationModalProps) {
  const [step, setStep] = useState<'amount' | 'payment' | 'processing' | 'success'>('amount');
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [pixCopied, setPixCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown

  // Card Form State
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const predefinedAmounts = [30, 50, 100, 250];

  // Pix key generated mock
  const mockPixKey = "00020101021226830014br.gov.bcb.pix2561api.presencaquecura.org/v2/pix/donate/a87c12bc9031efb7";

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal is closed
      setStep('amount');
      setSelectedAmount(50);
      setCustomAmount('');
      setPaymentMethod('pix');
      setPixCopied(false);
      setTimeLeft(300);
      setCardData({ number: '', name: '', expiry: '', cvv: '' });
      return;
    }

    if (step === 'payment' && paymentMethod === 'pix') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, step, paymentMethod]);

  if (!isOpen) return null;

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(mockPixKey);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  const handleProceedToPayment = () => {
    if (customAmount && (isNaN(parseFloat(customAmount)) || parseFloat(customAmount) <= 0)) {
      alert('Por favor, insira um valor de doação válido maior que zero.');
      return;
    }
    setStep('payment');
  };

  const handleSimulatePayment = () => {
    setStep('processing');
    setTimeout(() => {
      onDonateSuccess(campaign ? campaign.id : null, finalAmount);
      setStep('success');
    }, 2000); // 2 seconds mock processing
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv) {
      alert('Por favor, preencha todos os campos do seu cartão de crédito.');
      return;
    }
    handleSimulatePayment();
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div id="donation-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-100 z-10"
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white flex justify-between items-center">
          <div className="flex items-center space-x-2.5">
            <div className="bg-white/20 p-2 rounded-xl">
              <Heart className="h-5 w-5 fill-white/20 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Doação de Amparo Solidário</h3>
              <p className="text-[11px] text-blue-100 mt-0.5 font-medium">
                {campaign ? `Apoio para ${campaign.companionName} (${campaign.patientName})` : "Fundo de Apoio Geral e Logístico"}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full cursor-pointer transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* STEP 1: AMOUNT SELECTION */}
          {step === 'amount' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="block text-xs font-bold text-slate-600 uppercase tracking-wider">Escolha o Valor do Apoio</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {predefinedAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                        selectedAmount === amt && !customAmount
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/15'
                          : 'bg-slate-50 border border-slate-200/60 text-slate-700 hover:bg-slate-100/50'
                      }`}
                    >
                      {formatCurrency(amt)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Value input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Ou digite outro valor (R$)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">R$</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    placeholder="Outro valor ex: 150"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl pl-10 pr-4 py-3 text-sm font-bold outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Campaign validation constraint visual */}
              {campaign && (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-start space-x-2.5">
                  <ShieldCheck className="h-4.5 w-4.5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-blue-800 leading-normal">
                    Este valor será creditado à meta de <strong>{formatCurrency(campaign.targetAmount)}</strong> do Lucas. Faltam exatamente <strong>{formatCurrency(campaign.targetAmount - campaign.raisedAmount)}</strong> para fechar e liquidar o caso.
                  </p>
                </div>
              )}

              {/* Quick info about zero-fee operation */}
              <div className="text-center text-xs text-slate-400">
                🔒 100% repassado ao caso. Taxas administrativas são cobertas pelos fundadores.
              </div>

              <button
                onClick={handleProceedToPayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-full font-bold text-sm shadow hover:shadow-lg transition-all flex items-center justify-center space-x-1 cursor-pointer"
              >
                <span>Escolher Método de Pagamento</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* STEP 2: PAYMENT METHOD & PAYMENT INFO */}
          {step === 'payment' && (
            <div className="space-y-6">
              {/* Selected summary */}
              <div className="bg-slate-50 rounded-2xl p-4 flex justify-between items-center text-sm border border-slate-100">
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-widest">Valor do Apoio</span>
                  <span className="text-lg font-black text-blue-700">{formatCurrency(finalAmount)}</span>
                </div>
                <button 
                  onClick={() => setStep('amount')}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Alterar valor
                </button>
              </div>

              {/* Tabs for payment method */}
              <div className="grid grid-cols-2 gap-3 border-b border-slate-100 pb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`py-3 rounded-2xl font-bold text-sm flex items-center justify-center space-x-1.5 cursor-pointer ${
                    paymentMethod === 'pix'
                      ? 'bg-blue-50 border-2 border-blue-500 text-blue-700'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100/40'
                  }`}
                >
                  <Landmark className="h-4 w-4" />
                  <span>Pix (Instantâneo)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-3 rounded-2xl font-bold text-sm flex items-center justify-center space-x-1.5 cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-blue-50 border-2 border-blue-500 text-blue-700'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100/40'
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Cartão de Crédito</span>
                </button>
              </div>

              {/* PIX SCREEN */}
              {paymentMethod === 'pix' && (
                <div className="space-y-5 text-center">
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-3xl flex flex-col items-center space-y-4">
                    {/* Simulated visual QR Code */}
                    <div className="h-44 w-44 bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-center relative shadow-inner">
                      {/* Grid representation of QR Code */}
                      <div className="grid grid-cols-4 gap-1.5 opacity-90">
                        <div className="h-7 w-7 border-4 border-slate-900 bg-white"></div>
                        <div className="h-7 w-7 bg-slate-900"></div>
                        <div className="h-7 w-7 bg-slate-900"></div>
                        <div className="h-7 w-7 border-4 border-slate-900 bg-white"></div>
                        <div className="h-7 w-7 bg-slate-900"></div>
                        <div className="h-7 w-7 border-4 border-slate-900 bg-white p-1"><div className="bg-slate-900 h-full w-full"></div></div>
                        <div className="h-7 w-7 bg-slate-900"></div>
                        <div className="h-7 w-7 bg-slate-900"></div>
                        <div className="h-7 w-7 bg-slate-900"></div>
                        <div className="h-7 w-7 bg-slate-900"></div>
                        <div className="h-7 w-7 border-4 border-slate-900 bg-white p-1"><div className="bg-slate-900 h-full w-full"></div></div>
                        <div className="h-7 w-7 bg-slate-900"></div>
                        <div className="h-7 w-7 border-4 border-slate-900 bg-white"></div>
                        <div className="h-7 w-7 bg-slate-900"></div>
                        <div className="h-7 w-7 bg-slate-900"></div>
                        <div className="h-7 w-7 border-4 border-slate-900 bg-white"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-white/20">
                        <div className="bg-blue-600 p-2 rounded-xl text-white shadow animate-pulse">
                          <Heart className="h-4 w-4 fill-white/10" />
                        </div>
                      </div>
                    </div>

                    {/* Timer */}
                    <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 bg-slate-200/40 px-3 py-1.5 rounded-full">
                      <Clock className="h-3.5 w-3.5 text-rose-500" />
                      <span>Expira em: <strong className="text-slate-800 font-bold">{formatTime(timeLeft)}</strong></span>
                    </div>

                    <div className="text-xs text-slate-500 leading-normal max-w-sm">
                      Abra o aplicativo de pagamentos ou do seu banco, escolha a opção "Pagar com Pix" ou "Pix Copia e Cola" e escaneie o código acima.
                    </div>
                  </div>

                  {/* Copy button */}
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="w-full flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-full text-xs font-bold transition-all cursor-pointer"
                    >
                      {pixCopied ? <Check className="h-4 w-4 text-blue-600" /> : <Copy className="h-4 w-4" />}
                      <span>{pixCopied ? "Código Copiado!" : "Copiar Chave Pix Copia e Cola"}</span>
                    </button>
                  </div>

                  {/* Sandbox confirmation button */}
                  <div className="border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={handleSimulatePayment}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-bold text-xs flex items-center justify-center space-x-1 cursor-pointer shadow hover:shadow-blue-600/10"
                    >
                      <Sparkles className="h-4 w-4 fill-white/20 animate-bounce" />
                      <span>Simular Pagamento Pago</span>
                    </button>
                    <span className="block text-[10px] text-slate-400 mt-1">* Clique para simular o recebimento do PIX pelo banco parceiro</span>
                  </div>
                </div>
              )}

              {/* CARD CREDIT SCREEN */}
              {paymentMethod === 'card' && (
                <form onSubmit={handleCardSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Número do Cartão *</label>
                    <input
                      type="text"
                      required
                      placeholder="0000 0000 0000 0000"
                      value={cardData.number}
                      onChange={(e) => setCardData(p => ({ ...p, number: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Nome Impresso no Cartão *</label>
                    <input
                      type="text"
                      required
                      placeholder="EX: MARIA S SILVA"
                      value={cardData.name}
                      onChange={(e) => setCardData(p => ({ ...p, name: e.target.value.toUpperCase() }))}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm font-semibold uppercase outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Validade *</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/AA"
                        value={cardData.expiry}
                        onChange={(e) => setCardData(p => ({ ...p, expiry: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm font-semibold text-center outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">CVV *</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={(e) => setCardData(p => ({ ...p, cvv: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm font-semibold text-center outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-full font-bold text-sm shadow hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer mt-6"
                  >
                    <ShieldCheck className="h-5 w-5" />
                    <span>Concluir Doação Segura</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* STEP 3: PROCESSING LOADER */}
          {step === 'processing' && (
            <div className="py-12 text-center space-y-4 flex flex-col items-center">
              <div className="h-12 w-12 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin"></div>
              <h4 className="font-bold text-slate-800 text-base">Processando sua Doação...</h4>
              <p className="text-xs text-slate-500">Estamos comunicando com a instituição financeira e validando as credenciais de segurança.</p>
            </div>
          )}

          {/* STEP 4: SUCCESS RECEIPT */}
          {step === 'success' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center space-y-6 flex flex-col items-center"
            >
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-2xl font-black text-slate-900">Apoio Concluído!</h3>
                <p className="text-sm text-slate-500 max-w-sm leading-normal">
                  Seu apoio financeiro de <strong>{formatCurrency(finalAmount)}</strong> foi processado e já foi creditado ao caso do paciente!
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 w-full text-left space-y-3 text-xs sm:text-sm">
                <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Recibo do Doador</h4>
                <div className="space-y-2 font-medium">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Transação ID:</span>
                    <span className="font-mono text-slate-900 font-bold">TX_DON_{Date.now().toString().slice(-8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Beneficiário:</span>
                    <span className="text-slate-900 font-bold">Presença que Cura (ONG)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Destinação:</span>
                    <span className="text-blue-700 font-bold">
                      {campaign ? `Campanha Lucas / Lucas Silva` : "Fundo de Apoio Geral e Emergencial"}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200/80 pt-2 text-slate-900 font-extrabold">
                    <span>Valor Pago:</span>
                    <span>{formatCurrency(finalAmount)}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-normal max-w-sm">
                Agradecemos profundamente pela sua solidariedade. Você acabou de garantir que um paciente de cirurgia de alta complexidade tenha seu cuidador de perto!
              </p>

              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-sm shadow transition-colors cursor-pointer"
              >
                Voltar ao Portal
              </button>
            </motion.div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
