import { ActionFunctionArgs } from "@remix-run/node";
import prisma from "~/db.server";

export default async function actionFunction({
  request,
  params,
}: ActionFunctionArgs) {
  const formData = await request.formData();
  const formJson = Object.fromEntries(formData.entries());

  const episode = await prisma.episode.create({
    data: {
      position: +formJson.position,
      season: +formJson.season,
      fileId: formJson.fileId.toString(),
      animeId: +(params.id || 0),
    },
  });

  return episode;
}
