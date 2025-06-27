'use client';

import * as React from 'react';

interface CircularProgressProps extends React.SVGProps<SVGSVGElement> {
  progress: number;
}

const CircularProgress = ({ progress }: CircularProgressProps) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = React.useState(circumference);
  const [displayProgress, setDisplayProgress] = React.useState(0);

  React.useEffect(() => {
    const progressOffset = circumference - (progress / 100) * circumference;
    setOffset(progressOffset);

    const interval = setInterval(() => {
        setDisplayProgress(prev => {
            if (prev < progress) {
                return prev + 1;
            }
            clearInterval(interval);
            return progress;
        });
    }, 15);

    return () => clearInterval(interval);
  }, [progress, circumference]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-40 h-40" viewBox="0 0 120 120">
        <circle
          className="text-secondary"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          className="text-primary"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          transform="rotate(-90 60 60)"
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />
      </svg>
      <span className="absolute text-3xl font-bold font-headline text-foreground">
        {`${displayProgress}%`}
      </span>
    </div>
  );
};

export { CircularProgress };
