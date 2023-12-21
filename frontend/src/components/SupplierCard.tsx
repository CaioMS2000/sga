import { HTMLProps, PropsWithChildren } from 'react';
import { IoIosBusiness } from "react-icons/io";
import { SupplierModel } from '@/models/supplierModel';

interface SupplierCardProps extends PropsWithChildren, HTMLProps<HTMLDivElement>{
    supplier: SupplierModel
}

export default async function SupplierCard({supplier, ...rest}:SupplierCardProps){

  return(
      <>
      <div {...rest} className={rest.className + " w-fit p-3 flex gap-3 h-fit items-center border-2"}>
        <IoIosBusiness className='w-10 h-10'/>
        <div className="flex flex-col">
            <p>{supplier.name}</p>
            <p>{supplier.cnpj}</p>
            <p>{supplier.email}</p>
            <p>{supplier.phone}</p>
        </div>
      </div>
      </>
  )
}