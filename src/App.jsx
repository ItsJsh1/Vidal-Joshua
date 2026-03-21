import { useEffect, useState } from "react";
import { useTheme } from "./context/ThemeContext";
import Header from "./Components/Header";
import AboutMe from "./Components/AboutMe";
import Experiences from "./Components/Experiences";
import AccomplishmentReport from "./Components/AccomplishmentReport";
import Projects from "./Components/Projects";
import TechStacks from "./Components/TechStacks";
import DriveAttachments from "./Components/DriveAttachments";
import PracticumActivities from "./Components/PracticumActivities";
import QuickNavBar from "./Components/QuickNavBar";
import CarouselGallery from "./Components/CarouselGallery";
import Footer from "./Components/Footer";

export default function App() {
  const { isDark } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  return (
    // This div switches class based on isDark
    // In Tailwind: bg-gray-100 = light gray, bg-gray-900 = very dark
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[9999]">
        <div
          className="h-full bg-blue-500 transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-4">
        
        <div className="animate-fade-in-up delay-1">
          <Header />
        </div>
        <div className="animate-fade-in-up delay-1">
          <QuickNavBar />
        </div>

        {/* Two-column layout — matches your wireframe exactly */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left column — takes up more space */}
          <div className="flex flex-col gap-4 md:flex-[1.4] transition-all duration-300 hover:backdrop-blur-sm">
            <div className="animate-fade-in-up delay-2">
              <AboutMe />
            </div>
            <div id="projects-section" className="animate-fade-in-up delay-4 scroll-mt-24">
              <Projects />
            </div>
            <div className="animate-fade-in-up delay-6">
              <TechStacks />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4 md:flex-1 transition-all duration-300 hover:backdrop-blur-sm">
            <div className="animate-fade-in-up delay-3">
              <Experiences />
            </div>
            <div id="accomplishment-report-section" className="animate-fade-in-up delay-5 scroll-mt-24">
              <AccomplishmentReport />
            </div>
          </div>
        </div>

        <div id="ojt-requirements-section" className="animate-fade-in-up delay-7 scroll-mt-24">
          <DriveAttachments />
        </div>
        <div id="practicum-activities-section" className="animate-fade-in-up delay-8 scroll-mt-24">
          <PracticumActivities />
        </div>
        <div className="animate-fade-in-up delay-9">
          <CarouselGallery />
        </div>
        <div className="animate-fade-in-up delay-10">
          <Footer />
        </div>

      </div>
    </div>
  );
}