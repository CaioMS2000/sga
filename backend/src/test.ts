// import 'reflect-metadata'
// import { prisma } from "./lib/prisma";
// import { UserResolver as _UserResolver } from "./resolvers/users-resolver";

// const UserResolver = new _UserResolver();

// (async () => {
//   const res = await UserResolver.users({prisma})

//   console.log(res)
// })()

import { faker } from '@faker-js/faker';
const {commerce, number, string, company} = faker

for (let index = 0; index < 10; index++) {
  console.log(`commerce product: ${commerce.product()}`)
  console.log(`commerce product name: ${commerce.productName()}`)
  
  console.log('\n')
}