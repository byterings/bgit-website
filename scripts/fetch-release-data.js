#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const path = require("path");

const CHANGELOG_URL =
  "https://raw.githubusercontent.com/byterings/bgit/main/changelog.json";
const VERSION_URL =
  "https://raw.githubusercontent.com/byterings/bgit/main/version.txt";

const CHANGELOG_OUTPUT_PATH = path.join(
  __dirname,
  "..",
  "public",
  "data",
  "changelog.json"
);
const GENERATED_VERSION_PATH = path.join(
  __dirname,
  "..",
  "app",
  "lib",
  "generated-release.ts"
);
const LLMS_OUTPUT_PATH = path.join(__dirname, "..", "public", "llms.txt");

function ensureDir(filePath) {
  const outputDir = path.dirname(filePath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
          return;
        }

        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

function readGeneratedVersion() {
  try {
    const file = fs.readFileSync(GENERATED_VERSION_PATH, "utf8");
    const match = file.match(/export const bgitVersion = "([^"]+)";/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

function writeGeneratedVersion(version) {
  ensureDir(GENERATED_VERSION_PATH);
  const content = `export const bgitVersion = "${version}";\n`;
  fs.writeFileSync(GENERATED_VERSION_PATH, content);
}

function writeChangelog(changelog) {
  ensureDir(CHANGELOG_OUTPUT_PATH);
  fs.writeFileSync(CHANGELOG_OUTPUT_PATH, JSON.stringify(changelog, null, 2));
}

function compareVersions(left, right) {
  const a = left.split(".").map((part) => Number.parseInt(part, 10) || 0);
  const b = right.split(".").map((part) => Number.parseInt(part, 10) || 0);
  for (let index = 0; index < Math.max(a.length, b.length); index += 1) {
    const difference = (a[index] || 0) - (b[index] || 0);
    if (difference !== 0) return difference;
  }
  return 0;
}

const knownReleaseNotes = {
  "0.12.4": {
    date: "2026-11-26",
    phase: 10,
    summary:
      "Linux release binaries now explicitly target baseline x86-64 CPUs, improving compatibility with older AMD64 systems.",
    features: [
      {
        title: "Baseline CPU compatibility for Linux releases",
        description:
          "The Linux CLI and Desktop build workflows set baseline x86-64 compiler flags, including the desktop link step, so release binaries are less dependent on newer build-machine CPU features.",
      },
    ],
    fixes: [],
    breaking_changes: [],
  },
};

function includeCurrentVersion(changelog, version) {
  if (changelog.releases.some((release) => release.version === version)) return;
  const latest = changelog.releases[0];
  const knownNotes = knownReleaseNotes[version];
  changelog.releases.unshift({
    version,
    date: knownNotes?.date || "",
    phase: knownNotes?.phase || latest?.phase || 10,
    summary: knownNotes?.summary || `bgit v${version} is the current release. See GitHub Releases for release information.`,
    features: knownNotes?.features || [],
    fixes: knownNotes?.fixes || [],
    breaking_changes: knownNotes?.breaking_changes || [],
  });
}

function buildLlms(version) {
  return `# bgit - Git identities for Desktop and CLI

> bgit is a free, open-source Git identity manager with a desktop app and CLI. Manage identities, SSH keys, repository bindings, commits, and Git remotes across work and personal accounts. Desktop and CLI share the same setup.

## Key Pages

- Homepage: https://bgitcli.com/
- Desktop app: https://bgitcli.com/desktop/
- Documentation: https://bgitcli.com/docs/
- Commands: https://bgitcli.com/commands/
- Changelog: https://bgitcli.com/changelog/
- Support: https://bgitcli.com/support/

## Desktop App

- Windows 10/11: https://github.com/byterings/bgit/releases/latest/download/bgit-desktop-windows-amd64-installer.exe
- macOS 11+ (Intel and Apple Silicon): https://github.com/byterings/bgit/releases/latest/download/bgit-desktop-darwin-universal.dmg
- Ubuntu 22.04+ / Debian 12+: https://github.com/byterings/bgit/releases/latest/download/bgit-desktop-linux-amd64.deb
- Install guide: https://bgitcli.com/docs/#desktop-app
- Interactive preview: https://bgitcli.com/desktop/#preview

## Recommended Core Flow

- \`bgit setup\`: One-time setup (config + managed safety hooks)
- \`bgit add\`: Add a Git identity
- \`bgit use <alias>\`: Switch active identity
- \`bgit clone <url> [directory] [--no-bind]\`: Clone using effective identity
- \`bgit check\`: Run safety checks manually
- \`bgit prompt --plain\`: Output effective identity for shell prompts

## Additional Commands

- \`bgit status\`: Show active/effective identity and bindings
- \`bgit workspace\`: Manage workspace identity mappings
- \`bgit bind\`: Bind current repository to a specific identity
- \`bgit doctor\`: Diagnose configuration issues
- \`bgit sync [--fix]\`: Validate/fix config alignment
- \`bgit remote fix|restore\`: Advanced remote URL management
- \`bgit export\`: Create an encrypted bgit backup archive
- \`bgit import <archive.bgit>\`: Restore bgit from an encrypted archive
- \`bgit update <alias>\`: Update SSH key path
- \`bgit delete <alias>\`: Remove an identity
- \`bgit uninstall\`: Safe uninstall and cleanup

## Deprecation Notes

- \`bgit init\` is deprecated; use \`bgit setup\`
- \`bgit setup-ssh\` is deprecated; use \`bgit setup\`

## Technical Details

- Written in Go
- MIT License
- Cross-platform: Linux, macOS, Windows
- Current version on this site: ${version}
- GitHub: https://github.com/byterings/bgit
- Author: ByteRings (https://byterings.com)
`;
}

function writeLlms(version) {
  ensureDir(LLMS_OUTPUT_PATH);
  fs.writeFileSync(LLMS_OUTPUT_PATH, buildLlms(version));
}

async function main() {
  let version = readGeneratedVersion() ?? "0.12.4";

  try {
    console.log("Fetching version.txt from bgit repo...");
    const versionText = await fetchText(VERSION_URL);
    const fetchedVersion = versionText.trim();
    if (compareVersions(fetchedVersion, version) >= 0) {
      version = fetchedVersion;
    } else {
      console.log(`Remote version ${fetchedVersion} is behind local version ${version}; keeping the newer version.`);
    }
    writeGeneratedVersion(version);
    console.log(`Version synced: ${version}`);
  } catch (error) {
    console.error("Error fetching version.txt:", error.message);
    console.log("Using existing generated version if available");
    writeGeneratedVersion(version);
  }

  try {
    console.log("Fetching changelog from bgit repo...");
    const changelogText = await fetchText(CHANGELOG_URL);
    const changelog = JSON.parse(changelogText);
    includeCurrentVersion(changelog, version);
    writeChangelog(changelog);
    console.log(`Changelog synced: ${changelog.releases.length} releases`);
  } catch (error) {
    console.error("Error fetching changelog:", error.message);
    console.log("Using existing changelog.json if available");
  }

  writeLlms(version);
  console.log("Release data sync complete!");
}

main().catch((error) => {
  console.error("Unexpected release data sync error:", error.message);
  process.exit(0);
});
