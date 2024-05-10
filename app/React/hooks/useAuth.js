import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import pokemon from "../../poke-data/pokemon";

export default function useAuth() {
  const [pokemonObjs, setPokemonObjs] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const jwtToken = localStorage.getItem("jwtToken");
      if (jwtToken) {
        try {
          const decodedToken = jwtDecode(jwtToken);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp <= currentTime) {
            try {
              const authResponse = await fetch("/auth");
              const authData = await authResponse.json();
              if (authData.token) {
                localStorage.setItem("jwtToken", authData.token);
                await fetchImages();
              }
            } catch (error) {
              console.error("Authentication failed:", error);
            }
          } else {
            const requests = pokemon.map(async ({ name }) => {
              return fetch(
                `https://first-worker.gdteamwork.workers.dev/${name}`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    Accept: "image/avif,image/webp,image/jpeg,*/*",
                  },
                },
              )
                .then((res) => {
                  if (res.ok) {
                    return res.blob();
                  }
                  throw new Error(`Failed to fetch ${name}`);
                })
                .then((blob) => {
                  return {
                    name: name, // Add name property here
                    imageUrl: URL.createObjectURL(blob), // Use a more descriptive key for the URL
                  };
                })
                .catch((error) => {
                  console.error(error);
                  return null; //
                });
            });

            const results = await Promise.allSettled(requests);
            const images = results
              .filter((result) => result.status === "fulfilled")
              .map((result) => result.value)
              .reduce((acc, obj) => {
                acc[obj.name] = obj.imageUrl;
                return acc;
              }, {});
            const newPokemon = pokemon.map((el) => {
              return { ...el, image: images[el.name] };
            });
            setPokemonObjs(newPokemon);
          }
        } catch (error) {
          console.error("Error decoding JWT or fetching images:", error);
        }
      } else {
        try {
          const authResponse = await fetch("/auth");
          const authData = await authResponse.json();
          if (authData.token) {
            localStorage.setItem("jwtToken", authData.token);
            await fetchImages();
          }
        } catch (error) {
          console.error("Authentication failed:", error);
        }
      }
    }

    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return pokemonObjs;
}
