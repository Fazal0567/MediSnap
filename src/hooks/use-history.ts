
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { HistoryItem } from '@/lib/types';
import type { IdentifyMedicationOutput } from '@/ai/flows/identify-medication';

const HISTORY_KEY = 'pillSnapHistory';

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
      const limitedHistory = newHistory.slice(0, 50); // Limit history size
      setHistory(limitedHistory);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
    } catch (error) {
      console.error('Failed to save history to localStorage', error);
    }
  }, []);

  const addToHistory = useCallback(
    (item: IdentifyMedicationOutput, photoDataUri: string) => {
      // Access state with a function to get the latest value
      setHistory((currentHistory) => {
        const newItem: HistoryItem = {
          ...item,
          id: new Date().toISOString() + Math.random().toString(),
          timestamp: new Date().toISOString(),
          photoDataUri,
        };
        const newHistory = [newItem, ...currentHistory];
        saveHistory(newHistory);
        return newHistory;
      });
    },
    [saveHistory]
  );

  const removeFromHistory = useCallback((id: string) => {
    setHistory(currentHistory => {
        const newHistory = currentHistory.filter(item => item.id !== id);
        saveHistory(newHistory);
        return newHistory;
    });
  }, [saveHistory]);

  const clearHistory = useCallback(() => {
    saveHistory([]);
  }, [saveHistory]);

  return { history, addToHistory, clearHistory, removeFromHistory, isLoaded };
}
