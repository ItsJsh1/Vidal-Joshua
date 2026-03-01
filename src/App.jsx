import { useTheme } from "./context/ThemeContext";
import Header from "./Components/Header";
import AboutMe from "./Components/AboutMe";
import Experiences from "./Components/Experiences";
import AccomplishmentReport from "./Components/AccomplishmentReport";
import Projects from "./Components/Projects";
import TechStacks from "./Components/TechStacks";
import DriveAttachments from "./Components/DriveAttachments";
import CarouselGallery from "./Components/CarouselGallery";
import Footer from "./Components/Footer";

export default function App() {
  const { isDark } = useTheme();

  return (
    // This div switches class based on isDark
    // In Tailwind: bg-gray-100 = light gray, bg-gray-900 = very dark
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}>
      <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-4">
        
        <div className="animate-fade-in-up delay-1">
          <Header />
        </div>

        {/* Two-column layout — matches your wireframe exactly */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left column — takes up more space */}
          <div className="flex flex-col gap-4 md:flex-[1.4] transition-all duration-300 hover:backdrop-blur-sm">
            <div className="animate-fade-in-up delay-2">
              <AboutMe />
            </div>
            <div className="animate-fade-in-up delay-4">
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
            <div className="animate-fade-in-up delay-5">
              <AccomplishmentReport />
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up delay-7">
          <DriveAttachments />
        </div>
        <div className="animate-fade-in-up delay-8">
          <CarouselGallery />
        </div>
        <div className="animate-fade-in-up delay-9">
          <Footer />
        </div>

      </div>
    </div>
  );
}