import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, Send, CheckCircle, MapPin, AlertCircle } from "lucide-react";
import { TextReveal } from "./TextReveal";
import { MagneticButton } from "./MagneticButton";
import { GlassButton } from "./GlassButton";
import { contactContent } from "../data/siteData";

const iconMap: Record<string, React.ComponentType<any>> = {
  Mail,
  Phone,
  Clock,
  MapPin,
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvzybjyy";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    interest: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", company: "", email: "", phone: "", interest: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const resetForm = () => setStatus("idle");

  return (
    <section id="contact" className="py-20 md:py-28 bg-bg-pure relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-mid/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-light/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          {/* Left: Info */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-[17px] md:text-[19px] text-indigo-mid tracking-wide mb-4"
            >
              Begin with a conversation.
            </motion.p>
            <TextReveal
              className="text-[32px] md:text-[48px] lg:text-[56px] font-bold text-text-primary leading-[1.05] tracking-[-0.02em] mb-6"
              delay={0.1}
            >
              {contactContent.headline}
            </TextReveal>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[17px] text-text-secondary leading-[1.8] mb-12 max-w-[440px]"
            >
              {contactContent.description}
            </motion.p>

            <div className="space-y-7">
              {contactContent.info.map((item, i) => {
                const Icon = iconMap[item.icon];
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-bg flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-indigo-accent/10">
                      <Icon
                        size={18}
                        className="text-text-secondary transition-colors duration-300 group-hover:text-indigo-accent"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-text-muted uppercase tracking-[0.1em] mb-0.5">
                        {item.label}
                      </p>
                      <p
                        className="text-[15px] text-text-primary font-medium"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-bg rounded-3xl border border-border p-8 md:p-10">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full bg-indigo-accent/10 flex items-center justify-center mb-6"
                  >
                    <CheckCircle size={32} className="text-indigo-accent" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    {contactContent.form.successTitle}
                  </h3>
                  <p className="text-[15px] text-text-secondary max-w-[360px]">
                    {contactContent.form.successMessage}
                  </p>
                </motion.div>
              ) : status === "error" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                    <AlertCircle size={32} className="text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    {contactContent.form.errorTitle}
                  </h3>
                  <p className="text-[15px] text-text-secondary max-w-[360px] mb-6">
                    {contactContent.form.errorMessage}
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-[13px] font-semibold text-indigo-accent underline underline-offset-4 hover:text-indigo-mid transition-colors duration-200 ease-out"
                  >
                    Try again
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {contactContent.form.fields.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={`contact-${field.name}`}
                        className="block text-[13px] font-semibold text-text-primary mb-2.5"
                      >
                        {field.label}
                      </label>
                      <input
                        id={`contact-${field.name}`}
                        name={field.name}
                        type={field.type}
                        required
                        autoComplete={
                          field.name === "email"
                            ? "email"
                            : field.name === "phone"
                            ? "tel"
                            : field.name === "name"
                            ? "name"
                            : field.name === "company"
                            ? "organization"
                            : "off"
                        }
                        value={formData[field.name as keyof FormState]}
                        onChange={(e) =>
                          setFormData({ ...formData, [field.name]: e.target.value })
                        }
                        disabled={status === "submitting"}
                        className="w-full px-5 py-3.5 bg-bg-pure border border-border rounded-xl text-[15px] text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-indigo-accent/60 focus:ring-1 focus:ring-indigo-accent/15 transition-colors duration-200 ease-out disabled:opacity-60"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      htmlFor="contact-interest"
                      className="block text-[13px] font-semibold text-text-primary mb-2.5"
                    >
                      Interest
                    </label>
                    <select
                      id="contact-interest"
                      name="interest"
                      required
                      value={formData.interest}
                      onChange={(e) =>
                        setFormData({ ...formData, interest: e.target.value })
                      }
                      disabled={status === "submitting"}
                      className="w-full px-5 py-3.5 bg-bg-pure border border-border rounded-xl text-[15px] text-text-primary focus:outline-none focus:border-indigo-accent/60 focus:ring-1 focus:ring-indigo-accent/15 transition-colors duration-200 ease-out appearance-none cursor-pointer disabled:opacity-60"
                    >
                      <option value="" disabled>
                        Select a service area
                      </option>
                      {contactContent.form.interests.map((interest) => (
                        <option key={interest} value={interest}>
                          {interest}
                        </option>
                      ))}
                    </select>
                  </div>

                  <MagneticButton className="w-full mt-2">
                    <GlassButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      icon={<Send size={14} />}
                      disabled={status === "submitting"}
                    >
                      {status === "submitting"
                        ? "Submitting…"
                        : contactContent.form.submitLabel}
                    </GlassButton>
                  </MagneticButton>

                  <p className="text-[12px] text-text-muted text-center pt-2">
                    {contactContent.form.privacyNote}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
