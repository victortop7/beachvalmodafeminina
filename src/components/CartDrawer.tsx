import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatBRL } from '../lib/format';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, count } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col w-full max-w-md"
            style={{ background: 'var(--surface)', borderLeft: '1px solid var(--border-gold)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} style={{ color: 'var(--gold)' }} />
                <span
                  className="text-sm tracking-widest uppercase"
                  style={{ fontFamily: 'var(--sans)', color: 'var(--text-dim)', letterSpacing: '0.15em' }}
                >
                  Sacola
                </span>
                {count > 0 && (
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: 'var(--gold-dim)', color: 'var(--gold)' }}
                  >
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="transition-colors duration-200 rounded-full p-1"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 gap-4"
                  >
                    <ShoppingBag size={40} style={{ color: 'var(--text-muted)' }} />
                    <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
                      Sua sacola está vazia
                    </p>
                    <Link
                      to="/loja"
                      onClick={closeCart}
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'var(--gold)' }}
                    >
                      Ver coleção →
                    </Link>
                  </motion.div>
                ) : (
                  items.map(item => (
                    <motion.div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0, paddingBottom: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-4 pb-4"
                      style={{ borderBottom: '1px solid var(--border)' }}
                    >
                      <div
                        className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0"
                        style={{ border: '1px solid var(--border)' }}
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-medium truncate"
                          style={{ color: 'var(--text)', fontFamily: 'var(--sans)' }}
                        >
                          {item.product.name}
                        </p>
                        <p
                          className="text-xs mt-1"
                          style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}
                        >
                          {item.color} · Tam {item.size}
                        </p>
                        <p
                          className="text-sm font-medium mt-1"
                          style={{ color: 'var(--gold)', fontFamily: 'var(--mono)' }}
                        >
                          {formatBRL(item.product.price)}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div
                            className="flex items-center rounded-full overflow-hidden"
                            style={{ border: '1px solid var(--border)', background: 'var(--surface-alt)' }}
                          >
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                              className="px-2.5 py-1.5 transition-colors duration-200"
                              style={{ color: 'var(--text-dim)' }}
                            >
                              <Minus size={12} />
                            </button>
                            <span
                              className="px-3 text-sm"
                              style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                              className="px-2.5 py-1.5 transition-colors duration-200"
                              style={{ color: 'var(--text-dim)' }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.size, item.color)}
                            className="transition-colors duration-200"
                            style={{ color: 'var(--text-muted)' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm" style={{ color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}>
                    Subtotal
                  </span>
                  <span className="font-medium" style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>
                    {formatBRL(total)}
                  </span>
                </div>
                <p className="text-xs mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
                  Frete calculado no checkout
                </p>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)',
                    color: '#080808',
                    fontFamily: 'var(--sans)',
                    letterSpacing: '0.15em',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                >
                  Finalizar Compra
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
