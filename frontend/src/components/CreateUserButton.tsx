"use client";
import { INIT_ORDER } from '@/lib/mutation/item';
import { UserModel } from '@/models/userModel';
import { fetchGraphQL } from '@/utils';
import { useRouter } from 'next/navigation';
import { HTMLProps, PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren, HTMLProps<HTMLButtonElement> {
  userData?: Omit<UserModel, 'id'>
}

export default function Button({children, userData, ...rest}:ButtonProps){
  const {push} = useRouter()

  async function handleOrder(){
		const order = await fetchGraphQL(INIT_ORDER, {
			key: 'initItemOrder',
			variables: {
				data: {
        }
			}
		})

		console.log(order)
    push(`/dashboard/order/${order.code}`)
	}

  return(
      <>
      <button {...rest} className={"btn" + ` ${rest.className}`} type='button' onClick={handleOrder}>
        {children}
      </button>
      </>
  )
}