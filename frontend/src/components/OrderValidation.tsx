import { PropsWithChildren } from 'react';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';

interface OrderValidationProps extends PropsWithChildren{
}

export default async function OrderValidation({}:OrderValidationProps){

  return(
      <>
      <div className="container">
        <p className='font-bold'>Você aprova esse pedido?</p>
        <div className="flex justify-between px-5">
            <div className="rounded-md p-3 bg-red-600"><AiOutlineClose size={20} className='text-white'/></div>
            <div className="rounded-md p-3 bg-green-600"><AiOutlineCheck size={20} className='text-white'/></div>
        </div>
      </div>
      </>
  )
}