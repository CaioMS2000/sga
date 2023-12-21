import DebugProvider from '@/context/debugContext';
import { PropsWithChildren } from 'react';

interface ProvidersProps extends PropsWithChildren{
}

export function Providers({children}: ProvidersProps) {

  return (
    <>
    <DebugProvider>{children}</DebugProvider>
    </>
  )
}