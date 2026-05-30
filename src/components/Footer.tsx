import { ArrowUpRight } from "lucide-react";
import { footerContent, brand } from "../data/siteData";

/**
 * Ft5 Statement footer — one statement line + logo + contact block.
 * No link columns, no social icons, no dead # links.
 */
export function Footer() {
  return (
    <footer className="bg-text-primary text-white/60">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        {/* Brand + Contact — two-column on md+, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 items-center">
          {/* Brand */}
          <div>
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-32 md:h-40 w-auto object-contain mb-4 -ml-3 md:-ml-4"
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
        <div className="mt-10 md:mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-[12px] text-white/50">{footerContent.copyright}</p>
          <p className="text-[12px] text-white/50">{footerContent.registration}</p>
        </div>
      </div>
    </footer>
  );
}
