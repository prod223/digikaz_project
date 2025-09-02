"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const defaultItems = [
  {
    id: "item-1",
    title: "Chambre moderne",
    subtitle: "Plateau - Calme et lumineux",
    imageUrl: "/chambre.png",
    pricePerMonth: 120000,
    location: "Dakar, Plateau",
  },
  {
    id: "item-2",
    title: "Studio cosy",
    subtitle: "Proche université",
    imageUrl: "/chambre2.png",
    pricePerMonth: 95000,
    location: "Dakar, Fann",
  },
  {
    id: "item-3",
    title: "Appartement étudiant",
    subtitle: "2 pièces rénové",
    imageUrl: "/chambre3.png",
    pricePerMonth: 150000,
    location: "Dakar, Liberté 6",
  },
  {
    id: "item-4",
    title: "Chambre simple",
    subtitle: "Quartier tranquille",
    imageUrl: "/chambre5.png",
    pricePerMonth: 80000,
    location: "Dakar, Ouakam",
  },
  {
    id: "item-5",
    title: "Chambre moderne",
    subtitle: "Plateau - Calme et lumineux",
    imageUrl: "/chambre.png",
    pricePerMonth: 120000,
    location: "Dakar, Plateau",
  },
  {
    id: "item-6",
    title: "Appartement étudiant",
    subtitle: "2 pièces rénové",
    imageUrl: "/chambre3.png",
    pricePerMonth: 150000,
    location: "Dakar, Liberté 6",
  },
  
];

export default function HorizontalCarousel({ items = defaultItems }) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef({ startX: 0, scrollLeft: 0 });
  const [activeId, setActiveId] = useState(items[0]?.id ?? null);

  const scrollByAmount = (amount) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollBy({ left: amount, behavior: "smooth" });
  };

  const scrollLeft = () => {
    const container = containerRef.current;
    if (!container) return;
    const delta = Math.max(320, Math.floor(container.clientWidth * 0.9));
    scrollByAmount(-delta);
  };

  const scrollRight = () => {
    const container = containerRef.current;
    if (!container) return;
    const delta = Math.max(320, Math.floor(container.clientWidth * 0.9));
    scrollByAmount(delta);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKey = (e) => {
      if (e.key === "ArrowLeft") scrollLeft();
      if (e.key === "ArrowRight") scrollRight();
    };

    container.addEventListener("keydown", handleKey);
    return () => container.removeEventListener("keydown", handleKey);
  }, []);

  // Observe which card is most visible to highlight it
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll('[data-carousel-item]'));
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        for (const entry of entries) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
        const id = best?.target?.getAttribute('data-id');
        if (id) setActiveId(id);
      },
      { root: container, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const onMouseDown = (e) => {
    const container = containerRef.current;
    if (!container) return;
    setIsDragging(true);
    dragStateRef.current = {
      startX: e.pageX - container.offsetLeft,
      scrollLeft: container.scrollLeft,
    };
  };

  const onMouseLeave = () => setIsDragging(false);
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = (e) => {
    const container = containerRef.current;
    if (!container || !isDragging) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragStateRef.current.startX) * 1.2;
    container.scrollLeft = dragStateRef.current.scrollLeft - walk;
  };

  const onTouchStart = (e) => {
    const container = containerRef.current;
    if (!container) return;
    setIsDragging(true);
    const touch = e.touches[0];
    dragStateRef.current = {
      startX: touch.pageX - container.offsetLeft,
      scrollLeft: container.scrollLeft,
    };
  };

  const onTouchMove = (e) => {
    const container = containerRef.current;
    if (!container || !isDragging) return;
    const touch = e.touches[0];
    const x = touch.pageX - container.offsetLeft;
    const walk = (x - dragStateRef.current.startX) * 1.2;
    container.scrollLeft = dragStateRef.current.scrollLeft - walk;
  };

  const onTouchEnd = () => setIsDragging(false);

  return (
    <div className="relative group">
      {/* Floating Left Button - Facebook Style */}
      <button
        aria-label="Précédent"
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white"
      >
        <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Floating Right Button - Facebook Style */}
      <button
        aria-label="Suivant"
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white"
      >
        <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Edge fade gradients - wider for emphasis */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-black to-transparent rounded-l-2xl" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-black to-transparent rounded-r-2xl" />

      <div
        ref={containerRef}
        tabIndex={0}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth select-none cursor-grab active:cursor-grabbing scrollbar-hide px-1"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {items.map((item) => (
          <article
            key={item.id}
            data-carousel-item
            data-id={item.id}
            className={`snap-center shrink-0 relative overflow-hidden rounded-3xl bg-black shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out w-[200px] h-[360px] sm:w-[230px] sm:h-[410px] md:w-[260px] md:h-[460px] lg:w-[300px] lg:h-[520px] ${
              activeId === item.id ? 'scale-100 ring-1 ring-white/20' : 'scale-[0.95] opacity-90'
            }`}
          >
            {/* Image Background */}
            <div className="absolute inset-0">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 230px, 260px"
                className="object-cover"
                priority={false}
              />
              {/* Gradient Overlay - Facebook Style */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            </div>

            {/* Heart Button - Top Right */}
            <button className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-all duration-200 hover:scale-110">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Content - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
              <div className="mb-2">
                <h3 className="text-sm font-bold mb-1 line-clamp-1">{item.title}</h3>
                <p className="text-xs text-white/80 line-clamp-1">{item.subtitle}</p>
              </div>
              
              {/* Price Tag - Facebook Style */}
              <div className="inline-flex items-center bg-gold-500 px-2 py-1 rounded-full">
                <span className="text-xs font-bold text-white">
                  {Math.floor(item.pricePerMonth / 1000)}k €
                </span>
              </div>
              
              {/* Location - Bottom */}
              <div className="mt-1 flex items-center">
                <svg className="w-3 h-3 text-white/60 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs text-white/60">
                  {item.location.split(', ')[1] || item.location}
                </span>
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gold-500/0 hover:bg-gold-500/10 transition-colors duration-300" />
          </article>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {items.map((it) => (
          <span
            key={`dot-${it.id}`}
            className={`block rounded-full transition-all duration-300 ${
              activeId === it.id ? 'w-3 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}


