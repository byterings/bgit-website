import { promises as fs } from 'fs';
import path from 'path';
import ChangelogContent from './ChangelogContent';

interface Feature {
  title: string;
  description: string;
  command?: string | null;
  docs_link?: string;
}

interface Fix {
  title: string;
  description: string;
}

interface Release {
  version: string;
  date: string;
  phase: number;
  summary: string;
  features: Feature[];
  fixes?: Fix[];
  breaking_changes?: Fix[];
}

interface Changelog {
  releases: Release[];
}

async function getChangelog(): Promise<Changelog | null> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'changelog.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch {
    return null;
  }
}

export default async function ChangelogPage() {
  const changelog = await getChangelog();

  return <ChangelogContent changelog={changelog} />;
}
