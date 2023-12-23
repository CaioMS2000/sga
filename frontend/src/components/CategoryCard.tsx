import { FaFolder } from 'react-icons/fa';
import { PropsWithChildren } from 'react';

interface CategoryCardProps extends PropsWithChildren{
}

export default async function CategoryCard({}:CategoryCardProps){

  return(
      <>
      <div className="div">

      <FaFolder/>
      </div>
      </>
  )
}