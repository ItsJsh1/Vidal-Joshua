import { useTheme } from "../context/ThemeContext";
import { profile, socialMedia, contactInfo } from "../context/data/portfolioData";

export default function Footer() {
  const { isDark } = useTheme();
  const cardClass = `rounded-xl p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"}`;
  const currentYear = new Date().getFullYear();
  const featuredVideos = [
    {
      title: "YouTube Video Resume",
      videoId: profile.ytVideoId,
    },
    {
      title: "Accomplishment Report Video",
      videoId: "dV1SpHeG6xI",
    },
  ];

  return (
  <>
    <div className="flex flex-col gap-4">

      {/* Videos Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featuredVideos.map((video, index) => (
          <div key={`video-${index}`} className={cardClass}>
            <h2 className="text-xl font-bold mb-3">{video.title}</h2>
            <div className="rounded-lg overflow-hidden aspect-video bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ))}
      </div>

      {/* Social Media & Contact Info */}
      <div className={cardClass}>
        <h2 className="text-xl font-bold mb-3">Connect With Me</h2>
        <div className="space-y-5 mt-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide opacity-70 mb-3">Socials</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {socialMedia.map((social, index) => (
                <a
                  key={`social-${index}`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative group flex items-center justify-center p-3 rounded-lg hover:scale-105 transition-all ${
                    isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  <img
                    src={isDark && social.darkIcon ? social.darkIcon : social.icon}
                    alt={social.platform}
                    className={`w-8 h-8 sm:w-9 sm:h-9 object-contain ${isDark && social.darkIcon ? "invert" : ""}`}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
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
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide opacity-70 mb-3">Contact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactInfo.map((contact, index) => (
                <a
                  key={`contact-${index}`}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  <img
                    src={contact.icon}
                    alt={contact.label}
                    className="w-8 h-8 object-contain shrink-0"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-tight">{contact.label}</p>
                    <p className="text-xs opacity-80 truncate">{contact.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>

    {/* Copyright Footer */}
    <div className={`mt-8 pt-6 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
      <p className="text-center text-sm opacity-70">
        © {currentYear} {profile.name}. All rights reserved.
      </p>
    </div>
  </>
  );
}
