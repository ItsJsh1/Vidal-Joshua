import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { label: "Accom. Report", targetId: "accomplishment-report-section" },
  { label: "Requirements", targetId: "ojt-requirements-section" },
  { label: "Activities", targetId: "practicum-activities-section" },
  { label: "Video Resume", targetId: "youtube-video-resume-section" },
  { label: "Accom. Report Video", targetId: "accomplishment-report-video-section" },
];

export default function QuickNavBar() {
  const { isDark } = useTheme();
  const [activeTargetId, setActiveTargetId] = useState("");

  const scrollToSection = (targetId) => {
    const section = document.getElementById(targetId);
    if (!section) return;

    setActiveTargetId(targetId);

    // Clear previous highlight animations
    document.querySelectorAll(".section-focus-zoom").forEach((el) => {
      el.classList.remove("section-focus-zoom");
    });

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Trigger highlight animation after scrolling starts
    setTimeout(() => {
      section.classList.remove("section-focus-zoom");
      // Force reflow so animation can re-run on repeated clicks
      void section.offsetWidth;
      section.classList.add("section-focus-zoom");

      // Remove highlight class so it can be replayed on next click
      setTimeout(() => {
        section.classList.remove("section-focus-zoom");
      }, 900);
    }, 350);
  };

  return (
    <div className={`rounded-xl p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <div className="mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide opacity-70">Quick Navbar</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {navItems.map((item) => (
          <button
            key={item.targetId}
            type="button"
            onClick={() => scrollToSection(item.targetId)}
            className={`flex items-center gap-1.5 font-semibold text-xs sm:text-sm px-3 py-1.5 rounded-none shadow-[4px_0_8px_-2px_rgba(0,0,0,0.2)] transition-all duration-300 ${
              isDark
                ? "bg-gray-700 text-gray-100 hover:bg-blue-500 hover:text-white"
                : "bg-gray-50 text-gray-900 hover:bg-blue-500 hover:text-white"
            } ${
              activeTargetId === item.targetId
                ? ""
                : ""
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
