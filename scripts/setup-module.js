const fs = require("fs");
const path = require("path");

// Feature name (default: auth)
const name = process.argv[2] || "auth";
const basePath = process.cwd();

// Helper
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Ensure folders exist
const folders = ["services", "hooks", "types"];
folders.forEach((folder) => {
  const dir = path.join(basePath, folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// File paths
const serviceFile = path.join(basePath, "services", `${name}.service.ts`);
const hookFile    = path.join(basePath, "hooks",    `use${capitalize(name)}.ts`);
const typesFile   = path.join(basePath, "types",    `${name}.types.ts`);

// ── Templates ──────────────────────────────────────────────────────────────

const typesTemplate = `
export type ${capitalize(name)}Payload = {
  // add create / update fields here
};

export type ${capitalize(name)}Response = {
  id: string | number;
  // add response shape here
};
`;

// Service with axios calls directly inside
const serviceTemplate = `
import axios from "@/lib/axios";
import type { ${capitalize(name)}Payload, ${capitalize(name)}Response } from "@/types/${name}.types";

const BASE = "/${name}";

export const ${name}Service = {
  getAll: async () => {
    const response = await axios.get(BASE);
    return response.data as ${capitalize(name)}Response[] | null;
  },

  getById: async (id: string | number) => {
    const response = await axios.get(\`\${BASE}/\${id}\`);
    return response.data as ${capitalize(name)}Response | null;
  },

  create: async (data: ${capitalize(name)}Payload) => {
    const response = await axios.post(BASE, data);
    return response.data as ${capitalize(name)}Response | null;
  },

  update: async (id: string | number, data: Partial<${capitalize(name)}Payload>) => {
    const response = await axios.put(\`\${BASE}/\${id}\`, data);
    return response.data as ${capitalize(name)}Response | null;
  },

  remove: async (id: string | number) => {
    const response = await axios.delete(\`\${BASE}/\${id}\`);
    return response.data as null;
  },
};
`;

// React Query hooks – one per CRUD operation
const hookTemplate = `
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ${name}Service } from "@/services/${name}.service";
import type { ${capitalize(name)}Payload } from "@/types/${name}.types";

const KEY = ["${name}"];

/** Fetch all ${name}s */
export const useGet${capitalize(name)}s = () =>
  useQuery({ queryKey: KEY, queryFn: () => ${name}Service.getAll() });

/** Fetch a single ${name} by id */
export const useGet${capitalize(name)}ById = (id: string | number) =>
  useQuery({
    queryKey: [...KEY, id],
    queryFn: () => ${name}Service.getById(id),
    enabled: !!id,
  });

/** Create a new ${name} */
export const useCreate${capitalize(name)} = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ${capitalize(name)}Payload) => ${name}Service.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
};

/** Update an existing ${name} */
export const useUpdate${capitalize(name)} = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | number;
      data: Partial<${capitalize(name)}Payload>;
    }) => ${name}Service.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
};

/** Delete a ${name} */
export const useDelete${capitalize(name)} = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => ${name}Service.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
};
`;

// ── File writer ─────────────────────────────────────────────────────────────

function createFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content.trim() + "\n", "utf8");
    console.log(`  ✅ Created : ${filePath}`);
  } else {
    console.log(`  ⚠️  Exists  : ${filePath}`);
  }
}

// ── Run ─────────────────────────────────────────────────────────────────────

console.log(`\n🚀 Generating CRUD module: ${capitalize(name)}\n`);

createFile(typesFile,   typesTemplate);
createFile(serviceFile, serviceTemplate);
createFile(hookFile,    hookTemplate);

console.log(`
📁 Files generated
   types/    ${name}.types.ts     → ${capitalize(name)}Payload & ${capitalize(name)}Response
   services/ ${name}.service.ts   → axios CRUD calls
   hooks/    use${capitalize(name)}.ts  → useQuery / useMutation hooks

✨ Done! Run: node create-module.js <name>
`);