import CategoryCard from '@/components/CategoryCard';
import { GET_ALL_CATEGORIES } from '@/lib/query/category';
import { fetchGraphQL } from '@/utils';
import { PropsWithChildren } from 'react';

interface CategoriesProps extends PropsWithChildren{
}

export default async function Categories({}:CategoriesProps){
    const res = await fetchGraphQL(GET_ALL_CATEGORIES, {
		key: 'categories'
	})
	console.log(res)

  return(
      <>
      {
        res.map( r => <CategoryCard/>)
      }
      </>
  )
}