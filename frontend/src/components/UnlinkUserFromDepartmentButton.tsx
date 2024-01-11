"use client";
import { Fragment, HTMLProps, PropsWithChildren } from 'react';

interface UnlinkUserFromDepartmentButtonProps extends PropsWithChildren, HTMLProps<HTMLDivElement>{
  unlinkFunction: (...args: unknown[]) => void;
}

export default function UnlinkUserFromDepartmentButton({unlinkFunction, children, className, ...rest}:UnlinkUserFromDepartmentButtonProps){

  return(
      <div {...rest} onClick={unlinkFunction} className={className}>
        {children}
      </div>
  )
}