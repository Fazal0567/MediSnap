'use server';

/**
 * @fileOverview An AI agent that identifies a medication from a photo.
 *
 * - identifyMedication - A function that handles the medication identification process.
 * - IdentifyMedicationInput - The input type for the identifyMedication function.
 * - IdentifyMedicationOutput - The return type for the identifyMedication function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyMedicationInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a pill, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyMedicationInput = z.infer<typeof IdentifyMedicationInputSchema>;

const IdentifyMedicationOutputSchema = z.object({
  medicationName: z.string().describe('The name of the identified medication.'),
  uses: z.string().describe('The uses of the medication.'),
  usesInHindi: z.string().describe('The uses of the medication, translated into Hindi.'),
  dosage: z.string().describe('The typical dosage of the medication.'),
  sideEffects: z.string().describe('Potential side effects of the medication.'),
});
export type IdentifyMedicationOutput = z.infer<typeof IdentifyMedicationOutputSchema>;

export async function identifyMedication(input: IdentifyMedicationInput): Promise<IdentifyMedicationOutput> {
  return identifyMedicationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyMedicationPrompt',
  input: {schema: IdentifyMedicationInputSchema},
  output: {schema: IdentifyMedicationOutputSchema},
  prompt: `You are a pharmacist. You will identify the medication in the photo and provide information about it.

  Photo: {{media url=photoDataUri}}

  Respond with:
  - The name of the medication.
  - The uses of the medication.
  - The uses of the medication, translated into Hindi.
  - The typical dosage of the medication.
  - Potential side effects of the medication.`,
});

const identifyMedicationFlow = ai.defineFlow(
  {
    name: 'identifyMedicationFlow',
    inputSchema: IdentifyMedicationInputSchema,
    outputSchema: IdentifyMedicationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
