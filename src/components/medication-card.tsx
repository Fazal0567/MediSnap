import type { HistoryItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Pill, NotepadText, AlertTriangle, TestTube2 } from 'lucide-react';
import Image from 'next/image';

interface MedicationCardProps {
  medication: HistoryItem;
}

export function MedicationCard({ medication }: MedicationCardProps) {
  return (
    <Card className="w-full overflow-hidden shadow-sm transition-shadow hover:shadow-md flex flex-col">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start p-4 md:p-6">
        {medication.photoDataUri && (
          <Image
            src={medication.photoDataUri}
            alt={medication.medicationName}
            width={80}
            height={80}
            className="aspect-square h-20 w-20 rounded-lg border object-cover shrink-0"
          />
        )}
        <div className="flex-1">
          <CardTitle className="flex items-center gap-2 font-headline text-lg md:text-xl">
            <Pill className="h-5 w-5 text-primary" />
            {medication.medicationName}
          </CardTitle>
          <CardDescription className="mt-1 text-xs md:text-sm">
            Identified on {new Date(medication.timestamp).toLocaleDateString()}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 px-4 md:px-6 pb-4 md:pb-6 pt-0 flex-1">
        <div className="grid gap-1">
          <h3 className="flex items-center gap-2 text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            <NotepadText className="h-4 w-4" /> Uses
          </h3>
          <p className="pl-6 text-sm md:text-base">{medication.uses}</p>
        </div>
        <div className="grid gap-1">
          <h3 className="flex items-center gap-2 text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            <TestTube2 className="h-4 w-4" /> Dosage
          </h3>
          <p className="pl-6 text-sm md:text-base">{medication.dosage}</p>
        </div>
        <div className="grid gap-1">
          <h3 className="flex items-center gap-2 text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4" /> Side Effects
          </h3>
          <p className="pl-6 text-sm md:text-base">{medication.sideEffects}</p>
        </div>
      </CardContent>
    </Card>
  );
}
