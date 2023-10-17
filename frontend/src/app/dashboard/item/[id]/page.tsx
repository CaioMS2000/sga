import { GET_ITEM_BY_ID } from '@/lib/query/item';
import { ItemModel } from '@/models/ItemModel';
import { fetchGraphQL } from '@/utils';
import { PropsWithChildren } from 'react';

interface ItemProps extends PropsWithChildren{
    params: {
        id: string
    }
}

export default async function Item({params:{id}}:ItemProps){
    const item: ItemModel = await fetchGraphQL(GET_ITEM_BY_ID, {
        key: "getItemById",
        variables: {
            id: parseInt(id)
        }
    });

    console.log(item)

  return(
      <>
      <h1>Item {id}</h1>
      </>
  )
}