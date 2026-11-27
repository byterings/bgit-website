import type { Metadata } from 'next';
import DocTopic from '../DocTopic';
import { docTopics } from '../topic-data';
import { createPageMetadata } from '../../lib/seo';

export function generateStaticParams() { return docTopics.map(({ slug }) => ({ topic: slug })); }

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = docTopics.find(item => item.slug === slug);
  if (!topic) return {};
  const descriptions: Record<string, string> = {
    install: 'Install bgit CLI and Desktop on Windows, macOS, or Linux, verify setup, and add your first identity for managing multiple Git accounts.',
    'ssh-keys': 'Configure SSH keys for multiple Git accounts with bgit, use existing keys, update identity key paths, and diagnose agent or permission problems.',
    workspaces: 'Use bgit workspaces and repository bindings to assign Git identities by folder or checkout and verify which account applies.',
    'desktop-app': 'Install bgit Desktop and use its shared identity setup to review repositories, changes, commits, branches, and Git sync across accounts.',
    cli: 'Use bgit CLI commands to add and switch Git identities, clone repositories, manage workspaces, check effective config, and diagnose SSH issues.',
  };
  const description = descriptions[slug];
  return createPageMetadata({ title: topic.title, description, path: `/docs/${slug}/` });
}

export default async function DocTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params;
  const topic = docTopics.find(item => item.slug === slug);
  if (!topic) return null;
  return <DocTopic topic={topic} />;
}
