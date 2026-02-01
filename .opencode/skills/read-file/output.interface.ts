/**
 * Payload returned by the skill.
 */
export interface Output {
  /** The file content as string */
  content: string;
  /** File size in bytes */
  size: number;
  /** Encoding used to read the file */
  encoding: string;
  /** Whether the file existed */
  exists: boolean;
  /** Last modified timestamp (ISO 8601) */
  timestamp?: string;
  /** Human-readable file size */
  humanSize: string;
}