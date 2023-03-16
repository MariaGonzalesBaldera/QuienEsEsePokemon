import {useEffect, useState} from 'react'
import { getPokemon } from "../../services"
export default function PokeGame(){
    
    const [pokemon,setPokemon]= useState<any>(null)
    const [pokeValue,setPokeValue]= useState<string>('')
    const [isAssert,setIsAssert]= useState<boolean>(false)
    
    const getRandomId =():number => Math.floor(Math.random()*1000)+1

    const getRandomPokemon = async()=>{
        const id = getRandomId();
        const pokemon = await getPokemon(String(id))
        setPokemon(pokemon)
    }
    const handleMatchPokemon=()=>{
        if (!pokeValue)return;
        setPokeValue('')
        if (pokeValue.toLowerCase()!==pokemon.name){
            alert('Fallaste')
            return
        }
        alert('Excelente')
        setIsAssert(true)
    }
    useEffect(()=>{
        getRandomPokemon()
    },[])
    return(
        <div>
            <h1>
                ¿Quién es ese pokemón?
            </h1>
            {pokemon && (
                <>
                <img className={!isAssert? 'hide-poke':''} src={pokemon?.sprites?.other.dream_world.front_default} alt=''/>
                <input type='text' placeholder='Ingrese el nombre del pokemon'
                value={pokeValue} 
                onChange={(e)=>setPokeValue(e.target.value)}/>
                <button onClick={handleMatchPokemon}>Buscar Pokemon</button>
                </>
                
            )}
        </div>
    )
}