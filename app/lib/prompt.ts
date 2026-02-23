export type AnalyzeMode = "check" | "improve" | "optimize" | "explain";

export function getPrompt(
  mode: AnalyzeMode,
  code: string,
  language: string,
): string {
  const lang = language || "unknown";

  const baseRules = `
STRICT OUTPUT RULES:
- Do NOT use markdown
- Do NOT use ** or headings
- Do NOT use bullet symbols
- Do NOT use backticks
- Return plain text or plain code only
- No extra commentary
`;
  const prompts: Record<AnalyzeMode, string> = {
    check: `You are an expert code reviewer. Analyze the following ${lang} code for:
1. Syntax errors
2. Logic errors
3. Security vulnerabilities
4. Performance issues
5. Best practice violations

Return ONLY the corrected code with inline comments starting with "// FIX:" explaining what was wrong and what was changed.
If the code is already correct, return it as-is with a comment "// ✓ No issues found".
Do NOT add any explanation outside the code. Only return the code block.
${baseRules}
Code to analyze:
\`\`\`${lang}
${code}
\`\`\``,

    improve: `You are an expert software engineer. Improve the following ${lang} code for:
1. Better readability and maintainability
2. Performance optimizations
3. Modern best practices and patterns
4. Proper error handling
5. Clean code principles

Return ONLY the improved code with inline comments starting with "// IMPROVED:" explaining significant changes.
Do NOT add any explanation outside the code. Only return the code block.
${baseRules}
Code to improve:
\`\`\`${lang}
${code}
\`\`\``,
    optimize: `You are a senior performance engineer and optimization expert. Optimize the following ${lang} code for:

1. Maximum performance and efficiency
2. Reduced time complexity
3. Reduced memory usage
4. Removal of unnecessary operations
5. Better algorithm or data structure if applicable
6. Scalability improvements for large inputs
7. Clean and modern coding standards

IMPORTANT RULES:
- Do NOT change the core functionality
- Do NOT break existing logic
- Keep code readable but highly optimized
- Use modern ${lang} best practices

Return ONLY the optimized code with inline comments starting with "// OPTIMIZED:" explaining what was improved and why.
Do NOT add any explanation outside the code.
Only return the code block.
${baseRules}
Code to optimize:
\`\`\`${lang}
${code}
\`\`\``,
    explain: `
You are a senior developer explaining code inside an IDE.

Explain this ${lang} code in a clean developer-friendly way.

${baseRules}

OUTPUT FORMAT (STRICT):

What this code does:
<plain explanation in simple sentences>

IMPORTANT:
- No stars
- No markdown
- No headings with #
- No bullet symbols
- Only clean plain text like IDE assistant

CODE:
${code}
`,
  };
  return prompts[mode];
}
