import prisma from "~/db.server";

export default async function loaderFunction() {
  const animes = await prisma.anime.findMany();

  return animes;
}
