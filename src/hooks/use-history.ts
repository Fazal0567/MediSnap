
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { HistoryItem } from '@/lib/types';
import type { IdentifyMedicationOutput } from '@/ai/flows/identify-medication';

const HISTORY_KEY = 'pillSnapHistory';
const HISTORY_LIMIT = 50;

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Failed to load history from localStorage', error);
      setHistory([]);
    }
    setIsLoaded(true);
  }, []);

  const saveHistory = useCallback((newHistory: HistoryItem[]) => {
    try {
      const limitedHistory = newHistory.slice(0, HISTORY_LIMIT); 
      setHistory(limitedHistory);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
    } catch (error) {
      console.error('Failed to save history to localStorage', error);
    }
  }, []);

  const addToHistory = useCallback(
    (item: IdentifyMedicationOutput, photoDataUri: string) => {
      const newHistory = [
        {
          ...item,
          id: new Date().toISOString() + Math.random().toString(),
          timestamp: new Date().toISOString(),
          photoDataUri,
        },
        ...history,
      ];
      saveHistory(newHistory);
    },
    [history, saveHistory]
  );

  const removeFromHistory = useCallback((id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    saveHistory(newHistory);
  }, [history, saveHistory]);

  const clearHistory = useCallback(() => {
    saveHistory([]);
  }, [saveHistory]);

  return { history, addToHistory, clearHistory, removeFromHistory, isLoaded };
}
