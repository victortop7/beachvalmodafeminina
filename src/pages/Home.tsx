import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star, Truck, RefreshCw, Shield, Gem, Package, TrendingUp, Users } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getFeatured, products } from '../data/products';

const featured = getFeatured();

// todas as imagens dos produtos para o carrossel
const allProductImages = products.flatMap(p => p.images);

// ── Hero ─────────────────────────────────────────────────────────────
function Hero() {
  // divide as imagens em 3 colunas com offsets diferentes
  const col1 = allProductImages.filter((_, i) => i % 3 === 0);
  const col2 = allProductImages.filter((_, i) => i % 3 === 1);
  const col3 = allProductImages.filter((_, i) => i % 3 === 2);

  // triplicar para loop infinito
  const repeat = (arr: string[]) => [...arr, ...arr, ...arr];

  return (
    <section className="hero-split" style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      minHeight: '680px',
      overflow: 'hidden',
      background: '#050505',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    }}>
      {/* ── Lado esquerdo: texto ── */}
      <div className="hero-text" style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 64px',
        background: 'linear-gradient(to right, #050505 70%, rgba(5,5,5,0.0) 100%)',
      }}>
        {/* Linha dourada esquerda */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)',
          opacity: 0.4,
        }} />

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="section-label"
          style={{ marginBottom: '32px' }}
        >
          Coleção 2026
        </motion.div>

        <div style={{ overflow: 'hidden', marginBottom: '28px' }}>
          {[
            { text: 'Para',           gold: false },
            { text: 'Mulheres',       gold: true  },
            { text: 'que se Amam',    gold: false, goldWord: 'Amam' },
          ].map((line, i) => (
            <motion.div
              key={line.text}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.14, ease: 'easeOut' }}
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(52px, 6vw, 100px)',
                fontWeight: 300,
                lineHeight: 0.95,
                color: 'var(--text)',
                display: 'block',
                marginLeft: i === 1 ? '0.1em' : i === 2 ? '0.2em' : '0',
              }}
            >
              {line.goldWord === 'Amam' ? (
                <>que se <em className="gold-text not-italic">Amam</em></>
              ) : line.gold ? (
                <em className="gold-text not-italic">{line.text}</em>
              ) : (
                line.text
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '14px',
            fontWeight: 300,
            color: 'var(--text-dim)',
            lineHeight: 1.75,
            maxWidth: '340px',
            marginBottom: '40px',
          }}
        >
          Vestidos exclusivos em beach gloss com o charme da praia e a elegância que você merece sentir.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.25 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
        >
          <Link to="/loja" className="btn-gold">
            Ver Coleção <ArrowRight size={14} />
          </Link>
          <a href="#atacado" className="btn-outline">
            Seja Revendedora
          </a>
        </motion.div>
      </div>

      {/* ── Lado direito: carrossel de produtos ── */}
      <div className="hero-carousel" style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '6px',
      }}>
        {/* Gradiente esquerda para fundir com o texto */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '120px',
          background: 'linear-gradient(to right, #050505, transparent)',
          zIndex: 5,
          pointerEvents: 'none',
        }} />
        {/* Gradiente top/bottom */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '100px',
          background: 'linear-gradient(to bottom, #050505, transparent)',
          zIndex: 5,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '100px',
          background: 'linear-gradient(to top, #050505, transparent)',
          zIndex: 5,
          pointerEvents: 'none',
        }} />

        {/* Coluna 1 — sobe */}
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
          animate={{ y: ['0%', '-33.33%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          {repeat(col1).map((src, i) => (
            <img key={i} src={src} alt="" style={{
              width: '100%',
              aspectRatio: '3/4',
              objectFit: 'cover',
              display: 'block',
              flexShrink: 0,
            }} />
          ))}
        </motion.div>

        {/* Coluna 2 — desce (offset) */}
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '-40%' }}
          animate={{ y: ['-33.33%', '0%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          {repeat(col2).map((src, i) => (
            <img key={i} src={src} alt="" style={{
              width: '100%',
              aspectRatio: '3/4',
              objectFit: 'cover',
              display: 'block',
              flexShrink: 0,
            }} />
          ))}
        </motion.div>

        {/* Coluna 3 — sobe mais devagar */}
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '-20%' }}
          animate={{ y: ['0%', '-33.33%'] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        >
          {repeat(col3).map((src, i) => (
            <img key={i} src={src} alt="" style={{
              width: '100%',
              aspectRatio: '3/4',
              objectFit: 'cover',
              display: 'block',
              flexShrink: 0,
            }} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Marquee ───────────────────────────────────────────────────────────
function MarqueeStrip() {
  const items = ['Exclusividade', 'Elegância', 'Sofisticação', 'Empoderamento', 'Qualidade Premium', 'Coleção 2026'];
  const doubled = [...items, ...items];
  return (
    <div style={{
      overflow: 'hidden',
      padding: '18px 0',
      background: 'linear-gradient(90deg, #0d0b07, #13100a, #0d0b07)',
      borderTop: '1px solid var(--border-gold)',
      borderBottom: '1px solid var(--border-gold)',
    }}>
      <motion.div
        style={{ display: 'flex', gap: '48px', whiteSpace: 'nowrap' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '48px' }}>
            <span style={{
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontSize: '18px',
              color: 'var(--text-dim)',
              letterSpacing: '0.04em',
            }}>
              {item}
            </span>
            <span style={{ color: 'var(--gold)', fontSize: '8px', opacity: 0.6 }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Atacado / Seja Revendedora ─────────────────────────────────────────
function Atacado() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const beneficios = [
    { icon: Package,    title: 'Preço de Atacado',   sub: 'Descontos exclusivos a partir de 5 peças' },
    { icon: TrendingUp, title: 'Alto Lucro',          sub: 'Margem de lucro de até 60% por peça' },
    { icon: Users,      title: 'Suporte Completo',    sub: 'Fotos e materiais para divulgação' },
    { icon: Truck,      title: 'Envio Rápido',        sub: 'Entrega para todo o Brasil' },
  ];

  return (
    <section
      id="atacado"
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 0',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Glow dourado de fundo */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.07), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 64px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label"
            style={{ justifyContent: 'center', marginBottom: '24px' }}
          >
            Oportunidade de Negócio
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: '20px',
            }}
          >
            Abra seu negócio com a{' '}
            <em className="gold-text not-italic">Beach Val</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '15px',
              fontWeight: 300,
              color: 'var(--text-dim)',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.75,
            }}
          >
            Revenda os nossos vestidos em beach gloss e construa sua própria renda com uma marca que já tem identidade e cliente fiel.
          </motion.p>
        </div>

        {/* Benefícios */}
        <div className="atacado-grid grid-4" style={{ marginBottom: '64px' }}>
          {beneficios.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.3 + i * 0.1 }}
              style={{
                padding: '32px 28px',
                border: '1px solid var(--border)',
                background: 'var(--bg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-gold)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-gold)',
                background: 'var(--gold-dim)',
              }}>
                <b.icon size={18} color="var(--gold)" />
              </div>
              <p style={{
                fontFamily: 'var(--sans)',
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--text)',
              }}>
                {b.title}
              </p>
              <p style={{
                fontFamily: 'var(--sans)',
                fontSize: '13px',
                fontWeight: 300,
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}>
                {b.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ textAlign: 'center' }}
        >
          <a
            href="https://wa.me/5500000000000?text=Olá! Tenho interesse em comprar no atacado da Beach Val."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ fontSize: '12px', padding: '16px 48px' }}
          >
            Quero ser revendedora <ArrowRight size={14} />
          </a>
          <p style={{
            marginTop: '16px',
            fontFamily: 'var(--sans)',
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}>
            Fale com a gente pelo WhatsApp e saiba tudo sobre nossos preços de atacado
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ── Perks ─────────────────────────────────────────────────────────────
function Perks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const items = [
    { icon: Truck,     title: 'Frete Grátis',    sub: 'Acima de R$ 300' },
    { icon: RefreshCw, title: 'Troca Fácil',      sub: 'Em até 30 dias' },
    { icon: Shield,    title: 'Compra Segura',    sub: 'Pagamento protegido' },
    { icon: Gem,       title: 'Beach Gloss',      sub: 'Tecido exclusivo premium' },
  ];
  return (
    <section ref={ref} style={{ padding: '72px 0', borderBottom: '1px solid var(--border)' }}>
      <div className="page-pad" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="grid-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}
            >
              <div style={{
                width: '44px', height: '44px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--border-gold)',
                background: 'var(--gold-dim)',
              }}>
                <item.icon size={17} color="var(--gold)" />
              </div>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '15px', fontWeight: 500, color: 'var(--text)' }}>
                {item.title}
              </p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', fontWeight: 300, color: 'var(--text-muted)' }}>
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Featured ──────────────────────────────────────────────────────────
function Featured() {
  return (
    <section style={{ padding: '100px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 64px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '64px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="section-label"
              style={{ marginBottom: '20px' }}
            >
              Destaques
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(44px, 5vw, 68px)',
                fontWeight: 300,
                lineHeight: 1.05,
              }}
            >
              Peças da <em className="gold-text not-italic">Temporada</em>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link to="/loja" className="btn-outline">Ver tudo <ArrowRight size={13} /></Link>
          </motion.div>
        </div>
        <div className="grid-3">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────
const reviews = [
  { name: 'Ana Paula M.', text: 'O vestido chegou perfeito! A qualidade do tecido é incrível e o atendimento foi maravilhoso.' },
  { name: 'Carla S.',      text: 'Já é a terceira vez que compro da Beach Val. Cada peça é única e especial. Simplesmente apaixonada.' },
  { name: 'Fernanda R.',   text: 'Me senti uma deusa no casamento da minha amiga com esse vestido. Recomendo de olhos fechados!' },
];

function Testimonials() {
  return (
    <section style={{ padding: '100px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="section-label" style={{ justifyContent: 'center', marginBottom: '24px' }}>
            Depoimentos
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(42px, 5vw, 64px)', fontWeight: 300 }}>
            Quem usa, <em className="gold-text not-italic">ama</em>
          </motion.h2>
        </div>
        <div className="grid-3">
          {reviews.map((r, i) => (
            <motion.div key={r.name}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{ padding: '40px', background: 'var(--surface)', border: '1px solid var(--border)', position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: '20px', right: '28px', fontFamily: 'var(--serif)', fontSize: '72px', lineHeight: 1, color: 'var(--gold)', opacity: 0.08 }}>"</div>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
                {[1,2,3,4,5].map(j => <Star key={j} size={13} fill="var(--gold)" color="var(--gold)" />)}
              </div>
              <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '18px', color: 'var(--text-dim)', lineHeight: 1.75, marginBottom: '28px' }}>
                "{r.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '24px', height: '1px', background: 'var(--gold)', opacity: 0.4 }} />
                <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {r.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WhatsApp CTA ──────────────────────────────────────────────────────
function WhatsAppCTA() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '120px 0', background: 'var(--surface)' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.06), transparent)', pointerEvents: 'none' }} />
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '0 32px', position: 'relative', zIndex: 1 }}>
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '28px' }}>Atendimento Personalizado</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 62px)', fontWeight: 300, lineHeight: 1.1, marginBottom: '20px' }}>
          Tire suas dúvidas pelo <em className="gold-text not-italic">WhatsApp</em>
        </h2>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '15px', fontWeight: 300, color: 'var(--text-dim)', lineHeight: 1.75, marginBottom: '48px' }}>
          Nossa equipe está pronta para ajudar você a encontrar o vestido perfeito para cada ocasião.
        </p>
        <motion.a
          href="https://wa.me/5500000000000?text=Olá! Vi os vestidos da Beach Val e quero saber mais."
          target="_blank" rel="noopener noreferrer"
          className="btn-gold"
          whileHover={{ scale: 1.03, boxShadow: '0 12px 48px rgba(201,168,76,0.30)' }}
          whileTap={{ scale: 0.97 }}
        >
          Falar no WhatsApp <ArrowRight size={14} />
        </motion.a>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Atacado />
      <Perks />
      <Featured />
      <Testimonials />
      <WhatsAppCTA />
    </>
  );
}
