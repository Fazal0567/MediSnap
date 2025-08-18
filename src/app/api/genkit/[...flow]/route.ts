
import nextGenkit from '@genkit-ai/next';
// Make sure to import the flow file to register it with Genkit
import '@/ai/flows/identify-medication';

// Use the nextGenkit handler to expose your Genkit flows as Next.js API routes
export { nextGenkit as GET, nextGenkit as POST };
