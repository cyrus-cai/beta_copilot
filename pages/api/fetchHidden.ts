import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getLinkIdByCodeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { linkCode } = req.body;

  try {
    const link = await prisma.link.findUnique({
      where: {
        linkCode: linkCode,
      },
      include: {
        microApp: true, // include the associated MicroApp
      },
    });
    if (!link) {
      return res.status(404).json({ error: `No link found with code: ${linkCode}` });
    }

    // Now link.microApp will contain the associated MicroApp
    const microApp = link.microApp;

    res.status(200).json({ microApp: microApp });
  } catch (error) {
    console.error("Error in /api/getLinkIdByCode:", error);
    res
      .status(500)
      .json({ error: `An error occurred while fetching the appId. ${(error as Error).message}` });
  } finally {
    await prisma.$disconnect();
  }

};

export default getLinkIdByCodeHandler;
