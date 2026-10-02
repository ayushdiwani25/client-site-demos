import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-chalk px-6 text-center">
      <p className="font-mono text-sm font-bold uppercase tracking-widest text-court">404</p>
      <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base text-muted leading-relaxed">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="btn-cta mt-8 inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-chalk shadow-sm"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to home
      </Link>
    </main>
  )
}
