import { toPersianDigits } from "../lib/format";

function ProgressRing({ value, size = 96, stroke = 10 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`درصد پیشرفت: ${toPersianDigits(value)} درصد`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="taskino-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7e14ff" />
            <stop offset="55%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#f0abfc" />
          </linearGradient>
        </defs>

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-line"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#taskino-ring)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </svg>

      <div className="absolute inset-0 grid place-items-center">
        <span className="text-xl font-bold text-fg">
          {toPersianDigits(value)}
          <span className="ms-0.5 text-xs font-bold text-primary">٪</span>
        </span>
      </div>
    </div>
  );
}

export default ProgressRing;
