import { useTheme } from "../context/ThemeContext";
import { practicumActivities } from "../context/data/portfolioData";
import { ExternalLink, FolderOpen } from "lucide-react";

export default function PracticumActivities() {
  const { isDark } = useTheme();

  return (
    <div className={`rounded-xl p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <div className="mb-3">
        <h2 className="text-xl font-bold">Practicum Activities</h2>
        <p className="text-xs opacity-70 mt-1">Attach your Google Drive links for each lesson activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {practicumActivities.map((activity, index) => (
          <a
            key={index}
            href={activity.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group rounded-lg p-3 border transition-all duration-200 hover:scale-[1.02] ${
              isDark
                ? "bg-gray-700 border-gray-600 hover:border-blue-400"
                : "bg-gray-50 border-gray-200 hover:border-blue-500"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <FolderOpen size={16} className="opacity-70 flex-shrink-0" />
                <span className="text-sm font-semibold truncate">{activity.label}</span>
              </div>
              <ExternalLink size={15} className="opacity-60 group-hover:opacity-100 flex-shrink-0" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
