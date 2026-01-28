import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 px-6 border-t border-gray-800 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-lg mb-4">bgit</h3>
            <p className="text-muted text-sm">
              Multi-Git Identity Manager for developers managing multiple accounts.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <div className="space-y-2 text-sm">
              <Link href="/docs" className="block text-muted hover:text-accent transition">
                Documentation
              </Link>
              <Link href="/commands" className="block text-muted hover:text-accent transition">
                Commands
              </Link>
              <a
                href="https://github.com/byterings/bgit/releases"
                className="block text-muted hover:text-accent transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Releases
              </a>
              <Link href="/changelog" className="block text-muted hover:text-accent transition">
                Changelog
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <div className="space-y-2 text-sm">
              <a
                href="https://github.com/byterings/bgit"
                className="block text-muted hover:text-accent transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://github.com/byterings/bgit/issues"
                className="block text-muted hover:text-accent transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Issues
              </a>
              {/* <a
                href="https://github.com/byterings/bgit/blob/main/CONTRIBUTING.md"
                className="block text-muted hover:text-accent transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contributing
              </a> */}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:bgit@byterings.com"
                className="block text-muted hover:text-accent transition"
              >
                Email Us
              </a>
              <Link href="/support" className="block text-muted hover:text-accent transition">
                Support Project
              </Link>
              <a
                href="https://byterings.com"
                className="block text-muted hover:text-accent transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                ByteRings
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <p>
            © {currentYear} ByteRings. Released under the{' '}
            <a
              href="https://github.com/byterings/bgit/blob/main/LICENSE"
              className="hover:text-accent transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              MIT License
            </a>
            .
          </p>
          <p className="text-xs">
            Current version: <span className="text-accent">v0.2.0</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
