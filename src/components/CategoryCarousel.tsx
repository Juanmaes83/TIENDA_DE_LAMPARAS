import { useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Noir',
    src: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
  {
    name: 'Ámbar',
    src: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
  {
    name: 'Sombra',
    src: 'https://images.pexels.com/photos/943150/pexels-photo-943150.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
  {
    name: 'Bajo Perfil',
    src: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
  {
    name: 'Studio',
    src: 'https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
  {
    name: 'Cúpula',
    src: 'https://images.pexels.com/photos/3637748/pexels-photo-3637748.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
];

export default function CategoryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLElement | null>(null);

  const getScrollAmount = useCallback(() => {
    const track = trackRef.current;
    const card = firstCardRef.current;
    if (!track || !card) return 300;

    const cardWidth = card.getBoundingClientRect().width;
    const styles = getComputedStyle(track);
    const gap =
      parseFloat(styles.columnGap) || parseFloat(styles.gap) || 16;

    return cardWidth + gap;
  }, []);

  const scroll = useCallback(
    (direction: 1 | -1) => {
      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      trackRef.current?.scrollBy({
        left: direction * getScrollAmount(),
        behavior: reduced ? 'auto' : 'smooth',
      });
    },
    [getScrollAmount]
  );

  return (
    <div
      className="relative px-4 lg:px-12 pb-8 lg:pb-12 group/carousel"
      role="region"
      aria-label="Categorías de lámparas"
      id="coleccion"
    >
      <button
        onClick={() => scroll(-1)}
        aria-label="Anterior categoría"
        className="hidden lg:flex absolute left-4 top-[calc(50%-1.5rem)] z-20 w-11 h-11 items-center justify-center rounded-full bg-noir-900/70 text-white/60 hover:text-white hover:bg-noir-800 backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={() => scroll(1)}
        aria-label="Siguiente categoría"
        className="hidden lg:flex absolute right-4 top-[calc(50%-1.5rem)] z-20 w-11 h-11 items-center justify-center rounded-full bg-noir-900/70 text-white/60 hover:text-white hover:bg-noir-800 backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>

      <div
        ref={trackRef}
        className="carousel-edge-fade carousel-track flex gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {CATEGORIES.map((cat, i) => (
          <figure
            key={cat.name}
            ref={
              i === 0
                ? (el: HTMLElement | null) => {
                    firstCardRef.current = el;
                  }
                : undefined
            }
            className="flex-shrink-0 w-[62vw] sm:w-[42vw] lg:w-[calc((100%-5*1.25rem)/6)] snap-start group/card cursor-pointer"
            tabIndex={0}
          >
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group-hover/card:border-white/20 group-focus-visible/card:border-white/20 transition-all duration-200">
              <img
                src={cat.src}
                alt={`Categoría ${cat.name}`}
                className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-[1.03] transition-transform duration-500"
                width={600}
                height={400}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="mt-3 text-white/80 text-sm uppercase tracking-[0.12em] whitespace-nowrap font-body font-medium">
              {cat.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
