import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const myAppInfoHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get userID from the request
  const userID = 5701119201;
  // const userID = req.body.userId;

  if (!userID) {
    res.status(400).json({ message: "No userID provided" });
    return;
  }

  // Find the user with the provided userID
  const user = await prisma.user.findUnique({
    where: { userId: userID },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
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
