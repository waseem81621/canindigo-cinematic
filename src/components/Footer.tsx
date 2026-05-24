import { ArrowUpRight } from "lucide-react";
import { footerContent, brand } from "../data/siteData";

export function Footer() {
  const scrollTo = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-text-primary text-white/60">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center mb-5">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-24 md:h-28 w-auto object-contain"
              />
            </div>
            <ul className="space-y-1.5">
              {footerContent.companies.map((company) => (
                <li
                  key={company}
                  className="text-[13px] text-white/50 leading-relaxed"
                >
                  {company}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          {footerContent.links.map((group) => (
            <div key={group.title} className="md:col-span-2">
              <p className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-4">
                {group.title}
              </p>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-[14px] text-white/50 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get in touch CTA */}
          <div className="md:col-span-2">
            <p className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-4">
              Get In Touch
            </p>
            <button
              onClick={() => scrollTo("#contact")}
              className="group flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-white/70 border border-white/10 rounded-full hover:border-white/30 hover:text-white transition-all duration-300"
            >
              Schedule a Call
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/25">{footerContent.copyright}</p>
          <p className="text-[12px] text-white/25">{footerContent.registration}</p>
        </div>
      </div>
    </footer>
  );
}
