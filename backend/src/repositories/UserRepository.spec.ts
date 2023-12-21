/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import { User as PrismaUser } from "@prisma/client";
import { compareSync } from 'bcryptjs';

import { UserRepository as __UserRepository } from "./UserRepository";
import { prisma } from "../lib/prisma";

const UserRepository = new __UserRepository()
let createdUser: PrismaUser;
// test('', async () => {})

test('Get all users', async () => {
    const res = await UserRepository.getAllUsers({prisma})

    expect(res).toBeDefined()
    expect(res).toEqual([])
})

test('Create user', async () => {
    const userWillBeCreated = {
        name: 'Caio',
        email: 'email@mail.com',
        password: '123',
    }

    createdUser = await UserRepository.createUser(userWillBeCreated, {prisma})

    expect(createdUser.name).toBe(userWillBeCreated.name)
    expect(createdUser.email).toBe(userWillBeCreated.email)

    const isValid = compareSync(userWillBeCreated.password, createdUser.password)
    expect(isValid).toBe(true)
})

test('Get user by id', async () => {
    const user = await UserRepository.getUserById({id: createdUser.id}, {prisma})

    expect(user?.name).toBe(createdUser.name)
    expect(user?.email).toBe(createdUser.email)
    expect(user?.password).toBe(createdUser.password)
})

test('Update user', async () => {
    await UserRepository.updateUser({
        id: createdUser.id,
        name: 'Caio Marques',
    }, {prisma})

    const updatedUser = await UserRepository.getUserById({id: createdUser.id}, {prisma})
    
    if(updatedUser){
        createdUser = updatedUser
    }

    expect(updatedUser?.name).toBe('Caio Marques')
})

test('Get user by email', async () => {
    const foundByEmail = await UserRepository.getUserByEmail({email: createdUser.email}, {prisma})

    expect(foundByEmail?.email).toBe(createdUser.email)
    expect(foundByEmail?.name).toBe(createdUser.name)
    expect(foundByEmail?.password).toBe(createdUser.password)
})

test('Create tokens', async () => {
    const accessToken = await UserRepository.createAccessToken(createdUser.id, {prisma})
    const refreshToken = await UserRepository.createRefreshToken(createdUser.id, {prisma})

    expect(accessToken).toBeDefined()
    expect(refreshToken).toBeDefined()

    expect(accessToken.token).toBeDefined()
    expect(refreshToken.token).toBeDefined()

    expect(accessToken.userId).toBe(createdUser.id)
    expect(refreshToken.userId).toBe(createdUser.id)
})

test('Deactivate user', async () => {
    const deactivatedUser = await UserRepository.deactivateUser(createdUser.id, {prisma})

    expect(deactivatedUser?.email).toBe(createdUser.email)
    expect(deactivatedUser?.name).toBe(createdUser.name)
})    

test('Delete user', async () => {
    const usersAmount = (await UserRepository.getAllUsers({prisma})).length
    const user = await UserRepository.getUserById({id: createdUser.id}, {prisma})
    
    await prisma.accessToken.delete({
        where: {
            id: user?.accessToken?.id
        }
    })
    
    await prisma.refreshToken.delete({
        where: {
            id: user?.refreshToken?.id
        }
    })
    
    const deletedUser = await UserRepository.deleteUser(createdUser.id, {prisma})

    expect(deletedUser.id).toBe(createdUser.id)
    expect(deletedUser.name).toBe(createdUser.name)
    expect((await UserRepository.getAllUsers({prisma})).length).toBe(usersAmount-1)
})            

// test('', async () => {})

