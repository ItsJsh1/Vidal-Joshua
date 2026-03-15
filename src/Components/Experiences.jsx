import { useTheme } from "../context/ThemeContext";
import { experiences } from "../context/data/portfolioData";

export default function Experiences() {
  const { isDark } = useTheme();

  return (
    <div className={`rounded-xl p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"}`}>
      {/* Header row with title */}
      <div className="mb-3">
        <h2 className="text-xl font-bold">Experiences</h2>
      </div>

      {/* Timeline list */}
      <div className="flex flex-col gap-4">
        {/*
          .map() loops through the experiences array.
          For each experience object, it returns a JSX element.
          The "key" prop is required by React — it helps React track list items efficiently.
          We use the index as the key here, but ideally use a unique ID.
        */}
        {experiences.map((exp, index) => (
          <div key={index} className="flex gap-3 items-start">
            {/* Blue square dot + vertical line (timeline effect) */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-blue-600 rounded-sm mt-1 flex-shrink-0" />
              {/* Line below dot — hidden on last item */}
              {index < experiences.length - 1 && (
                <div className="w-0.5 bg-gray-500 opacity-40 flex-grow mt-1" style={{ minHeight: "30px" }} />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{exp.title}</p>
                  <p className="text-xs opacity-60 break-words">{exp.company}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end sm:min-w-[80px] sm:flex-shrink-0">
                  <span className="text-xs opacity-50">{exp.date}</span>
                  {/* Link icon - only shows if link exists */}
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 mt-1 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                      <span>View Site</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}