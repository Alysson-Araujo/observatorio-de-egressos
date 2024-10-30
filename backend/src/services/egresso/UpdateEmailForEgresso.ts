// import prismaClient from "../../prisma";

// class UpdateEmailForEgresso {
//   async execute(emails: string[]) {
    
//     for (let i = 0; i < emails.length; i++) {
//       const existingEgressos = await prismaClient.egresso.update({
//         where: {
//           email: emails[i],
//         },
//         data: {
//           email,
//         },
//       });
//     }

//     return existingEgressos !== null;
//   }

// }