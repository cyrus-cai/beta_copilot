// pages/api/updateUserApp.js
import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUserAppHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, microApp } = req.body;

  try {
    const user = await prisma.user.update({
      where: { userId: userId },
      data: { microApp: { push: microApp } },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in /api/updateUserApp:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  } finally {
    await prisma.$disconnect();
  }
};

export default updateUserAppHandler