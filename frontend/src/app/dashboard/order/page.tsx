import { PropsWithChildren } from 'react';

interface OrderProps extends PropsWithChildren{
}

export default async function Order({}:OrderProps){

  return(
      <>
      <h1>Fazer um pedido</h1>
      </>
  )
}