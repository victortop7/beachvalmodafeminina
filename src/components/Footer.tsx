import { MessageCircle, MapPin } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { Link } from 'react-router-dom';
import { asset } from '../lib/format';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <img
                src={asset('logo.png')}
                alt="Beach Val"
                style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs font-light"
              style={{ color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}
            >
              Vestidos exclusivos para mulheres que se amam. Cada peça é pensada para realçar sua beleza e confiança.
            </p>
            <div className="flex items-center gap-4 mt-8">
              {[
                { href: 'https://www.instagram.com/beach_valmodafeminina/', icon: <InstagramIcon size={15} /> },
                { href: 'https://wa.me/5500000000000', icon: <MessageCircle size={15} /> },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center transition-all duration-300"
                  style={{ border: '1px solid var(--border-gold)', color: 'var(--text-muted)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
                    (e.currentTarget as HTMLElement).style.background = 'var(--gold-dim)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-gold)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-6"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}
            >
              Navegação
            </p>
            <ul className="space-y-3">
              {[
                { to: '/loja',    label: 'Loja' },
                { to: '/sobre',   label: 'Sobre nós' },
                { to: '/contato', label: 'Contato' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors duration-200 font-light"
                    style={{ color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-6"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}
            >
              Contato
            </p>
            <ul className="space-y-4">
              {[
                { icon: <MessageCircle size={13} />, text: 'WhatsApp disponível' },
                { icon: <InstagramIcon size={13} />, text: '@beach_valmodafeminina' },
                { icon: <MapPin size={13} />,         text: 'Brasil' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span style={{ color: 'var(--gold)' }}>{item.icon}</span>
                  <span className="text-sm font-light" style={{ color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gold-line mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-[11px]"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}
          >
            © 2026 Beach Val Moda Feminina. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-8">
            {['Política de Privacidade', 'Trocas e Devoluções', 'Termos de Uso'].map(item => (
              <a
                key={item}
                href="#"
                className="text-[11px] transition-colors duration-200"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
