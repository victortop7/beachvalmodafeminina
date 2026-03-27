import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';

export default function Contato() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: 'var(--gold)', fontFamily: 'var(--sans)', letterSpacing: '0.3em' }}
          >
            ✦ Fale conosco
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-light"
            style={{ fontFamily: 'var(--serif)' }}
          >
            Entre em <em className="gold-text not-italic">Contato</em>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: MessageCircle,
              title: 'WhatsApp',
              sub: 'Atendimento rápido',
              link: 'https://wa.me/5500000000000',
              label: 'Enviar mensagem',
              color: '#22c55e',
            },
            {
              icon: InstagramIcon,
              title: 'Instagram',
              sub: '@beach_valmodafeminina',
              link: 'https://www.instagram.com/beach_valmodafeminina/',
              label: 'Ver perfil',
              color: 'var(--gold)',
            },
          ].map((item, i) => (
            <motion.a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
              className="block p-10 rounded-2xl transition-all duration-300"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                textDecoration: 'none',
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                style={{ background: `${item.color}18`, border: `1px solid ${item.color}40` }}
              >
                <item.icon size={22} style={{ color: item.color }} />
              </div>
              <h3 className="text-2xl font-light mb-2" style={{ fontFamily: 'var(--serif)', color: 'var(--text)' }}>
                {item.title}
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
                {item.sub}
              </p>
              <span
                className="text-sm font-medium"
                style={{ color: item.color, fontFamily: 'var(--sans)' }}
              >
                {item.label} →
              </span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 p-8 rounded-2xl"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}>
            Horário de atendimento: Segunda a Sábado, das 9h às 20h
          </p>
        </motion.div>
      </div>
    </div>
  );
}
