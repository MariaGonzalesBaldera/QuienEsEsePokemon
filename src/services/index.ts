export const getPokemon = async(name:string)=>{
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        console.log(data)
        return data;
    }catch(e){
        console.log('error ', e);
    }
}