import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../context/ThemeContext";
import { galleryImages } from "../context/data/portfolioData";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function CarouselGallery() {
  const { isDark } = useTheme();

  // useState(0) means: "start at index 0"
  // currentIndex is the value, setCurrentIndex is the function to change it
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prev = () => {
    // If we're at the start, wrap to the end. Otherwise go back one.
    setCurrentIndex(i => (i === 0 ? galleryImages.length - 1 : i - 1));
  };

  const next = () => {
    setCurrentIndex(i => (i === galleryImages.length - 1 ? 0 : i + 1));
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Lock body scroll when modal is open and handle keyboard navigation
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isModalOpen]);

  return (
    <>
    <div className={`rounded-xl p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <h2 className="text-xl font-bold mb-3">Carousel Gallery</h2>

      <div className="relative flex items-center gap-2">
        {/* Left arrow */}
        <button onClick={prev} className="p-1 rounded-full opacity-60 hover:opacity-100">
          <ChevronLeft size={20} />
        </button>

        {/* Images — shows a scrollable strip, highlights current */}
        <div className="flex gap-2 overflow-x-auto flex-1 scrollbar-hide">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              onClick={() => openModal(index)}
              className={`flex-shrink-0 w-20 h-14 sm:w-28 sm:h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${
                index === currentIndex ? "ring-2 ring-blue-500" : "opacity-60"
              } ${isDark ? "bg-gray-700" : "bg-gray-400"}`}
            >
              <img src={img} alt={`gallery-${index}`} className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button onClick={next} className="p-1 rounded-full opacity-60 hover:opacity-100">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>

    {/* Fullscreen Modal - rendered via Portal */}
    {isModalOpen && createPortal(
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
        onClick={closeModal}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {/* Close button */}
        <button 
          onClick={closeModal}
          className="absolute top-6 right-6 p-3 text-white bg-black/60 rounded-full hover:bg-black/80 transition-colors z-10"
        >
          <X size={28} />
        </button>

        {/* Navigation arrows */}
        <button 
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white bg-black/60 rounded-full hover:bg-black/80 transition-colors"
        >
          <ChevronLeft size={36} />
        </button>

        {/* Image container */}
        <div className="flex items-center justify-center w-full h-full p-12">
          <img 
            src={galleryImages[currentIndex]} 
            alt={`gallery-${currentIndex}`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white bg-black/60 rounded-full hover:bg-black/80 transition-colors"
        >
          <ChevronRight size={36} />
        </button>

        {/* Image counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 text-white bg-black/60 rounded-full text-sm font-medium">
          {currentIndex + 1} / {galleryImages.length}
        </div>
      </div>,
      document.body
    )}
    </>
  );
}