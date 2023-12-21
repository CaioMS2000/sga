"use client";
import { stringToRole } from '@/utils';
import { HTMLProps, PropsWithChildren } from 'react';
import { IoIosClose } from "react-icons/io";

interface SelectorValueProps extends PropsWithChildren, HTMLProps<HTMLDivElement>{
  deleteFunction: (arg: any) => void;
  referenceValue: any;
}

export default function SelectorValue({children, referenceValue, deleteFunction, ...rest}:SelectorValueProps){

  return(
      <>
      <div {...rest} className={"flex flex-row-reverse items-center " + rest.className} onClick={() => deleteFunction(stringToRole(referenceValue))}>
        <IoIosClose className='ml-1 min-w-[20px] min-h-[20px] hover:cursor-pointer text-red-500' />
        {children}
      </div>
      </>
  )
}