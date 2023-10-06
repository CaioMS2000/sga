/**
 * @jest-environment ./prisma/prisma-environment-jest
*/
import { User as PrismaUser } from "@prisma/client";
import { compareSync } from 'bcryptjs';

import { UserService as _UserService } from "./UserService";
import { prisma } from "../lib/prisma";

const UserService = new _UserService()
let createdUser: PrismaUser;

test('Get all users', async () => {
    const res = await UserService.getAllUsers({
        prisma,
    })

    expect(res).toBeDefined()
    expect(res).toEqual([])
})

test('Create user', async () => {
    const userWillBeCreated = {
        name: 'Caio',
        email: 'email@mail.com',
        password: '123',
    }
    
    createdUser = await UserService.createUser(userWillBeCreated, {prisma})
    
    expect(createdUser.name).toBe(userWillBeCreated.name)
    expect(createdUser.email).toBe(userWillBeCreated.email)
    
    const isValid = compareSync(userWillBeCreated.password, createdUser.password)
    expect(isValid).toBe(true)
})

test('Get user by id', async () => {
    const user = await UserService.getUserById({id: createdUser.id}, {prisma})

    expect(user?.name).toBe(createdUser.name)
    expect(user?.email).toBe(createdUser.email)
    expect(user?.password).toBe(createdUser.password)
})

test('Update user', async () => {
    await UserService.updateUser({
        id: createdUser.id,
        name: 'Caio Marques',
    }, {prisma})

    const updatedUser = await UserService.getUserById({id: createdUser.id}, {prisma})
    
    if(updatedUser){
        createdUser = updatedUser
    }

    expect(updatedUser?.name).toBe('Caio Marques')
})

test('Login', async () => {
    const sessionData = await UserService.login({
        email: createdUser.email,
        password: '123'
    }, {prisma})

    expect(sessionData.accessToken).toBeDefined()
    expect(sessionData.refreshToken).toBeDefined()
    expect(sessionData.user.email).toBe(createdUser.email)
})

test('Delete user', async () => {
    const deletedUser = await UserService.deleteUser(createdUser.id, {prisma})

    expect(deletedUser.id).toBe(createdUser.id)
    expect(deletedUser.name).toBe(createdUser.name)
})