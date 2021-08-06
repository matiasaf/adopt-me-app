import { useState, useEffect } from "react";

const localCache = {};

export const UNLOADED = "unloaded";
export const LOADING = "loading";
export const LOADED = "loaded";

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState(UNLOADED);
  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }
    async function requestBreedList() {
      setBreedList([]);
      setStatus(LOADING);

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      const json = await res.json();
      localCache[animal] = json.breeds || [];

      setBreedList(localCache[animal]);
      setStatus(LOADED);
    }
  }, [animal]);

  return [breedList, status];
}
