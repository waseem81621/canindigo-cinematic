import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { navLinks, brand } from "../data/siteData";
import { easeEnter } from "../utils/motion-tokens";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* N5 Floating Pill — logo left, pill of links centred, CTA right.
          Outer wrapper holds the opaque backdrop strip that fades in on scroll
          so hero text never bleeds through the navbar. */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easeEnter }}
        className="fixed top-0 left-0 right-0 z-50"
        aria-label="Primary"
      >
        {/* Opaque backdrop strip — transparent at scroll-top so the hero's
            aurora bleeds up cleanly; fades in to solid cream + hairline border
            once scrolled so the giant hero headline can't bleed through. */}
        <div
          className={`w-full transition-[background-color,backdrop-filter,border-color] duration-300 ease-out ${
            scrolled
              ? "bg-bg/95 backdrop-blur-xl border-b border-border/40"
              : "bg-transparent border-b border-transparent"
          }`}
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="relative flex items-center justify-between h-28 md:h-32">
              {/* Logo — always returns to homepage */}
              <Link
                to="/"
                className="flex items-center group relative z-10"
                aria-label={brand.name}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-24 md:h-28 w-auto object-contain transition-opacity duration-200 ease-out group-hover:opacity-80"
                />
              </Link>

              {/* Unified chrome pill — desktop only. Contains nav links +
                  Consultation CTA together so they read as one navigation
                  surface (MAS-style). The Consultation segment is visually
                  separated by a hairline divider and slightly bolder text. */}
              <div className="hidden md:flex pillow-shell items-center gap-1 px-3 py-2.5 rounded-full relative z-10 font-nav">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="px-5 py-2 text-[15px] font-semibold uppercase text-text-primary/80 rounded-full hover:text-text-primary hover:bg-white/60 transition-colors duration-200 ease-out tracking-[0.08em]"
                  >
                    {link.label}
                  </Link>
                ))}
                {/* Hairline divider between nav and CTA */}
                <span aria-hidden="true" className="mx-1.5 h-6 w-px bg-text-primary/15" />
                <Link
                  to="/#contact"
                  className="px-5 py-2 text-[15px] font-bold uppercase text-text-primary rounded-full hover:bg-white/60 transition-colors duration-200 ease-out tracking-[0.08em]"
                >
                  Consultation
                </Link>
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-text-primary relative z-10"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bg/98 backdrop-blur-xl pt-28 md:pt-32 px-6 md:hidden font-nav"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    to={link.href}
                    onClick={closeMobile}
                    className="block py-4 text-lg font-medium text-text-primary border-b border-border/50"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/#contact"
                  onClick={closeMobile}
                  className="mt-6 block w-full py-3 text-center text-sm font-bold text-text-primary border border-indigo-mid rounded-full"
                >
                  Consultation
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
