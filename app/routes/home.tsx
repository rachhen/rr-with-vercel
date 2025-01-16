import { auth } from "~/lib/auth.server";
import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context, request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });

  return { message: context.VALUE_FROM_VERCEL, user: session?.user };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <Welcome message={loaderData.message} userName={loaderData.user?.name} />
  );
}
