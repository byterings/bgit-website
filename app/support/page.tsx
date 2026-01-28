export const metadata = {
  title: 'Support the Project - bgit',
  description: 'Ways to support and contribute to bgit development',
};

export default function SupportPage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">Support the Project</h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Help improve bgit and grow the community
          </p>
        </div>

        {/* Ways to Contribute */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Report Issues - Priority 1 */}
          <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-8 shadow-[0_4px_20px_rgba(82,168,255,0.08)] hover:shadow-[0_8px_30px_rgba(82,168,255,0.18)] hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Report Issues</h2>
            <p className="text-muted mb-6">
              Found a bug or have a feature idea? Report it on GitHub. Quality bug reports help make bgit better for everyone.
            </p>
            <a
              href="https://github.com/byterings/bgit/issues"
              className="inline-block px-6 py-3 border border-gray-700 rounded-lg hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-200 font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report an Issue
            </a>
            <p className="text-sm text-muted mt-4">Bug reports and feature requests</p>
          </div>

          {/* Contribute Code - Priority 2 */}
          <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-8 shadow-[0_4px_20px_rgba(82,168,255,0.08)] hover:shadow-[0_8px_30px_rgba(82,168,255,0.18)] hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Contribute Code</h2>
            <p className="text-muted mb-6">
              Help improve bgit by contributing code, fixing bugs, or adding features. All contributions are welcome!
            </p>
            {/* <a
              href="https://github.com/byterings/bgit/blob/main/CONTRIBUTING.md"
              className="inline-block px-6 py-3 border border-gray-700 rounded-lg hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-200 font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contribution Guide
            </a> */}
            <a
              href="#"
              className="inline-block px-6 py-3 border border-gray-700 rounded-lg hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-200 font-semibold"
              rel="noopener noreferrer"
            >
              coming soon...
            </a>
            <p className="text-sm text-muted mt-4">See our contributing guidelines</p>
          </div>

          {/* Financial Support - Priority 3 (Optional) */}
          <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-8 shadow-[0_4px_20px_rgba(82,168,255,0.08)] hover:shadow-[0_8px_30px_rgba(82,168,255,0.18)] hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Support Development <span className="text-sm text-muted font-normal">(Optional)</span></h2>
            <p className="text-muted mb-6">
              bgit is free to use. If it saves you time or helps your workflow, you can optionally support its development. This helps justify time spent maintaining and improving the tool.
            </p>
            {/* <a
              href="https://ko-fi.com/byterings"
              className="inline-block px-6 py-3 border border-gray-700 rounded-lg hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-200 font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support on Ko-fi
            </a> */}
            <a
              href="#"
              className="inline-block px-6 py-3 border border-gray-700 rounded-lg hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-200 font-semibold"
            
              rel="noopener noreferrer"
            >
             Comming Soon...
            </a>
            <p className="text-sm text-muted mt-4">One-time or recurring via Ko-fi</p>
          </div>

          {/* Spread the Word - Priority 4 */}
          <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-8 shadow-[0_4px_20px_rgba(82,168,255,0.08)] hover:shadow-[0_8px_30px_rgba(82,168,255,0.18)] hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Spread the Word</h2>
            <p className="text-muted mb-6">
              Help others discover bgit by sharing it with colleagues, writing about it, or starring the repository on GitHub.
            </p>
            <a
              href="https://github.com/byterings/bgit"
              className="inline-block px-6 py-3 border border-gray-700 rounded-lg hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-200 font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Star on GitHub
            </a>
            <p className="text-sm text-muted mt-4">Every star helps visibility</p>
          </div>
        </div>

        {/* Commitment */}
        <div className="bg-[#0a0a0a] border border-accent/30 rounded-xl p-8 mb-16 shadow-[0_4px_24px_rgba(82,168,255,0.12)]">
          <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
          <p className="text-foreground/90">
            bgit will always be free and open source under the MIT license.
            No features are locked behind payment. Financial support is completely optional
            and simply helps cover infrastructure costs and development time.
          </p>
        </div>

        {/* Contributors */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Thank You</h2>
          <p className="text-muted mb-8">
            To everyone who contributes through code, bug reports, feedback, and support
          </p>
          <a
            href="https://github.com/byterings/bgit/graphs/contributors"
            className="inline-block px-6 py-3 border border-gray-700 rounded-lg hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-200 font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Contributors
          </a>
        </div>
      </div>
    </div>
  );
}
