import { useTheme } from "../context/ThemeContext";
import { driveAttachments } from "../context/data/portfolioData";
import { ExternalLink, FileText } from "lucide-react";

export default function DriveAttachments() {
  const { isDark } = useTheme();

  return (
    <div className={`rounded-xl p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">PUP-T On the Job Training Requirements</h2>
          <p className="text-xs opacity-70 mt-1">Official OJT documents and required submissions.</p>
        </div>
        <div className={`text-[10px] sm:text-xs font-semibold px-2 py-1 border ${isDark ? "border-gray-600 text-gray-200 bg-gray-700" : "border-gray-300 text-gray-700 bg-gray-100"}`}>
          Total: {driveAttachments.length}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {driveAttachments.map((file, index) => (
          <a
            key={index}
            href={file.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group rounded-lg p-3 border transition-all duration-200 hover:scale-[1.02] ${
              isDark
                ? "bg-gray-700 border-gray-600 hover:border-blue-400"
                : "bg-gray-50 border-gray-200 hover:border-blue-500"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 min-w-0">
                <FileText size={16} className="opacity-70 flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="text-sm font-semibold leading-tight block line-clamp-2">{file.label}</span>
                </div>
              </div>
              <ExternalLink size={15} className="opacity-60 group-hover:opacity-100 flex-shrink-0" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}