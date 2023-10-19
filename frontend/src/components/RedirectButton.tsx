"use client";
import { useRouter } from 'next/navigation';
import { HTMLProps, PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren, HTMLProps<HTMLButtonElement> {
    url: string
}

export default async function Button({children, url, ...rest}:ButtonProps){
    const {push} = useRouter()

  return(
      <>
      <button {...rest} className={"btn" + ` ${rest.className}`} type='button' onClick={() => push(url)}>
        {children}
      </button>
      </>
  )
}