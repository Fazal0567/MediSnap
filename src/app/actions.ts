'use server';

import { identifyMedication, type IdentifyMedicationInput, type IdentifyMedicationOutput } from '@/ai/flows/identify-medication';

export async function handleIdentifyMedication(
  photoDataUri: string
): Promise<IdentifyMedicationOutput> {
  if (!photoDataUri) {
    throw new Error('Photo data URI is required.');
  }

  const input: IdentifyMedicationInput = { photoDataUri };

  try {
    const result = await identifyMedication(input);
    return result;
  } catch (error) {
    console.error('Error identifying medication:', error);
    throw new Error('Failed to identify medication. The AI model may be unavailable or the image could not be processed.');
  }
}
