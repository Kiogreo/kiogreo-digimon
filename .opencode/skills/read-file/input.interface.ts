/**
 * Payload accepted by the skill.
 */
export interface Input {
  /** Path to the file to read (absolute or relative) */
  filePath: string;
  /** Optional encoding (defaults to "utf8") */
  encoding?: string;
}