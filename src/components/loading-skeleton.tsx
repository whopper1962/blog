interface LoadingListSkeletonProps {
  rows?: number;
  minHeightClassName?: string;
  className?: string;
  ariaLabel?: string;
}

export function LoadingListSkeleton({
  rows = 6,
  minHeightClassName = "min-h-[60vh] sm:min-h-[40vh]",
  className = "",
  ariaLabel = "Loading",
}: LoadingListSkeletonProps) {
  return (
    <div
      className={`space-y-4 ${minHeightClassName} ${className}`.trim()}
      aria-busy="true"
      aria-live="polite"
      role="status"
      aria-label={ariaLabel}
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-3 w-28 bg-muted rounded mb-2" />
          <div className="h-4 w-5/6 bg-muted rounded mb-2" />
          <div className="h-3 w-full bg-muted rounded" />
        </div>
      ))}
    </div>
  );
}
