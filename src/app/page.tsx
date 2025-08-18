'use client';

import { MedicationIdentification } from '@/components/medication-identification';
import { useHistory } from '@/hooks/use-history';
import { MedicationCard } from '@/components/medication-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2, Inbox } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';

function HistorySection() {
  const { history, clearHistory, isLoaded } = useHistory();

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );

  if (!isLoaded) {
    return (
      <div className="mt-8 md:mt-12">
        <h2 className="font-headline text-xl md:text-2xl font-bold mb-6">Recent Identifications</h2>
        {renderSkeletons()}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="mt-12 md:mt-16 flex flex-col items-center justify-center text-center border-t pt-12">
        <Inbox className="h-20 w-20 text-muted-foreground/50" />
        <h2 className="mt-4 font-headline text-xl font-semibold">No History Yet</h2>
        <p className="mt-2 text-muted-foreground">
          Your identified medications will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 md:mt-12">
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="font-headline text-xl md:text-2xl font-bold">Recent Identifications</h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="w-full md:w-auto">
              <Trash2 className="mr-2 h-4 w-4" />
              Clear History
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your entire identification history. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={clearHistory}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {history.map((item) => (
          <MedicationCard key={item.id} medication={item} />
        ))}
      </div>
    </div>
  );
}


export default function Home() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex w-full justify-center">
        <MedicationIdentification />
      </div>
      <Separator className="my-8 md:my-12" />
      <HistorySection />
    </div>
  );
}
