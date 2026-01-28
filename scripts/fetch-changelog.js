#!/usr/bin/env node
/**
 * Fetches changelog.json from bgit repo before build
 * This ensures the website always shows the latest changelog
 *
 * Usage: node scripts/fetch-changelog.js
 * Run this as part of your Cloudflare Pages build command
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const CHANGELOG_URL = 'https://raw.githubusercontent.com/byterings/bgit/main/changelog.json';
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'data', 'changelog.json');

function fetchChangelog() {
  return new Promise((resolve, reject) => {
    console.log('Fetching changelog from bgit repo...');

    https.get(CHANGELOG_URL, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch changelog: ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          // Validate JSON
          const changelog = JSON.parse(data);

          // Ensure output directory exists
          const outputDir = path.dirname(OUTPUT_PATH);
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }

          // Write to file
          fs.writeFileSync(OUTPUT_PATH, JSON.stringify(changelog, null, 2));
          console.log(`Changelog saved to ${OUTPUT_PATH}`);
          console.log(`Found ${changelog.releases.length} releases`);
          resolve(changelog);
        } catch (err) {
          reject(new Error(`Invalid JSON: ${err.message}`));
        }
      });
    }).on('error', reject);
  });
}

fetchChangelog()
  .then(() => {
    console.log('Changelog sync complete!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error fetching changelog:', err.message);
    console.log('Using existing changelog.json if available');
    process.exit(0); // Don't fail build if fetch fails
  });
