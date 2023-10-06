import { SessionProvider } from "next-auth/react"
import { PropsWithChildren } from 'react';

export interface ProvidersProps extends PropsWithChildren{
}

export function Providers({children}: ProvidersProps) {
    const session = {}

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}