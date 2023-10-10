import { PropsWithChildren } from 'react';
import Image from 'next/image';

interface LoginProps extends PropsWithChildren{
}

export default function Login({}:LoginProps){

  return(
      <>
      <div className="h-screen flex items-center justify-center">
        <div id='login-card' className="flex flex-col items-center justify-center bg-green-900 rounded-md p-6 max-w-xl">
          <div className="image-wrapper p-3 bg-white rounded-3xl flex justify-center max-w-xs mb-10">
            <Image src={'/image/crmvgo-logo-top.png'} width={300} height={300} alt=''/>
          </div>
          <div>
            <p className="font-bold text-white text-2xl">Sistema de Gerenciamento de Almoxarifado</p>
          </div>
          <div className="divider max-w-[5rem]"></div>
        </div>
      </div>
      </>
  )
}