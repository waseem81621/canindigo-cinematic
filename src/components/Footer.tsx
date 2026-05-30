import { ArrowUpRight } from "lucide-react";
import { footerContent, brand, socialLinks } from "../data/siteData";
import { SocialIcon } from "./SocialIcons";

/**
 * Ft5 Statement footer — logo + contact block + social links.
 */
export function Footer() {
  return (
    <footer className="bg-text-primary text-white/60">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 pt-6 md:pt-8 pb-8 md:pb-10">
        {/* Brand + Contact — two-column on md+, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 items-center">
          {/* Brand */}
          <div>
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-32 md:h-40 w-auto object-contain mb-2 -ml-3 md:-ml-4"
            />
            <ul className="space-y-1">
              {footerContent.companies.map((company) => (
                <li
                  key={company}
                  className="text-[15px] text-white/50 leading-relaxed"
                >
                  {company}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:text-right">
            <p
              className="text-[16px] text-white/70 leading-relaxed max-w-[320px] md:ml-auto mb-5"
            >
              {footerContent.contact.address}
            </p>
            <ul className="space-y-2" style={{ fontVariantNumeric: "tabular-nums" }}>
              <li>
                <a
                  href={`mailto:${footerContent.contact.email}`}
                  className="text-[16px] text-white/70 hover:text-white transition-colors duration-200 ease-out"
                >
                  {footerContent.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${footerContent.contact.phone.replace(/\s+/g, "")}`}
                  className="text-[16px] text-white/70 hover:text-white transition-colors duration-200 ease-out"
                >
                  {footerContent.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={footerContent.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[16px] text-white/70 hover:text-white transition-colors duration-200 ease-out"
                >
                  WhatsApp
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 ease-out"
                  />
                </a>
              </li>
            </ul>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-1 md:justify-end">
              {socialLinks.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors duration-200 ease-out"
                >
                  <SocialIcon platform={s.platform} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 md:mt-8 pt-5 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-[14px] text-white/50">{footerContent.copyright}</p>
          <p className="text-[14px] text-white/50">{footerContent.registration}</p>
        </div>
      </div>
    </footer>
  );
}
