"use client";
import { CREATE_DELIVERY, UPDATE_DELIVERY } from '@/lib/mutation/delivery';
import { DeliveryModel } from '@/models/deliveryModel';
import { Status as _Status } from '@/models/enum';
import { OrderModel } from '@/models/orderModel';
import { UserModel } from '@/models/userModel';
import { fetchGraphQL, statusToText } from '@/utils';
import { PropsWithChildren } from 'react';

interface StorekeeperOrderHandlerProps extends PropsWithChildren{
    order: OrderModel;
    user: UserModel;
}

export default function StorekeeperOrderHandler({order, user}:StorekeeperOrderHandlerProps){
    const analysis = order.analysis
    let delivery = order.item.delivery

    console.log(order)

    const deliveryStatus = delivery?.status
    console.log(deliveryStatus)
    const DeliveryStatus = <span className={`font-bold text-[1.3rem] text-${deliveryStatus == _Status.Waiting?'orange-500':(deliveryStatus == _Status.Separation?'yellow-500':(deliveryStatus == _Status.InProgress)?'blue-500':'green-500')}`}>{statusToText(deliveryStatus)}</span>;
    const buttonLabel = deliveryStatus == _Status.Waiting?'Preparar':(deliveryStatus == _Status.Separation?'Partir para entrega':(deliveryStatus == undefined?'Estou ciente':'Confirmar entrega'))
    const nextDeliveryStatus = deliveryStatus == _Status.Waiting?_Status.Separation:(deliveryStatus == _Status.Separation?_Status.InProgress:_Status.Concluded)

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
        else{
            console.log(nextDeliveryStatus)
            if(_Status.Concluded != deliveryStatus){
                delivery = await fetchGraphQL(UPDATE_DELIVERY, {
                    key: 'updateDelivery',
                    variables: {
                        data: {
                            status: nextDeliveryStatus,
                            code: delivery.code,
                        }
                    }
                })
        
                console.log(delivery)
                location.reload()
            }
            else{
                console.log('concluido')
            }
        }
    }

  return(
      <>
      <div className="bg-zinc-800 rounded-lg h-fit p-3 text-2xl text-center flex flex-col">
      <h3 className="font-bold mb-5 text-white rounded-lg">Almoxarife</h3>
      {delivery && (
        <>
        <span className='flex'><p className="text-[1.3rem] mr-1">Status:</p>
        {DeliveryStatus}
        </span>
        </>
      )}
      {
        deliveryStatus != _Status.Concluded && (
            <button className="btn bg-purple-700 hover:bg-purple-900 border-purple-700 hover:border-purple-900 text-white font-bold mt-5" onClick={handleDelivery}>{buttonLabel}</button>
        )
      }
      </div>
      </>
  )
}