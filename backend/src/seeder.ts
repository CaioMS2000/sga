import { faker } from '@faker-js/faker';
// import { prisma } from './lib/prisma';
import { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { Admin } from './dto/models/enum';

const prisma = new PrismaClient();

type Item = {
    name: string;
    imagePath: string;
    description: string;
    value: number;
}

const {commerce, number, string, company} = faker
const urls: string[] = [];
let user: User | null;

async function getImagesURLs(){
    const data = (await (await fetch('https://api.slingacademy.com/v1/sample-data/photos')).json())
    
    // const {photos} = data
    let photos: ({
        url: string,
    })[];
    photos = data.photos
    
    photos.forEach(p => {
        urls.push(p.url)
    });
}

async function getUser(prisma: PrismaClient){

    const user = await prisma.user.findFirst({
        where: {
            email: 'email@mail.com'
        }
    })

    return user
}

async function main(prisma: PrismaClient){
    await getImagesURLs()
    user = await getUser(prisma)
    console.log(urls)
    console.log(user)

    if(user != null){

        urls.forEach(url => {

            let item: Item = {
                name: commerce.productName(),
                value: number.float(),
                description: commerce.productDescription(),
                imagePath: url
            }

            async function createStorageFirst(){

                const storage = await prisma.storage.create({
                    data:{
                        storekeeper: {
                            connect: {
                                id: user?.id
                            }
                        },
                        code: string.uuid()
                    }
                })

                const supplier = await prisma.supplier.create({
                    data:{
                        name: company.name(),
                        cnpj: string.uuid()
                    }
                })
     
                const createdItem = await prisma.item.create({
                    data: {
                        ...item,
                        storage: {
                            connect: {
                                id: storage.id
                            }
                        },
                        invoice: {
                            create: {
                                code: string.uuid(),
                                supplier: {
                                    connect: {
                                        id: supplier.id
                                    }
                                }
                            }
                        }
                    }
                })
            }

           createStorageFirst()

        })

        await prisma.department.createMany({
            data: [
                {
                    code: string.uuid(),
                    name: 'DTI',
                    description: 'Departamento da Tecnologia da Informação'
                },
                {
                    code: string.uuid(),
                    name: 'DRH',
                    description: 'Departamento de Recursos Humanos'
                },
                {
                    code: string.uuid(),
                    name: 'DJUR',
                    description: 'Departamento Jurídico'
                },
            ]
        })

    }
    // else{
    //     await prisma.user.create({data:{
    //         email: 'email@mail.com',
    //         password: '123',
    //         name: 'Caio',
    //         roles: [Admin],
    //     }})
    // }

    setTimeout(async () => {
        console.log(await prisma.item.findMany())
    }, 1000 * 10)
}

main(prisma).catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })