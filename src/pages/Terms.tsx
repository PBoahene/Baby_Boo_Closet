import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, Shield, User, Upload, Info, CreditCard, RotateCcw, Image, Copyright, Link2, AlertTriangle, RefreshCw, Scale, Printer, Clock, Truck, Banknote } from "lucide-react";

const LAST_UPDATED = "November 16, 2025";

const sections = [
  {
    id: "about",
    number: "01",
    icon: FileText,
    title: "About Us",
    content: (
      <p className="text-gray-600 leading-relaxed">
        BABY-BOO CLOSET is an online platform based in <strong className="text-gray-900">Greater Accra, Ghana</strong>, offering wholesale and retail clothing, underwear, and school uniforms. Users may also create accounts and upload items for sale.
      </p>
    ),
  },
  {
    id: "use",
    number: "02",
    icon: Shield,
    title: "Use of Our Website",
    content: (
      <div className="space-y-3 text-gray-600">
        <p>By using our site, you agree that you will:</p>
        <ul className="space-y-2">
          {["Provide accurate account information", "Not upload harmful, illegal, or offensive content", "Not attempt to hack, disrupt, or misuse our platform", "Not impersonate another person or business"].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
        <p>You must be <strong className="text-gray-900">18 years or older</strong> to create an account or upload items.</p>
      </div>
    ),
  },
  {
    id: "accounts",
    number: "03",
    icon: User,
    title: "User Accounts",
    content: (
      <ul className="space-y-2 text-gray-600">
        {["You are responsible for keeping your login details safe.", "Any activity conducted through your account is your responsibility.", "We may suspend or terminate accounts that violate these Terms."].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "uploading",
    number: "04",
    icon: Upload,
    title: "Uploading Items",
    content: (
      <div className="space-y-3 text-gray-600">
        <p>Users may upload items for sale; however:</p>
        <ul className="space-y-2">
          {["Items must be accurately described", "No counterfeit, illegal, or prohibited products", "We may remove any listing that violates our rules or laws"].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>We do <strong className="text-gray-900">NOT</strong> accept returned items delivered <strong className="text-gray-900">after 24 hours</strong></span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "product-info",
    number: "05",
    icon: Info,
    title: "Product Information",
    content: (
      <p className="text-gray-600 leading-relaxed">
        We do our best to display accurate product images and pricing. However, slight differences in colour or sizing may occur.
      </p>
    ),
  },
  {
    id: "orders",
    number: "06",
    icon: CreditCard,
    title: "Orders, Payments & Delivery",
    content: (
      <ul className="space-y-2 text-gray-600">
        {["Prices are listed in Ghanaian cedis (GH₵)", "Orders are confirmed only after payment", "Delivery fees may apply depending on location", "We do not accept returned items after 24 hours of delivery", "Items must be returned unused and in original condition"].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "returns",
    number: "07",
    icon: RotateCcw,
    title: "Refund & Return Policy",
    content: (
      <div className="space-y-3 text-gray-600">
        <p>You are allowed to return items <strong className="text-gray-900">within 24 hours</strong> of delivery only if:</p>
        <ul className="space-y-2">
          {["The item is defective", "The item received is different from what was ordered"].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
        <p>After 24 hours, <strong className="text-gray-900">no returns or refunds</strong> are accepted.</p>
      </div>
    ),
  },
  {
    id: "content",
    number: "08",
    icon: Image,
    title: "User-Generated Content",
    content: (
      <div className="space-y-3 text-gray-600">
        <p>By uploading content (photos, descriptions, etc.), you give BABY-BOO CLOSET permission to display and use that content on the platform. You are responsible for ensuring that anything you upload:</p>
        <ul className="space-y-2">
          {["Is yours to upload", "Does not infringe on copyrights or trademarks", "Is not harmful, illegal, or misleading"].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "ip",
    number: "09",
    icon: Copyright,
    title: "Intellectual Property",
    content: (
      <p className="text-gray-600 leading-relaxed">
        All content on BABY-BOO CLOSET — logos, text, images, layout — is owned by us. You may not copy, redistribute, or use our content without permission.
      </p>
    ),
  },
  {
    id: "links",
    number: "10",
    icon: Link2,
    title: "Third-Party Links",
    content: (
      <p className="text-gray-600 leading-relaxed">
        Our website may contain links to third-party sites. We are not responsible for their content, actions, or privacy practices.
      </p>
    ),
  },
  {
    id: "liability",
    number: "11",
    icon: AlertTriangle,
    title: "Limitation of Liability",
    content: (
      <div className="space-y-3 text-gray-600">
        <p>We are not responsible for:</p>
        <ul className="space-y-2">
          {["Loss of data", "Damaged devices", "Delays in shipping", "Errors caused by third-party services"].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
        <p>Our website is used <strong className="text-gray-900">at your own risk</strong>.</p>
      </div>
    ),
  },
  {
    id: "changes",
    number: "12",
    icon: RefreshCw,
    title: "Changes to Terms",
    content: (
      <p className="text-gray-600 leading-relaxed">
        We may update these Terms at any time. Continued use of our website means you accept the updated Terms.
      </p>
    ),
  },
  {
    id: "law",
    number: "13",
    icon: Scale,
    title: "Governing Law",
    content: (
      <p className="text-gray-600 leading-relaxed">
        These Terms are governed by the laws of <strong className="text-gray-900">Ghana</strong>.
      </p>
    ),
  },
];

const highlights = [
  { icon: Clock, title: "24-hour returns", text: "Defective or wrong items only", href: "#returns" },
  { icon: Banknote, title: "Prices in GH₵", text: "Orders confirmed after payment", href: "#orders" },
  { icon: Truck, title: "Delivery fees", text: "May apply depending on location", href: "#orders" },
  { icon: Scale, title: "Ghana law", text: "These Terms follow Ghanaian law", href: "#law" },
];

const Terms = () => {
  const location = useLocation();
  const [active, setActive] = useState(sections[0].id);

  // Jump to a section when arriving with a hash, e.g. /terms#returns
  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash]);

  // Highlight the section currently being read
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-180px 0px -60% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-amber-50/80 to-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">Legal</p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">Terms &amp; Conditions</h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-gray-600">
            Welcome to <strong className="text-gray-900">BABY-BOO CLOSET</strong> ("we", "our", "us"). By accessing or using our website, you agree to follow these Terms &amp; Conditions. If you do not agree, please do not use our website.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <span>Last updated: <strong className="font-medium text-gray-900">{LAST_UPDATED}</strong></span>
            <span>{sections.length} sections</span>
            <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-gray-700 underline-offset-4 hover:text-gray-900 hover:underline print:hidden">
              <Printer className="h-4 w-4" /> Print
            </button>
          </div>

          {/* At a glance */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 print:hidden">
            {highlights.map(({ icon: Icon, title, text, href }) => (
              <a
                key={title}
                href={href}
                onClick={(e) => { e.preventDefault(); goTo(href.slice(1)); }}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-gray-900"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-amber-600">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-gray-900">{title}</span>
                  <span className="block text-sm text-gray-500">{text}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        {/* Mobile jump menu */}
        <label className="mb-8 block lg:hidden print:hidden">
          <span className="mb-1.5 block text-sm font-medium text-gray-900">Jump to section</span>
          <select
            value={active}
            onChange={(e) => goTo(e.target.value)}
            className="h-12 w-full border border-gray-300 bg-white px-3 text-[15px] text-gray-900 outline-none focus:border-gray-900"
          >
            {sections.map((s) => (
              <option key={s.id} value={s.id}>{s.number}. {s.title}</option>
            ))}
          </select>
        </label>

        <div className="grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)] xl:gap-20">
          {/* Table of contents */}
          <nav aria-label="Terms sections" className="hidden lg:block print:hidden">
            <div className="sticky top-44">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">On this page</p>
              <ol className="space-y-1 border-l border-gray-200">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={(e) => { e.preventDefault(); goTo(s.id); }}
                      aria-current={active === s.id ? "true" : undefined}
                      className={`-ml-px flex gap-3 border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                        active === s.id ? "border-primary font-medium text-gray-900" : "border-transparent text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      <span className="w-5 tabular-nums text-gray-400">{s.number}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          {/* Sections */}
          <div className="max-w-3xl">
            {sections.map((section) => (
              <article key={section.id} id={section.id} className="scroll-mt-44 border-b border-gray-100 py-9 first:pt-0 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-amber-600 print:hidden">
                    <section.icon className="h-5 w-5" />
                  </span>
                  <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
                    <span className="mr-2 text-gray-400">{section.number}.</span>
                    {section.title}
                  </h2>
                </div>
                <div className="mt-4 text-[16px] leading-relaxed md:pl-[52px] print:pl-0">{section.content}</div>
              </article>
            ))}

            {/* Questions */}
            <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-gray-50 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8 print:hidden">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Questions about these Terms?</h2>
                <p className="mt-1 text-gray-600">Our team is happy to help with orders, returns or anything else.</p>
              </div>
              <Link
                to="/contact"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-gray-900 px-7 py-3 text-sm font-medium text-white hover:bg-gray-800"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Terms;
