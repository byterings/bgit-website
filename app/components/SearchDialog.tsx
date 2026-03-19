'use client';

import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useDeferredValue, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  searchEntries,
  searchMeta,
  searchSite,
  type SearchEntry,
} from '../lib/search';

interface SearchDialogProps {
  variant?: 'desktop' | 'mobile';
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName;
  return (
    tagName === 'INPUT' ||
    tagName === 'TEXTAREA' ||
    tagName === 'SELECT' ||
    target.isContentEditable
  );
}

const featuredResults: SearchEntry[] = [
  'command-setup',
  'command-clone',
  'docs-installation',
  'docs-workspaces',
  'page-changelog',
]
  .map((id) => searchEntries.find((entry) => entry.id === id))
  .filter(Boolean) as SearchEntry[];

const categoryStyles: Record<SearchEntry['category'], string> = {
  Page: 'bg-[#52a8ff]/10 text-[#52a8ff] border border-[#52a8ff]/20',
  Docs: 'bg-green-500/10 text-green-400 border border-green-500/20',
  Command: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  FAQ: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  Release: 'bg-pink-500/10 text-pink-400 border border-pink-500/20',
};

export default function SearchDialog({ variant = 'desktop' }: SearchDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const deferredQuery = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const results: SearchEntry[] = deferredQuery ? searchSite(deferredQuery, 10) : featuredResults;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcutPressed =
        event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey);
      const slashPressed =
        event.key === '/' &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !open &&
        !isTypingTarget(event.target);

      if (shortcutPressed || slashPressed) {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === 'Escape' && open) {
        event.preventDefault();
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      setQuery('');
      setSelectedIndex(0);
      return;
    }

    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [deferredQuery]);

  const goToResult = (result: SearchEntry) => {
    setOpen(false);
    setQuery('');
    window.location.href = result.href;
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex((current) => (current + 1) % Math.max(results.length, 1));
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex((current) =>
        current === 0 ? Math.max(results.length - 1, 0) : current - 1
      );
    }

    if (event.key === 'Enter' && results[selectedIndex]) {
      event.preventDefault();
      goToResult(results[selectedIndex]);
    }
  };

  const button =
    variant === 'desktop' ? (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 rounded-lg border border-gray-800 bg-[var(--alt-bg)] px-3 py-2 text-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
        aria-label="Search the bgit website"
      >
        <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
        </svg>
        <span>Search docs and commands</span>
        <span className="rounded border border-gray-700 px-1.5 py-0.5 text-xs">Ctrl/Cmd K</span>
      </button>
    ) : (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md p-2 text-foreground transition-colors hover:bg-[#52a8ff]/10"
        aria-label="Search the bgit website"
        title="Search"
      >
        <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
        </svg>
      </button>
    );

  const overlay =
    mounted && open
      ? createPortal(
        <div
          className="fixed inset-0 z-[100] px-4 py-6"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-white/6 backdrop-blur-xl [backdrop-filter:blur(18px)_saturate(1.05)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_32%)]" />
          <div
            className="relative mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl border border-white/20 bg-[var(--background)] shadow-[0_28px_90px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.05),0_0_48px_rgba(255,255,255,0.08)]"
            role="dialog"
            aria-modal="true"
            aria-label="Search the bgit website"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            <div className="border-b border-gray-800 px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3 rounded-xl border border-white/12 bg-[var(--alt-bg)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <svg aria-hidden="true" className="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                  className="w-full bg-transparent text-base outline-none placeholder:text-muted"
                  placeholder="Search commands, setup steps, troubleshooting, releases..."
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-1 text-sm text-muted transition-colors hover:bg-gray-800 hover:text-foreground"
                >
                  Esc
                </button>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
                <p>
                  Search across {searchMeta.totalEntries} pages, sections, commands, FAQs, and releases.
                </p>
                <p>Use arrows to move and Enter to open.</p>
              </div>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-3 sm:p-4">
              {!deferredQuery && (
                <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-muted">
                  Popular shortcuts
                </div>
              )}

              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <button
                      key={result.id}
                      type="button"
                      onClick={() => goToResult(result)}
                      className={`block w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                        index === selectedIndex
                          ? 'border-white/30 bg-[color:rgba(82,168,255,0.09)] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_12px_32px_rgba(0,0,0,0.35)]'
                          : 'border-gray-800 bg-[var(--alt-bg)] hover:border-white/18 hover:bg-[var(--card-bg)]'
                      }`}
                    >
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${categoryStyles[result.category]}`}>
                          {result.category}
                        </span>
                        <span className="text-xs text-muted">{result.href}</span>
                      </div>
                      <div className="font-semibold text-foreground">{result.title}</div>
                      <p className="mt-1 text-sm text-muted">{result.description}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-800 bg-[var(--alt-bg)] px-6 py-10 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
                    </svg>
                  </div>
                  <h2 className="mb-2 text-lg font-semibold">No results found</h2>
                  <p className="text-sm text-muted">
                    Try a command name like <code>bgit setup</code>, a section like <code>workspaces</code>, or a problem like <code>SSH permissions</code>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )
      : null;

  return (
    <>
      {button}
      {overlay}
    </>
  );
}
