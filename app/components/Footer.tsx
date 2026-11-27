import Link from 'next/link';
import BrandLogo from './BrandLogo';
import { siteConfig } from '../lib/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[.07] bg-[#080a0f] px-6 py-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4"><BrandLogo /></div>
            <p className="max-w-xs text-sm leading-6 text-slate-400">The right Git identity for every repository. Desktop and CLI share one setup.</p>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[.16em] text-slate-300">Product</h3>
            <div className="space-y-2.5 text-sm">
              <Link href="/desktop" className="block text-muted hover:text-accent transition">
                Desktop App
              </Link>
              <Link href="/docs" className="block text-muted hover:text-accent transition">
                Documentation
              </Link>
              <Link href="/commands" className="block text-muted hover:text-accent transition">
                CLI Commands
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
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[.16em] text-slate-300">Resources</h3>
            <div className="space-y-2.5 text-sm">
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
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[.16em] text-slate-300">Connect</h3>
            <div className="space-y-2.5 text-sm">
              <a
                href="mailto:bgit@byterings.com"
                className="block text-muted hover:text-accent transition"
              >
                Email Us
              </a>
              <Link href="/support" className="block text-muted hover:text-accent transition">
                Help / Support
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

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[.07] pt-8 text-sm text-slate-500 md:flex-row">
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
            Current version: <span className="text-accent">v{siteConfig.version}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
