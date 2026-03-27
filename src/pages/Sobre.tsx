import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Sobre() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(8,8,8,0.75)' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs tracking-widest uppercase mb-6"
            style={{ color: 'var(--gold)', fontFamily: 'var(--sans)', letterSpacing: '0.3em' }}
          >
            ✦ Nossa história
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-light mb-6"
            style={{ fontFamily: 'var(--serif)' }}
          >
            Feito com <em className="gold-text not-italic">amor</em>,
            <br />para você brilhar
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-xs tracking-widest uppercase mb-6"
              style={{ color: 'var(--gold)', fontFamily: 'var(--sans)', letterSpacing: '0.3em' }}
            >
              ✦ Quem somos
            </p>
            <h2 className="text-4xl font-light mb-6" style={{ fontFamily: 'var(--serif)' }}>
              Beach Val nasceu do amor pela moda e pela mulher brasileira
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}>
              <p>
                Somos uma marca de moda feminina especializada em vestidos que unem a leveza da praia com a elegância que toda mulher merece sentir.
              </p>
              <p>
                Cada peça é cuidadosamente desenvolvida com tecidos premium selecionados, pensando no conforto, no caimento e na beleza de quem vai usar.
              </p>
              <p>
                Acreditamos que a moda é uma forma de expressão e que o vestido certo pode transformar um dia comum em algo especial.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80"
              alt="Beach Val"
              className="w-full aspect-[4/5] object-cover rounded-2xl"
              style={{ border: '1px solid var(--border)' }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl"
              style={{ background: 'var(--gold-dim)', border: '1px solid var(--border-gold)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--gold)', fontFamily: 'var(--sans)', letterSpacing: '0.3em' }}>
              ✦ Nossos valores
            </p>
            <h2 className="text-4xl font-light" style={{ fontFamily: 'var(--serif)' }}>
              O que nos move
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Qualidade', text: 'Tecidos premium e acabamentos impecáveis em cada peça.' },
              { title: 'Exclusividade', text: 'Modelos únicos que você não encontra em outro lugar.' },
              { title: 'Empoderamento', text: 'Roupas que fazem você se sentir linda e poderosa.' },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl"
                style={{ border: '1px solid var(--border)' }}
              >
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'var(--gold-dim)', border: '1px solid var(--border-gold)' }}
                >
                  <span className="gold-text text-lg font-bold" style={{ fontFamily: 'var(--serif)' }}>
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-xl font-light mb-3" style={{ fontFamily: 'var(--serif)' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}>
                  {v.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-light mb-6" style={{ fontFamily: 'var(--serif)' }}>
            Pronta para encontrar seu vestido <em className="gold-text not-italic">perfeito</em>?
          </h2>
          <Link
            to="/loja"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-sm font-medium tracking-widest uppercase"
            style={{
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)',
              color: '#080808',
              fontFamily: 'var(--sans)',
              letterSpacing: '0.15em',
            }}
          >
            Ver Coleção <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
