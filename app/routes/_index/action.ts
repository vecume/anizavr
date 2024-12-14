import { ActionFunctionArgs } from "@remix-run/node";
import prisma from "~/db.server";

export default async function actionFunction({request}: ActionFunctionArgs) {
  const formData = await request.formData();

  const anime = await prisma.anime.create({
    data: {
      title: formData.get("title")?.toString() || ""
    }
  })

  return anime
}
