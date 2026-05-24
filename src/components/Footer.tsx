import { ArrowUpRight } from "lucide-react";
import { footerContent, brand } from "../data/siteData";

/**
 * Ft5 Statement footer — one statement line + logo + contact block.
 * No link columns, no social icons, no dead # links.
 */
export function Footer() {
  return (
    <footer className="bg-text-primary text-white/60">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        {/* Statement — Cormorant Garamond, top-left */}
        <p
          className="font-display text-[40px] sm:text-[52px] md:text-[64px] lg:text-[72px] font-medium text-white leading-[1.05] tracking-[-0.02em] max-w-[760px]"
        >
          {footerContent.statement}
        </p>

        {/* Brand + Contact — two-column on md+, stacked on mobile */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-start">
          {/* Brand */}
          <div>
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-20 md:h-24 w-auto object-contain mb-5"
            />
            <ul className="space-y-1">
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

          {/* Contact */}
          <div className="md:text-right">
            <p
              className="text-[14px] text-white/70 leading-relaxed max-w-[320px] md:ml-auto mb-5"
            >
              {footerContent.contact.address}
            </p>
            <ul className="space-y-2" style={{ fontVariantNumeric: "tabular-nums" }}>
              <li>
                <a
                  href={`mailto:${footerContent.contact.email}`}
                  className="text-[14px] text-white/70 hover:text-white transition-colors duration-200 ease-out"
                >
                  {footerContent.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${footerContent.contact.phone.replace(/\s+/g, "")}`}
                  className="text-[14px] text-white/70 hover:text-white transition-colors duration-200 ease-out"
                >
                  {footerContent.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={footerContent.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[14px] text-white/70 hover:text-white transition-colors duration-200 ease-out"
                >
                  WhatsApp
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 ease-out"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 md:mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-[12px] text-white/30">{footerContent.copyright}</p>
          <p className="text-[12px] text-white/30">{footerContent.registration}</p>
        </div>
      </div>
    </footer>
  );
}
