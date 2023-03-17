import { useEffect, useState } from "react";
import { getPokemon } from "../../services";
import icoRefresh from "../../assets/img/cargando-flechas.png";
import Swal from "sweetalert2";

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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No es ese Pokemón",
      });
      return;
    }
    setIsAssert(true);
  };
  useEffect(() => {
    getRandomPokemon();
  }, []);
  return (
    <div className="container">
      <div className="container text-center">
        <div className="row">
          <div className="col order-last">
            <div className={!isAssert ? "InfoPokemon" : ""}>
              <div>
                {pokemon && (
                  <div className="div-infoPer">
                    <h2 className="h2">El es : {pokemon.name}</h2>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col">
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
          <div className="col order-first">
            <h1 className="h1 fw-bold mb-2">¿Quién es ese Pokemón?</h1>
            <h2 className="fs-base lh-base fw-medium text-muted mb-0">
              Adivina la silueta
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
