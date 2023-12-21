import { PropsWithChildren } from 'react';

interface AdminProps extends PropsWithChildren{
}

export default async function Admin({}:AdminProps){

  return(
      <>
      <h1>Admin page</h1>
      </>
  )
}