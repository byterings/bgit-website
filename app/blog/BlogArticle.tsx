import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';
import JsonLd from '../components/JsonLd';
import type { BlogPost } from '../lib/blog';
import { createBreadcrumbJsonLd } from '../lib/seo';

function ArticleText({ text }: { text: string }) {
  const chunks = text.split(/(\[[^\]]+\]\((?:\/|https?:\/\/)[^)]+\))/g);
  return <>{chunks.map((chunk, index) => { const match = chunk.match(/^\[([^\]]+)\]\(((?:\/|https?:\/\/)[^)]+)\)$/); if (!match) return chunk; const className = "text-violet-200 underline decoration-violet-300/30 underline-offset-4 hover:text-white"; return match[2].startsWith("http") ? <a key={index} href={match[2]} className={className} target="_blank" rel="noopener noreferrer">{match[1]}</a> : <Link key={index} href={match[2]} className={className}>{match[1]}</Link>; })}</>;
}

export default function BlogArticle({ post }: { post: BlogPost }) {
  const path = `/blog/${post.slug}/` as `/${string}`;
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.description, datePublished: post.published, dateModified: post.published, mainEntityOfPage: `https://bgitcli.com${path}`, author: { '@type': 'Organization', name: 'ByteRings', url: 'https://byterings.com' }, publisher: { '@type': 'Organization', name: 'ByteRings', url: 'https://byterings.com', logo: { '@type': 'ImageObject', url: 'https://bgitcli.com/images/logo.png' } }, image: 'https://bgitcli.com/images/og-image.png' };
  return <article className="product-shell px-5 pb-20 pt-28 sm:px-8"><JsonLd data={createBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Guides', path: '/blog/' }, { name: post.title, path }])} /><JsonLd data={jsonLd} />
    <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Guides', href: '/blog/' }, { name: post.title, href: path }]} />
    <header className="mx-auto max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-300">bgit guides</p><h1 className="mt-3 text-4xl font-semibold leading-tight tracking-[-.045em] text-white sm:text-5xl">{post.title}</h1><p className="mt-5 text-lg leading-8 text-slate-300">{post.description}</p><p className="mt-4 text-xs text-slate-500">By ByteRings · Published {post.published}</p></header>
    <div className="prose prose-invert mx-auto mt-10 max-w-3xl">{post.sections.map(section => <section key={section.heading} className="mb-9"><h2 className="text-2xl font-semibold tracking-tight text-white">{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph} className="mt-4 text-[15px] leading-7 text-slate-300"><ArticleText text={paragraph} /></p>)}{section.code && <pre className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-[#090c13] p-4 text-sm leading-6 text-violet-100"><code>{section.code}</code></pre>}</section>)}</div>
    <section className="mx-auto mt-12 max-w-3xl rounded-2xl border border-violet-300/20 bg-violet-300/[.05] p-7"><h2 className="text-xl font-semibold text-white">Try bgit with your repositories</h2><p className="mt-3 text-sm leading-6 text-slate-300">Download bgit Desktop or follow the CLI installation guide. Desktop and CLI share the same identity setup.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/desktop/#downloads" className="rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-400">Download bgit Desktop</Link><Link href="/docs/install/" className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:border-white/30">Read the bgit install guide</Link></div></section>
    <nav aria-label="Related guides" className="mx-auto mt-8 max-w-3xl border-t border-white/10 pt-6"><h2 className="text-sm font-semibold text-white">Related</h2><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm"><Link className="text-violet-200 hover:text-white" href="/blog/">Browse all bgit guides</Link><Link className="text-violet-200 hover:text-white" href="/commands/">See all CLI commands</Link><Link className="text-violet-200 hover:text-white" href="/docs/">Browse bgit documentation</Link></div></nav>
  </article>;
}
