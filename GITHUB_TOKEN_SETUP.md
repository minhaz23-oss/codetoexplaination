# GitHub Token Setup Guide

## Why You Need a GitHub Token

Your application is hitting the GitHub API rate limit because it's making unauthenticated requests. GitHub limits:
- **Unauthenticated requests**: 60 requests/hour
- **Authenticated requests**: 5,000 requests/hour

## How to Create a GitHub Personal Access Token

1. **Go to GitHub Settings**
   - Visit: https://github.com/settings/tokens
   - Or navigate: GitHub Profile → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Generate New Token**
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a descriptive name (e.g., "Code to Explanation App")

3. **Set Permissions**
   For your use case, you only need:
   - ✅ **public_repo** (under `repo` section) - to access public repositories
   
   Or if you want to analyze private repos too:
   - ✅ **repo** (full control of private repositories)

4. **Generate and Copy Token**
   - Click "Generate token" at the bottom
   - **IMPORTANT**: Copy the token immediately (you won't see it again!)
   - It will look like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

5. **Add to Your .env.local File**
   - Open `.env.local` in your project
   - Replace `your_github_personal_access_token_here` with your actual token:
   ```
   GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
   ```

6. **Restart Your Development Server**
   - Stop your Next.js server (Ctrl+C)
   - Start it again: `npm run dev`

## Security Notes

⚠️ **NEVER commit your `.env.local` file to Git!**
- It's already in `.gitignore`, but double-check
- Never share your token publicly
- If exposed, revoke it immediately at: https://github.com/settings/tokens

## Verify It's Working

After adding the token:
1. Restart your dev server
2. Try analyzing a GitHub repository
3. Check the console - you should no longer see rate limit errors

## Troubleshooting

**Still getting rate limit errors?**
- Make sure the token is correctly copied (no extra spaces)
- Verify the token has the right permissions
- Check if the token is expired
- Restart your development server

**Token not working?**
- Ensure it starts with `ghp_` (classic token) or `github_pat_` (fine-grained token)
- Verify you selected the correct scopes/permissions
- Try generating a new token

## Alternative: Fine-Grained Tokens (Recommended for Production)

For better security, you can use fine-grained tokens:
1. Go to: https://github.com/settings/personal-access-tokens/new
2. Set repository access (public repositories only)
3. Under "Permissions" → "Repository permissions":
   - Contents: Read-only
   - Metadata: Read-only
4. Generate and use the same way as classic tokens
