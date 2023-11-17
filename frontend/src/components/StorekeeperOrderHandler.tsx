"use client";
import { CREATE_DELIVERY } from '@/lib/mutation/delivery';
import { DeliveryModel } from '@/models/deliveryModel';
import { OrderModel } from '@/models/orderModel';
import { UserModel } from '@/models/userModel';
import { fetchGraphQL } from '@/utils';
import { PropsWithChildren } from 'react';

interface StorekeeperOrderHandlerProps extends PropsWithChildren{
    order: OrderModel;
    user: UserModel;
}

export default function StorekeeperOrderHandler({order, user}:StorekeeperOrderHandlerProps){
    const analysis = order.analysis
    let delivery = order.item.delivery

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
      <div className="bg-slate-700 rounded-lg h-fit p-3 text-2xl text-center">
      <h3 className="font-bold bg-slate-400 p-3 mb-5 text-black rounded-lg">Almoxarife</h3>
      <button className="btn bg-darkGreen border-darkGreen text-white font-bold" onClick={handleDelivery}>Estou ciente</button>
      </div>
      </>
  )
}