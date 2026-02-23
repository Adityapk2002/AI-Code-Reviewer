import { diffLines } from "diff";

export function generateDiff(oldCode: string, newCode: string) {
  const changes = diffLines(oldCode, newCode);

  let result = "";

  changes.forEach((part) => {
    const color = part.added ? "added" : part.removed ? "removed" : "same";

    const lines = part.value.split("\n");

    lines.forEach((line) => {
      if (!line) return;

      if (color === "added") {
        result += `+ ${line}\n`;
      } else if (color === "removed") {
        result += `- ${line}\n`;
      } else {
        result += `  ${line}\n`;
      }
    });
  });

  return result;
}
