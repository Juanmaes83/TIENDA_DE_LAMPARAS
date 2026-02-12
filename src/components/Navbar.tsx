import { useState, useEffect } from 'react';

const NAV_LINKS = [
  'Lámparas',
  'Ambientes',
  'Colecciones',
  'Inspiración',
  'Soporte',
  'Contacto',
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(10,10,10,0.7)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="flex items-center justify-between px-4 lg:px-12 h-16 lg:h-20"
        aria-label="Navegación principal"
      >
        <a
          href="#"
          className="font-headline text-white uppercase leading-none"
        >
          <span className="block text-[0.6rem] tracking-[0.14em] opacity-80">
            Tienda de
          </span>
          <span className="block text-xl tracking-[0.04em]">Lámparas</span>
        </a>

        <ul className="hidden lg:flex items-center">
          {NAV_LINKS.map((link, i) => (
            <li key={link} className="flex items-center">
              {i > 0 && (
                <span
                  className="text-white/25 mx-3 text-[0.5rem] select-none"
                  aria-hidden="true"
                >
                  &middot;
                </span>
              )}
              <a
                href="#"
                className="text-white/65 text-[0.82rem] tracking-wide hover:text-white transition-colors duration-200"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="border border-white/25 text-white text-[0.7rem] tracking-[0.18em] uppercase px-5 py-2 rounded-full hover:bg-white hover:text-noir-950 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          Entrar
        </a>
      </nav>
    </header>
  );
}
