import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface FileNode {
  path: string;
  type: "blob" | "tree";
  size?: number;
  url?: string;
}

export async function fetchRepoTree(owner: string, repo: string): Promise<FileNode[]> {
  try {
    // 1. Get the default branch (usually main or master)
    const { data: repoData } = await octokit.rest.repos.get({
      owner,
      repo,
    });
    const defaultBranch = repoData.default_branch;

    // 2. Get the Git Tree (recursive)
    // Note: 'recursive: "1"' returns all files. Large repos might truncate.
    const { data: treeData } = await octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha: defaultBranch,
      recursive: "1",
    });

    // Filter to limit context size (optional optimization)
    // For now, just map to our interface
    return treeData.tree
      .filter((node) => node.path && node.type)
      .map((node) => ({
        path: node.path!,
        type: node.type === "tree" ? "tree" : "blob",
        size: node.size,
        url: node.url,
      }));

  } catch (error) {
    console.error("Error fetching repo tree:", error);
    throw new Error("Failed to fetch repository data. Please check the URL and try again.");
  }
}

export async function fetchFileContent(owner: string, repo: string, path: string): Promise<string> {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });

    if ("content" in data && typeof data.content === "string") {
      return Buffer.from(data.content, "base64").toString("utf-8");
    }

    return "";
  } catch (error) {
    console.error(`Error fetching file ${path}:`, error);
    return "";
  }
}

export function parseGitHubUrl(url: string) {
  try {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1] };
  } catch (e) {
    return null;
  }
}
