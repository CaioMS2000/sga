import CategoryCard from '@/components/CategoryCard';
import { GET_ALL_CATEGORIES } from '@/lib/query/category';
import { CategoryModel } from '@/models/categoryModel';
import { fetchGraphQL } from '@/utils';
import { PropsWithChildren } from 'react';

interface CategoriesProps extends PropsWithChildren{
}

export default async function Categories({}:CategoriesProps){
    const res = await fetchGraphQL<CategoryModel[]>(GET_ALL_CATEGORIES, {
		key: 'categories'
	})
	console.log(res)

  return(
      <>
      <a href="/dashboard/category/create">NOVO</a>
      {
        res.map( cat => <CategoryCard category={cat}/>)
      }
      </>
  )
}