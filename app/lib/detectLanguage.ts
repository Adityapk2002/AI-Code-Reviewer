export function detectLanguage(code: string): string {
  if (!code) return "javascript";

  // Python
  if (
    code.includes("def ") ||
    code.includes("import numpy") ||
    code.includes("print(")
  )
    return "python";

  // TypeScript
  if (
    code.includes(": string") ||
    code.includes(": number") ||
    code.includes("interface ") ||
    code.includes("type ")
  )
    return "typescript";

  // Java
  if (
    code.includes("public static void main") ||
    code.includes("System.out.println")
  )
    return "java";

  // C++
  if (
    code.includes("#include") ||
    code.includes("std::") ||
    code.includes("cout")
  )
    return "cpp";

  // HTML
  if (code.includes("<html") || code.includes("<div") || code.includes("<body"))
    return "html";

  // CSS
  if (code.includes("{") && code.includes("}") && code.includes(":"))
    return "css";

  // JSON
  if (code.trim().startsWith("{") && code.includes('":')) return "json";

  // default
  return "javascript";
}
