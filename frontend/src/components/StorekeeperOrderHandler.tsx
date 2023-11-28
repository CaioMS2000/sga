"use client";
import { CREATE_DELIVERY } from '@/lib/mutation/delivery';
import { DeliveryModel } from '@/models/deliveryModel';
import { Status as _Status } from '@/models/enum';
import { OrderModel } from '@/models/orderModel';
import { UserModel } from '@/models/userModel';
import { fetchGraphQL, statusToText } from '@/utils';
import { PropsWithChildren } from 'react';

// export enum Status {
//     Waiting = "Waiting",
//     Separation = "Separation",
//     InProgress = "InProgress",
//     Concluded = "Concluded",
// }

interface StorekeeperOrderHandlerProps extends PropsWithChildren{
    order: OrderModel;
    user: UserModel;
}

export default function StorekeeperOrderHandler({order, user}:StorekeeperOrderHandlerProps){
    const analysis = order.analysis
    let delivery = order.item.delivery

    const deliveryStatus = delivery.status
    const DeliveryStatus = <span className={`text-[1.3rem] text-${deliveryStatus == _Status.Waiting?'orange-500':(deliveryStatus == _Status.Separation?'yellow-500':(deliveryStatus == _Status.InProgress)?'blue-500':'green-500')}`}>{statusToText(deliveryStatus)}</span>;
    const buttonLabel = deliveryStatus == _Status.Waiting?'Estou ciente':(deliveryStatus == _Status.Separation?'Partir para entrega':'Confirmar entrega')

    async function handleDelivery(){
        if(!delivery){
            delivery = await fetchGraphQL(CREATE_DELIVERY, {
                key: 'setItemDelivery',
                variables: {
                    data: {
                        userId: user.id,
                        itemId: order.item.id,
                    }
                }
            })

            console.log(delivery)
            location.reload()
        }
    }

  return(
      <>
      <div className="bg-slate-700 rounded-lg h-fit p-3 text-2xl text-center flex flex-col">
      <h3 className="font-bold bg-slate-400 p-3 mb-5 text-black rounded-lg">Almoxarife</h3>
      {delivery && (
        <>
        <span className='flex'><p className="text-[1.3rem] mr-1">Status:</p>
        {DeliveryStatus}
        </span>
        </>
      )}
      <button className="btn bg-darkGreen border-darkGreen text-white font-bold mt-5" onClick={handleDelivery}>{buttonLabel}</button>
      </div>
      </>
  )
}