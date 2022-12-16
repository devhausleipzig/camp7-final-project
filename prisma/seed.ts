import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const interests = [
    "Baking",
    "Travel",
    "Books",
    "Movies",
    "Outdoors",
    "Swimming",
    "Food",
    "Gardening",
    "Chess",
    "Futbol",
    "Biking",
    "Gym",
    "Pets",
    "Gaming",
    "Running",
    "Art",
    "Writing",
    "Music",
  ];

  await Promise.all(
    interests.map(interest =>
      prisma.interest.upsert({
        where: {
          name: interest,
        },
        update: {},
        create: {
          name: interest,
        },
      })
    )
  );

  const dan = await prisma.user.upsert({
    where: {
      email: "dan@dan.com",
    },
    update: {
      saltAndHash: await bcrypt.hash("test123", 10),
    },
    create: {
      email: "dan@dan.com",
      name: "Dan",
      saltAndHash: await bcrypt.hash("test123", 10),
      interests: {
        connect: [
          { name: "Pets" },
          { name: "Food" },
          { name: "Music" },
          { name: "Chess" },
          { name: "Movies" },
          { name: "Art" },
        ],
      },
      location: {
        create: {
          address: "Mölkau",
          lat: 51.33,
          lon: 12.44,
        },
      },
    },
  });

  const mustafa = await prisma.user.upsert({
    where: {
      email: "mustafa@mustafa.com",
    },
    update: {
      saltAndHash: await bcrypt.hash("test123", 10),
    },
    create: {
      email: "mustafa@mustafa.com",
      name: "Mustafa",
      saltAndHash: await bcrypt.hash("test123", 10),
      interests: {
        connect: [
          { name: "Futbol" },
          { name: "Running" },
          { name: "Food" },
          { name: "Outdoors" },
          { name: "Writing" },
          { name: "Gym" },
        ],
      },
      location: {
        create: {
          address: "Grünau",
          lat: 51.3,
          lon: 12.26,
        },
      },
    },
  });

  const ash = await prisma.user.upsert({
    where: {
      email: "ash@ash.com",
    },
    update: {
      saltAndHash: await bcrypt.hash("test123", 10),
    },
    create: {
      email: "ash@ash.com",
      name: "Ash",
      saltAndHash: await bcrypt.hash("test123", 10),
      interests: {
        connect: [
          { name: "Baking" },
          { name: "Food" },
          { name: "Swimming" },
          { name: "Biking" },
          { name: "Music" },
          { name: "Movies" },
        ],
      },
      location: {
        create: {
          address: "Hamburg",
          lon: 9.98,
          lat: 53.54,
        },
      },
    },
  });
  const chirag = await prisma.user.upsert({
    where: {
      email: "chirag@chirag.com",
    },
    update: {
      saltAndHash: await bcrypt.hash("test123", 10),
    },
    create: {
      email: "chirag@chirag.com",
      name: "Chirag",
      saltAndHash: await bcrypt.hash("test123", 10),
      interests: {
        connect: [
          { name: "Chess" },
          { name: "Futbol" },
          { name: "Food" },
          { name: "Biking" },
          { name: "Books" },
          { name: "Gym" },
        ],
      },
      location: {
        create: {
          address: "Leipzig",
          lat: 51.33,
          lon: 12.37,
        },
      },
    },
  });
  const christie = await prisma.user.upsert({
    where: {
      email: "christie@christie.com",
    },
    update: {
      saltAndHash: await bcrypt.hash("test123", 10),
    },
    create: {
      email: "christie@christie.com",
      name: "Christie",
      saltAndHash: await bcrypt.hash("test123", 10),
      interests: {
        connect: [
          { name: "Movies" },
          { name: "Art" },
          { name: "Food" },
          { name: "Writing" },
          { name: "Music" },
          { name: "Pets" },
        ],
      },
      location: {
        create: {
          address: "Leizpig",
          lat: 51.33,
          lon: 12.37,
        },
      },
    },
  });

  await prisma.conversation.deleteMany();
  const conversationDanMustafa = await prisma.conversation.create({
    data: {
      participant: {
        connect: [dan, mustafa].map(user => ({ id: user.id })),
      },
    },
  });
  const conversationAshChirag = await prisma.conversation.create({
    data: {
      participant: {
        connect: [ash, chirag].map(user => ({ id: user.id })),
      },
    },
  });
  const conversationMustafaChristie = await prisma.conversation.create({
    data: {
      participant: {
        connect: [mustafa, christie].map(user => ({ id: user.id })),
      },
    },
  });
  const conversationMustafaAsh = await prisma.conversation.create({
    data: {
      participant: {
        connect: [mustafa, ash].map(user => ({ id: user.id })),
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
