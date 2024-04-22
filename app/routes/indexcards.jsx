import { StudyContextProvider } from '~/React/StudyToggleContext';

import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useAtom } from 'jotai';

import '../React/index.css';
import { getAllMuscles } from '~/models/muscle.server';
import { getUser } from '~/session.server';
import { pokeTypeAtom, searchPokeAtom } from '../atoms';

import CardFlip from '../React/CardFlip';
import HeaderBar from '../React/HeaderBar';
import useAuth from '~/React/hooks/useAuth'; // Import useAuth hook

export async function loader({ request }) {
  const user = await getUser(request);
  if (!user) {
    return redirect("/login");
  }
  const muscles = await getAllMuscles();
  return json({ muscles });
}

export default function Index() {
  const { muscles } = useLoaderData();
  const [typeFilter] = useAtom(pokeTypeAtom);
  const [debouncedInput] = useAtom(searchPokeAtom);

  const pokemonObjects = useAuth();
  console.log(pokemonObjects)

  return (

    <StudyContextProvider>
      <div>
        <HeaderBar />
        <main className="bg-blue-50 mix-blend-multiply grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-8 lg:grid-cols-4 min-w-0 grid-container">
          {pokemonObjects
            .filter((poke) => {
              const searchCondition = typeFilter && poke[typeFilter] ?
                poke[typeFilter].toString().toLowerCase().includes(debouncedInput.toLowerCase()) :
                false;
              return searchCondition;
            })
            .map((poke, idx) => {
              const muscle = muscles[idx];
              return (
                <div key={poke.id}>
                  <CardFlip pokeName={poke.name} pokeImage={poke.image} {...poke} {...muscle} />
                </div>
              );
            })}
        </main>
      </div>
    </StudyContextProvider>

  );
}
