import { database } from "~/database/context";
import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const db = database();

  const user = await db.query.user.findFirst();

  return { message: context.VALUE_FROM_VERCEL, user };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <Welcome message={loaderData.message} userName={loaderData.user?.name} />
  );
}
