'use client';

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

export default function HistoryPage() {
  const { history, clearHistory, isLoaded } = useHistory();

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
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

  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold">Identification History</h1>
        {history.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
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
        )}
      </div>

      {!isLoaded ? (
        renderSkeletons()
      ) : history.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <Inbox className="h-24 w-24 text-muted-foreground/50" />
          <h2 className="mt-4 font-headline text-2xl font-semibold">No History Yet</h2>
          <p className="mt-2 text-muted-foreground">
            Your identified medications will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {history.map((item) => (
            <MedicationCard key={item.id} medication={item} />
          ))}
        </div>
      )}
    </div>
  );
}
