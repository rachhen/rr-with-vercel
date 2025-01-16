import { Outlet, redirect } from "react-router";

import { isLoggedIn } from "~/lib/auth.server";
import type { Route } from "./+types/layout";

export const loader = async ({ request }: Route.LoaderArgs) => {
  if (await isLoggedIn(request)) {
    throw redirect("/");
  }
};

function AuthLayout() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
