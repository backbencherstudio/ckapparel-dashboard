const fs = require("fs");
const path = require("path");
const readline = require("readline");

const basePath = process.cwd();

const FOLDERS = [
  { folder: "services", suffix: ".service.ts" },
  { folder: "hooks",    suffix: ".ts", prefix: "use" },
  { folder: "types",    suffix: ".types.ts" },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function resolveFilePath({ folder, suffix, prefix }, name) {
  const fileName = prefix
    ? `${prefix}${capitalize(name)}${suffix}`
    : `${name}${suffix}`;
  return path.join(basePath, folder, fileName);
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function deleteFile(filePath) {
  fs.unlinkSync(filePath);
  console.log(`  🗑️  Deleted : ${filePath}`);
}

function prompt(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

// ── Scan all modules ─────────────────────────────────────────────────────────

function discoverModules() {
  const servicesDir = path.join(basePath, "services");
  if (!fs.existsSync(servicesDir)) {
    console.error("\n❌ No 'services' folder found. Nothing to delete.\n");
    process.exit(1);
  }

  return fs
    .readdirSync(servicesDir)
    .filter((f) => f.endsWith(".service.ts"))
    .map((f) => f.replace(".service.ts", ""));
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const modules = discoverModules();

  if (modules.length === 0) {
    console.log("\n⚠️  No modules found.\n");
    process.exit(0);
  }

  console.log("\n🗂️  Available modules:\n");
  modules.forEach((name, i) => {
    const files = FOLDERS.map((f) => resolveFilePath(f, name));
    const status = files.map((fp) => (fileExists(fp) ? "✅" : "❌")).join(" ");
    console.log(`  [${i + 1}] ${name.padEnd(20)} ${status}  (types service hook)`);
  });

  console.log("\n  Enter numbers to delete (e.g. 1 3 4), or 'all' to delete everything.");
  console.log("  Press Ctrl+C to cancel.\n");

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const answer = await prompt(rl, "  👉 Select: ");
  rl.close();

  let selected = [];

  if (answer.trim().toLowerCase() === "all") {
    selected = modules;
  } else {
    const indices = answer.trim().split(/\s+/).map(Number);
    for (const i of indices) {
      if (isNaN(i) || i < 1 || i > modules.length) {
        console.log(`\n  ⚠️  Skipping invalid selection: "${i}"`);
        continue;
      }
      selected.push(modules[i - 1]);
    }
  }

  if (selected.length === 0) {
    console.log("\n  Nothing selected. Exiting.\n");
    process.exit(0);
  }

  console.log(`\n  About to delete: ${selected.join(", ")}`);

  const confirmRl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const confirm = await prompt(confirmRl, "\n  ⚠️  Are you sure? (y/N): ");
  confirmRl.close();

  if (confirm.trim().toLowerCase() !== "y") {
    console.log("\n  Cancelled. Nothing was deleted.\n");
    process.exit(0);
  }

  console.log("");

  for (const name of selected) {
    console.log(`  📦 Removing module: ${name}`);
    for (const folderDef of FOLDERS) {
      const fp = resolveFilePath(folderDef, name);
      if (fileExists(fp)) {
        deleteFile(fp);
      } else {
        console.log(`  ⚪ Not found : ${fp}`);
      }
    }
    console.log("");
  }

  console.log("✅ Done!\n");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});