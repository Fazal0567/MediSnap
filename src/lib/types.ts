import type { IdentifyMedicationOutput } from '@/ai/flows/identify-medication';

export type HistoryItem = IdentifyMedicationOutput & {
  id: string;
  timestamp: string;
  photoDataUri: string;
};
