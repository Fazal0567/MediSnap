
'use client';

import { useHistory } from '@/hooks/use-history';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2, Inbox, ArrowLeft, Pill, NotepadText, AlertTriangle, TestTube2 } from 'lucide-react';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link';
import Image from 'next/image';

export default function HistoryPage() {
  const { history, clearHistory, removeFromHistory, isLoaded } = useHistory();

  const renderSkeletons = () => (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3 p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-1/2 rounded-md" />
            <Skeleton className="h-6 w-6 rounded-full" />
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
            <Accordion type="single" collapsible className="w-full space-y-4">
                {history.map((item) => (
                    <AccordionItem value={item.id} key={item.id} className="border rounded-lg overflow-hidden bg-card">
                       <AccordionTrigger className="p-4 hover:no-underline">
                         <div className="flex items-center gap-4 text-left">
                            <Image
                                src={item.photoDataUri}
                                alt={item.medicationName}
                                width={40}
                                height={40}
                                className="aspect-square h-10 w-10 rounded-md border object-cover shrink-0"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold">{item.medicationName}</h3>
                                <p className="text-xs text-muted-foreground">
                                    Identified on {new Date(item.timestamp).toLocaleDateString()}
                                </p>
                            </div>
                         </div>
                       </AccordionTrigger>
                       <AccordionContent className="px-4 pb-4">
                            <div className="grid gap-4 pl-14">
                                <div className="grid gap-1">
                                <h3 className="flex items-center gap-2 text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                    <NotepadText className="h-4 w-4" /> Uses
                                </h3>
                                <p className="pl-6 text-sm md:text-base">{item.uses}</p>
                                </div>
                                <div className="grid gap-1">
                                <h3 className="flex items-center gap-2 text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                    <TestTube2 className="h-4 w-4" /> Dosage
                                </h3>
                                <p className="pl-6 text-sm md:text-base">{item.dosage}</p>
                                </div>
                                <div className="grid gap-1">
                                <h3 className="flex items-center gap-2 text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                    <AlertTriangle className="h-4 w-4" /> Side Effects
                                </h3>
                                <p className="pl-6 text-sm md:text-base">{item.sideEffects}</p>
                                </div>
                                <div className="mt-2">
                                    <Button variant="destructive" size="sm" onClick={() => removeFromHistory(item.id)}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                       </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        )}
    </div>
  );
}
