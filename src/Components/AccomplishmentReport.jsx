import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../context/ThemeContext";
import { accomplishments } from "../context/data/portfolioData";

export default function AccomplishmentReport() {
  const { isDark } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Show only first 5 items in the card, all items in modal
  const displayedAccomplishments = accomplishments.slice(0, 5);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Modal Component using Portal
  const Modal = () => {
    if (!isModalOpen) return null;

    return createPortal(
      <div 
        className="fixed inset-0 flex items-center justify-center"
        style={{ zIndex: 99999 }}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={closeModal}
        />
        
        {/* Modal Content */}
        <div 
          className={`relative w-[90%] max-w-md h-[70vh] sm:h-[65vh] rounded-2xl p-5 sm:p-6 flex flex-col ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"} shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-500/30 flex-shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold truncate">All Accomplishments</h2>
              <a
                href="https://docs.google.com/document/d/1YzfGcoevMv27C-_J3wGTapfyF0ez67j1/edit?usp=sharing&ouid=112144033677438935308&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-shrink-0 text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-medium transition-all duration-200 ${
                  isDark
                    ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                }`}
              >
                Download
              </a>
            </div>
            <button 
              onClick={closeModal}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Body - Scrollable */}
          <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
            <div className="flex flex-col gap-4">
              {accomplishments.map((item, index) => {
                // Calculate week number so Day 01-05 = Week 1, Day 06-10 = Week 2, etc.
                const totalWeeks = Math.ceil(accomplishments.length / 5);
                const weekNumber = totalWeeks - Math.floor(index / 5);
                const isFirstOfWeek = index % 5 === 0;
                const isLastOfWeek = index % 5 === 4 || index === accomplishments.length - 1;
                const isLastItem = index === accomplishments.length - 1;

                return (
                  <div key={index}>
                    {/* Week Divider */}
                    {isFirstOfWeek && (
                      <div className={`flex items-center gap-3 mb-4 ${index > 0 ? 'mt-2' : ''}`}>
                        <div className={`h-px flex-1 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                          Week {weekNumber}
                        </span>
                        <div className={`h-px flex-1 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
                      </div>
                    )}

                    {/* Accomplishment Item */}
                    <div className="flex gap-3 items-start">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-sm mt-1 flex-shrink-0" />
                        {!isLastOfWeek && !isLastItem && (
                          <div className="w-0.5 bg-gray-500 opacity-40 flex-grow mt-1" style={{ minHeight: "30px" }} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                          <p className="font-semibold text-sm">{item.activity}</p>
                        </div>
                        <p className="text-xs opacity-50 mt-0.5">{item.date}</p>
                        {item.description && (
                          <p className="text-xs opacity-60 mt-1">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-4 pt-3 border-t border-gray-500/30 flex-shrink-0">
            <div className="flex justify-between items-center">
              <p className="text-xs opacity-50">
                Total: {accomplishments.length} accomplishments
              </p>
              <p className="text-xs opacity-50">
                Total Hours: {accomplishments.length * 8} hrs
              </p>
            </div>
          </div>
        </div>

        {/* Custom scrollbar styles */}
        <style>{`
          .custom-scrollbar {
            overflow-y: scroll;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: ${isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)'};
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: ${isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.35)'};
          }
        `}</style>
      </div>,
      document.body
    );
  };

  return (
    <>
      {/* Main Card */}
      <div className={`rounded-xl p-3 sm:p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg sm:text-xl font-bold">Accomplishment Report</h2>
          <button 
            onClick={openModal}
            className={`flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-full font-medium transition-all duration-200 ${
              isDark 
                ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30" 
                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
            }`}
          >
            View
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {displayedAccomplishments.map((item, index) => (
            <div key={index} className="flex gap-2 sm:gap-3 items-start">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-600 rounded-sm mt-1 flex-shrink-0" />
                {index < displayedAccomplishments.length - 1 && (
                  <div className="w-0.5 bg-gray-500 opacity-40 flex-grow mt-1" style={{ minHeight: "24px" }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col xs:flex-row xs:justify-between gap-0.5 xs:gap-2">
                  <p className="font-semibold text-xs sm:text-sm truncate">{item.activity}</p>
                </div>
                <p className="text-[10px] sm:text-xs opacity-60 mt-0.5 sm:mt-1">{item.date}</p>
              </div>
            </div>
          ))}
        </div>

        {accomplishments.length > 5 && (
          <p className="text-[10px] sm:text-xs opacity-50 mt-3 text-center">
            +{accomplishments.length - 5} more accomplishments
          </p>
        )}
      </div>

      {/* Modal rendered via Portal */}
      <Modal />
    </>
  );
}