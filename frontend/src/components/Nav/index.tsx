import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <>
      <div className="d-flex justify-content-center bg-dark text-white p-3 mb-5">
        <ul className="nav">
          <li className="nav-item mx-3">
            <Link
              to="/"
              className="nav-link text-white"
            >
              Home
            </Link>
          </li>
          <li className="nav-item mx-3">
            <Link
              to="/filmes"
              className="nav-link text-white"
            >
              Filmes
            </Link>
          </li>
          <li className="nav-item mx-3">
            <Link
              to="/salas"
              className="nav-link text-white"
            >
              Salas
            </Link>
          </li>
          <li className="nav-item mx-3">
            <Link
              to="/sessoes"
              className="nav-link text-white"
            >
              Sessoes
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
