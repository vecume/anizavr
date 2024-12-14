import { Form, useLoaderData } from "@remix-run/react";

import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import prisma from "~/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const anime = await prisma.anime.findUnique({
    where: {
      id: +(params.id || 0),
    },
    select: {
      episodes: true,
      title: true,
      id: true,
    },
  });

  if (!anime) throw new Response("Not found", { status: 404 });

  return anime;
}

export async function action({ request, params }: ActionFunctionArgs) {
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

export default function Anime() {
  const anime = useLoaderData<typeof loader>();
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3">
      <div>Title: {anime.title}</div>
      <div>Episodes: {anime.episodes.length}</div>

      <ul className="list-decimal">
        {anime.episodes.map((episode) => (
          <li key={anime.id}>
            {episode.season} - {episode.position}
          </li>
        ))}
      </ul>

      <Form method="POST">
        <input
          className="p-2 bg-white text-black border"
          type="number"
          name="season"
          placeholder="Season"
        />
        <input
          className="p-2 bg-white text-black border"
          type="number"
          name="position"
          placeholder="Position"
        />
        <input
          className="p-2 bg-white text-black border"
          type="text"
          name="fileId"
          placeholder="File Id"
        />
        <button type="submit" className="px-3 py-2 bg-green-600">
          Create Episode
        </button>
      </Form>
    </div>
  );
}
