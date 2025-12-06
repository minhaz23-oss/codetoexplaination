import { fetchFileContent, fetchRepoTree, FileNode } from "./github";

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: any;
}

export interface RepoAnalysis {
  fileTree: string[];
  packageJson: any;
  techStack: string[];
  database: string[];
  majorDirectories: string[];
  routes: string[];
}

export async function analyzeRepo(owner: string, repo: string): Promise<RepoAnalysis> {
  // 1. Fetch File Tree
  const tree = await fetchRepoTree(owner, repo);
  const paths = tree.map((n) => n.path);

  // 2. Identify Key Files
  const packageJsonPath = paths.find((p) => p.endsWith("package.json"));
  const schemaPath = paths.find((p) => p.includes("schema.prisma") || p.includes("schema.sql"));

  // 3. Fetch Content of Key Files (Parallel)
  const [packageJsonContent, schemaContent] = await Promise.all([
    packageJsonPath ? fetchFileContent(owner, repo, packageJsonPath) : Promise.resolve("{}"),
    schemaPath ? fetchFileContent(owner, repo, schemaPath) : Promise.resolve(""),
  ]);

  // 4. Parse Package JSON for Tech Stack
  let packageJson: PackageJson = {};
  const techStack = new Set<string>();

  try {
    packageJson = JSON.parse(packageJsonContent);
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

    // Frameworks
    if (deps.next) techStack.add("Next.js");
    if (deps.react) techStack.add("React");
    if (deps.vue) techStack.add("Vue");
    if (deps.svelte) techStack.add("Svelte");
    if (deps.express) techStack.add("Express");
    if (deps.nestjs) techStack.add("NestJS");
    if (deps['@angular/core']) techStack.add("Angular");

    // CSS
    if (deps.tailwindcss) techStack.add("TailwindCSS");

    // DB
    if (deps.prisma) techStack.add("Prisma");
    if (deps.mongoose) techStack.add("Mongoose");
    if (deps.pg) techStack.add("PostgreSQL");
    if (deps.mysql2) techStack.add("MySQL");

  } catch (e) {
    console.warn("Failed to parse package.json");
  }

  // 5. Database Hints
  const database = [];
  if (schemaPath) {
    database.push(`Schema file found at: ${schemaPath}`);
    // Naive regex to find models in Prisma
    if (schemaPath.endsWith(".prisma")) {
      const models = schemaContent.match(/model\s+(\w+)/g);
      if (models) database.push(...models);
    }
  }

  // 6. Major Directories (Structure Hint)
  const majorDirectories = paths
    .filter((p) => !p.includes("/") && tree.find((n) => n.path === p && n.type === "tree"))
    .filter((p) => !p.startsWith(".")); // exclude .git, .github

  // 7. Collect Routes (Next.js specific)
  const routes = paths.filter(p =>
    p.match(/\/(page|route|layout)\.(tsx|ts|jsx|js)$/) ||
    p.startsWith("pages/")
  );

  return {
    fileTree: paths.slice(0, 300), // Limit to top 300 files to avoid context overflow
    packageJson,
    techStack: Array.from(techStack),
    database,
    majorDirectories,
    routes
  };
}
