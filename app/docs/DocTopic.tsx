import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';
import JsonLd from '../components/JsonLd';
import { createBreadcrumbJsonLd } from '../lib/seo';

export type DocTopicData = { slug: string; title: string; description: string; sections: Array<{ heading: string; paragraphs: string[]; code?: string }> };

export default function DocTopic({ topic }: { topic: DocTopicData }) {
  const path = `/docs/${topic.slug}/` as `/${string}`;
  return <article className="product-shell min-h-[70vh] px-5 pb-20 pt-28 sm:px-8"><JsonLd data={createBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Documentation', path: '/docs/' }, { name: topic.title, path }])} /><JsonLd data={{ '@context': 'https://schema.org', '@type': 'TechArticle', headline: topic.title, description: topic.description, url: `https://bgitcli.com${path}`, publisher: { '@type': 'Organization', name: 'ByteRings', url: 'https://byterings.com' } }} />
    <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Documentation', href: '/docs/' }, { name: topic.title, href: path }]} />
    <header className="mx-auto max-w-5xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-300">bgit documentation</p><h1 className="mt-3 text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">{topic.title}</h1><p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">{topic.description}</p></header>
    <div className="mx-auto mt-10 max-w-5xl divide-y divide-white/10 border-y border-white/10">{topic.sections.map(section => <section key={section.heading} className="py-7"><h2 className="text-xl font-semibold text-white">{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph} className="mt-3 text-sm leading-7 text-slate-300">{paragraph}</p>)}{section.code && <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-[#090c13] p-4 text-sm leading-6 text-violet-100"><code>{section.code}</code></pre>}</section>)}</div>
    <section className="mx-auto mt-10 max-w-5xl rounded-xl border border-violet-300/15 bg-violet-300/[.04] p-6"><h2 className="text-lg font-semibold text-white">Related bgit guides</h2><div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm"><Link className="text-violet-200 hover:text-white" href="/docs/">Browse the complete bgit documentation</Link><Link className="text-violet-200 hover:text-white" href="/commands/">See the bgit CLI commands reference</Link><Link className="text-violet-200 hover:text-white" href="/desktop/">Download bgit Desktop</Link></div></section>
  </article>;
}
