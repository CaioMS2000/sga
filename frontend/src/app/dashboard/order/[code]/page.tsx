import { PropsWithChildren } from 'react';

interface OrderProps extends PropsWithChildren{
  params: {
    code: string;
  }
}

export default async function Order({params:{code}}:OrderProps){

  return(
      <>
      <h1>Pedido {code}</h1>
      </>
  )
}