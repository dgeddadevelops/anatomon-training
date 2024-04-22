import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Anatomon Trainers" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-blue-50 sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <picture>
                <source srcSet="img1.avif" type="image/avif" />
                <source srcSet="img1.webp" type="image/webp" />
                <source srcSet="img1.jpeg" type="image/jpeg" />
                <img
                  className="h-full w-full object-cover"
                  src="img1.jpeg"
                  alt="Anatomon Trainers"
                />
              </picture>
              <div className="absolute inset-0 bg-blue-100 mix-blend-multiply" />
            </div>
            <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className=" invisible text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-blue-400 drop-shadow-md">
                  Lorem Ipsum
                </span>
              </h1>
              <p className="invisible   mx-auto mt-6 max-w-lg text-center text-xl text-blue-800 sm:max-w-3xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae project deployed.
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/indexcards"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-100 sm:px-8"
                  >
                    View Muscles for {user.email}
                  </Link>
                ) : (
                  <div>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <div className="mt-6 flex flex-wrap justify-center gap-8"></div>
        </div>
      </div>
    </main>
  );
}
