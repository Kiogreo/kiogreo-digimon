/**
 * Payload accepted by the skill.
 */
export interface Input {
  /** Unique Digimon identifier (e.g. "agumon") */
  digimonId: string;
  /** The memory text to store */
  memory: string;
}
