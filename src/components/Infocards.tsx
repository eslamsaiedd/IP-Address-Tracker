import { CircleCheck, Copy, MapPin, RotateCw, RouterIcon, CheckCheck } from "lucide-react";
import { useState } from "react";

type BoxProps = {
  className?: string;
  fontTitle?: string;
  title?: string;
  info?: string;
  lastInfo?: string;
  show?: boolean;
  quickTips?: boolean;
  showCopyButton?: boolean;
  showIconLocation?: boolean;
  showRouter?: boolean;
  onRetry?: () => void;
};

export function InfoCards({
  className,
  fontTitle,
  title,
  info,
  lastInfo,
  show,
  quickTips,
  showCopyButton,
  showIconLocation,
  showRouter,
  onRetry,
}: BoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!info) return;
    try {
      await navigator.clipboard.writeText(info);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = info;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`${className} dark:bg-[var(--inputBg-color)] flex flex-col justify-center gap-0 rounded-[10px] bg-white py-4 px-5`}
      role="region"
      aria-label={title}
    >
      {/* Label row */}
      {title && (
        <div className="text-[11px] font-semibold text-[var(--primary-color)] flex gap-1 items-center uppercase tracking-wider mb-1">
          {showIconLocation && <MapPin className="h-3.5 w-3.5" aria-hidden="true" />}
          {showRouter && <RouterIcon className="h-3.5 w-3.5" aria-hidden="true" />}
          {title}
        </div>
      )}

      {/* Main value */}
      {info && (
        <div
          className={`${fontTitle ?? "text-[18px] sm:text-[20px]"} dark:text-white font-bold text-[var(--black-color)] break-all leading-tight`}
          aria-live="polite"
        >
          {info}
        </div>
      )}

      {/* Sub value */}
      {lastInfo && (
        <div className="text-[12px] font-medium text-[#64748b] dark:text-[var(--gray-color)] mt-0.5">
          {lastInfo}
        </div>
      )}

      {/* Copy + Refresh buttons */}
      {showCopyButton && (
        <div className="w-full flex flex-wrap gap-2 pt-3">
          <button
            onClick={handleCopy}
            aria-label={copied ? "Copied!" : "Copy IP address"}
            className={`flex items-center gap-1.5 text-white rounded-[8px] py-2 px-4 text-[13px] font-medium cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E5BFF] ${
              copied
                ? "bg-green-500"
                : "bg-[var(--primary-color)] hover:bg-[#1a44e0]"
            }`}
          >
            {copied ? (
              <CheckCheck className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {copied ? "Copied!" : "Copy IP"}
          </button>

          <button
            onClick={onRetry ?? (() => window.location.reload())}
            aria-label="Refresh IP lookup"
            className="flex items-center gap-1.5 bg-[#E6E8EA] dark:bg-[#334155] dark:text-white text-[var(--black-color)] rounded-[8px] py-2 px-4 text-[13px] font-medium cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E5BFF]"
          >
            <RotateCw className="h-4 w-4" aria-hidden="true" />
            Refresh
          </button>
        </div>
      )}

      {/* Retry search button (error state) */}
      {show && (
        <div className="w-full pt-3 flex flex-wrap gap-2">
          <button
            onClick={onRetry ?? (() => window.location.reload())}
            aria-label="Retry search"
            className="flex items-center gap-1.5 bg-[var(--primary-color)] hover:bg-[#1a44e0] text-white rounded-[8px] py-2 px-4 text-[13px] font-medium cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E5BFF]"
          >
            <RotateCw className="h-4 w-4" aria-hidden="true" />
            Retry Search
          </button>
        </div>
      )}

      {/* Quick tips */}
      {quickTips && (
        <div
          className="text-[12px] text-[var(--gray-color)] dark:text-[var(--gray-color)] flex flex-col gap-2 pt-1"
          role="list"
          aria-label="Quick tips for valid IP format"
        >
          <div className="font-bold text-[13px] text-[var(--black-color)] dark:text-white">
            Quick Tips
          </div>
          {[
            "Check for trailing spaces",
            "Ensure max octet is 255",
            "Remove https:// prefix",
          ].map((tip) => (
            <div key={tip} className="flex items-center gap-1.5" role="listitem">
              <CircleCheck className="w-3.5 h-3.5 text-[var(--primary-color)] flex-shrink-0" aria-hidden="true" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
