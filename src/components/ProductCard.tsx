import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import type { Product } from '../types';
import { formatBRL } from '../lib/format';
import { useCart } from '../context/CartContext';

interface Props {
  product: Product;
  index?: number;
}

const badgeStyle: Record<string, { bg: string; color: string }> = {
  novo:            { bg: 'rgba(201,168,76,0.12)', color: 'var(--gold)' },
  exclusivo:       { bg: 'rgba(201,168,76,0.12)', color: 'var(--gold)' },
  'últimas peças': { bg: 'rgba(239,68,68,0.12)',  color: '#ef4444' },
};

export default function ProductCard({ product, index = 0 }: Props) {
  const [imgIdx, setImgIdx] = useState(0);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setAdded(true);
    addItem(product, product.sizes[0], product.colors[0]);
    setTimeout(() => setAdded(false), 1400);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: 'easeOut' }}
    >
      <Link to={`/produto/${product.id}`} className="block group">
        {/* Image container */}
        <div
          className="relative overflow-hidden mb-4"
          style={{ aspectRatio: '3/4', background: 'var(--surface-card)' }}
          onMouseEnter={() => product.images[1] && setImgIdx(1)}
          onMouseLeave={() => setImgIdx(0)}
        >
          <motion.img
            key={imgIdx}
            src={product.images[imgIdx]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Dark overlay on hover */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(5,5,5,0.5)' }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.badge && (
              <span
                className="px-3 py-1 text-[9px] font-medium tracking-widest uppercase"
                style={{
                  background: badgeStyle[product.badge]?.bg,
                  color: badgeStyle[product.badge]?.color,
                  border: `1px solid ${badgeStyle[product.badge]?.color}40`,
                  fontFamily: 'var(--sans)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {product.badge}
              </span>
            )}
            {discount && (
              <span
                className="px-3 py-1 text-[9px] font-medium tracking-widest"
                style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', fontFamily: 'var(--mono)' }}
              >
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <motion.button
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center"
            style={{
              background: 'rgba(5,5,5,0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
            }}
            onClick={e => { e.preventDefault(); e.stopPropagation(); setLiked(v => !v); }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              size={13}
              fill={liked ? 'var(--gold)' : 'none'}
              style={{ color: liked ? 'var(--gold)' : 'rgba(255,255,255,0.5)' }}
            />
          </motion.button>

          {/* Add to cart — reveals on hover */}
          <motion.button
            className="absolute bottom-0 left-0 right-0 py-4 flex items-center justify-center gap-2 text-[10px] font-medium tracking-widest uppercase"
            style={{
              background: added
                ? 'rgba(34,197,94,0.92)'
                : 'linear-gradient(135deg, rgba(201,168,76,0.96) 0%, rgba(232,201,106,0.96) 100%)',
              color: '#050505',
              fontFamily: 'var(--sans)',
              letterSpacing: '0.2em',
              backdropFilter: 'blur(4px)',
            }}
            initial={{ y: '100%' }}
            whileHover={{ y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={handleAdd}
          >
            <ShoppingBag size={12} />
            {added ? 'Adicionado ✓' : 'Adicionar'}
          </motion.button>
        </div>

        {/* Info */}
        <div className="px-0.5">
          <p
            className="text-sm font-light truncate mb-1"
            style={{
              color: 'var(--text)',
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontSize: '17px',
              letterSpacing: '0.01em',
            }}
          >
            {product.name}
          </p>
          <p
            className="text-[10px] mb-3 tracking-widest uppercase"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}
          >
            {product.sizes.join(' · ')}
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className="font-medium"
              style={{ color: 'var(--gold)', fontFamily: 'var(--mono)', fontSize: '14px' }}
            >
              {formatBRL(product.price)}
            </span>
            {product.originalPrice && (
              <span
                className="text-xs line-through"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}
              >
                {formatBRL(product.originalPrice)}
              </span>
            )}
          </div>
          <p
            className="text-[10px] mt-1"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}
          >
            3x{' '}
            <span style={{ fontFamily: 'var(--mono)' }}>
              {formatBRL(product.price / 3)}
            </span>{' '}
            sem juros
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
