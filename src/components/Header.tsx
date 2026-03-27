import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import InstagramIcon from './InstagramIcon';
import { asset } from '../lib/format';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openCart, count } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const links = [
    { to: '/',        label: 'Home' },
    { to: '/loja',    label: 'Loja' },
    { to: '/sobre',   label: 'Sobre' },
    { to: '/contato', label: 'Contato' },
  ];

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? 'rgba(5,5,5,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
        }}
        style={{
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : '1px solid transparent',
          transition: 'border-color 0.4s ease',
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="header-inner" style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={asset('logo.png')}
              alt="Beach Val"
              style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center" style={{ gap: '48px' }}>
            {links.map(link => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative group"
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '10px',
                    fontWeight: 400,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: active ? 'var(--gold)' : 'var(--text-dim)',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--text-dim)'; }}
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 block"
                    style={{ height: '1px', background: 'var(--gold)', width: '100%', originX: 0 }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: active ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/beach_valmodafeminina/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex transition-colors duration-300"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <InstagramIcon size={17} />
            </a>

            <button
              onClick={openCart}
              className="relative flex items-center transition-colors duration-300"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <ShoppingBag size={18} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                    style={{ background: 'var(--gold)', color: '#050505', fontFamily: 'var(--mono)' }}
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              className="md:hidden transition-colors duration-300"
              style={{ color: 'var(--text-dim)' }}
              onClick={() => setMenuOpen(v => !v)}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={menuOpen ? 'x' : 'menu'}
                  initial={{ opacity: 0, rotate: -10 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'rgba(5,5,5,0.98)', backdropFilter: 'blur(24px)' }}
          >
            <div className="flex-1 flex flex-col justify-center px-10">
              <img src={asset('logo.png')} alt="Beach Val" style={{ height: '44px', width: 'auto', objectFit: 'contain', marginBottom: '32px', opacity: 0.9 }} />
              <div className="gold-line mb-12" />
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    to={link.to}
                    className="block py-5"
                    style={{
                      fontFamily: 'var(--serif)',
                      fontStyle: 'italic',
                      fontSize: '42px',
                      fontWeight: 300,
                      color: location.pathname === link.to ? 'var(--gold)' : 'var(--text-dim)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {link.label}
                  </Link>
                  <div style={{ height: '1px', background: 'var(--border)', opacity: 0.5 }} />
                </motion.div>
              ))}
              <div className="gold-line mt-12" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
