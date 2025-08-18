'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Camera, Upload, Loader2, RefreshCw, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { handleIdentifyMedication } from '@/app/actions';
import { useHistory } from '@/hooks/use-history';
import type { IdentifyMedicationOutput } from '@/ai/flows/identify-medication';
import { MedicationCard } from './medication-card';
import type { HistoryItem } from '@/lib/types';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export function MedicationIdentification() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<IdentifyMedicationOutput | null>(null);
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { addToHistory } = useHistory();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUri = e.target?.result as string;
        setPhotoDataUri(dataUri);
        resetForIdentification(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForIdentification = (dataUri: string) => {
    setStatus('loading');
    setResult(null);
    setError(null);

    handleIdentify(dataUri);
  };
  
  const handleIdentify = useCallback(async (dataUri: string) => {
    try {
      const response = await handleIdentifyMedication(dataUri);
      setResult(response);
      addToHistory(response, dataUri);
      setStatus('success');
    } catch (e) {
      const err = e as Error;
      setError(err.message);
      setStatus('error');
      toast({
        variant: 'destructive',
        title: 'Identification Failed',
        description: err.message,
      });
    }
  }, [addToHistory, toast]);

  const resetAll = () => {
    setStatus('idle');
    setResult(null);
    setPhotoDataUri(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderIdleState = () => (
    <Card className="w-full max-w-lg text-center">
      <CardContent className="p-6 md:p-8">
        <h2 className="font-headline text-2xl md:text-3xl font-bold">Identify a Pill</h2>
        <p className="mt-2 text-muted-foreground">
          Take a photo or upload an image to identify a medication.
        </p>

        <div className="my-6">
            <div className="w-full aspect-video rounded-md bg-muted flex items-center justify-center">
                <Camera className="h-16 w-16 text-muted-foreground/50" />
            </div>
        </div>

        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Button size="lg" onClick={() => fileInputRef.current?.click()}>
            <Camera className="mr-2 h-5 w-5" />
            Take Photo
          </Button>
          <Button size="lg" variant="secondary" onClick={() => {
            const newFileInput = document.createElement('input');
            newFileInput.type = 'file';
            newFileInput.accept = 'image/*';
            newFileInput.onchange = handleFileChange;
            newFileInput.click();
          }}>
            <Upload className="mr-2 h-5 w-5" />
            Upload
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderProcessingState = () => (
    <Card className="w-full max-w-md">
      <CardContent className="flex flex-col items-center justify-center p-6 md:p-8">
        {photoDataUri && (
          <Image
            src={photoDataUri}
            alt="Pill to identify"
            width={128}
            height={128}
            className="mb-6 h-32 w-32 animate-pulse rounded-lg border object-cover"
          />
        )}
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <h2 className="mt-4 font-headline text-xl font-semibold">Identifying...</h2>
        <p className="mt-1 text-muted-foreground">Please wait a moment.</p>
      </CardContent>
    </Card>
  );
  
  const renderErrorState = () => (
    <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-6 md:p-8 text-center">
            <XCircle className="h-12 w-12 text-destructive" />
            <h2 className="mt-4 font-headline text-xl font-semibold">Identification Failed</h2>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
            <Button onClick={resetAll} className="mt-6">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
            </Button>
        </CardContent>
    </Card>
  )

  const renderSuccessState = () => {
    if (!result || !photoDataUri) return renderErrorState();
    
    const historyItem: HistoryItem = {
      ...result,
      id: '', // id is generated in hook
      timestamp: new Date().toISOString(),
      photoDataUri,
    }

    return (
        <div className="w-full max-w-2xl">
            <MedicationCard medication={historyItem} />
            <Button onClick={resetAll} className="mt-6 w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Identify Another Pill
            </Button>
        </div>
    );
  };
  
  switch (status) {
    case 'loading':
      return renderProcessingState();
    case 'success':
      return renderSuccessState();
    case 'error':
      return renderErrorState();
    case 'idle':
    default:
      return renderIdleState();
  }
}
