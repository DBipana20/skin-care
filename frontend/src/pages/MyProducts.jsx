import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function MyProducts() {
  const { products, toggleProductFavorite } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Cleansers', 'Serums', 'Moisturizers', 'Sunscreens'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skinTypeTag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-[1140px] mx-auto px-margin-mobile md:px-margin-desktop pt-md pb-32 space-y-lg">
      {/* Search & Filter Area */}
      <section className="space-y-sm">
        {/* Search Bar */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, ingredients..."
            className="w-full bg-surface-container-low/60 border-none rounded-full py-3.5 pl-xl pr-md font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex overflow-x-auto no-scrollbar space-x-sm py-sm">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-md py-2 rounded-full font-label-md text-label-md whitespace-nowrap active:scale-95 transition-all ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Product Grid */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            className="bg-surface-container-lowest rounded-xl ambient-shadow overflow-hidden flex flex-col group cursor-pointer hover:shadow-nav transition-all duration-300 border border-transparent hover:border-surface-variant"
          >
            {/* Image Box */}
            <div className="aspect-square relative p-sm bg-surface-container-low/30 overflow-hidden">
              <img
                src={product.image}
                alt={product.alt || product.name}
                loading="lazy"
                className="w-full h-full object-cover rounded-lg mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
              />
              {/* Favorite Heart Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleProductFavorite(product.id);
                }}
                aria-label={`Favorite ${product.name}`}
                className="absolute top-sm right-sm w-8 h-8 rounded-full bg-surface-container-lowest/80 glass-blur flex items-center justify-center text-on-surface-variant hover:text-tertiary transition-colors active:scale-90"
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-colors ${
                    product.isFavorite ? 'text-tertiary' : ''
                  }`}
                  style={{
                    fontVariationSettings: `'FILL' ${product.isFavorite ? 1 : 0}`
                  }}
                >
                  favorite
                </span>
              </button>
            </div>

            {/* Product Meta */}
            <div className="p-sm flex flex-col flex-grow justify-between">
              <div>
                <div className="flex justify-between items-start mb-xs gap-1">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-[10px] uppercase tracking-wider truncate">
                    {product.skinTypeTag}
                  </span>
                  <div className="flex items-center text-secondary shrink-0">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-label-sm text-[10px] ml-xs font-semibold">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <h2 className="font-label-md text-label-md text-on-surface line-clamp-2 font-semibold">
                  {product.name}
                </h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant/70 mt-xs line-clamp-1">
                  {product.subtitle}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/40 mb-2">
            search_off
          </span>
          <p className="font-headline-md text-headline-md text-on-surface">No products found</p>
          <p className="font-body-md text-on-surface-variant mt-1">
            Try adjusting your search terms or category filter.
          </p>
        </div>
      )}
    </div>
  );
}
