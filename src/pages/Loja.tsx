import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const sizes = ['PP', 'P', 'M', 'G', 'GG', 'XG'];
const sortOptions = [
  { value: 'default',     label: 'Destaques' },
  { value: 'price-asc',  label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'name',       label: 'A–Z' },
];

export default function Loja() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sort, setSort] = useState('default');
  const filtered = products
    .filter(p => !selectedSize || p.sizes.includes(selectedSize))
    .sort((a, b) => {
      if (sort === 'price-asc')  return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'name')       return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="pt-24 min-h-screen">
      {/* Page header */}
      <div
        className="py-16 text-center"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs tracking-widest uppercase mb-4"
          style={{ color: 'var(--gold)', fontFamily: 'var(--sans)', letterSpacing: '0.3em' }}
        >
          ✦ Coleção 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-light"
          style={{ fontFamily: 'var(--serif)' }}
        >
          Nossa <em className="gold-text not-italic">Loja</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-sm"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}
        >
          {products.length} peças disponíveis
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          {/* Size filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs uppercase tracking-widest mr-2" style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
              Tamanho:
            </span>
            {sizes.map(size => (
              <motion.button
                key={size}
                onClick={() => setSelectedSize(s => s === size ? null : size)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                whileTap={{ scale: 0.94 }}
                style={{
                  background: selectedSize === size ? 'var(--gold)' : 'var(--surface)',
                  color: selectedSize === size ? '#080808' : 'var(--text-dim)',
                  border: selectedSize === size ? '1px solid var(--gold)' : '1px solid var(--border)',
                  fontFamily: 'var(--mono)',
                }}
              >
                {size}
              </motion.button>
            ))}
            {selectedSize && (
              <button
                onClick={() => setSelectedSize(null)}
                className="flex items-center gap-1 text-xs transition-colors duration-200"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}
              >
                <X size={12} /> Limpar
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-4 py-2 rounded-full text-xs cursor-pointer outline-none"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-dim)',
              fontFamily: 'var(--sans)',
            }}
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value} style={{ background: '#111' }}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Products grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
                Nenhum produto encontrado para este filtro.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
