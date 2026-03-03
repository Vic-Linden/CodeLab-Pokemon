import { useState } from "react";
import "./App.css";

export default function App() {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState("");

  const fetchPokemon = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);

    const data = await response.json();
    setPokemon(data);
  };

  return (
    <div className="container">
      <header>
        <h1>POKEMON</h1>
      </header>

      <main>
        <div className="card">
          <input type="text" onChange={(e) => setSearch(e.target.value)} />

          <button onClick={fetchPokemon}>Sök</button>

          {pokemon && (
            <div className="result">
              <h2>{pokemon.name}</h2>
              <img src={pokemon.sprites.front_default} />
              <p>Weight: {pokemon.weight / 10} kg</p>
              <p>Height: {pokemon.height / 10} m</p>
            </div>
          )}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
App;
