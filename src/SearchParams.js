import { useState, useEffect } from "react";
import useBreedList, { LOADING, LOADED, UNLOADED } from "./useBreedList";
import Pet from "./Pet";
import Results from "./Results";

const ANIMALS = ["dog", "cat"];

function SearchParams() {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);

  const [breedsList] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    const { pets } = await res.json();
    setPets(pets);
  }

  function handleSubmit(event) {
    event.preventDefault();
    requestPets();
  }

  return (
    <div className="search-params">
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          {
            <select
              id="breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              onBlur={(e) => setBreed(e.target.value)}
            >
              <option />
              {breedsList.map((breed) => (
                <option value={breed} key={breed}>
                  {breed}
                </option>
              ))}
            </select>
          }
        </label>
        <button>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
}

export default SearchParams;
