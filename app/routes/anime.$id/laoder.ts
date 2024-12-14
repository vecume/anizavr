import { LoaderFunctionArgs } from "@remix-run/node";
import prisma from "~/db.server";

export default async function loaderFunction({ params }: LoaderFunctionArgs) {
  const anime = await prisma.anime.findUnique({
    where: {
      id: +(params.id || 0),
    },
    select: {
      episodes: true,
      title: true,
      id: true
    }
  });

  if (!anime) throw new Response("Not found", { status: 404 });

  return anime;
}
