import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileText, User, Upload, Info, CreditCard, RotateCcw, Image, Copyright, Link2, AlertTriangle, RefreshCw, Scale } from "lucide-react";

const sections = [
  {
    number: "01",
    icon: FileText,
    title: "About Us",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        BABY-BOO CLOSET is an online platform based in <strong className="text-foreground">Greater Accra, Ghana</strong>, offering wholesale and retail clothing, underwear, and school uniforms. Users may also create accounts and upload items for sale.
      </p>
    ),
  },
  {
    number: "02",
    icon: Shield,
    title: "Use of Our Website",
    content: (
      <div className="space-y-3 text-muted-foreground">
        <p>By using our site, you agree that you will:</p>
        <ul className="space-y-2">
          {["Provide accurate account information", "Not upload harmful, illegal, or offensive content", "Not attempt to hack, disrupt, or misuse our platform", "Not impersonate another person or business"].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
        <p>You must be <strong className="text-foreground">18 years or older</strong> to create an account or upload items.</p>
      </div>
    ),
  },
  {
    number: "03",
    icon: User,
    title: "User Accounts",
    content: (
      <ul className="space-y-2 text-muted-foreground">
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
    number: "04",
    icon: Upload,
    title: "Uploading Items",
    content: (
      <div className="space-y-3 text-muted-foreground">
        <p>Users may upload items for sale; however:</p>
        <ul className="space-y-2">
          {["Items must be accurately described", "No counterfeit, illegal, or prohibited products", "We may remove any listing that violates our rules or laws", "We do <strong>NOT</strong> accept returned items delivered <strong>after 24 hours</strong>"].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    number: "05",
    icon: Info,
    title: "Product Information",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        We do our best to display accurate product images and pricing. However, slight differences in colour or sizing may occur.
      </p>
    ),
  },
  {
    number: "06",
    icon: CreditCard,
    title: "Orders, Payments & Delivery",
    content: (
      <ul className="space-y-2 text-muted-foreground">
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
    number: "07",
    icon: RotateCcw,
    title: "Refund & Return Policy",
    content: (
      <div className="space-y-3 text-muted-foreground">
        <p>You are allowed to return items <strong className="text-foreground">within 24 hours</strong> of delivery only if:</p>
        <ul className="space-y-2">
          {["The item is defective", "The item received is different from what was ordered"].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
        <p>After 24 hours, <strong className="text-foreground">no returns or refunds</strong> are accepted.</p>
      </div>
    ),
  },
  {
    number: "08",
    icon: Image,
    title: "User-Generated Content",
    content: (
      <div className="space-y-3 text-muted-foreground">
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
    number: "09",
    icon: Copyright,
    title: "Intellectual Property",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        All content on BABY-BOO CLOSET — logos, text, images, layout — is owned by us. You may not copy, redistribute, or use our content without permission.
      </p>
    ),
  },
  {
    number: "10",
    icon: Link2,
    title: "Third-Party Links",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        Our website may contain links to third-party sites. We are not responsible for their content, actions, or privacy practices.
      </p>
    ),
  },
  {
    number: "11",
    icon: AlertTriangle,
    title: "Limitation of Liability",
    content: (
      <div className="space-y-3 text-muted-foreground">
        <p>We are not responsible for:</p>
        <ul className="space-y-2">
          {["Loss of data", "Damaged devices", "Delays in shipping", "Errors caused by third-party services"].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
        <p>Our website is used <strong className="text-foreground">at your own risk</strong>.</p>
      </div>
    ),
  },
  {
    number: "12",
    icon: RefreshCw,
    title: "Changes to Terms",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        We may update these Terms at any time. Continued use of our website means you accept the updated Terms.
      </p>
    ),
  },
  {
    number: "13",
    icon: Scale,
    title: "Governing Law",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        These Terms are governed by the laws of <strong className="text-foreground">Ghana</strong>.
      </p>
    ),
  },
];

const Terms = () => {
  return (
    <main className="min-h-screen pb-16">
      <section className="relative overflow-hidden pb-10 pt-10 md:pt-14">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground mb-4">
            <Scale className="h-3.5 w-3.5" />
            Legal
          </div>
          <h1 className="text-4xl font-bold md:text-5xl">Terms & Conditions</h1>
          <p className="mt-3 text-muted-foreground">
            <strong className="text-foreground">Last Updated:</strong> November 16, 2025
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-4xl">
        <Card className="border-white/10 bg-card/90 mb-8">
          <CardContent className="p-6">
            <p className="text-muted-foreground leading-relaxed">
              Welcome to <strong className="text-foreground">BABY-BOO CLOSET</strong> ("we", "our", "us"). By accessing or using our website, you agree to follow these Terms & Conditions. If you do not agree, please do not use our website.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-5">
          {sections.map((section) => (
            <Card key={section.number} className="border-white/10 bg-card/90 group hover:border-primary/20 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">{section.number}</span>
                      <h2 className="text-lg font-semibold">{section.title}</h2>
                    </div>
                    {section.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Terms;
