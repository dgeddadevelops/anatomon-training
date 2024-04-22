import { prisma } from "~/db.server";

export async function getAllMuscles() {
  return await prisma.muscle.findMany();
}
