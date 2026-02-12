import { useRef, useEffect, type ReactNode } from 'react';

interface HeroProps {
  children?: ReactNode;
}

const HERO_POSTER =
  'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';

export default function Hero({ children }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const fadeIn = () => {
      video
        .play()
        .then(() => {
          video.style.opacity = '1';
        })
        .catch(() => {
          video.style.opacity = '0';
        });
    };

    video.addEventListener('canplay', fadeIn);
    return () => video.removeEventListener('canplay', fadeIn);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const targets = [eyebrowRef, headingRef, subheadRef, ctaRef]
      .map((r) => r.current)
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    targets.forEach((el) => {
      el.classList.add('reveal-element');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative min-h-[80vh] lg:min-h-screen w-full overflow-x-hidden"
      aria-label="Presentación principal"
    >
      <div className="absolute inset-0">
        <img
          src={HERO_POSTER}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
          width={1920}
          height={1080}
        />

        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: 0,
            transition: 'opacity var(--dur-slow) var(--ease-out-expo)',
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/assets/videos/hero.webm" type="video/webm" />
          <source src="/assets/videos/hero.mp4" type="video/mp4" />
        </video>

        <div
          className="hero-spotlight absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="hero-vignette absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="hero-grain absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-[80vh] lg:min-h-screen">
        <div className="flex-1 flex flex-col justify-center px-4 lg:px-12 pt-24 lg:pt-28 pb-8">
          <div className="max-w-2xl">
            <p
              ref={eyebrowRef}
              className="text-amber-300/90 text-xs font-body font-medium tracking-[0.15em] uppercase mb-5"
              style={{ '--reveal-delay': '0s' } as React.CSSProperties}
            >
              Colección Noir &middot; Edición Limitada &middot; Esta Noche
            </p>

            <h1
              ref={headingRef}
              className="font-headline uppercase leading-[0.95] tracking-[-0.02em] text-white"
              style={
                {
                  fontSize: 'clamp(3rem, 15vw, 8rem)',
                  '--reveal-delay': 'var(--stagger)',
                } as React.CSSProperties
              }
            >
              Enciende
              <br />
              el misterio
            </h1>

            <p
              ref={subheadRef}
              className="font-body font-light text-white/75 text-base lg:text-lg mt-5 max-w-md leading-relaxed"
              style={
                {
                  '--reveal-delay': 'calc(var(--stagger) * 2)',
                } as React.CSSProperties
              }
            >
              Lámparas de diseño que transforman la sombra en atmósfera. La luz
              no ilumina: confiesa.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-wrap gap-4 mt-8"
              style={
                {
                  '--reveal-delay': 'calc(var(--stagger) * 3)',
                } as React.CSSProperties
              }
            >
              <a
                href="#coleccion"
                className="inline-flex items-center justify-center bg-white text-noir-950 text-sm font-medium tracking-[0.1em] uppercase px-8 py-3.5 rounded-full hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white min-h-[44px]"
              >
                Ver Colección
              </a>
              <a
                href="#ambientes"
                className="inline-flex items-center justify-center border border-white/40 text-white text-sm font-medium tracking-[0.1em] uppercase px-8 py-3.5 rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white min-h-[44px]"
              >
                Descubrir Ambientes
              </a>
            </div>
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}
