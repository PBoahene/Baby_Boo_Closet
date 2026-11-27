import { Headphones, ShieldCheck, Truck } from "lucide-react";

const items = [
  { icon: Truck, title: "Delivery Available", text: "Across Greater Accra and nationwide" },
  { icon: Headphones, title: "Customer Service", text: "Mon–Sat, 8 AM to 6 PM on WhatsApp" },
  { icon: ShieldCheck, title: "Quality Products", text: "Durable fabrics tested for active kids" },
];

const TrustRow = () => (
  <section className="container mx-auto px-4 py-10 md:py-12">
    <div className="grid gap-8 text-center sm:grid-cols-3">
      {items.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex flex-col items-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </span>
          <h3 className="mt-3 text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{text}</p>
        </div>
      ))}
    </div>
  </section>
);

export default TrustRow;
