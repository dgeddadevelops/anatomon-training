/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const StudyToggleContext = createContext(false);


export const StudyContextProvider = ({ children }) => {
  const [studyMode, setStudyMode] = useState(false);

  return (
    <StudyToggleContext.Provider value={[studyMode, setStudyMode]}>
      {children}
    </StudyToggleContext.Provider>
  );
};

export const PokemonContext = createContext([])

export const PokemonContextProvider = ({ children }) => {
  const [pokemonCards, setPokemonCards] = useState([]);

  return (
    <PokemonContext.Provider value={[pokemonCards, setPokemonCards]}>
      {children}
    </PokemonContext.Provider>
  );
};