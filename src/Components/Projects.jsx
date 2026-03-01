import { useState, useEffect, memo } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../context/ThemeContext";
import { projects } from "../context/data/portfolioData";

// Separate component for project card with its own slideshow state
const ProjectCard = memo(({ project, isDark }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!project.images || project.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % project.images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [project.images]);

  return (
    <div
      className={`p-4 shadow-md hover:bg-blue-500 hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer rounded-lg group ${
        isDark ? "bg-gray-700" : "bg-gray-50"
      }`}
    >
      {/* Image Preview with Slideshow */}
      <div className={`relative w-full h-28 rounded-md mb-3 flex items-center justify-center overflow-hidden ${
        isDark ? "bg-gray-600" : "bg-gray-200"
      }`}>
        {project.images && project.images.length > 0 ? (
          <>
            <img 
              src={project.images[currentImageIndex]} 
              alt={project.title} 
              className="w-full h-full object-cover transition-opacity duration-500" 
            />
            {/* Dots indicator */}
            {project.images.length > 1 && (
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                {project.images.map((_, imgIdx) => (
                  <div 
                    key={imgIdx} 
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      currentImageIndex === imgIdx ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
      </div>
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">{project.title}</p>
          <p className="text-xs opacity-60 mt-1">{project.description}</p>
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 flex-shrink-0 opacity-60 hover:opacity-100 group-hover:text-white transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
    </div>
  );
});

export default function Projects() {
  const { isDark } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          className={`relative w-[90%] max-w-2xl h-[70vh] sm:h-[65vh] rounded-2xl p-5 sm:p-6 flex flex-col ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"} shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-500/30 flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-bold">All Projects</h2>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} isDark={isDark} />
              ))}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-4 pt-3 border-t border-gray-500/30 flex-shrink-0">
            <p className="text-xs opacity-50">
              Total: {projects.length} projects
            </p>
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
      <div className={`rounded-xl p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Projects</h2>
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

        {/* 
          grid grid-cols-2 = two columns
          gap-3 = space between grid items
        */}
        <div className="grid grid-cols-2 gap-3">
          {projects.slice(0, 4).map((project, index) => (
            <div
              key={index}
              className={`p-3 shadow-md hover:bg-blue-500 hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer group ${
                isDark ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{project.title}</p>
                  <p className="text-xs opacity-60 mt-1 line-clamp-2">{project.description}</p>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 flex-shrink-0 opacity-60 hover:opacity-100 group-hover:text-white transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal rendered via Portal */}
      <Modal />
    </>
  );
}