import { GoogleGenerativeAI } from "@google/generative-ai";
import { RepoAnalysis } from "./analysis";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateDiagramJSON(analysis: RepoAnalysis) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-001"
  });

  const prompt = `
    You are an expert Software Architect and Technical Writer. 
    Your goal is to explain this GitHub repository to a developer who wants to understand "What is this project?", "How is it organized?", and "How does it work?" without reading the code.
    
    ### Repository Context
    - **Tech Stack**: ${analysis.techStack.join(", ")}
    - **Database**: ${analysis.database.join(", ")}
    - **Key Directories**: ${analysis.majorDirectories.join(", ")}
    - **Routes/Pages**: ${analysis.routes.slice(0, 20).join(", ")}
    - **File Tree (Partial)**: 
    ${analysis.fileTree.slice(0, 150).join("\n")}

    ### Instructions
    1. **Analyze the Project**: Determine its purpose (e.g., E-commerce, SaaS, Tool) based on packages and file names.
    2. **Explain the Structure**: Describe what the key folders do (e.g., "lib: utility functions", "app: Next.js pages").
    3. **Route Breakdown**: Map out the key pages and API endpoints. Infer their purpose from their name.
    4. **Technical Implementation**: Provide a detailed list of features, inferred prerequisites (Node version, API keys), and basic deployment steps.

    ### Output Format (Strict JSON, no markdown)
    {
      "projectInfo": {
        "name": "Project Name (Inferred)",
        "purpose": "A concise summary of what this project does.",
        "description": "A detailed explanation of the project's features and goals.",
        "type": "Web App / API / CLI / Library"
      },
      "structure": {
        "summary": "High-level overview of the code organization.",
        "directories": [
          { "name": "app", "description": "Main application routes and pages." },
          { "name": "components", "description": "Reusable UI components." }
        ]
      },
      "routes": [
        { "path": "/", "type": "frontend", "description": "Landing page.", "file": "app/page.tsx" },
        { "path": "/api/users", "type": "backend", "description": "User management endpoints.", "file": "app/api/users/route.ts" }
      ],
      "implementation": {
        "features": ["Feature 1", "Feature 2"],
        "prerequisites": ["Node.js 18+", "OpenAI API Key"],
        "deployment": "Vercel / Docker / Netlify"
      }
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("AI Generation Error:", error);
    return {
      projectInfo: { name: "Error", purpose: "Failed to analyze", description: "Could not generate explanation.", type: "Unknown" },
      structure: { summary: "N/A", directories: [] },
      routes: [],
      implementation: {
        features: ["Analysis Failed"],
        prerequisites: [],
        deployment: "Unknown"
      }
    };
  }
}
