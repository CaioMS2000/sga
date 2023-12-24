"use client";
import { CategoryModel } from '@/models/categoryModel';
import { HTMLProps, PropsWithChildren } from 'react';
import { FaPen } from "react-icons/fa";

interface EditCategoryIconProps extends PropsWithChildren, HTMLProps<HTMLDivElement>{
    category: CategoryModel;
}

export default function EditCategoryIcon({category}:EditCategoryIconProps){

  return(
      <>
      <FaPen className='min-w-[20px] min-h-[20px] hover:cursor-pointer text-blue-500' />
      </>
  )
}