import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroKids from "@/assets/hero-kids.jpg";
import schoolUniform from "@/assets/school-uniform.jpg";
import casualWear from "@/assets/casual-wear.jpg";

const slides = [
  {
    image: schoolUniform,
    eyebrow: "Back to school",
    title: "Smart uniforms that last the whole school year",
    text: "Up to 20% off bundles of uniforms, socks and underwear.",
    cta: "Shop School Wear",
    to: "/shop?category=School%20Uniforms",
  },
  {
    image: heroKids,
    eyebrow: "New arrivals",
    title: "Everyday kidswear in bright, comfy colours",
    text: "Soft fabrics made for play, school runs and weekends.",
    cta: "Shop New In",
    to: "/shop",
  },
  {
    image: casualWear,
    eyebrow: "Made for you",
    title: "Your logo, your design — we sew it",
    text: "Custom embroidery and uniforms for schools, churches and teams.",
    cta: "Upload a Design",
    to: "/custom-design",
  },
];

const AUTOPLAY_MS = 6000;

const BannerSlider = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, go]);

  return (
    <section
      className="container mx-auto px-4 pt-6 md:pt-10"
      aria-roledescription="carousel"
      aria-label="Promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[340px] overflow-hidden bg-gray-900 md:h-[460px]">
        {slides.map((slide, i) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "pointer-events-none opacity-0"}`}
            aria-hidden={i !== index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <img src={slide.image} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-center px-12 md:px-24">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">{slide.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-5xl">{slide.title}</h2>
              <p className="mt-3 text-sm text-white/85 md:text-lg">{slide.text}</p>
              <Link
                to={slide.to}
                tabIndex={i === index ? 0 : -1}
                className="mt-6 inline-flex w-fit items-center rounded-full bg-primary px-7 py-3 text-sm font-bold uppercase tracking-wide text-gray-900 shadow-sm transition hover:brightness-105"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}

        <button
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white drop-shadow hover:scale-110 md:left-5"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-9 w-9" strokeWidth={1.25} />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white drop-shadow hover:scale-110 md:right-5"
          aria-label="Next slide"
        >
          <ChevronRight className="h-9 w-9" strokeWidth={1.25} />
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "w-7 bg-primary" : "w-2 bg-white/70"}`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerSlider;
