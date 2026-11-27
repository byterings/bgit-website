import type { Metadata } from 'next';
import BlogArticle from '../BlogArticle';
import { blogPosts } from '../../lib/blog';
import { createPageMetadata } from '../../lib/seo';

export function generateStaticParams() { return blogPosts.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(item => item.slug === slug);
  if (!post) return {};
  return createPageMetadata({ title: post.title, description: post.description, path: `/blog/${post.slug}/` });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(item => item.slug === slug);
  if (!post) return null;
  return <BlogArticle post={post} />;
}
