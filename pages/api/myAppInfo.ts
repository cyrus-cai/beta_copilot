import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const myAppInfoHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userID = req.body.userId;
  console.log(userID);

  if (!userID) {
    res.status(400).json({ message: "No userID provided" });
    return;
  }

  // Find the user with the provided userID
  const user = await prisma.user.findUnique({
    where: { userId: userID },
  });

  if (!user) {
    return;
  }

  // Then find all the MicroApps with the ids stored in user.microApp
  const allMyMicroApps = await prisma.microApp.findMany({
    where: {
      id: {
        in: user.microApp,
      },
    },
  });
  console.log(allMyMicroApps);
  res.json(allMyMicroApps);
};

export default myAppInfoHandler;
