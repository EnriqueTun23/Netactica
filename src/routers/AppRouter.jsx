import { Routes, Route } from 'react-router-dom';

import { CharactersPage } from '../Pages/CharactersPage';
import { FilmsPage } from '../Pages/FilmsPage';
import { FilmsDetailPage } from '../Pages/FilmsDetailPage';
import { CharactersDetailPage } from '../Pages/CharactersDetailPage';


export const AppRouter = () => {
    return (
            <Routes>
                <Route path='/' element={<FilmsPage />}  />
                <Route path='/film/characters' element={<FilmsDetailPage />} />
                <Route path='/characters' element={<CharactersPage />}  />
                <Route path='/characters/detail' element={<CharactersDetailPage />} />
            </Routes>
    )
}