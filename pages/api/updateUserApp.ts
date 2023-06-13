import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUserAppHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, microAppId, action } = req.body;

  try {
    // Use upsert to find or create the user
    const user = await prisma.user.upsert({
      where: { userId: userId },
      update: {},
      create: { userId: userId, microApp: action === "add" ? [microAppId] : [] },
    });

    let microApps = user.microApp ?? [];

    if (action === "add" && !microApps.includes(microAppId)) {
      // Only add the microAppId if it's not already in the array
      microApps.push(microAppId);
    } else if (action === "remove") {
      microApps = microApps.filter(id => id !== microAppId);
    }

    const updatedUser = await prisma.user.update({
      where: { userId: userId },
      data: { microApp: { set: microApps } },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in /api/updateUserApp:", error);
    res
      .status(500)
      .json({ error: `An error occurred while updating the user. ${(error as Error).message}` });
  } finally {
    await prisma.$disconnect();
  }
};

export default updateUserAppHandler;
