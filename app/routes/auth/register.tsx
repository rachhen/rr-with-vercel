import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { Form } from "react-aria-components";
import { Link, useNavigate } from "react-router";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FieldError, Label } from "~/components/ui/field";
import { Input, TextField } from "~/components/ui/textfield";
import { client } from "~/lib/auth-client";
import type { Route } from "./+types/register";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Register" }];
};

function Page() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    startTransition(async () => {
      const { error } = await client.signUp.email({
        name: data.name as string,
        email: data.email as string,
        password: data.password as string,
      });

      if (error) {
        setError(error.message);
        return;
      }

      navigate("/");
    });
  }

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          className="flex flex-col gap-2"
          validationBehavior="aria"
          onSubmit={onSubmit}
        >
          <TextField name="name" type="text">
            <Label>Name</Label>
            <Input />
            <FieldError />
          </TextField>
          <TextField name="email" type="email">
            <Label>Email</Label>
            <Input />
            <FieldError />
          </TextField>
          <TextField name="password" type="password">
            <Label>Password</Label>
            <Input />
            <FieldError />
          </TextField>
          <Button className="w-full" type="submit" isDisabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <p className="text-muted-foreground text-sm">
            Already have an account?
            <Link to="/login" className="hover:underline ml-2">
              Login
            </Link>
          </p>
        </Form>
      </CardContent>
    </Card>
  );
}

export default Page;
