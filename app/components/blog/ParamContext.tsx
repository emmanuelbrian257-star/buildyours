// context/ParamContext.tsx
'use client';

import { createContext, useContext } from 'react';

const ParamContext = createContext<{ slug: string | null }>( { slug: null });

export function ParamProvider({ children, slug }: { children: React.ReactNode; slug: string }) {
  return <ParamContext.Provider value={{ slug }}>{children}</ParamContext.Provider>;
}

export const useParam = () => useContext(ParamContext);
