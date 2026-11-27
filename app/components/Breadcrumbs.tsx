import Link from 'next/link';

export default function Breadcrumbs({ items }: { items: Array<{ name: string; href: string }> }) {
  return <nav aria-label="Breadcrumb" className="mx-auto mb-6 max-w-5xl text-sm text-slate-400"><ol className="flex flex-wrap items-center gap-2">{items.map((item, index) => <li key={item.href} className="flex items-center gap-2">{index > 0 && <span aria-hidden="true">/</span>}{index === items.length - 1 ? <span aria-current="page" className="text-slate-200">{item.name}</span> : <Link href={item.href} className="transition hover:text-white">{item.name}</Link>}</li>)}</ol></nav>;
}
