"use client";
import { CategoryModel } from '@/models/categoryModel';
import { HTMLProps, PropsWithChildren } from 'react';
import { ImCross } from "react-icons/im";

interface DeleteCategoryIconProps extends PropsWithChildren, HTMLProps<HTMLDivElement>{
    category: CategoryModel;
}

export default function DeleteCategoryIcon({category}:DeleteCategoryIconProps){

  return(
      <>
      <ImCross className='min-w-[20px] min-h-[20px] hover:cursor-pointer text-red-500' />
      </>
  )
}