import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 },
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 },
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 },
    );
  }

  return createUserSession({
    redirectTo,
    remember: remember === "on" ? true : false,
    request,
    userId: user.id,
  });
};

export const meta: MetaFunction = () => [{ title: "Login" }];

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/indexcards";
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);
  const populateTestUser = (): void => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    emailRef.current &&
      (emailRef.current.value = "bulbasaur@anatomon.trainers");
    passwordRef.current && (passwordRef.current.value = "bulbasaur");
  };
  return (
    <div className="flex min-h-full flex-col justify-center w-full">
      <div className="flex justify-around">
        <div className="bg-gray-200 mt-[5px] leading-5 w-full max-w-[600px] px-[40px] py-4">
          <p className="mt-3 text-justify text-slate-900">
            Anatomon Trainers serves as a centralized development environment,
            offering direct views into the diverse workflows linking a full
            stack JavaScript application and cloud computing services.
          </p>
          <div className="mt-3 text-justify">
            <p className="mb-1">
              Between Application and Cloudflare it provides visibility into:
            </p>
            <ul className="list-disc ml-6">
              <li className="mb-2">Authorization</li>
              <li className="mb-2">Image Optimization</li>
              <li className="mb-2">Caching Directives</li>
              <li className="mb-2">Leveraging a CDN</li>
            </ul>
          </div>
          <p className="mt-3 text-justify">
            Within the Cloudflare ecosystem it provides visibility into the
            connections among a Cloudflare Worker, Object Storage and Key/Value
            Cache, highlighting the decisions made in organizing and
            implementing these relationships.
          </p>

          <p className="mt-3 text-justify">
            Additionally a CI/CD pipeline via GitHub Actions deploying updates
            to Fly.io provides a space for the quick implementation of
            functional and end to end testing with Cypress.
          </p>
          <p className="mt-3 text-justify">
            <span>Behind the youthful interface and study app,</span>{" "}
            <span className="underline decoration-dotted decoration-gray-500">
              Anatomon Trainers is a set of &quot;platforms&quot; allowing me to
              isolate each of the aformentioned workflows to brainstorm,
              implement, debug and test features, serving as a springboard to
              address comparable issues or challenges within production
              environments.
            </span>{" "}
          </p>
        </div>
        <div className="relative min-w-80">
          <h3 className="mx-auto w-full max-w-md px-8 text-[22px] font-extrabold mt-[136px] tracking-tighter">
            FOR DEMO PURPOSES
          </h3>
          <div className="mx-8 mt-1">
            <span>Click to: &#8594;</span>
            <button
              className=" bg-yellow-200 ml-2"
              onClick={populateTestUser}
            >
              Populate Test User
            </button>
          </div>
          <div className="mx-auto w-full max-w-md px-8 mt-[20px]">
            <Form method="post" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    ref={emailRef}
                    id="email"
                    required
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus={true}
                    name="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={actionData?.errors?.email ? true : undefined}
                    aria-describedby="email-error"
                    className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  />
                  {actionData?.errors?.email ? (
                    <div className="pt-1 text-red-700" id="email-error">
                      {actionData.errors.email}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    ref={passwordRef}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    aria-invalid={
                      actionData?.errors?.password ? true : undefined
                    }
                    aria-describedby="password-error"
                    className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  />
                  {actionData?.errors?.password ? (
                    <div className="pt-1 text-red-700" id="password-error">
                      {actionData.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>

              <input type="hidden" name="redirectTo" value={redirectTo} />
              <button
                type="submit"
                className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
              >
                Log in
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
