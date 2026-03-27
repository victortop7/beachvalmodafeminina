import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ChevronRight, CreditCard, Smartphone, Banknote, CheckCircle2, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatBRL } from '../lib/format';
import type { CheckoutFormData } from '../types';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmed';

function InputField({
  label, error, ...props
}: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        className="block text-xs uppercase tracking-widest mb-2"
        style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}
      >
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
        style={{
          background: 'var(--surface-alt)',
          border: error ? '1px solid #ef4444' : '1px solid var(--border)',
          color: 'var(--text)',
          fontFamily: 'var(--sans)',
        }}
        onFocus={e => { if (!error) (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'; }}
        onBlur={e => { if (!error) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
      />
      {error && <p className="text-xs mt-1" style={{ color: '#ef4444', fontFamily: 'var(--sans)' }}>{error}</p>}
    </div>
  );
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<Step>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit' | 'debit'>('pix');
  const [installments, setInstallments] = useState(1);
  const [processing, setProcessing] = useState(false);

  const shipping = total >= 300 ? 0 : 19.90;
  const finalTotal = total + shipping;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  if (items.length === 0 && step !== 'confirmed') {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-6">
        <p style={{ color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}>Sua sacola está vazia.</p>
        <Link to="/loja" className="text-sm" style={{ color: 'var(--gold)', fontFamily: 'var(--sans)' }}>
          Ir às compras →
        </Link>
      </div>
    );
  }

  const onSubmit = async () => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    setProcessing(false);
    setStep('confirmed');
    clearCart();
  };

  const steps = [
    { id: 'shipping', label: 'Entrega' },
    { id: 'payment', label: 'Pagamento' },
  ];

  if (step === 'confirmed') {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
          style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}
        >
          <CheckCircle2 size={40} style={{ color: '#22c55e' }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center max-w-md"
        >
          <h1 className="text-4xl font-light mb-4" style={{ fontFamily: 'var(--serif)' }}>
            Pedido <em className="gold-text not-italic">Confirmado!</em>
          </h1>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}>
            Obrigada pela sua compra! Em breve você receberá um e-mail com os detalhes do seu pedido.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/loja"
              className="px-8 py-4 rounded-full text-sm transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)',
                color: '#080808',
                fontFamily: 'var(--sans)',
                letterSpacing: '0.1em',
              }}
            >
              Continuar comprando
            </Link>
            <Link
              to="/"
              className="px-8 py-4 rounded-full text-sm transition-all duration-300"
              style={{
                border: '1px solid var(--border-gold)',
                color: 'var(--text-dim)',
                fontFamily: 'var(--sans)',
              }}
            >
              Voltar ao início
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-xs mb-8" style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
            Home
          </Link>
          <ChevronRight size={12} />
          <Link to="/loja" style={{ color: 'var(--text-muted)' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
            Loja
          </Link>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--text-dim)' }}>Checkout</span>
        </div>

        <h1 className="text-4xl font-light mb-8" style={{ fontFamily: 'var(--serif)' }}>
          Finalizar <em className="gold-text not-italic">Compra</em>
        </h1>

        {/* Steps */}
        <div className="flex items-center gap-3 mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs transition-all duration-300"
                style={{
                  background: step === s.id ? 'var(--gold-dim)' : 'var(--surface)',
                  border: step === s.id ? '1px solid var(--gold)' : '1px solid var(--border)',
                  color: step === s.id ? 'var(--gold)' : 'var(--text-muted)',
                  fontFamily: 'var(--sans)',
                }}
              >
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{
                    background: step === s.id ? 'var(--gold)' : 'var(--border)',
                    color: step === s.id ? '#080808' : 'var(--text-muted)',
                  }}
                >
                  {i + 1}
                </span>
                {s.label}
              </div>
              {i < steps.length - 1 && (
                <ChevronRight size={12} style={{ color: 'var(--text-muted)' }} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {step === 'shipping' && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-light mb-6" style={{ fontFamily: 'var(--serif)' }}>
                      Dados de Entrega
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Nome completo"
                        placeholder="Seu nome"
                        error={errors.name?.message}
                        {...register('name', { required: 'Nome obrigatório' })}
                      />
                      <InputField
                        label="E-mail"
                        type="email"
                        placeholder="seu@email.com"
                        error={errors.email?.message}
                        {...register('email', { required: 'E-mail obrigatório' })}
                      />
                      <InputField
                        label="Telefone / WhatsApp"
                        placeholder="(00) 00000-0000"
                        error={errors.phone?.message}
                        {...register('phone', { required: 'Telefone obrigatório' })}
                      />
                      <InputField
                        label="CEP"
                        placeholder="00000-000"
                        error={errors.cep?.message}
                        {...register('cep', { required: 'CEP obrigatório' })}
                      />
                    </div>
                    <InputField
                      label="Endereço"
                      placeholder="Rua, Avenida..."
                      error={errors.address?.message}
                      {...register('address', { required: 'Endereço obrigatório' })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="Número"
                        placeholder="123"
                        error={errors.number?.message}
                        {...register('number', { required: 'Número obrigatório' })}
                      />
                      <InputField
                        label="Complemento"
                        placeholder="Apto, Bloco... (opcional)"
                        {...register('complement')}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <InputField
                        label="Bairro"
                        placeholder="Bairro"
                        error={errors.neighborhood?.message}
                        {...register('neighborhood', { required: 'Bairro obrigatório' })}
                      />
                      <InputField
                        label="Cidade"
                        placeholder="Cidade"
                        error={errors.city?.message}
                        {...register('city', { required: 'Cidade obrigatória' })}
                      />
                      <InputField
                        label="Estado"
                        placeholder="SP"
                        error={errors.state?.message}
                        {...register('state', { required: 'Estado obrigatório' })}
                      />
                    </div>

                    <div className="pt-4">
                      <motion.button
                        type="button"
                        onClick={() => setStep('payment')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-4 rounded-full text-sm font-medium tracking-widest uppercase"
                        style={{
                          background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)',
                          color: '#080808',
                          fontFamily: 'var(--sans)',
                          letterSpacing: '0.15em',
                        }}
                      >
                        Continuar para pagamento →
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-light mb-6" style={{ fontFamily: 'var(--serif)' }}>
                      Forma de Pagamento
                    </h2>

                    {/* Payment methods */}
                    <div className="grid grid-cols-3 gap-3">
                      {([
                        { id: 'pix',    label: 'PIX',          icon: Smartphone, sub: '5% desconto' },
                        { id: 'credit', label: 'Crédito',      icon: CreditCard, sub: 'até 3x sem juros' },
                        { id: 'debit',  label: 'Débito',       icon: Banknote,   sub: 'à vista' },
                      ] as const).map(pm => (
                        <motion.button
                          key={pm.id}
                          type="button"
                          onClick={() => setPaymentMethod(pm.id)}
                          whileTap={{ scale: 0.96 }}
                          className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200"
                          style={{
                            background: paymentMethod === pm.id ? 'var(--gold-dim)' : 'var(--surface)',
                            border: paymentMethod === pm.id ? '1px solid var(--gold)' : '1px solid var(--border)',
                          }}
                        >
                          <pm.icon size={20} style={{ color: paymentMethod === pm.id ? 'var(--gold)' : 'var(--text-dim)' }} />
                          <span className="text-xs font-medium" style={{ color: paymentMethod === pm.id ? 'var(--gold)' : 'var(--text)', fontFamily: 'var(--sans)' }}>
                            {pm.label}
                          </span>
                          <span className="text-[10px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
                            {pm.sub}
                          </span>
                        </motion.button>
                      ))}
                    </div>

                    {/* PIX */}
                    <AnimatePresence mode="wait">
                      {paymentMethod === 'pix' && (
                        <motion.div
                          key="pix"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-6 rounded-xl text-center"
                          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                        >
                          <div
                            className="w-40 h-40 mx-auto mb-4 rounded-xl flex items-center justify-center"
                            style={{ background: 'var(--surface-alt)', border: '1px solid var(--border)' }}
                          >
                            <Smartphone size={48} style={{ color: 'var(--text-muted)' }} />
                          </div>
                          <p className="text-sm mb-2" style={{ color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}>
                            QR Code PIX gerado após confirmação
                          </p>
                          <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
                            Pagamento instantâneo com 5% de desconto
                          </p>
                          <p className="text-lg font-medium mt-3" style={{ color: 'var(--gold)', fontFamily: 'var(--mono)' }}>
                            {formatBRL(finalTotal * 0.95)}
                          </p>
                        </motion.div>
                      )}

                      {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                        <motion.div
                          key="card"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          <InputField
                            label="Número do cartão"
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                            {...register('cardNumber', { required: true })}
                          />
                          <InputField
                            label="Nome no cartão"
                            placeholder="NOME COMPLETO"
                            {...register('cardName', { required: true })}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <InputField
                              label="Validade"
                              placeholder="MM/AA"
                              maxLength={5}
                              {...register('cardExpiry', { required: true })}
                            />
                            <InputField
                              label="CVV"
                              placeholder="123"
                              maxLength={4}
                              type="password"
                              {...register('cardCvv', { required: true })}
                            />
                          </div>
                          {paymentMethod === 'credit' && (
                            <div>
                              <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
                                Parcelamento
                              </label>
                              <select
                                value={installments}
                                onChange={e => setInstallments(Number(e.target.value))}
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                style={{
                                  background: 'var(--surface-alt)',
                                  border: '1px solid var(--border)',
                                  color: 'var(--text)',
                                  fontFamily: 'var(--sans)',
                                }}
                              >
                                {[1, 2, 3].map(n => (
                                  <option key={n} value={n} style={{ background: '#1a1a1a' }}>
                                    {n === 1
                                      ? `À vista — ${formatBRL(finalTotal)}`
                                      : `${n}x de ${formatBRL(finalTotal / n)} sem juros`}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep('shipping')}
                        className="flex-1 py-4 rounded-full text-sm transition-all duration-200"
                        style={{ border: '1px solid var(--border)', color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}
                      >
                        ← Voltar
                      </button>
                      <motion.button
                        type="submit"
                        disabled={processing}
                        whileHover={{ scale: processing ? 1 : 1.02, boxShadow: '0 0 40px var(--gold-glow)' }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-2 flex-1 py-4 rounded-full text-sm font-medium tracking-widest uppercase flex items-center justify-center gap-2"
                        style={{
                          background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)',
                          color: '#080808',
                          fontFamily: 'var(--sans)',
                          letterSpacing: '0.12em',
                          opacity: processing ? 0.8 : 1,
                          cursor: processing ? 'wait' : 'pointer',
                        }}
                      >
                        <Lock size={14} />
                        {processing ? 'Processando...' : 'Confirmar pedido'}
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-2">
                      <Lock size={12} style={{ color: 'var(--text-muted)' }} />
                      <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
                        Pagamento 100% seguro e criptografado
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl p-6 sticky top-28"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <h3
                className="text-sm uppercase tracking-widest mb-6"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)', letterSpacing: '0.2em' }}
              >
                Resumo do pedido
              </h3>

              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <div
                      className="w-14 h-16 rounded-lg overflow-hidden flex-shrink-0"
                      style={{ border: '1px solid var(--border)' }}
                    >
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: 'var(--text)', fontFamily: 'var(--sans)' }}>
                        {item.product.name}
                      </p>
                      <p className="text-[11px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
                        {item.color} · {item.size} · x{item.quantity}
                      </p>
                      <p className="text-xs font-medium mt-1" style={{ color: 'var(--gold)', fontFamily: 'var(--mono)' }}>
                        {formatBRL(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="gold-line mb-4" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}>Subtotal</span>
                  <span style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>{formatBRL(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}>Frete</span>
                  <span style={{ color: shipping === 0 ? '#22c55e' : 'var(--text)', fontFamily: 'var(--mono)' }}>
                    {shipping === 0 ? 'Grátis' : formatBRL(shipping)}
                  </span>
                </div>
                {paymentMethod === 'pix' && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#22c55e', fontFamily: 'var(--sans)' }}>Desconto PIX (5%)</span>
                    <span style={{ color: '#22c55e', fontFamily: 'var(--mono)' }}>-{formatBRL(finalTotal * 0.05)}</span>
                  </div>
                )}
              </div>

              <div className="gold-line mt-4 mb-4" />

              <div className="flex justify-between">
                <span className="font-medium" style={{ color: 'var(--text)', fontFamily: 'var(--sans)' }}>Total</span>
                <span className="text-xl font-medium" style={{ color: 'var(--gold)', fontFamily: 'var(--mono)' }}>
                  {paymentMethod === 'pix' ? formatBRL(finalTotal * 0.95) : formatBRL(finalTotal)}
                </span>
              </div>

              {shipping === 0 && (
                <div
                  className="mt-4 px-3 py-2 rounded-lg text-xs text-center"
                  style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontFamily: 'var(--sans)' }}
                >
                  🎉 Você ganhou frete grátis!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
