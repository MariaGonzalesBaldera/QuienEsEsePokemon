import { useEffect, useState } from "react";
import { getPokemon } from "../../services";
import icoRefresh from "../../assets/img/cargando-flechas.png";

export default function PokeGame() {
  const [pokemon, setPokemon] = useState<any>(null);
  const [pokeValue, setPokeValue] = useState<string>("");
  const [isAssert, setIsAssert] = useState<boolean>(false);

  const getRandomId = (): number => Math.floor(Math.random() * 649) + 1;

  const getRandomPokemon = async () => {
    setIsAssert(false);
    const id = getRandomId();
    const pokemon = await getPokemon(String(id));
    setPokemon(pokemon);
  };
  const handleMatchPokemon = () => {
    if (!pokeValue) return;
    setPokeValue("");
    if (pokeValue.toLowerCase() !== pokemon.name) {
      alert("Fallaste");
      return;
    }
    alert("Excelente");
    setIsAssert(true);
  };
  useEffect(() => {
    getRandomPokemon();
  }, []);
  return (
      <div className="container">
        <div className="row ml-5" >
            <div className="col-sm-3">
            <div className="flex-grow-2">
              <h1 className="h1 fw-bold mb-2">¿Quién es ese Pokemón?</h1>
              <h2 className="fs-base lh-base fw-medium text-muted mb-0">
                Adivina la silueta
              </h2>
            </div>
            </div>
            <div className="col-sm-5">
            {pokemon && (
                <div className="containerMedio">
                  <div className="">
                    <img
                      className={!isAssert ? "hide-poke" : ""}
                      src={pokemon?.sprites?.other.dream_world.front_default}
                      alt=""
                    />
                  </div>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Ingrese el nombre del pokemon"
                    value={pokeValue}
                    onChange={(e) => setPokeValue(e.target.value)}
                  />
                  <div className="div-buton">
                    <button
                      className="btn btn-lg btn-outline-secondary"
                      onClick={handleMatchPokemon}
                    >
                      Buscar Pokemon
                    </button>
                    <img
                      onClick={() => getRandomPokemon()}
                      className="icoRefresh"
                      src={icoRefresh}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="col-sm-3">
                <div className={!isAssert ? "InfoPokemon" : ""}>
                <div className="container">
                    <h4>Aquí va a ir la información del pokemon</h4>
                </div>
                <div>
                    {/* <h6>{pokemon.name}</h6>                     */}
                </div>
                </div>
            </div>
        </div>
      </div>
  );
}
