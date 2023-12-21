import OrderHorizontalCard from '@/components/OrderHorizontalCard';
import { GET_ALL_ORDERS } from '@/lib/query/order';
import { Admin, Manager, StoreKeeper } from '@/models/enum';
import { OrderModel } from '@/models/orderModel';
import { UserModel } from '@/models/userModel';
import { buildUser, fetchGraphQL, usersInSameDepartment } from '@/utils';
import { PropsWithChildren } from 'react';

interface OrdersProps extends PropsWithChildren{
}

export default async function Orders({}:OrdersProps){

  const orders: OrderModel[] = await fetchGraphQL(GET_ALL_ORDERS, {
    key: 'orders'
  })

  const currentUser = await buildUser()
  const userIsStorekeeper = currentUser!.roles.includes(StoreKeeper)

  return(
      <>
      <div className="flex flex-col items-center gap-5">
        {
          orders.filter(order => thisUserShouldSeeThisOrder(currentUser!, order)).map(order => (<OrderHorizontalCard key={order.id} order={order} storeKeeperView={userIsStorekeeper}/>))
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
    return usersInSameDepartment(currentUser, requester)
  }

  if(currentUser.roles.includes(StoreKeeper)){
    if(order.analysis?.isApproved){
      return true
    }
  }

  return false;
}