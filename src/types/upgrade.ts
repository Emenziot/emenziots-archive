export type UpgradeStatus =
  | "hidden"
  | "available"
  | "planned"
  | "in-progress"
  | "complete";
 
export interface UpgradeNode {
  id: string;
  name: string;
  category: string;
  status: UpgradeStatus;
  prerequisites: string[]; // ids of other nodes
  description: string; // player-safe note, in Arthur's voice
  dmOnly: boolean; // never render in player mode
  dmNotes?: string; // secret info, never sent to player mode
}
 