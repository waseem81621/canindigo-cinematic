import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-[560px]">
        <span className="block text-[11px] uppercase tracking-[0.18em] text-indigo-accent mb-4">
          404
        </span>
        <h1 className="font-display text-5xl md:text-6xl text-text-primary tracking-tight">
          Page not found.
        </h1>
        <p className="mt-5 text-[15px] text-text-muted">
          The page you were looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center px-5 py-2.5 text-[13px] font-medium text-text-primary border border-border rounded-full hover:border-indigo-mid hover:bg-indigo-mid/5 transition-colors duration-200 ease-out"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
