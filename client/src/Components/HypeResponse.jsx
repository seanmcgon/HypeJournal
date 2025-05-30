import { useEffect, useRef } from "react";

export default function HypeResponse({ response }) {
  return (
    <div className="w-full flex flex-col items-center pt-6 max-w-11/12">
      <BorderRevealBox>
        <div className="relative z-10 text-white font-bold text-center text-xl">{response}</div>
      </BorderRevealBox>
    </div>
  );
}

function BorderRevealBox({ children }) {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const length = path.getTotalLength();

    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.getBoundingClientRect(); // trigger reflow
    path.style.transition = "stroke-dashoffset 1s ease-in-out";
    path.style.strokeDashoffset = "0";
  }, []);

  return (
    <div className="relative w-full h-auto">
      <svg
        className="absolute top-0 left-0 w-full h-full rounded-2xl"
        viewBox="0 0 512 150"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          ref={pathRef}
          x="2"
          y="2"
          width="508"
          height="146"
          rx="16"
          ry="16"
          stroke="#d946ef"
          strokeWidth="3"
          style={{
            filter: "drop-shadow(0 0 8px #d946ef)",
          }}
        />
      </svg>
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
