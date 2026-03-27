import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight, Heart, Share2 } from 'lucide-react';
import { getById, products } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatBRL } from '../lib/format';
import ProductCard from '../components/ProductCard';

export default function Produto() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();

  const product = id ? getById(id) : null;
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [adding, setAdding] = useState(false);
  const [liked, setLiked] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);

  const related = products.filter(p => p.id !== id).slice(0, 3);

  if (!product) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
        <p style={{ color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}>Produto não encontrado.</p>
        <Link to="/loja" style={{ color: 'var(--gold)', fontFamily: 'var(--sans)', fontSize: '14px' }}>← Voltar à loja</Link>
      </div>
    );
  }

  const handleAdd = () => {
    if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 2500); return; }
    if (!selectedColor) { setColorError(true); setTimeout(() => setColorError(false), 2500); return; }
    setAdding(true);
    addItem(product, selectedSize, selectedColor);
    setTimeout(() => setAdding(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div style={{ paddingTop: '96px', minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Breadcrumb */}
      <div className="page-pad" style={{ maxWidth: '1280px', margin: '0 auto', paddingTop: '24px', paddingBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--sans)', fontSize: '12px', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
            Home
          </Link>
          <ChevronRight size={12} />
          <Link to="/loja" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
            Loja
          </Link>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--text-dim)' }}>{product.name}</span>
        </div>
      </div>

      {/* Produto */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 64px 100px' }}>
        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

          {/* ── Imagens ── */}
          <div className="product-sticky" style={{ display: 'flex', gap: '16px', position: 'sticky', top: '112px' }}>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '72px', flexShrink: 0 }}>
                {product.images.map((img, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    whileHover={{ scale: 1.04 }}
                    style={{
                      width: '72px',
                      height: '88px',
                      overflow: 'hidden',
                      border: selectedImg === i ? '2px solid var(--gold)' : '1px solid var(--border)',
                      cursor: 'pointer',
                      padding: 0,
                      background: 'none',
                      opacity: selectedImg === i ? 1 : 0.55,
                      transition: 'all 0.2s',
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Imagem principal */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'var(--surface-card)' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImg}
                  src={product.images[selectedImg]}
                  alt={product.name}
                  style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                />
              </AnimatePresence>

              {/* Badge */}
              {product.badge && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  padding: '6px 14px',
                  background: 'rgba(201,168,76,0.15)',
                  border: '1px solid rgba(201,168,76,0.4)',
                  color: 'var(--gold)',
                  fontFamily: 'var(--sans)',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  backdropFilter: 'blur(8px)',
                }}>
                  {product.badge}
                </div>
              )}
            </div>
          </div>

          {/* ── Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ paddingTop: '8px' }}
          >
            {/* Topo: nome + ações */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
              <div>
                <p style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '10px',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '10px',
                }}>
                  Vestido · Beach Gloss
                </p>
                <h1 style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(28px, 3vw, 42px)',
                  fontWeight: 300,
                  lineHeight: 1.15,
                  color: 'var(--text)',
                }}>
                  {product.name}
                </h1>
              </div>
              <div style={{ display: 'flex', gap: '10px', paddingTop: '4px' }}>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setLiked(v => !v)}
                  style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer' }}>
                  <Heart size={15} fill={liked ? 'var(--gold)' : 'none'} color={liked ? 'var(--gold)' : 'var(--text-dim)'} />
                </motion.button>
                <motion.button whileTap={{ scale: 0.9 }}
                  style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer' }}>
                  <Share2 size={15} color="var(--text-dim)" />
                </motion.button>
              </div>
            </div>

            {/* Preço */}
            <div style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '32px', fontWeight: 500, color: 'var(--gold)' }}>
                  {formatBRL(product.price)}
                </span>
                {product.originalPrice && (
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '16px', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                    {formatBRL(product.originalPrice)}
                  </span>
                )}
                {discount && (
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', padding: '3px 10px', background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}>
                    -{discount}%
                  </span>
                )}
              </div>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', fontWeight: 300, color: 'var(--text-muted)' }}>
                ou 3x de <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-dim)' }}>{formatBRL(product.price / 3)}</span> sem juros no cartão
              </p>
            </div>

            {/* Cor */}
            <div style={{ marginBottom: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Cor{selectedColor && <span style={{ marginLeft: '10px', color: 'var(--text-dim)', textTransform: 'none', letterSpacing: 'normal' }}>— {selectedColor}</span>}
                </p>
                {colorError && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: '#ef4444' }}>
                    Selecione uma cor
                  </motion.p>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {product.colors.map(color => (
                  <motion.button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '10px 22px',
                      fontFamily: 'var(--sans)',
                      fontSize: '13px',
                      cursor: 'pointer',
                      background: selectedColor === color ? 'var(--gold-dim)' : 'transparent',
                      border: selectedColor === color ? '1px solid var(--gold)' : '1px solid var(--border)',
                      color: selectedColor === color ? 'var(--gold)' : 'var(--text-dim)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {color}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tamanho */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Tamanho{selectedSize && <span style={{ marginLeft: '10px', color: 'var(--text-dim)', textTransform: 'none', letterSpacing: 'normal' }}>— {selectedSize}</span>}
                </p>
                {sizeError && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: '#ef4444' }}>
                    Selecione um tamanho
                  </motion.p>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {product.sizes.map(size => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    whileTap={{ scale: 0.93 }}
                    style={{
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--mono)',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      background: selectedSize === size ? 'var(--gold)' : 'transparent',
                      border: selectedSize === size ? '1px solid var(--gold)' : '1px solid var(--border)',
                      color: selectedSize === size ? '#050505' : 'var(--text-dim)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Botões CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
              <motion.button
                onClick={handleAdd}
                whileHover={{ boxShadow: adding ? 'none' : '0 8px 40px rgba(201,168,76,0.30)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '18px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  fontFamily: 'var(--sans)',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  border: 'none',
                  background: adding
                    ? 'linear-gradient(135deg, #16a34a, #22c55e)'
                    : 'linear-gradient(135deg, #A8882A 0%, var(--gold) 40%, var(--gold-light) 60%, var(--gold) 80%, #A8882A 100%)',
                  backgroundSize: '200% auto',
                  color: '#050505',
                  transition: 'background 0.4s ease',
                }}
              >
                <ShoppingBag size={16} />
                {adding ? 'Adicionado à sacola ✓' : 'Adicionar à Sacola'}
              </motion.button>

              <a
                href={`https://wa.me/5500000000000?text=Olá! Tenho interesse no ${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  padding: '17px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  fontFamily: 'var(--sans)',
                  fontSize: '12px',
                  fontWeight: 400,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  border: '1px solid var(--border-gold)',
                  background: 'transparent',
                  color: 'var(--text-dim)',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--gold-dim)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-gold)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-dim)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                Tirar dúvidas no WhatsApp
              </a>
            </div>

            {/* Accordion detalhes */}
            <div style={{ borderTop: '1px solid var(--border)' }}>
              {[
                { label: 'Descrição', content: product.description },
                { label: 'Material', content: product.material },
                { label: 'Entrega & Trocas', content: '🚚 Frete grátis para compras acima de R$ 300\n🔄 Troca em até 30 dias após o recebimento\n📦 Prazo de entrega: 5 a 10 dias úteis' },
              ].map(item => (
                <details key={item.label} style={{ borderBottom: '1px solid var(--border)' }}>
                  <summary style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 0',
                    cursor: 'pointer',
                    fontFamily: 'var(--sans)',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: 'var(--text)',
                    letterSpacing: '0.03em',
                    listStyle: 'none',
                  }}>
                    {item.label}
                    <ChevronRight size={14} color="var(--text-muted)" />
                  </summary>
                  <p style={{
                    paddingBottom: '20px',
                    fontFamily: 'var(--sans)',
                    fontSize: '14px',
                    fontWeight: 300,
                    color: 'var(--text-dim)',
                    lineHeight: 1.75,
                    whiteSpace: 'pre-line',
                  }}>
                    {item.content}
                  </p>
                </details>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Produtos relacionados */}
        <div style={{ marginTop: '100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="section-label" style={{ justifyContent: 'center', marginBottom: '20px' }}>Continue explorando</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 300 }}>
              Você também pode <em className="gold-text not-italic">gostar</em>
            </h2>
          </div>
          <div className="grid-3">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
