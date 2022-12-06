import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const dan = await prisma.user.upsert({
    where: {
      email: "dan@dan.com",
    },
    update: {},
    create: {
      email: "dan@dan.com",
      name: "Dan",
      saltAndHash: await bcrypt.hash("test123", 10),
    },
  });

  const mustafa = await prisma.user.upsert({
    where: {
      email: "mustafa@mustafa.com",
    },
    update: {},
    create: {
      email: "mustafa@mustafa.com",
      name: "Mustafa",
      saltAndHash: await bcrypt.hash("test123", 10),
    },
  });

  const ash = await prisma.user.upsert({
    where: {
      email: "ash@ash.com",
    },
    update: {},
    create: {
      email: "ash@ash.com",
      name: "Ash",
      saltAndHash: await bcrypt.hash("test123", 10),
    },
  });
  const chirag = await prisma.user.upsert({
    where: {
      email: "chirag@chirag.com",
    },
    update: {},
    create: {
      email: "chirag@chirag.com",
      name: "Chirag",
      saltAndHash: await bcrypt.hash("test123", 10),
    },
  });
  const christie = await prisma.user.upsert({
    where: {
      email: "christie@christie.com",
    },
    update: {},
    create: {
      email: "christie@christie.com",
      name: "Christie",
      saltAndHash: await bcrypt.hash("test123", 10),
    },
  });

  await prisma.conversation.deleteMany();
  const conversationDanMustafa = await prisma.conversation.create({
    data: {
      participant: {
        connect: [dan, mustafa].map((user) => ({ id: user.id })),
      },
    },
  });
  const conversationAshChirag = await prisma.conversation.create({
    data: {
      participant: {
        connect: [ash, chirag].map((user) => ({ id: user.id })),
      },
    },
  });
  const conversationMustafaChristie = await prisma.conversation.create({
    data: {
      participant: {
        connect: [mustafa, christie].map((user) => ({ id: user.id })),
      },
    },
  });
  const conversationMustafaAsh = await prisma.conversation.create({
    data: {
      participant: {
        connect: [mustafa, ash].map((user) => ({ id: user.id })),
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
