import { motion } from "framer-motion";
import { heroClients } from "../data/siteData";
import { easeEnter, durCalm } from "../utils/motion-tokens";

/**
 * Horizontal client logo strip rendered under the hero CTA.
 * Fades in after the CTA animation completes (~delay 1.1s, stagger 0.05s).
 * Renders the client name as text fallback when `logo` is null.
 */
export function HeroTrustBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: durCalm, delay: 1.1, ease: easeEnter }}
      className="mt-10 md:mt-14"
    >
      <p className="text-[10px] md:text-[11px] font-semibold text-text-muted uppercase tracking-[0.2em] mb-4">
        Trusted by
      </p>
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-8 md:gap-y-4">
        {heroClients.map((client, i) => (
          <motion.li
            key={client.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: durCalm,
              delay: 1.2 + i * 0.05,
              ease: easeEnter,
            }}
            className="flex items-center"
          >
            {client.logo ? (
              <img
                src={client.logo}
                alt={client.name}
                className="h-5 md:h-6 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-200 grayscale hover:grayscale-0"
              />
            ) : (
              <span className="text-[13px] md:text-sm font-medium text-text-secondary tracking-tight">
                {client.name}
              </span>
            )}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
