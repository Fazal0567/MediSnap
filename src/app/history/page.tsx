
'use client';

import { useHistory } from '@/hooks/use-history';
import { MedicationCard } from '@/components/medication-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2, Inbox, ArrowLeft } from 'lucide-react';
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
import Link from 'next/link';

export default function HistoryPage() {
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

  const renderEmptyState = () => (
    <div className="mt-12 md:mt-16 flex flex-col items-center justify-center text-center border-t pt-12">
        <Inbox className="h-20 w-20 text-muted-foreground/50" />
        <h2 className="mt-4 font-headline text-xl font-semibold">No History Yet</h2>
        <p className="mt-2 text-muted-foreground">
          Your identified medications will appear here.
        </p>
    </div>
  );
  
  return (
    <div className="w-full">
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="outline" size="icon">
                        <ArrowLeft />
                    </Button>
                </Link>
                <h1 className="font-headline text-2xl md:text-3xl font-bold">Identification History</h1>
            </div>
            {history.length > 0 && (
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
            )}
        </div>

        {!isLoaded && renderSkeletons()}
        {isLoaded && history.length === 0 && renderEmptyState()}
        {isLoaded && history.length > 0 && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {history.map((item) => (
                    <MedicationCard key={item.id} medication={item} />
                ))}
            </div>
        )}
    </div>
  );
}
