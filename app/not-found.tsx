import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-32 pb-20 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-7xl font-bold mb-4 text-accent">404</h1>
        <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
        <p className="text-xl text-muted mb-12">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-4 bg-accent text-white rounded-lg border-2 border-accent hover:bg-accent/90 transition-all duration-200 font-semibold text-lg"
          >
            Go Home
          </Link>
          <Link
            href="/docs"
            className="px-8 py-4 border-2 border-gray-700 rounded-lg hover:border-accent transition-all duration-200 font-semibold text-lg"
          >
            Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
