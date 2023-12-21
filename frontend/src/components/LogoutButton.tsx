"use client";
import { deleteCookie } from '@/app/actions';
import { AccesstokenKey, RefreshtokenKey, UserCookieKey } from '@/utils/constants';
import { HTMLProps, PropsWithChildren, ButtonHTMLAttributes } from 'react';
import { redirect } from "next/navigation";

interface LogoutButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement>{
}

export default function LogoutButton({children, ...rest}:LogoutButtonProps){
    async function clearCookies(){
        try {
            
            await deleteCookie(AccesstokenKey)
            await deleteCookie(RefreshtokenKey)
            await deleteCookie(UserCookieKey)
    
            redirect('/')
        } catch (error) {
            error;
        }
    }

  return(
      <>
      <button {...rest} className={"" + ` ${rest.className}`} type='button' onClick={clearCookies}>
        {children}
      </button>
      </>
  )
}