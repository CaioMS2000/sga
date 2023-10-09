import { PropsWithChildren } from 'react';

export interface ProvidersProps extends PropsWithChildren{
}

export function Providers({children}: ProvidersProps) {

  return (
    <>
    {children}
    </>
  )
}