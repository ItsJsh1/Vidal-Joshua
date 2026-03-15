import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../context/ThemeContext";
import { profile, certifications } from "../context/data/portfolioData";
import { Moon, Sun, MapPin, Laptop, BadgeCheck, Mail, Award, Download, ExternalLink } from "lucide-react";

export default function Header() {
  const { isDark, toggleDark } = useTheme();
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
  const CertificationsModal = () => {
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
          className={`relative w-[90%] max-w-md max-h-[70vh] rounded-2xl p-5 sm:p-6 flex flex-col ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"} shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-500/30 flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <Award size={20} className="text-blue-500" />
              My Certifications
            </h2>
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
            <div className="flex flex-col gap-3">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg transition-all duration-200 ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"}`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{cert.name}</p>
                      <p className="text-xs opacity-60 mt-1">Issued by {cert.issuer}</p>
                      <p className="text-xs opacity-50 mt-0.5">{cert.date}</p>
                    </div>
                    {cert.link && cert.link !== "#" && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 p-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  // A reusable card style — notice how we pass isDark to change colors
  const cardClass = `rounded-xl p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"}`;

  return (
    <div className={cardClass}>
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        
        {/* Left: Profile pic + info */}
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start w-full sm:w-auto">
          {/* Profile Picture */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-400 flex-shrink-0">
            <img
              src={profile.profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
              // If image fails to load, show initials area
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>

          {/* Name, location, roles */}
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold flex items-center justify-center sm:justify-start gap-2">
              {profile.name}
              <BadgeCheck size={20} className="text-blue-500" fill="currentColor" stroke="white" />
            </h1>
            <p className="text-sm opacity-70 flex items-center justify-center sm:justify-start gap-1">
              <MapPin size={14} />
              {profile.location}
            </p>
            {/* 
              .join(" | ") turns ["Software Developer", "FullStack Developer"]
              into "Software Developer | FullStack Developer"
            */}
            <p className="text-xs sm:text-sm opacity-70 flex items-center justify-center sm:justify-start gap-1">
              <Laptop size={14} />
              {profile.roles.join(" | ")}
            </p>

            {/* School */}
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
              <div className="w-5 h-5 rounded overflow-hidden flex-shrink-0">
                <img
                  src={profile.schoolLogo}
                  alt="School"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="w-full h-full flex items-center justify-center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></span>'; }}
                />
              </div>
              <p className="text-xs sm:text-sm opacity-70">{profile.school}</p>
            </div>

            {/* Action buttons + total hours */}
            <div className="mt-3 w-full flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-start gap-2">
              {/* Email Me button */}
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 bg-gray-50 text-gray-900 font-semibold text-xs sm:text-sm px-3 py-1.5 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.2)] hover:bg-blue-500 hover:text-white transition animate-pump"
              >
                <Mail size={14} />
                Email Me
              </a>

              {/* Certifications button */}
              <button 
                onClick={openModal}
                className="flex items-center gap-1.5 bg-gray-50 text-gray-900 font-semibold text-xs sm:text-sm px-3 py-1.5 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.2)] hover:bg-blue-500 hover:text-white transition"
              >
                <Award size={14} />
                Certifications
              </button>

              {/* Download Accomplishment Report button */}
              <a 
                href="https://docs.google.com/document/d/1YzfGcoevMv27C-_J3wGTapfyF0ez67j1/edit?usp=sharing&ouid=112144033677438935308&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden flex items-center gap-1.5 bg-gray-50 text-gray-900 font-semibold text-xs sm:text-sm px-3 py-1.5 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.2)] hover:bg-blue-500 hover:text-white transition"
              >
                <span className="absolute inset-0 animate-shine"></span>
                <Download size={14} className="relative" />
                <span className="relative">Download Report</span>
              </a>

              <div
                className={`whitespace-nowrap ml-0 sm:ml-auto text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-md border ${
                  isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-gray-100 border-gray-200 text-gray-700"
                }`}
              >
                Hours: {profile.totalHours}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Dark mode toggle */}
        <button
          onClick={toggleDark}
          className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

      </div>

      {/* Certifications Modal */}
      <CertificationsModal />
    </div>
  );
}