import actionFunction from "./action";
import loaderFunction from "./laoder";
import { Form, useLoaderData } from "@remix-run/react";

export const loader = loaderFunction;
export const action = actionFunction;

export default function Anime() {
  const anime = useLoaderData<typeof loaderFunction>();
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
