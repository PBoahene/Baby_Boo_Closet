import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import heroKids from "@/assets/hero-kids.jpg";

const STORE = {
  phoneDisplay: "+233 24 449 5254",
  phoneTel: "+233244495254",
  whatsapp: "233244495254",
  email: "support@babyboocloset.com",
  location: "Greater Accra, Ghana",
  hours: "Mon – Sat: 8:00 AM – 6:00 PM",
  tiktok: "https://www.tiktok.com/@baby_boo_closet",
};

const topics = [
  "Question about an order",
  "School or bulk uniform order",
  "Custom design or embroidery",
  "Returns and exchanges",
  "Something else",
];

const contactSchema = z.object({
  firstName: z.string().trim().min(2, "Please enter your first name"),
  lastName: z.string().trim().optional(),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{8,}$/, "Please enter a valid phone number"),
  topic: z.string().min(1, "Please choose a topic"),
  message: z.string().trim().min(10, "Please write a short message (at least 10 characters)").max(1000),
});

type ContactValues = z.infer<typeof contactSchema>;

const faqs = [
  {
    q: "How much is delivery?",
    a: "Delivery is free on orders above GH₵300. For smaller orders, the delivery fee is confirmed when we contact you.",
  },
  {
    q: "Can I return an item?",
    a: "If an item is defective or different from what you ordered, contact us within 24 hours of delivery and return it unused in its original condition. See our Terms for details.",
  },
  {
    q: "Do you take school or bulk orders?",
    a: "We do. Tell us your school, the items and quantities, and we'll send a quote.",
  },
  {
    q: "Can you make a custom design?",
    a: "Yes. Upload your logo or sketch on the Upload Design page and we'll reply within 24 hours.",
  },
];

const inputClass =
  "w-full border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-[15px] text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900";

const Field = ({
  label,
  required,
  error,
  children,
  htmlFor,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  htmlFor: string;
}) => (
  <div>
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-900">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="mt-1.5 text-xs text-red-600" role="alert">{error}</p>}
  </div>
);

const Contact = () => {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { firstName: "", lastName: "", email: "", phone: "", topic: "", message: "" },
  });

  const onSubmit = (values: ContactValues) => {
    const name = [values.firstName, values.lastName].filter(Boolean).join(" ");
    const text = [
      `Hello Baby-Boo Closet, my name is ${name}.`,
      `Topic: ${values.topic}`,
      "",
      values.message,
      "",
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
    ].join("\n");
    window.open(`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
    reset();
  };

  const infoItems = [
    { icon: MapPin, label: "Location", value: STORE.location, sub: "Delivery available nationwide" },
    {
      icon: Phone,
      label: "Call or WhatsApp",
      value: STORE.phoneDisplay,
      href: `tel:${STORE.phoneTel}`,
    },
    { icon: Mail, label: "Email", value: STORE.email, href: `mailto:${STORE.email}` },
    { icon: Clock, label: "Working hours", value: STORE.hours, sub: "We reply to messages within 24 hours" },
  ];

  return (
    <main className="min-h-screen">
      {/* Banner */}
      <section className="bg-primary">
        <div className="mx-auto grid max-w-[1600px] items-stretch md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="relative hidden min-h-[260px] md:block">
            <img src={heroKids} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center px-6 py-12 md:px-14 md:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-900/70">Contact us</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              Ask us anything — we're here to help!
            </h1>
            <p className="mt-4 max-w-lg text-[17px] text-gray-900/80">
              Questions about sizes, orders, school uniforms or custom designs? Send us a message and our team will get back to you.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:py-20">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Details */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">Get in Touch with Us</h2>
            <p className="mt-4 max-w-md text-gray-600">
              Reach us whichever way suits you. For the fastest reply, message us on WhatsApp.
            </p>

            <ul className="mt-10 space-y-7">
              {infoItems.map(({ icon: Icon, label, value, href, sub }) => (
                <li key={label} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-amber-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">{label}</p>
                    {href ? (
                      <a href={href} className="mt-0.5 block text-[17px] font-medium text-gray-900 hover:underline">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-[17px] font-medium text-gray-900">{value}</p>
                    )}
                    {sub && <p className="mt-0.5 text-sm text-gray-500">{sub}</p>}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${STORE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1fb95a]"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <a
                href={STORE.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-900 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white"
              >
                Follow us on TikTok
              </a>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-xl font-bold text-gray-900">Send us a message</h2>
            {sent && (
              <div className="mt-5 flex gap-3 border border-green-200 bg-green-50 p-4 text-sm text-green-900" role="status">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                <p>
                  Thank you! WhatsApp has opened with your message — just press send. If it didn't open, email us at{" "}
                  <a className="underline" href={`mailto:${STORE.email}`}>{STORE.email}</a>.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-7">
              <div className="grid gap-7 sm:grid-cols-2">
                <Field label="First name" required htmlFor="firstName" error={errors.firstName?.message}>
                  <input id="firstName" autoComplete="given-name" placeholder="First name" className={inputClass} {...register("firstName")} />
                </Field>
                <Field label="Last name" htmlFor="lastName">
                  <input id="lastName" autoComplete="family-name" placeholder="Last name" className={inputClass} {...register("lastName")} />
                </Field>
                <Field label="Email" required htmlFor="email" error={errors.email?.message}>
                  <input id="email" type="email" autoComplete="email" placeholder="you@example.com" className={inputClass} {...register("email")} />
                </Field>
                <Field label="Phone" required htmlFor="phone" error={errors.phone?.message}>
                  <input id="phone" type="tel" autoComplete="tel" placeholder="+233 ..." className={inputClass} {...register("phone")} />
                </Field>
              </div>

              <Field label="What can we help with?" required htmlFor="topic" error={errors.topic?.message}>
                <select id="topic" className={`${inputClass} cursor-pointer`} {...register("topic")}>
                  <option value="">Choose a topic</option>
                  {topics.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </Field>

              <Field label="Message" required htmlFor="message" error={errors.message?.message}>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us how we can help…"
                  className={`${inputClass} resize-y`}
                  {...register("message")}
                />
              </Field>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="rounded-full border border-gray-900 px-12 py-3 text-[15px] font-medium text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
                >
                  Submit
                </button>
                <p className="text-xs text-gray-500">Your message opens in WhatsApp so it reaches our team straight away.</p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-100 bg-gray-50/70">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">Quick answers</h2>
          <dl className="mx-auto mt-10 grid max-w-5xl gap-x-12 gap-y-8 md:grid-cols-2">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <dt className="font-semibold text-gray-900">{q}</dt>
                <dd className="mt-1.5 text-gray-600">{a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 text-center text-sm text-gray-600">
            Need a custom piece?{" "}
            <Link to="/custom-design" className="font-medium text-gray-900 underline underline-offset-4">
              Upload your design
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Contact;
