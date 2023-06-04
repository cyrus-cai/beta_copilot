// pages/api/appInfo.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const appInfoHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const allMicroApps = await prisma.microApp.findMany();
  res.json(allMicroApps);
};

export default appInfoHandler;