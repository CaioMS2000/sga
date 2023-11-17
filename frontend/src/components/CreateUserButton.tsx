"use client";
import { CREATE_USER } from '@/lib/mutation/user';
import { UserModel } from '@/models/userModel';
import { fetchGraphQL } from '@/utils';
import { HTMLProps, PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren, HTMLProps<HTMLButtonElement> {
  userData: Omit<UserModel, 'id'>
}

export default function Button({children, userData, ...rest}:ButtonProps){

  async function handleCreateUser(){
		const user = await fetchGraphQL(CREATE_USER, {
			key: 'createUser',
			variables: {
				data: {
          profileImagePath: userData.profileImagePath,
          departmentCode: userData.department[0].code,
          name: userData.name,
          email: userData.email,
          password: userData.password,
          roles: userData.roles,
        }
			}
		})

    location.reload()
	}

  return(
      <>
      <button {...rest} className={"btn " + ` ${rest.className}`} type='button' onClick={handleCreateUser}>
        {children}
      </button>
      </>
  )
}