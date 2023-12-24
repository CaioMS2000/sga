import { HTMLProps, PropsWithChildren } from 'react';
import { IoIosBusiness } from "react-icons/io";
import { SupplierModel } from '@/models/supplierModel';

interface SupplierCardProps extends PropsWithChildren, HTMLProps<HTMLDivElement>{
    supplier: SupplierModel
}

export default async function SupplierCard({supplier, ...rest}:SupplierCardProps){

  return(
      <>
      <div {...rest} className={rest.className + " w-fit p-3 flex gap-3 h-fit items-center border-2 rounded-lg"}>
        <IoIosBusiness className='w-10 h-10'/>
        <div className="flex flex-col">
            <p className='font-bold'>{supplier.name}</p>
            <p><span className="font-bold">CNPJ:</span> {supplier.cnpj}</p>
            <p><span className="font-bold">Email:</span> {supplier.email}</p>
            <p><span className="font-bold">Telefone:</span> {supplier.phone}</p>
        </div>
      </div>
      </>
  )
}