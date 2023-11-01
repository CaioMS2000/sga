import OrderHorizontalCard from '@/components/OrderHorizontalCard';
import { GET_ALL_ORDERS } from '@/lib/query/order';
import { Admin, Manager } from '@/models/enum';
import { OrderModel } from '@/models/orderModel';
import { UserModel } from '@/models/userModel';
import { buildUser, fetchGraphQL } from '@/utils';
import { PropsWithChildren } from 'react';

interface OrdersProps extends PropsWithChildren{
}

export default async function Orders({}:OrdersProps){

  const orders: OrderModel[] = await fetchGraphQL(GET_ALL_ORDERS, {
    key: 'orders'
  })
  orders.forEach(order => {
    console.log(order)
  })
  const currentUser = await buildUser()

  return(
      <>
      <div className="flex flex-col items-center">
        {
          orders.filter(order => thisUserShouldSeeThisOrder(currentUser, order)).map(order => (<OrderHorizontalCard key={order.id} order={order}/>))
        }
      </div>
      </>
  )
}

function thisUserShouldSeeThisOrder(currentUser: UserModel, order: OrderModel){
  if(currentUser.roles.includes(Admin)) return true;

  const requester = order.requester

  if(requester.email == currentUser.email) return true;

  if(currentUser.roles.includes(Manager)){
    return currentUser.department.some(thisDep => requester.department.some(reqDep => thisDep == reqDep))
  }

  return false;
}