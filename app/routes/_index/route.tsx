import type { MetaFunction } from "@remix-run/node";
import loaderFunction from "./loader";
import { Form, Link, useLoaderData } from "@remix-run/react";
import actionFunction from "./action";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = loaderFunction;
export const action = actionFunction;

export default function Index() {
  const animes = useLoaderData<typeof loaderFunction>();
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3">
      <div>Anime count: {animes.length}</div>

      <ul className="list-decimal">
        {animes.map((anime) => (
          <li key={anime.id}>
            <Link className="border-dashed border-b border-white" prefetch="intent" to={`/anime/${anime.id}`}>
              {anime.title}
            </Link>
          </li>
        ))}
      </ul>

      <Form method="POST">
        <input className="p-2 bg-white text-black" type="text" name="title" />
        <button type="submit" className="px-3 py-2 bg-green-600">
          Create
        </button>
      </Form>
    </div>
  );
}
