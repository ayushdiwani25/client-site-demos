export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-10 w-10">
          <div
            className="absolute inset-0 rounded-full border-[3px] border-border"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-court"
            aria-hidden="true"
          />
        </div>
        <p className="text-xs font-medium text-muted tracking-wide">Loading…</p>
      </div>
    </div>
  )
}
