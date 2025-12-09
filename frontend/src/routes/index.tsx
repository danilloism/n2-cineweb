import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { FilmesPage } from '../pages/FilmesPage';
import { SalasPage } from '../pages/SalasPage';
import { SessoesPage } from '../pages/SessoesPage';

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/filmes"
          element={<FilmesPage />}
        />
        <Route
          path="/salas"
          element={<SalasPage />}
        />
        <Route
          path="/sessoes"
          element={<SessoesPage />}
        />
      </Routes>
    </>
  );
};
