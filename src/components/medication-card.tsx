import type { HistoryItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Pill, NotepadText, AlertTriangle, TestTube2 } from 'lucide-react';
import Image from 'next/image';

interface MedicationCardProps {
  medication: HistoryItem;
}

export function MedicationCard({ medication }: MedicationCardProps) {
  return (
    <Card className="w-full overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {medication.photoDataUri && (
          <Image
            src={medication.photoDataUri}
            alt={medication.medicationName}
            width={80}
            height={80}
            className="aspect-square h-20 w-20 rounded-lg border object-cover"
          />
        )}
        <div className="flex-1">
          <CardTitle className="flex items-center gap-2 font-headline text-xl">
            <Pill className="h-5 w-5 text-primary" />
            {medication.medicationName}
          </CardTitle>
          <CardDescription className="mt-1">
            Identified on {new Date(medication.timestamp).toLocaleDateString()}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-1">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <NotepadText className="h-4 w-4" /> USES
          </h3>
          <p className="pl-6">{medication.uses}</p>
        </div>
        <div className="grid gap-1">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <TestTube2 className="h-4 w-4" /> DOSAGE
          </h3>
          <p className="pl-6">{medication.dosage}</p>
        </div>
        <div className="grid gap-1">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <AlertTriangle className="h-4 w-4" /> SIDE EFFECTS
          </h3>
          <p className="pl-6">{medication.sideEffects}</p>
        </div>
      </CardContent>
    </Card>
  );
}
