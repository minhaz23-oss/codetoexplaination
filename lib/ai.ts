import { RepoAnalysis } from "./analysis";

export async function generateDiagramJSON(analysis: RepoAnalysis) {
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

    ### Output Format
    IMPORTANT: Return ONLY valid JSON. No markdown, no code blocks, no explanations. Just the JSON object.
    
    {
      "projectInfo": {
        "name": "Project Name (Inferred)",
        "purpose": "A concise summary of what this project does.",
        "description": "A detailed explanation of the project features and goals.",
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
    
    Return ONLY the JSON object above with your analysis filled in. No other text.
  `;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://codetodiagram.com", // Optional, strictly required by some providers via OpenRouter
        "X-Title": "CodeToDiagram" // Optional
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that returns ONLY valid JSON responses. Never include markdown, code blocks, or explanations outside the JSON object."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const text = data.choices[0]?.message?.content || "";

    // Clean up markdown code blocks and other formatting issues
    let cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Try to extract JSON if there's extra text
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanText = jsonMatch[0];
    }

    // Attempt to parse JSON with better error handling
    try {
      return JSON.parse(cleanText);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Attempted to parse:", cleanText.substring(0, 500));
      
      // Try to fix common JSON issues
      try {
        // Remove trailing commas before closing braces/brackets
        const fixedText = cleanText
          .replace(/,(\s*[}\]])/g, '$1')
          // Fix unescaped quotes in strings (basic attempt)
          .replace(/([^\\])"([^"]*)":/g, '$1"$2":');
        
        return JSON.parse(fixedText);
      } catch (secondError) {
        console.error("Second parse attempt failed:", secondError);
        throw new Error(`Failed to parse AI response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
      }
    }

  } catch (error) {
    console.error("AI Generation Error:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
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
