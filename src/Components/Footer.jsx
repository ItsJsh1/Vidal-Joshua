import { useTheme } from "../context/ThemeContext";
import { profile, socialMedia, contactInfo } from "../context/data/portfolioData";

export default function Footer() {
  const { isDark } = useTheme();
  const cardClass = `rounded-xl p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"}`;

  return (
    <div className="flex flex-col md:flex-row gap-4">
      
      {/* YT Video Resume */}
      <div className={`${cardClass} w-full md:flex-1`}>
        <h2 className="text-xl font-bold mb-3">YT Video Resume</h2>
        <div className="rounded-lg overflow-hidden aspect-video bg-black">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${profile.ytVideoId}`}
            title="Video Resume"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Social Media & Contact Info */}
      <div className={`${cardClass} w-full md:flex-1`}>
        <h2 className="text-xl font-bold mb-3">Connect With Me</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
          {/* Row 1 & 2: Social Media Icons */}
          {socialMedia.map((social, index) => (
            <a
              key={`social-${index}`}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative group flex items-center justify-center p-3 rounded-lg hover:scale-110 transition-all ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <img 
                src={isDark && social.darkIcon ? social.darkIcon : social.icon} 
                alt={social.platform}
                className={`w-8 h-8 sm:w-10 sm:h-10 object-contain ${isDark && social.darkIcon ? "invert" : ""}`}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              {/* Tooltip */}
              <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10 ${
                isDark ? "bg-gray-700 text-white" : "bg-gray-900 text-white"
              }`}>
                {social.platform}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${
                  isDark ? "border-t-gray-700" : "border-t-gray-900"
                }`} />
              </div>
            </a>
          ))}
          {/* Row 3 & 4: Contact Info Icons */}
          {contactInfo.map((contact, index) => (
            <a
              key={`contact-${index}`}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative group flex items-center justify-center p-3 rounded-lg hover:scale-110 transition-all ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <img 
                src={contact.icon} 
                alt={contact.label}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              {/* Tooltip */}
              <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10 ${
                isDark ? "bg-gray-700 text-white" : "bg-gray-900 text-white"
              }`}>
                {contact.label}: {contact.value}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${
                  isDark ? "border-t-gray-700" : "border-t-gray-900"
                }`} />
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
