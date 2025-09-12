export default function ArticleDetailSkeleton() {
  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 lg:p-8 shadow-lg">
      <div className="space-y-4" aria-busy="true" role="status">
        <div className="h-5 w-2/3 bg-muted rounded" />
        <div className="h-4 w-1/3 bg-muted rounded" />
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-3 w-full bg-muted rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
