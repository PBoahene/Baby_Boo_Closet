const messages = [
  "Free delivery on orders above GH₵300",
  "Pay easily with Mobile Money",
  "Bulk uniform orders for schools",
  "Easy returns within 7 days",
];

/** Scrolling promo strip under the banner. */
const PromoTicker = () => {
  const items = [...messages, ...messages];
  return (
    <div className="mt-8 overflow-hidden bg-primary py-2.5 text-gray-900" aria-label="Store offers">
      <ul className="sr-only">
        {messages.map((m) => <li key={m}>{m}</li>)}
      </ul>
      <div className="flex w-max animate-ticker motion-reduce:animate-none" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {items.map((m, i) => (
              <span key={`${copy}-${i}`} className="flex items-center whitespace-nowrap px-6 text-xs font-bold uppercase tracking-widest md:text-[13px]">
                {m}
                <span className="ml-12 text-gray-900/60">✿</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoTicker;
