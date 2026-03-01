import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { galleryImages } from "../context/data/portfolioData";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarouselGallery() {
  const { isDark } = useTheme();

  // useState(0) means: "start at index 0"
  // currentIndex is the value, setCurrentIndex is the function to change it
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    // If we're at the start, wrap to the end. Otherwise go back one.
    setCurrentIndex(i => (i === 0 ? galleryImages.length - 1 : i - 1));
  };

  const next = () => {
    setCurrentIndex(i => (i === galleryImages.length - 1 ? 0 : i + 1));
  };

  return (
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
              onClick={() => setCurrentIndex(index)}
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
  );
}