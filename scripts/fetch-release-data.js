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

function buildLlms(version) {
  return `# bgit - CLI Tool for Multi-User Git Identity Management

> bgit is a free, open-source command-line tool that manages multiple Git identities. It lets developers switch between work, personal, and client GitHub accounts while handling SSH and git config safely.

## Key Pages

- Homepage: https://bgitcli.com/
- Documentation: https://bgitcli.com/docs/
- Commands: https://bgitcli.com/commands/
- Changelog: https://bgitcli.com/changelog/
- Support: https://bgitcli.com/support/

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
  let version = readGeneratedVersion() ?? "0.6.0";

  try {
    console.log("Fetching version.txt from bgit repo...");
    const versionText = await fetchText(VERSION_URL);
    version = versionText.trim();
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
