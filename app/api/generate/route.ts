import { generateDiagramJSON } from "@/lib/ai";
import { analyzeRepo } from "@/lib/analysis";
import { parseGitHubUrl } from "@/lib/github";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const maxDuration = 60; // Allow 60 seconds for execution (Vercel Pro/Hobby limits apply)

const RequestSchema = z.object({
  url: z.string().url(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = RequestSchema.parse(body);

    const repoInfo = parseGitHubUrl(url);
    if (!repoInfo) {
      return NextResponse.json({ error: "Invalid GitHub URL" }, { status: 400 });
    }

    // 1. Analyze Repository
    console.log(`Analyzing ${repoInfo.owner}/${repoInfo.repo}...`);
    const analysis = await analyzeRepo(repoInfo.owner, repoInfo.repo);

    // 2. Generate Diagram with AI
    console.log(`Generating diagram for ${repoInfo.owner}/${repoInfo.repo}...`);
    const diagram = await generateDiagramJSON(analysis);

    return NextResponse.json({
      analysis: {
        stack: analysis.techStack,
        database: analysis.database,
        stats: {
          files: analysis.fileTree.length,
        }
      },
      ...diagram,
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error instanceof z.ZodError ? "Invalid input" : error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
