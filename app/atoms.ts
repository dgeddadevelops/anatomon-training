import { atom } from "jotai";

import { PokeFilter } from "./poke-data/pokemon";
const pokeTypeAtom = atom(PokeFilter.NAME);
const searchPokeAtom = atom("");

export { pokeTypeAtom, searchPokeAtom };
