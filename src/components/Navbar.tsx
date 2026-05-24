import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, brand } from "../data/siteData";

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

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* N5 Floating Pill — logo left, pill of links centred, CTA right */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        aria-label="Primary"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="relative flex items-center justify-between h-24 md:h-28">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center group relative z-10"
              aria-label={brand.name}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-16 md:h-20 w-auto object-contain transition-opacity duration-200 ease-out group-hover:opacity-80"
              />
            </a>

            {/* Floating Pill — desktop only, absolutely centred */}
            <div
              className={`hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 px-2 py-2 rounded-full
                bg-surface-light/80 backdrop-blur-xl border border-border/60
                shadow-[0_1px_3px_rgba(25,22,45,0.04),0_4px_24px_rgba(25,22,45,0.04)]
                transition-colors duration-200 ease-out
                ${scrolled ? "bg-surface-light/95" : "bg-surface-light/70"}`}
            >
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-1.5 text-[13px] font-medium text-text-muted rounded-full hover:text-text-primary hover:bg-bg transition-colors duration-200 ease-out tracking-wide"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4 relative z-10">
              <button
                onClick={() => scrollTo("#contact")}
                className="hidden md:inline-flex items-center px-5 py-2 text-[13px] font-medium text-text-primary border border-border rounded-full hover:border-indigo-mid hover:bg-indigo-mid/5 transition-colors duration-200 ease-out"
              >
                Consultation
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-text-primary"
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
            className="fixed inset-0 z-40 bg-bg/98 backdrop-blur-xl pt-24 md:pt-28 px-6 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left py-4 text-lg font-medium text-text-primary border-b border-border/50"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => scrollTo("#contact")}
                className="mt-6 w-full py-3 text-center text-sm font-medium text-text-primary border border-indigo-mid rounded-full"
              >
                Request Consultation
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
