import { writeFile } from "fs/promises";

export function summarizeMemory() { }

export function appendMemory() { }

export async function writeMemory(filePath: string, content: string[], encoding: BufferEncoding = "utf8") {
  return writeFile(filePath, JSON.stringify(content, null, 2), encoding);
}
