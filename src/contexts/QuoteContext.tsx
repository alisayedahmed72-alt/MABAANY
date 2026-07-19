import { createContext, useContext } from 'react';

export const QuoteModalContext = createContext<(open: boolean) => void>(() => {});

export function useQuoteModal() {
  return useContext(QuoteModalContext);
}
