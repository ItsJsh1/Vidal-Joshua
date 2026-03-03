import { useTheme } from "../context/ThemeContext";
import { driveAttachments } from "../context/data/portfolioData";
import { FileText } from "lucide-react";

// Helper function to extract Google Drive file ID from various URL formats
function getGDriveFileId(url) {
  if (!url || url === "#") return null;
  // Match /d/FILE_ID/ or id=FILE_ID
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

// Get thumbnail URL for Google Drive file
function getGDriveThumbnail(url) {
  const fileId = getGDriveFileId(url);
  if (!fileId) return null;
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
}

export default function DriveAttachments() {
  const { isDark } = useTheme();

  return (
    <div>
      {/* Section Title */}
      <h2 className="text-2xl font-bold mb-4">PUP-T On the Job Training Requirements</h2>
      
      {/* Responsive grid: 2 cols on mobile, 3 on sm, 4 on md, 5 on lg */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {driveAttachments.map((file, index) => {
        const thumbnail = getGDriveThumbnail(file.link);
        
        return (
          <a
            key={index}
            href={file.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group rounded-xl overflow-hidden shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] flex flex-col transition-all duration-300 border-b-4 border-transparent hover:border-blue-500 ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            {/* Preview thumbnail area */}
            <div className={`aspect-[4/3] flex items-center justify-center overflow-hidden ${
              isDark ? "bg-gray-700" : "bg-gray-100"
            }`}>
              {thumbnail ? (
                <img 
                  src={thumbnail} 
                  alt={file.label}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`${thumbnail ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}
              >
                <FileText className="opacity-40" size={32} />
              </div>
            </div>
            
            {/* Label area */}
            <div className="p-3">
              <span className="font-semibold text-xs leading-tight line-clamp-2 block">
                {file.label}
              </span>
            </div>
          </a>
        );
      })}
      </div>
    </div>
  );
}