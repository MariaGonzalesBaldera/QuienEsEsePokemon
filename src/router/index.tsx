import {BrowserRouter, Routes, Route} from  'react-router-dom';
import { HomePage,PokeSearchPage,PokeGamePage } from '../pages'
 
export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/poke-game' element={<HomePage/>} />
                <Route path='/poke-search' element={<PokeSearchPage/>} />
                <Route path='/' element={<PokeGamePage/>} />
            </Routes>
        </BrowserRouter>
    )
}