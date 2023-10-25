import OrderHorizontalCard from '@/components/OrderHorizontalCard';
import { GET_ALL_ORDERS } from '@/lib/query/order';
import { OrderModel } from '@/models/orderModel';
import { fetchGraphQL } from '@/utils';
import { PropsWithChildren } from 'react';

interface OrdersProps extends PropsWithChildren{
}

export default async function Orders({}:OrdersProps){

  const orders: OrderModel[] = await fetchGraphQL(GET_ALL_ORDERS, {
    key: 'orders'
  })
  console.log(orders)

  return(
      <>
      <div className="flex flex-col items-center">
        {
          orders.map(order => (<OrderHorizontalCard key={order.id} order={order}/>))
        }
      </div>
      </>
  )
}