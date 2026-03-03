import { useState } from "react";
import "./App.css";

export default function App() {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState("");
  const [habitatData, setHabitat] = useState("");

  const fetchPokemon = async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      if (!res.ok) throw new Error("Pokemon hittades inte");
      const data = await res.json();
      setPokemon(data);
      setHabitat(null);
    } catch (err) {
      console.error(err);
    }
  };

 
  const fetchHabitat = async () => {
    if (!pokemon) return;

    try {
      // Du behöver veta habitatets namn för den här Pokémon.
      // Det finns tyvärr inte direkt i /pokemon API, utan måste komma från species
      const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name.toLowerCase()}`);
      const speciesData = await speciesRes.json();

      const habitatName = speciesData.habitat?.name; // t.ex. "cave"
      if (!habitatName) return;

      const habitatRes = await fetch(`https://pokeapi.co/api/v2/pokemon-habitat/${habitatName}`);
      const habitatJson = await habitatRes.json();
      setHabitat(habitatJson);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>POKÉ PORTAL</h1>
      </header>

      <main>
        <div className="card">
          <input type="text" onChange={(e) => setSearch(e.target.value)} />

          <button onClick={fetchPokemon}>Sök</button>

          <p>
            Välkommen till PokéPortal, webbplatsen där Pokémon-drömmar blir
            verklighet! 🐾✨ Här kan du på några klick ta fram alla dina
            favorit-Pokémon – från den busiga Pikachu till den majestätiska
            Charizard. Leta upp dem, lär känna deras krafter och bygg ditt eget
            digitala Pokémon-galleri. Varje besök är ett nytt äventyr – vem vet
            vilken sällsynt Pokémon som dyker upp nästa gång du loggar in? Det
            är som en magisk Pokéball online – bara klicka, upptäck och ha kul!
            ⚡🎉
          </p>

          {pokemon && (
            <div className="result">
              <h2>{pokemon.name}</h2>
              <img src={pokemon.sprites.front_default} />
              <p>Weight: {pokemon.weight / 10} kg</p>
              <p>Height: {pokemon.height / 10} m</p>
            </div>
          )}

          {pokemon && <button onClick={fetchHabitat}>Hämta Habitat</button>}

      {habitatData && (
        <div>
          <h2>Habitat info</h2>
          <p>Habitat name: {habitatData.name}</p>
          
        </div>
      )}
    
        </div>
      </main>

      <footer>
        <p>&copy; 2026 - Designed by Elina, Daniel, Victoria</p>
      </footer>

    </div>
  );
}
App;
