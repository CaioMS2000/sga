"use client";
import { INIT_ORDER } from '@/lib/mutation/item';
import { fetchGraphQL } from '@/utils';
import { useRouter } from 'next/navigation';
import { HTMLProps, PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren, HTMLProps<HTMLButtonElement> {
  requesterId: number;
  itemId: number;
}

export default function Button({children, requesterId, itemId, ...rest}:ButtonProps){
  const {push} = useRouter()

  async function handleOrder(){
		const order = await fetchGraphQL(INIT_ORDER, {
			key: 'initItemOrder',
			variables: {
				data: {
          requesterId,
				  itemId,
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