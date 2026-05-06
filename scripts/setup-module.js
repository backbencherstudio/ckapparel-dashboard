const fs = require("fs");
const path = require("path");

// feature name (default: auth)
const name = process.argv[2] || "auth";

const basePath = process.cwd();

// Ensure folders exist
const folders = [
  "services",
  "hooks",
  "types",
];

folders.forEach((folder) => {
  const dir = path.join(basePath, folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// File paths
const serviceFile = path.join(basePath, "services", `${name}.service.ts`);
const hookFile = path.join(basePath, "hooks", `use${capitalize(name)}.ts`);
const typesFile = path.join(basePath, "types", `${name}.types.ts`);

// Helper
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Templates

const serviceTemplate = `
import axios from "@/lib/axios";

export const ${name}Service = async (data: any) => {
  return axios.post("/${name}", data);
};
`;

const hookTemplate = `
import { useMutation } from "@tanstack/react-query";
import { ${name}Service } from "@/services/${name}.service";

export const use${capitalize(name)} = () => {
  return useMutation({
    mutationFn: ${name}Service,
  });
};
`;

const typesTemplate = `
export type ${capitalize(name)}Payload = {
  // add fields here
};

export type ${capitalize(name)}Response = {
  // add response shape here
};
`;

// Create file helper
function createFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content.trim(), "utf8");
    console.log(`Created: ${filePath}`);
  } else {
    console.log(`Already exists: ${filePath}`);
  }
}

console.log(`\n🚀 Creating module: ${name}\n`);

createFile(serviceFile, serviceTemplate);
createFile(hookFile, hookTemplate);
createFile(typesFile, typesTemplate);

console.log(`\n✅ ${name} module created successfully!\n`);