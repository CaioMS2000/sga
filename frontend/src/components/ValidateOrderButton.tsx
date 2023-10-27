"use client";
import { CREATE_ANALYSIS } from '@/lib/mutation/analysis';
import { fetchGraphQL } from '@/utils';
import { useRouter } from 'next/navigation';
import { HTMLProps, PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren, HTMLProps<HTMLButtonElement> {
  analystId: number;
  orderId: number;
  isApproved: boolean;
}

export default function Button({children, analystId, orderId, isApproved, ...rest}:ButtonProps){
  // console.log(analystId, orderId, isApproved,)
  const {refresh} = useRouter()
  
  async function handleAnalysis(){
    console.log(analystId, orderId, isApproved,)
		const analysis = await fetchGraphQL(CREATE_ANALYSIS, {
			variables: {
				data: {
          analystId,
				  orderId,
				  isApproved,
        }
			},
      key: 'createAnalysis'
		})

		console.log(analysis)
    refresh()
	}

  return(
      <>
      <button {...rest} className={"btn" + ` ${rest.className}`} type='button' onClick={handleAnalysis}>
        {children}
      </button>
      </>
  )
}