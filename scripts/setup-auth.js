const fs = require("fs");
const path = require("path");

const files = [
  // "app/dashboard/layout.tsx",
  // "app/login/page.tsx",
  "app/layout.tsx",
  "components/AuthGuard.tsx",
  "hooks/useAuth.ts",
  "lib/axios.ts",
  "lib/auth-tokens.ts",
  "lib/session.ts",
  "services/auth.service.ts",
  "store/authStore.ts",
  "types/auth.types.ts",
  "middleware.ts",
];

function createFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  const dir = path.dirname(fullPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, "", "utf8");
    console.log(`Created: ${filePath}`);
  } else {
    console.log(`Already exists: ${filePath}`);
  }
}

console.log("\n🚀 Setting up auth structure...\n");

files.forEach(createFile);

console.log("\n✅ Auth setup completed!\n");